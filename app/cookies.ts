import { createCookie } from "@vercel/remix";

export const sessionCookie = createCookie("you", {
  maxAge: 60 * 60 * 24 * 365,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
});