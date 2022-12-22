import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link, useCatch } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

export default function Notes() {
  // get data from the loader..
  const notes = useLoaderData();

  return (
    <main id="content">
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

// ger requests
export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    // throw 'hello' // this will render errorBoundary component
    throw json({ message: "No notes yet" }, { status: 404, statusText: "Not Found" }); // this will render the CatchBounday component
  }
  // and what ever we return will render the actual component
  return notes;
  // return json(notes); can use it like this
}

// any non get request sent will trigger
export async function action({ request }) {
  const formData = await request.formData();
  // const noteData = Object.fromEntries(formData); can do it this way
  const noteData = {
    title: formData.get("title"),
    content: formData.get("content"),
  };
  //validation
  let errors = [];
  if (noteData.title.trim().length < 3) {
    errors.push({ message: "Invalid title or missing title" });
  }

  if (noteData.content.trim().length < 3) {
    errors.push({ message: "Invalid content or missing content" });
  }

  if (errors.length > 0) {
    return errors;
  }
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();

  const updatedNotes = existingNotes.concat(noteData);

  await storeNotes(updatedNotes);

  // simple pause
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
  return redirect("/notes");
}
export function CatchBoundary() {
  // const caughtResponse = useCatch();
  const { data } = useCatch();
  const message = data?.message || "Data not found";
  return (
    <main>
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <main className="error">
      <h1>An error in notes occured</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">safety</Link>
      </p>
    </main>
  );
}

export function meta() {
  return {
    title: "All Notes",
    description: "Manage notes",
  };
}
