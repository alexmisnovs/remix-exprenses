import {
  Link,
  Form,
  useActionData,
  useTransition as useNavigation,
  // useSubmit,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import Button from "../util/Button";

function ExpenseForm({ expense }) {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const validationErrors = useActionData();
  const defaultValues = expense
    ? {
        title: expense.title,
        amount: expense.amount,
        date: expense.date.slice(0, 10),
      }
    : {
        title: "",
        amount: "",
        date: "",
      };
  const [isUpdatingExpense, setIsUpdatingExpense] = useState(false);

  useEffect(() => {
    if (expense) {
      // means we are updating expense, so need to fill in the fields
      setIsUpdatingExpense(true);
    }
  }, [expense]);

  // in case I need to submit form programmatically
  // const submit = useSubmit();

  // const handleSubmmit = e => {
  //   e.preventDefault();
  //   console.log("submitted");
  //   submit(e.target, {
  //     //path:
  //     method: "post",
  //   });
  // };
  return (
    <Form
      method="post"
      className="form"
      id="expense-form"
      //  onSubmit={handleSubmmit}
    >
      {/* {data && data.map(error => <p key={error.message}>{error.message}</p>)} this version for arrays */}
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          defaultValue={defaultValues.title}
          id="title"
          name="title"
          required
          maxLength={30}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            defaultValue={defaultValues.amount}
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            defaultValue={defaultValues.date}
            id="date"
            name="date"
            max={today}
            required
          />
        </p>
      </div>
      <div className="form-actions">
        {isUpdatingExpense ? (
          <Button isSubmitting={isSubmitting} type="updating" />
        ) : (
          <Button isSubmitting={isSubmitting} />
        )}

        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
