import { useNavigate, useMatches, useParams, useCatch } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

import { FaExclamationCircle } from "react-icons/fa";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

import { updateExpense, deleteExpenseById, getExpenseById } from "~/data/expenses.server";
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
  // what if we don't have any expenses?

  const expenses = matches.find(match => match.id === "routes/__app/expenses").data;
  if (expenses) {
    expense = expenses.find(expense => expense.id === params.id);
  }

  if (!expense) {
    // Catch boundary will only work if we throw it in the loader or action
    throw new Error(`Couldn't find the expense with id : ${params.id}`);
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm expense={expense} />
    </Modal>
  );
}

// I can use parent loaders details to minimise the amount of requests
// However, I wont be able to throw json from the comoponents, only new Error..
// export async function loader({ params }) {
//   const { id } = params;
//   // console.log(id);
//   // get data from database

//   const expense = await getExpenseById(id);
//   if (!expense) {
//     throw json(
//       { message: "Can't find the expense" },
//       { status: 404, statusText: "Expense Not Found" }
//     ); // this will render the CatchBounday component
//   }
//   // console.log(expense);
//   return expense;
// }

// any non get request sent will trigger
export async function action({ request, params }) {
  const { id } = params;

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
