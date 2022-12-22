import { Outlet } from "@remix-run/react";
import homeStyles from "~/styles/home.css";

export default function ExpensesLayout() {
  return (
    <main id="content">
      <p>Shared element</p>
      <h1>Expenses Layoyt</h1>
      <Outlet />
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
