import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import mainStyles from "~/styles/main.css";
import sharedStyles from "~/styles/shared.css";

export const meta = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

function Document({ title, children }) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
// will catch all unhandled error responses
export function CatchBoundary() {
  // const { data, statusText } = useCatch();
  const catchResponse = useCatch();
  console.log(catchResponse);
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{catchResponse.statusText}</title>
      </head>
      <body>
        <main className="error">
          <h1>{catchResponse.statusText}</h1>
          <p>{catchResponse.data?.message || "Something went wrong"}</p>
          <p>
            Back to <Link to="/">safety</Link>
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// will catxh all unhandled errors
export function ErrorBoundary({ error }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>An Error occured</title>
      </head>
      <body>
        <main className="error">
          <h1>An error occured</h1>
          <p>{error.message}</p>
          <p>
            Back to <Link to="/">safety</Link>
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: sharedStyles,
    },
    {
      rel: "stylesheet",
      href: mainStyles,
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap",
    },
  ];
}
