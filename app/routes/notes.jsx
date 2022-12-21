import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
  // can add validation
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();

  const updatedNotes = existingNotes.concat(noteData);

  await storeNotes(updatedNotes);

  console.log(updatedNotes);
  return redirect("/notes");
}
