import homeStyles from "~/styles/home.css";

export default function addPage() {
  return (
    <main id="content">
      <h1>Expenses Add</h1>
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
