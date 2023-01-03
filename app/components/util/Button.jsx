function Button({ isSubmitting, type }) {
  let content;
  if (type === "updating") {
    content = isSubmitting ? "Udping..." : "Update Expense";
  } else {
    content = isSubmitting ? "Saving..." : "Save Expense";
  }

  return (
    <button disabled={isSubmitting} type="submit">
      {content}
    </button>
  );
}

export default Button;
