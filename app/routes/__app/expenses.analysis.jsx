import { useLoaderData, useCatch, Link } from "@remix-run/react";
import { json } from "@remix-run/node";

import { FaExclamationCircle } from "react-icons/fa";

import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";

import { getAllExpenses } from "~/data/expenses.server";

import expensesStyles from "~/styles/expenses.css";

export default function Analyses() {
  const expenses = useLoaderData();
  console.log(expenses);
  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader() {
  const expenses = await getAllExpenses();
  if (!expenses || expenses.length === 0) {
    // throw 'hello' // this will render errorBoundary component
    throw json(
      { message: "System has nothing to display." },
      { status: 404, statusText: "No expenses yet" }
    ); // this will render the CatchBoundary component
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

export function CatchBoundary() {
  const catchResponse = useCatch();
  const message = catchResponse.data?.message || "Data not found";
  return (
    <main>
      <div className="error">
        <div className="icon">
          <FaExclamationCircle />
        </div>
        <h2>{catchResponse.statusText}</h2>
        <p>{message}</p>
        <p>
          Add some <Link to="../expenses">here</Link>
        </p>
      </div>
    </main>
  );
}
