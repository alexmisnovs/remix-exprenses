import { Link } from "@remix-run/react";

import homeStyles from "~/styles/home.css";

export default function pricingPage() {
  return (
    <main id="content">
      <h1>A better way of keeping track</h1>
      <p>Try our early beta and never loose a note again</p>
      <p id="cta">
        <Link to="/notes">Try now</Link>
      </p>
    </main>
  );
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: homeStyles,
    },
  ];
}
