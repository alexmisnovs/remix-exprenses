import homeStyles from "~/styles/home.css";

export default function expenseId() {
  return (
    <main id="content">
      <h1>ID</h1>
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
