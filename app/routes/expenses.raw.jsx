import { json } from "@remix-run/node";
import { getAllExpenses } from "~/data/expenses.server";

// get request triggers loader

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
