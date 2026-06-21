import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "portfolio_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8;

type AdminJwtPayload = {
  sub: "portfolio-admin";
  username: string;
  iat: number;
  exp: number;
};

function base64Url(value: string | Buffer) {
  return Buffer.from(value).toString("base64url");
}

function getJwtSecret() {
  const secret =
    process.env.JWT_SECRET ||
    process.env.ADMIN_JWT_SECRET ||
    process.env.ADMIN_API_TOKEN;

  if (!secret) {
    throw new Error(
      "JWT_SECRET or ADMIN_JWT_SECRET is required for admin sessions.",
    );
  }

  return secret;
}

function sign(input: string) {
  return createHmac("sha256", getJwtSecret()).update(input).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export function createAdminJwt(username: string) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64Url(
    JSON.stringify({
      sub: "portfolio-admin",
      username,
      iat: now,
      exp: now + ADMIN_SESSION_TTL_SECONDS,
    } satisfies AdminJwtPayload),
  );
  const unsignedToken = `${header}.${payload}`;

  return `${unsignedToken}.${sign(unsignedToken)}`;
}

export function verifyAdminJwt(token: string | undefined) {
  if (!token) {
    return null;
  }

  try {
    const [header, payload, signature] = token.split(".");

    if (!header || !payload || !signature) {
      return null;
    }

    const unsignedToken = `${header}.${payload}`;
    const expectedSignature = sign(unsignedToken);

    if (!safeEqual(signature, expectedSignature)) {
      return null;
    }

    const parsedHeader = JSON.parse(
      Buffer.from(header, "base64url").toString("utf8"),
    ) as { alg?: string; typ?: string };

    if (parsedHeader.alg !== "HS256" || parsedHeader.typ !== "JWT") {
      return null;
    }

    const parsedPayload = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as Partial<AdminJwtPayload>;

    if (
      parsedPayload.sub !== "portfolio-admin" ||
      typeof parsedPayload.username !== "string" ||
      typeof parsedPayload.exp !== "number"
    ) {
      return null;
    }

    if (parsedPayload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return {
      username: parsedPayload.username,
      expiresAt: new Date(parsedPayload.exp * 1000),
    };
  } catch {
    return null;
  }
}

export function getAdminAuthSetupIssues() {
  const issues: string[] = [];

  if (!process.env.ADMIN_PASSWORD) {
    issues.push("ADMIN_PASSWORD is missing.");
  }

  if (
    !process.env.JWT_SECRET &&
    !process.env.ADMIN_JWT_SECRET &&
    !process.env.ADMIN_API_TOKEN
  ) {
    issues.push("JWT_SECRET or ADMIN_JWT_SECRET is missing.");
  }

  return issues;
}
