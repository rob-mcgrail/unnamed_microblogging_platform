import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { v4 as uuidv4 } from "uuid";

import "./tailwind.css";

import { sessionCookie } from "~/cookies";
import { redis } from "~/redis.server";

import { RichTextProvider } from '~/contexts/rich-text-context';
import StatsPanel from '~/components/stats-panel';

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
  const sessionId = await sessionCookie.parse(cookieHeader);
  let userKey: string | null;
  let user: any | null;

  if (sessionId) {
    // Has a session already, let's load it
    userKey = await redis.get(`session:${sessionId}`);
    user = await redis.hgetall(`user:${userKey}`);

    return json({ found: true, user });
  }
  else {
    // Create a new user
    const newSessionId = uuidv4();
    userKey = uuidv4();
    await redis.set(`session:${newSessionId}`, userKey);

    await redis.hset(`user:${userKey}`, {
      created: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
      name: "noob",
      bio: "I'm new here!"
    });
    user = await redis.hgetall(`user:${userKey}`);

    // probably set their first stuff here too.

    const headers = new Headers();
    headers.append("Set-Cookie", await sessionCookie.serialize(newSessionId));
    return json({ found: false, created: true, user }, { headers });
  }
}

export function Layout() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <RichTextProvider>
          <div className="flex h-screen">
            <StatsPanel user={user} />
            <Outlet />
          </div>
          <ScrollRestoration />
          <Scripts />
        </RichTextProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}