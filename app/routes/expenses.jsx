import { Outlet } from "@remix-run/react";
import expensesStyles from "~/styles/expenses.css";

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
      href: expensesStyles,
    },
  ];
}
