import { NextResponse } from "next/server";
import { PRIVATE_PREFIX, signedGetUrl } from "@/lib/s3";
import { getAdminClient } from "@/lib/supabase-auth";

// Opens a private upload (resume / ID photo) for a logged-in admin by
// redirecting to a short-lived presigned S3 URL.
export async function GET(req: Request) {
  if (!(await getAdminClient())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const key = new URL(req.url).searchParams.get("key") ?? "";
  if (!key.startsWith(PRIVATE_PREFIX) || key.includes("..")) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }
  return NextResponse.redirect(await signedGetUrl(key, 300));
}
