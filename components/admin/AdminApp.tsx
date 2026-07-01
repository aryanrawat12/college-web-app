"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import {
  adminTables,
  type Field,
  type TableConfig,
} from "@/lib/admin-schema";

/* eslint-disable @typescript-eslint/no-explicit-any */

type Row = Record<string, any>;

const groups: TableConfig["group"][] = [
  "Site",
  "Academics",
  "People",
  "Placements",
  "Content",
  "Submissions",
];

export default function AdminApp() {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  if (!supabase)
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center text-muted">
        Supabase is not configured. Set env vars and reload.
      </div>
    );
  return <Dashboard supabase={supabase} />;
}

function Dashboard({ supabase }: { supabase: any }) {
  const router = useRouter();
  const [active, setActive] = useState<TableConfig>(adminTables[0]);

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="container-page grid gap-8 py-10 lg:grid-cols-[230px_1fr]">
      <aside className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="font-serif text-lg font-bold text-brand-blue">
            Admin
          </span>
          <button
            onClick={signOut}
            className="text-xs font-semibold text-brand-yellow hover:underline"
          >
            Sign out
          </button>
        </div>
        {groups.map((g) => (
          <div key={g}>
            <div className="mb-1.5 font-mono text-[10.5px] uppercase tracking-wide text-faint">
              {g}
            </div>
            <ul className="space-y-0.5">
              {adminTables
                .filter((t) => t.group === g)
                .map((t) => (
                  <li key={t.table}>
                    <button
                      onClick={() => setActive(t)}
                      className={`block w-full rounded-md px-2.5 py-1.5 text-left text-sm transition-colors ${
                        active.table === t.table
                          ? "bg-brand-blue text-white"
                          : "text-foreground hover:bg-cream-2"
                      }`}
                    >
                      {t.label}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </aside>
      <main>
        <TableManager key={active.table} supabase={supabase} config={active} />
      </main>
    </div>
  );
}

async function uploadImage(
  supabase: any,
  file: File,
  folder: string,
): Promise<string> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      folder,
    }),
  });
  if (!res.ok) throw new Error("Upload authorization failed");
  const { uploadUrl, publicUrl } = await res.json();
  const put = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!put.ok) throw new Error("Upload failed");
  return publicUrl;
}

function TableManager({
  supabase,
  config,
}: {
  supabase: any;
  config: TableConfig;
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  // Drag-to-reorder is available on any list ordered by a `sort` column.
  const sortable =
    !config.readOnly && !config.single && config.orderBy?.column === "sort";

  const load = useCallback(async () => {
    setLoading(true);
    let q = supabase.from(config.table).select("*");
    if (config.orderBy)
      q = q.order(config.orderBy.column, { ascending: config.orderBy.ascending });
    const { data, error } = await q;
    setRows(error ? [] : (data ?? []));
    setLoading(false);
    if (config.single) setEditing((data && data[0]) || { id: 1 });
  }, [supabase, config]);

  useEffect(() => {
    load();
  }, [load]);

  async function remove(row: Row) {
    if (!confirm("Delete this row?")) return;
    await supabase.from(config.table).delete().eq("id", row.id);
    await load();
  }

  async function reorder(from: number | null, to: number) {
    setDragIndex(null);
    if (from === null || from === to || to < 0 || to >= rows.length) return;
    const next = [...rows];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    // Renumber sort to match the new order (optimistic), then persist.
    const renum: Row[] = next.map((r, i) => ({ ...r, sort: i + 1 }));
    setRows(renum);
    // Update only the `sort` column per row — avoids the upsert insert path
    // (id is GENERATED ALWAYS) and only touches rows that actually moved.
    setMsg("");
    for (const r of renum) {
      const prev = rows.find((x) => x.id === r.id);
      if (prev && prev.sort === r.sort) continue;
      const { error } = await supabase
        .from(config.table)
        .update({ sort: r.sort })
        .eq("id", r.id);
      if (error) {
        setMsg(error.message);
        break;
      }
    }
    await load();
  }

  async function save(values: Row) {
    setMsg("");
    let error;
    if (values.id != null) {
      ({ error } = await supabase
        .from(config.table)
        .upsert(values));
    } else {
      ({ error } = await supabase.from(config.table).insert(values));
    }
    if (error) {
      setMsg(error.message);
      return;
    }
    setEditing(null);
    await load();
  }

  if (config.single) {
    return (
      <div>
        <h2 className="mb-4 font-serif text-2xl font-bold text-brand-blue">
          {config.label}
        </h2>
        {loading || !editing ? (
          <p className="text-faint">Loading…</p>
        ) : (
          <RowForm
            supabase={supabase}
            config={config}
            row={editing}
            onSave={save}
            msg={msg}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-brand-blue">
          {config.label}
        </h2>
        {!config.readOnly && !editing && (
          <button
            onClick={() => setEditing({})}
            className="rounded-lg bg-brand-yellow px-4 py-2 text-sm font-bold text-white hover:bg-brand-yellow-hover"
          >
            + Add new
          </button>
        )}
      </div>

      {editing ? (
        <div>
          <button
            onClick={() => setEditing(null)}
            className="mb-3 text-sm font-semibold text-brand-blue hover:underline"
          >
            ← Back to list
          </button>
          <RowForm
            supabase={supabase}
            config={config}
            row={editing}
            onSave={save}
            msg={msg}
          />
        </div>
      ) : loading ? (
        <p className="text-faint">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-faint">No rows yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border-warm-2">
          {sortable && (
            <p className="border-b border-border-warm-2 bg-cream-2/60 px-4 py-2 text-xs text-faint">
              Drag rows by the ⠿ handle to reorder.
            </p>
          )}
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-2">
              <tr>
                {sortable && <th className="w-8 px-2 py-2.5" />}
                {config.listFields.map((f) => (
                  <th key={f} className="px-4 py-2.5 font-semibold text-brand-blue">
                    {f}
                  </th>
                ))}
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.id}
                  onDragOver={
                    sortable
                      ? (e) => {
                          e.preventDefault();
                          if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
                        }
                      : undefined
                  }
                  onDrop={
                    sortable
                      ? (e) => {
                          e.preventDefault();
                          reorder(dragIndex, i);
                        }
                      : undefined
                  }
                  className={`border-t border-border-warm-2 ${
                    dragIndex === i ? "opacity-40" : ""
                  } ${sortable && dragIndex !== null && dragIndex !== i ? "hover:bg-cream-2/60" : ""}`}
                >
                  {sortable && (
                    <td
                      draggable
                      onDragStart={(e) => {
                        setDragIndex(i);
                        if (e.dataTransfer) {
                          e.dataTransfer.effectAllowed = "move";
                          e.dataTransfer.setData("text/plain", String(i));
                        }
                      }}
                      onDragEnd={() => setDragIndex(null)}
                      className="cursor-grab select-none px-2 py-2.5 text-center text-lg leading-none text-faint active:cursor-grabbing"
                      aria-label="Drag to reorder"
                      title="Drag to reorder"
                    >
                      ⠿
                    </td>
                  )}
                  {config.listFields.map((f) => (
                    <td key={f} className="max-w-[260px] truncate px-4 py-2.5 text-foreground/80">
                      {String(r[f] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-2.5 text-right whitespace-nowrap">
                    {config.readOnly ? (
                      <span className="text-xs text-faint">view only</span>
                    ) : (
                      <>
                        {sortable && (
                          <>
                            <button
                              onClick={() => reorder(i, i - 1)}
                              disabled={i === 0}
                              aria-label="Move up"
                              title="Move up"
                              className="mr-1 rounded px-1.5 text-brand-blue hover:bg-cream-2 disabled:opacity-30"
                            >
                              ↑
                            </button>
                            <button
                              onClick={() => reorder(i, i + 1)}
                              disabled={i === rows.length - 1}
                              aria-label="Move down"
                              title="Move down"
                              className="mr-3 rounded px-1.5 text-brand-blue hover:bg-cream-2 disabled:opacity-30"
                            >
                              ↓
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setEditing(r)}
                          className="text-sm font-semibold text-brand-blue hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => remove(r)}
                          className="ml-3 text-sm font-semibold text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function RowForm({
  supabase,
  config,
  row,
  onSave,
  msg,
}: {
  supabase: any;
  config: TableConfig;
  row: Row;
  onSave: (v: Row) => void;
  msg: string;
}) {
  const [values, setValues] = useState<Row>(row);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  function set(name: string, v: any) {
    setValues((p) => ({ ...p, [name]: v }));
  }

  async function onFile(field: Field, file: File) {
    setUploading(field.name);
    try {
      const url = await uploadImage(supabase, file, config.table);
      set(field.name, url);
    } catch (e: any) {
      alert(e.message);
    }
    setUploading(null);
  }

  async function onFiles(field: Field, files: FileList) {
    setUploading(field.name);
    const current: string[] = Array.isArray(values[field.name])
      ? [...values[field.name]]
      : [];
    try {
      for (const file of Array.from(files)) {
        const url = await uploadImage(supabase, file, config.table);
        current.push(url);
        set(field.name, [...current]);
      }
    } catch (e: any) {
      alert(e.message);
    }
    setUploading(null);
  }

  function removeImageAt(field: Field, idx: number) {
    const arr: string[] = Array.isArray(values[field.name])
      ? [...values[field.name]]
      : [];
    arr.splice(idx, 1);
    set(field.name, arr);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const clean: Row = { ...values };
    config.fields.forEach((f) => {
      if (f.type === "number" && clean[f.name] !== undefined && clean[f.name] !== "")
        clean[f.name] = Number(clean[f.name]);
    });
    await onSave(clean);
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-4">
      {config.fields.map((f) => (
        <div key={f.name}>
          <label className="mb-1 block text-sm font-medium text-brand-blue">
            {f.label}
          </label>
          {f.type === "textarea" ? (
            <textarea
              rows={3}
              value={values[f.name] ?? ""}
              onChange={(e) => set(f.name, e.target.value)}
              className="w-full rounded-lg border border-border-warm-2 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none"
            />
          ) : f.type === "image" ? (
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                {values[f.name] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={values[f.name]}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-lg border border-border-warm-2 object-contain"
                  />
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-border-warm-2 text-faint">
                    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                      <path d="M4 16l4-4 3 3 4-5 5 6M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                <label className="cursor-pointer">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-blue-dark">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path d="M12 16V4m0 0L8 8m4-4l4 4M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {uploading === f.name
                      ? "Uploading…"
                      : values[f.name]
                        ? "Change image"
                        : "Upload from computer"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploading === f.name}
                    onChange={(e) => e.target.files?.[0] && onFile(f, e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-faint">
                JPG, PNG or SVG from your device — uploads to storage automatically.
              </p>
              <input
                type="text"
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                placeholder="…or paste an image URL"
                className="w-full rounded-lg border border-border-warm-2 px-3 py-2 text-xs focus:border-brand-blue focus:outline-none"
              />
            </div>
          ) : f.type === "images" ? (
            <div className="space-y-3">
              {Array.isArray(values[f.name]) && values[f.name].length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {values[f.name].map((url: string, idx: number) => (
                    <div key={`${url}-${idx}`} className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt=""
                        className="h-20 w-20 rounded-lg border border-border-warm-2 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImageAt(f, idx)}
                        aria-label="Remove image"
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white shadow"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label className="cursor-pointer">
                <span className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-blue-dark">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path d="M12 16V4m0 0L8 8m4-4l4 4M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {uploading === f.name ? "Uploading…" : "Add images from computer"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploading === f.name}
                  onChange={(e) => e.target.files?.length && onFiles(f, e.target.files)}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-faint">
                Select multiple files at once. Click × to remove. They appear in the campus gallery.
              </p>
            </div>
          ) : (
            <input
              type={f.type === "number" ? "number" : "text"}
              value={values[f.name] ?? ""}
              onChange={(e) => set(f.name, e.target.value)}
              className="w-full rounded-lg border border-border-warm-2 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none"
            />
          )}
        </div>
      ))}
      {msg && <p className="text-sm text-red-600">{msg}</p>}
      <button
        type="submit"
        disabled={busy}
        className="rounded-lg bg-brand-blue px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-blue-dark disabled:opacity-60"
      >
        {busy ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
