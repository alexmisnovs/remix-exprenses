import { Form, useActionData, useTransition as useNavigation } from "@remix-run/react";
import styles from "./NewNote.css";

function NewNote() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();

  return (
    <Form method="post" id="note-form">
      {data && data.map(error => <p key={error.message}>{error.message}</p>)}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? "Adding.." : "Add Note"}</button>
      </div>
    </Form>
  );
}

export default NewNote;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
