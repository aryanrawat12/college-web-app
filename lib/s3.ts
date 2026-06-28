import { S3Client } from "@aws-sdk/client-s3";

// Server-only S3 client. Credentials come from env (never NEXT_PUBLIC_).
export const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const S3_BUCKET = process.env.AWS_S3_BUCKET!;
export const S3_PUBLIC_URL =
  process.env.AWS_S3_PUBLIC_URL ??
  `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`;

export function publicUrlFor(key: string) {
  return `${S3_PUBLIC_URL}/${key}`;
}
