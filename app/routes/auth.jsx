import homeStyles from "~/styles/home.css";

export default function authPage() {
  return (
    <main id="content">
      <h1>Auth</h1>
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
