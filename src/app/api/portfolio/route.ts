import { NextResponse } from "next/server";
import { getAdminSessionFromCookieHeader } from "@/lib/auth/session";
import {
  mergePortfolioContent,
  normalizePortfolioContent,
  readPortfolioContent,
  savePortfolioContent,
  seedPortfolioContent,
} from "@/lib/portfolio/content";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}

function requireAdmin(
  request: Request,
): { ok: true } | { ok: false; response: NextResponse } {
  const token = process.env.ADMIN_API_TOKEN;
  const session = getAdminSessionFromCookieHeader(request.headers.get("cookie"));

  if (session) {
    return { ok: true };
  }

  if (!token) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "ADMIN_API_TOKEN is required for write requests." },
        { status: 500 },
      ),
    };
  }

  const authorization = request.headers.get("authorization");

  if (authorization !== `Bearer ${token}`) {
    return {
      ok: false,
      response: unauthorized(),
    };
  }

  return { ok: true };
}

function handleError(error: unknown) {
  const message =
    error instanceof Error ? error.message : "Unexpected portfolio API error.";

  return NextResponse.json({ error: message }, { status: 500 });
}

export async function GET() {
  try {
    const content = await readPortfolioContent();
    return NextResponse.json({ content });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  const admin = requireAdmin(request);

  if (!admin.ok) {
    return admin.response;
  }

  try {
    const content = await seedPortfolioContent();
    return NextResponse.json({ content });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request) {
  const admin = requireAdmin(request);

  if (!admin.ok) {
    return admin.response;
  }

  try {
    const body = await request.json();
    const content = normalizePortfolioContent(
      body && typeof body === "object" && "content" in body
        ? body.content
        : body,
    );
    const saved = await savePortfolioContent(content);

    return NextResponse.json({ content: saved });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: Request) {
  const admin = requireAdmin(request);

  if (!admin.ok) {
    return admin.response;
  }

  try {
    const body = await request.json();
    const updates =
      body && typeof body === "object" && "content" in body
        ? body.content
        : body;
    const current = await readPortfolioContent();
    const content = mergePortfolioContent(current, updates);
    const saved = await savePortfolioContent(content);

    return NextResponse.json({ content: saved });
  } catch (error) {
    return handleError(error);
  }
}
