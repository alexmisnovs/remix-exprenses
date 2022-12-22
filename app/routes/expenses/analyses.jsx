import homeStyles from "~/styles/home.css";

export default function analyses() {
  return (
    <main id="content">
      <h1>Analyses</h1>
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
