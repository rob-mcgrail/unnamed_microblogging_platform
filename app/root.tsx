import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  ShouldRevalidateFunction
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { v4 as uuidv4 } from "uuid";

import "./tailwind.css";

import { TextHandler, User } from "~/types";

import { sessionCookie } from "~/cookies";
import { redis } from "~/redis.server";

import { RichTextProvider } from '~/contexts/rich-text-context';
import StatsPanel from '~/components/stats-panel';
import setupNewUser from "./data/setup-new-user.server";
import fetchExistingUser from "./data/fetch-existing-user.server";
import fetchUserKeyFromSession from "./data/fetch-user-key-from-session.server";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap",
  }
];

export async function loader({ request }: { request: Request }) {
  const cookieHeader = request.headers.get("Cookie");
  const country = request.headers.get("X-Vercel-IP-Country");
  const sessionId = await sessionCookie.parse(cookieHeader);

  if (sessionId) {
    // Has a session already, let's load it
    const userKey = await fetchUserKeyFromSession(sessionId);
    const data = await fetchExistingUser(userKey, country);

    return json({ found: true, created: false, data });
  }
  else {
    // Create a new user
    const newSessionId = uuidv4();
    const userKey = uuidv4();
    await redis.set(`session:${newSessionId}`, userKey);

    const data = await setupNewUser(userKey, country);

    const headers = new Headers();
    headers.append("Set-Cookie", await sessionCookie.serialize(newSessionId));
    return json({ found: false, created: true, data }, { headers });
  }
}

export function Layout() {
  const { data: { user, textHandlers, events } } = useLoaderData<typeof loader>() as { 
    data: { user: User | null, textHandlers: TextHandler[], events: string[] } 
  };

  if (!user) {
    return <h1>USER ISSUE</h1>;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <RichTextProvider storedTextHandlers={textHandlers}>
          <div className="flex h-screen">
            <StatsPanel user={user} events={events} />
            <Outlet />
          </div>
          <ScrollRestoration />
          <Scripts />
        </RichTextProvider>
      </body>
    </html>
  );
}

export const shouldRevalidate: ShouldRevalidateFunction = ({
  defaultShouldRevalidate,
  formMethod,
}) => {
  if (formMethod == 'POST') {
    return defaultShouldRevalidate;
  }
  else {
    return false;
  }
};

export default function App() {
  return <Outlet />;
}