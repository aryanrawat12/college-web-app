import { NextResponse } from "next/server";
import { adminTables } from "@/lib/admin-schema";
import { signedGetUrl } from "@/lib/s3";
import { getAdminClient } from "@/lib/supabase-auth";

// Admin "Export to Excel": streams a table as CSV (UTF-8 BOM so Excel opens it
// directly and keeps Hindi text intact). Private file keys become presigned
// links valid for 7 days (the SigV4 maximum).
const LINK_TTL = 7 * 24 * 60 * 60;

function cell(value: unknown): string {
  let s = value == null ? "" : String(value);
  // Neutralise spreadsheet formulas (CSV injection), but leave phone numbers.
  if (/^[=+\-@\t\r]/.test(s) && !/^[+-]?[\d\s]+$/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

// 2006-02-25 → 25/02/2006 (Indian format, as printed on the card).
function formatDate(value: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : value;
}

export async function GET(req: Request) {
  const supabase = await getAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const table = new URL(req.url).searchParams.get("table");
  const config = adminTables.find((t) => t.table === table && t.exportColumns);
  if (!config?.exportColumns) {
    return NextResponse.json({ error: "Not exportable" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from(config.table as "id_card_submissions")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const fileKeys = new Set(config.fileKeyFields ?? []);
  const rows = await Promise.all(
    (data as Record<string, unknown>[]).map(async (row) =>
      Promise.all(
        config.exportColumns!.map(async ({ name }) => {
          const v = row[name];
          if (v && fileKeys.has(name)) return signedGetUrl(String(v), LINK_TTL);
          if (typeof v === "string" && (name === "dob" || name === "created_at"))
            return formatDate(v);
          return v;
        }),
      ),
    ),
  );

  const lines = [
    config.exportColumns.map((c) => cell(c.label)).join(","),
    ...rows.map((r) => r.map(cell).join(",")),
  ];
  const date = new Date().toISOString().slice(0, 10);
  return new Response(`﻿${lines.join("\r\n")}\r\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${config.table}-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
