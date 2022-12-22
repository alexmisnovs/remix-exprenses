import homeStyles from "~/styles/home.css";

export default function raw() {
  return (
    <main id="content">
      <h1>Expenses Raw</h1>
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
