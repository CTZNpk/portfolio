import "server-only";
import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
  createAdminJwt,
  verifyAdminJwt,
} from "@/lib/auth/jwt";

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export async function verifyAdminCredentials(
  username: string,
  password: string,
) {
  const expectedUsername = process.env.ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    return false;
  }

  return (
    safeEqual(username, expectedUsername) &&
    safeEqual(password, expectedPassword)
  );
}

export async function getAdminSession() {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminJwt(token);
}

export async function setAdminSession(username: string) {
  const token = createAdminJwt(username);

  (await cookies()).set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });
}

export async function clearAdminSession() {
  (await cookies()).delete(ADMIN_SESSION_COOKIE);
}

export function getAdminSessionFromCookieHeader(cookieHeader: string | null) {
  if (!cookieHeader) {
    return null;
  }

  const token = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${ADMIN_SESSION_COOKIE}=`))
    ?.slice(ADMIN_SESSION_COOKIE.length + 1);

  return verifyAdminJwt(token);
}
