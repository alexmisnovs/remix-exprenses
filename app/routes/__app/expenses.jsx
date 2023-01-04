import { Link, Outlet, useLoaderData, useCatch } from "@remix-run/react";
import { json } from "@remix-run/node";

// import { getStoredExpenses } from "~/data/expenses";
import { getAllExpenses } from "~/data/expenses.server";
import ExpensesList from "~/components/expenses/ExpensesList";

import { FaPlane, FaDownload, FaExclamationCircle } from "react-icons/fa";

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
      <div className="error">
        <div className="icon">
          <FaExclamationCircle />
        </div>
        <h2>Something's off..</h2>
        <p>{error.message}</p>
      </div>
    </main>
  );
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
      </div>
    </main>
  );
}
