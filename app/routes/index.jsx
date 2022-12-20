import { Link } from "@remix-run/react";

export default function Index() {
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
