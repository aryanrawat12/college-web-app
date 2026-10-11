import { PutObjectCommand } from "@aws-sdk/client-s3";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { PRIVATE_PREFIX, S3_BUCKET, publicUrlFor, s3 } from "@/lib/s3";

// Verifies the caller is a logged-in admin (Supabase auth token).
async function requireAdmin(req: Request): Promise<boolean> {
  const auth = req.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!token || !url || !anon) return false;
  const supabase = createClient(url, anon);
  const { data, error } = await supabase.auth.getUser(token);
  return Boolean(data?.user && !error);
}

// Admin uploads (images, policy PDFs) are proxied through the server rather
// than presigned browser PUTs: no bucket CORS config needed, and the file type
// is checked here. Returns the object's public URL.
const MAX_BYTES = 20 * 1024 * 1024;
const ALLOWED = /^(image\/(jpeg|png|webp|gif|svg\+xml|avif)|application\/pdf)$/;

export async function POST(req: Request) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No file received" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is larger than 20 MB" }, { status: 413 });
  }
  if (!ALLOWED.test(file.type)) {
    return NextResponse.json({ error: "Only images and PDFs can be uploaded" }, { status: 415 });
  }

  // Folder is the admin table name; never allow writing into the private area.
  const folder = String(form?.get("folder") ?? "").replace(/[^a-z0-9_-]/gi, "") || "uploads";
  if (`${folder}/`.startsWith(PRIVATE_PREFIX)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const key = `${folder}/${Date.now()}-${safe}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: new Uint8Array(await file.arrayBuffer()),
      ContentType: file.type,
    }),
  );

  return NextResponse.json({ publicUrl: publicUrlFor(key), key });
}
