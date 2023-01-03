import { prisma } from "./database.server";

export async function addExpense(expenseData) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount, // convert to a number. Form will always pass a string, so need to convert it
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// get all expenses
export async function getAllExpenses() {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { date: "desc" },
    });
    return expenses;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getExpenseById(passedId) {
  try {
    const expense = await prisma.expense.findFirstOrThrow({
      where: { id: passedId },
    });
    return expense;
  } catch (e) {
    console.log(e.message);
  }
}

export async function updateExpense(id, updatedExpenseData) {
  try {
    return await prisma.expense.update({
      where: { id },
      data: {
        title: updatedExpenseData.title,
        amount: +updatedExpenseData.amount, // convert to a number. Form will always pass a string, so need to convert it
        date: new Date(updatedExpenseData.date),
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
