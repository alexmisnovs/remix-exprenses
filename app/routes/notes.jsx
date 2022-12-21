import { redirect } from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "~/data/notes";

export default function Notes() {
  return (
    <main id="content">
      <h1>Notes will go here</h1>
      <NewNote />
    </main>
  );
}

export function links() {
  return [...newNoteLinks()];
}

// any non get request sent will trigger
export async function action({ request }) {
  const formData = await request.formData();
  // const noteData = Object.fromEntries(formData); can do it this way
  const noteData = {
    title: formData.get("title"),
    content: formData.get("content"),
  };
  // can add validation
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();

  const updatedNotes = existingNotes.concat(noteData);

  await storeNotes(updatedNotes);

  console.log(updatedNotes);
  return redirect("/notes");
}
