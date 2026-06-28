import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { S3_BUCKET, publicUrlFor, s3 } from "@/lib/s3";

// Verifies the caller is a logged-in admin (Supabase auth) before issuing a
// short-lived presigned PUT URL. The browser then uploads straight to S3.
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

export async function POST(req: Request) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { filename, contentType, folder } = await req.json();
  if (!filename || !contentType) {
    return NextResponse.json({ error: "Missing filename/contentType" }, { status: 400 });
  }

  const safe = String(filename).replace(/[^a-zA-Z0-9._-]/g, "-");
  const key = `${folder || "uploads"}/${Date.now()}-${safe}`;

  const uploadUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({ Bucket: S3_BUCKET, Key: key, ContentType: contentType }),
    { expiresIn: 60 },
  );

  return NextResponse.json({ uploadUrl, publicUrl: publicUrlFor(key), key });
}
