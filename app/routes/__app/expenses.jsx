import { Link, Outlet, useLoaderData, useCatch } from "@remix-run/react";
import { json } from "@remix-run/node";

// import { getStoredExpenses } from "~/data/expenses";
import { getAllExpenses } from "~/data/expenses.server";
import ExpensesList from "~/components/expenses/ExpensesList";

import { FaPlane, FaDownload } from "react-icons/fa";

export default function ExpensesLayout() {
  const expenses = useLoaderData();
  if (!expenses) {
    throw json({ message: "No expenses yet" }, { status: 404, statusText: "Not Found" }); // this will render the CatchBounday component
  }
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
        {expenses ? <ExpensesList expenses={expenses} /> : <p>No expenses yet</p>}
      </main>
    </>
  );
}

// Loader for the expenses stored in the json file
// export async function loader() {
//   const expenses = await getStoredExpenses();
//   if (!expenses || expenses.length === 0) {
//     // throw 'hello' // this will render errorBoundary component
//     throw json({ message: "No expenses yet" }, { status: 404, statusText: "Not Found" }); // this will render the CatchBounday component
//   }
//   // and what ever we return will render the actual component
//   return expenses;
//   // return json(notes); can use it like this
// }

export async function loader() {
  const expenses = await getAllExpenses();
  if (!expenses || expenses.length === 0) {
    // throw 'hello' // this will render errorBoundary component
    throw json({ message: "No expenses yet" }, { status: 404, statusText: "Not Found" }); // this will render the CatchBounday component
  }
  // and what ever we return will render the actual component
  return expenses;
  // return json(notes); can use it like this
}

// will catxh all unhandled errors
export function ErrorBoundary({ error }) {
  return (
    <main>
      <p className="info-message">{error.message}</p>
      {/* <p className="info-message">
        Back to <Link to="/expenses">Expenses</Link>
      </p> */}
    </main>
  );
}

export function CatchBoundary() {
  const { data } = useCatch();
  const message = data?.message || "Data not found";
  return (
    <main>
      <p className="info-message">{message}</p>
      {/* <p className="info-message">
        Back to <Link to="/expenses">Expenses</Link>
      </p> */}
      <section id="expenses-actions">
        <a href="expenses/add">
          <FaPlane />
          Add An Expense
        </a>
      </section>
      <Outlet />
    </main>
  );
}
