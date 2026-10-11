import nodemailer from "nodemailer";
import type { NewsArticle } from "@/lib/news-tracker/types";

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM,
  );
}

function buildEmailHtml(article: NewsArticle, topic: string): string {
  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #0b1f4a; line-height: 1.5;">
      <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #667085;">
        News update · ${escapeHtml(topic)}
      </p>
      <h1 style="margin: 0 0 12px; font-size: 22px;">${escapeHtml(article.title)}</h1>
      <p style="margin: 0 0 8px; font-size: 14px; color: #344054;">
        Source: ${escapeHtml(article.sourceLabel)}
        ${article.publishedAt ? ` · ${escapeHtml(article.publishedAt)}` : ""}
      </p>
      ${
        article.summary
          ? `<p style="margin: 0 0 16px; font-size: 15px;">${escapeHtml(article.summary)}</p>`
          : ""
      }
      <p style="margin: 0;">
        <a href="${escapeAttr(article.link)}" style="color: #0b1f4a; font-weight: 700;">
          Open update
        </a>
      </p>
    </div>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

export async function sendNewsUpdateEmail(params: {
  to: string;
  topic: string;
  article: NewsArticle;
}): Promise<{ sent: boolean; preview?: string }> {
  const subject = `[News update] ${params.article.title}`.slice(0, 180);
  const html = buildEmailHtml(params.article, params.topic);
  const text = [
    `News update for: ${params.topic}`,
    params.article.title,
    params.article.summary ?? "",
    params.article.link,
    `Source: ${params.article.sourceLabel}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  if (!isEmailConfigured()) {
    console.info("[news-tracker] SMTP not configured. Email preview:\n", text);
    return { sent: false, preview: text };
  }

  const port = Number(process.env.SMTP_PORT || "587");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: params.to,
    subject,
    text,
    html,
  });

  return { sent: true };
}
