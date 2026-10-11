// Client helper for /api/public-upload (resumes, ID photos, documents).
// Returns the private S3 key to store with the submission; throws a
// user-facing message.
export type UploadKind = "resume" | "id-photo" | "document";

export const uploadLimits: Record<UploadKind, { maxMb: number; accept: string; types: string[] }> = {
  resume: { maxMb: 5, accept: "application/pdf,.pdf", types: ["application/pdf"] },
  "id-photo": { maxMb: 2, accept: "image/jpeg,image/png,.jpg,.jpeg,.png", types: ["image/jpeg", "image/png"] },
  document: {
    maxMb: 5,
    accept: "application/pdf,image/jpeg,image/png,.pdf,.jpg,.jpeg,.png",
    types: ["application/pdf", "image/jpeg", "image/png"],
  },
};

/** Returns an error message if the file breaks the limits, else null. */
export function checkUpload(file: File, kind: UploadKind): string | null {
  const { maxMb, types } = uploadLimits[kind];
  if (!types.includes(file.type))
    return {
      resume: "Resume must be a PDF file.",
      "id-photo": "Photo must be a JPG or PNG image.",
      document: "Documents must be PDF, JPG or PNG files.",
    }[kind];
  if (file.size > maxMb * 1024 * 1024) return `File must be smaller than ${maxMb} MB.`;
  return null;
}

export async function uploadPrivateFile(
  file: File,
  kind: UploadKind,
  honeypot = "",
): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  if (honeypot) body.append("website", honeypot);
  const res = await fetch(`/api/public-upload?kind=${kind}`, { method: "POST", body });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.key) throw new Error(json.error ?? "Upload failed. Please try again.");
  return json.key as string;
}
