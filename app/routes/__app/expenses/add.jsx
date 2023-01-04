import { useNavigate } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function AddExpensePage() {
  const navigate = useNavigate();

  const closeHandler = () => {
    //navigate programmatically. I can't use the ".." for the case when there are no expenses.
    console.log("clinked outside the modal");
    navigate("..");
  };

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

// any non get request sent will trigger
export async function action({ request }) {
  if (request.method === "get") {
    console.log("I am firing now ADD.jsc");
  }

  const formData = await request.formData();

  // const expenseData = Object.fromEntries(formData); can do it this way
  const expenseData = {
    title: formData.get("title"),
    amount: formData.get("amount"),
    date: formData.get("date"),
  };

  //Validation, why would you even throw the error at the end? Pobably a copy paste from another project
  try {
    validateExpenseInput(expenseData);
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

  await addExpense(expenseData);

  // simple pause
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 3000));
  return redirect("/expenses");
}
