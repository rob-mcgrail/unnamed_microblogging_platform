import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

import Timeline from "~/components/timeline";
import BlurtForm from "~/components/blurt-form";

import { exampleBlurts } from "~/data/test-data";

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

export function Layout() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-screen">
          {/* Left Panel */}
          <div className="w-1/2 bg-gray-800 text-white p-4">
            <h1 className="text-xl font-bold">Left Panel</h1>
            <p>This is the left panel content.</p>
          </div>

          {/* Right Panel */}
          <div className="flex-1 bg-gray-900 p-4 flex flex-col">
            <h1 className="text-xl font-bold mb-4">Right Panel</h1>

            <BlurtForm />
            <Timeline blurts={exampleBlurts} />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
