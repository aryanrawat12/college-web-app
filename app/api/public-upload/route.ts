import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { PRIVATE_PREFIX, S3_BUCKET, s3 } from "@/lib/s3";

// Public (no-login) upload for form attachments: job-application resumes,
// ID-card photos and admission documents. Files are proxied through here —
// not presigned PUTs — so the type and size limits are actually enforced.
// Objects land under `private/` and only the key is returned; admins open
// them via /api/admin/file.

type Kind = {
  maxBytes: number;
  // Accepted file types: extension → leading "magic" bytes of the file.
  types: Record<string, { mime: string; magic: number[] }>;
};

const KINDS: Record<string, Kind> = {
  resume: {
    maxBytes: 5 * 1024 * 1024,
    types: { pdf: { mime: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] } },
  },
  "id-photo": {
    maxBytes: 2 * 1024 * 1024,
    types: {
      jpg: { mime: "image/jpeg", magic: [0xff, 0xd8, 0xff] },
      png: { mime: "image/png", magic: [0x89, 0x50, 0x4e, 0x47] },
    },
  },
  document: {
    maxBytes: 5 * 1024 * 1024,
    types: {
      pdf: { mime: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] },
      jpg: { mime: "image/jpeg", magic: [0xff, 0xd8, 0xff] },
      png: { mime: "image/png", magic: [0x89, 0x50, 0x4e, 0x47] },
    },
  },
};

// Multipart overhead allowance on top of the file itself.
const BODY_SLACK = 64 * 1024;

function fail(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: Request) {
  const kindName = new URL(req.url).searchParams.get("kind") ?? "";
  const kind = KINDS[kindName];
  if (!kind) return fail("Unknown upload type.");

  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > kind.maxBytes + BODY_SLACK) return fail("File is too large.", 413);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Invalid upload.");
  }
  // Honeypot: real users never fill this hidden field.
  if (form.get("website")) return fail("Invalid upload.");

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) return fail("No file received.");
  if (file.size > kind.maxBytes) return fail("File is too large.", 413);

  const bytes = new Uint8Array(await file.arrayBuffer());
  const match = Object.entries(kind.types).find(([, t]) =>
    t.magic.every((b, i) => bytes[i] === b),
  );
  if (!match) return fail("This file type is not allowed.", 415);
  const [ext, { mime }] = match;

  const key = `${PRIVATE_PREFIX}${kindName}/${crypto.randomUUID()}.${ext}`;
  try {
    await s3.send(
      new PutObjectCommand({ Bucket: S3_BUCKET, Key: key, Body: bytes, ContentType: mime }),
    );
  } catch (e) {
    console.error(e);
    return fail("Upload failed. Please try again later.", 500);
  }
  return NextResponse.json({ key });
}
