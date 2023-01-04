import { useNavigate, useMatches, useParams, useCatch } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { updateExpense, deleteExpenseById } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function UpdateExpensesPage() {
  const navigate = useNavigate();

  const closeHandler = () => {
    //navigate programmatically
    navigate("..");
  };

  const matches = useMatches();
  const params = useParams();
  let expense;

  const expenses = matches.find(match => match.id === "routes/__app/expenses").data;
  expense = expenses.find(expense => expense.id === params.id);

  if (!expense) {
    throw new Error(`Couldn't find the expnse with id : ${params.id}`);
    // throw json({ message: "Can't find " }, { status: 404, statusText: "Expense Not Found" }); // this will render the CatchBounday component
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm expense={expense} />
    </Modal>
  );
}

// I can use parent loaders details to minimise the amount of request
// export async function loader({ params }) {
//   const { id } = params;
//   // console.log(id);
//   // get data from database

//   const expense = await getExpenseById(id);
//   // console.log(expense);
//   return expense;
// }

// any non get request sent will trigger
export async function action({ request, params }) {
  const { id } = params;
  // maybe add a check for a GET method here
  if (request.method === "GET") {
    console.log("Method GET");
    // check if we can find the actual expense to update
  }

  //if we get a delete request
  if (request.method === "DELETE") {
    const deletedExpenseId = await deleteExpenseById(id);
    // console.log(deletedExpenseId);
    return redirect("/expenses");
  }

  // if not delete we do the update
  const updatedFormData = await request.formData();

  // const expenseData = Object.fromEntries(formData); can do it this way
  const updatedExpenseData = {
    title: updatedFormData.get("title"),
    amount: updatedFormData.get("amount"),
    date: updatedFormData.get("date"),
  };

  // return null;
  //Validation, why would you even throw the error at the end? Pobably a copy paste from another project
  try {
    validateExpenseInput(updatedExpenseData);
  } catch (error) {
    return error;
  }

  // //validation old way using an array
  // let errors = [];
  // if (expenseData.title.trim().length < 3) {
  //   errors.push({ message: "Invalid title or missing title" });
  // }

  // if (expenseData.amount.trim().length < 1) {
  //   errors.push({ message: "Invalid amount or missing amount" });
  // }

  // if (errors.length > 0) {
  //   return errors;
  // }

  await updateExpense(id, updatedExpenseData);
  // simple pause
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 3000));
  return redirect("/expenses");
}

export function CatchBoundary() {
  const { data } = useCatch();
  const message = data?.message || "Data not found";
  return (
    <main>
      <p>Cant find </p>
      <p className="info-message">{message}</p>
      {/* <p className="info-message">
        Back to <Link to="/expenses">Expenses</Link>
      </p> */}
    </main>
  );
}

// will catxh all unhandled errors
export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <main>
      <p className="info-message">{error.message}</p>
      {/* <p className="info-message">
        Back to <Link to="/expenses">Expenses</Link>
      </p> */}
    </main>
  );
}
