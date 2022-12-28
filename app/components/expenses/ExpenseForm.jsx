import {
  Link,
  Form,
  useActionData,
  useTransition as useNavigation,
  // useSubmit,
} from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const validationErrors = useActionData();

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
        <input type="text" id="title" name="title" required maxLength={30} />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" name="amount" min="0" step="0.01" required />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} required />
        </p>
      </div>
      <div className="form-actions">
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
