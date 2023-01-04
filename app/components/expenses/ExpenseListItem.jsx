import { Form, Link, useFetcher } from "@remix-run/react";

function ExpenseListItem({ title, amount, id }) {
  // or I could use Fetcher here to submit this form.
  // useFetcher will send the request without form submit, it also has access to state.
  const fetcher = useFetcher();

  function deleteExpenseItemHandler(event) {
    // tbd

    const confirm = window.confirm("Delete the item?");

    // using the submit hook to
    if (confirm) {
      fetcher.submit(null, { method: "DELETE", action: `/expenses/${id}` });
    } else {
      event.preventDefault();
    }
  }

  if (fetcher.state !== "idle") {
    return (
      <article className="expense-item locked">
        <p>Deleting..</p>
      </article>
    );
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        {/* <button onClick={deleteExpenseItemHandler}>Delete</button> */}
        <Form method="delete" action={`/expenses/${id}`}>
          <button onClick={deleteExpenseItemHandler}>Delete</button>
        </Form>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
