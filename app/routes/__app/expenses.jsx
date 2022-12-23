import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { getStoredExpenses } from "~/data/expenses";
import ExpensesList from "~/components/expenses/ExpensesList";

import { FaPlane, FaDownload } from "react-icons/fa";

export default function ExpensesLayout() {
  const expenses = useLoaderData();

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlane />
            Add An Expense
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            Download Raw
          </a>
        </section>
        <ExpensesList expenses={expenses} />
      </main>
    </>
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
