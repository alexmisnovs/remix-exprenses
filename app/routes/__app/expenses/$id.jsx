import { useNavigate, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { getExpenseById, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function UpdateExpensesPage() {
  const navigate = useNavigate();

  const closeHandler = () => {
    //navigate programmatically
    navigate("..");
  };

  const expenseData = useLoaderData();

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm expense={expenseData} />
    </Modal>
  );
}

export async function loader({ params }) {
  const { id } = params;
  // console.log(id);
  // get data from database

  const expense = await getExpenseById(id);
  // console.log(expense);
  return expense;
}

// any non get request sent will trigger
export async function action({ request }) {
  const updatedFormData = await request.formData();

  // const expenseData = Object.fromEntries(formData); can do it this way
  const updatedExpenseData = {
    title: updatedFormData.get("title"),
    amount: updatedFormData.get("amount"),
    date: updatedFormData.get("date"),
  };

  console.log(updatedExpenseData);
  return null;
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

  await updateExpense(updatedExpenseData);

  // simple pause
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 3000));
  return redirect("/expenses");
}
