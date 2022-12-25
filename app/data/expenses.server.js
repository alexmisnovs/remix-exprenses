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
