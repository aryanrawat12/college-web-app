import { runLegalResearch } from "@/lib/legal/engine";
import type { ResearchRequestBody } from "@/lib/legal/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ResearchRequestBody;
    const brief = await runLegalResearch(body);
    return Response.json(brief);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unable to complete legal research.";
    return Response.json({ error: message }, { status: 400 });
  }
}

export async function GET() {
  return Response.json({
    name: "Apex Counsel",
    description:
      "Multi-source Indian legal research bot — Supreme Court, High Courts, Indian Kanoon, SCC, LiveLaw, iPleaders, CAM and peer firms.",
    usage: {
      method: "POST",
      body: {
        query: "string — legal question / facts",
        preferLive: "boolean — default true",
        maxAuthorities: "number — default 10, max 20",
      },
    },
  });
}
