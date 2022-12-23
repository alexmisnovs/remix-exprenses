import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";

import { getStoredExpenses } from "~/data/expenses";

import expensesStyles from "~/styles/expenses.css";

export default function Analyses() {
  const expenses = useLoaderData();
  console.log(expenses);
  return (
    <main>
      <h1>Analyses</h1>
      <p>sasd</p>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader() {
  const expenses = await getStoredExpenses();
  if (!expenses || expenses.length === 0) {
    // throw 'hello' // this will render errorBoundary component
    throw json({ message: "No expenses yet" }, { status: 404, statusText: "Not Found" }); // this will render the CatchBounday component
  }
  // and what ever we return will render the actual component
  return expenses;
  // return json(notes); can use it like this
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: expensesStyles,
    },
  ];
}
