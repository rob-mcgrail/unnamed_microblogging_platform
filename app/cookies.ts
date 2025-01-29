import { createCookie } from "@remix-run/node";

export const sessionCookie = createCookie("you.v0.3", {
  maxAge: 60 * 60 * 24 * 365,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
});