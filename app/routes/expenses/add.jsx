import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import homeStyles from "~/styles/home.css";

export default function AddExpensePage() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  );
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: homeStyles,
    },
  ];
}
