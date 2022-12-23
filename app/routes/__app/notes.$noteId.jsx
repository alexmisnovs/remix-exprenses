import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";

import styles from "~/styles/note-details.css";

export default function NoteDetailsPage() {
  const selectedNote = useLoaderData();
  return (
    <main id="note-details">
      <header>
        <h1>{selectedNote.title}</h1>
      </header>
      <p id="note-details-content">{selectedNote.content}</p>
    </main>
  );
}

export async function loader({ params }) {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    // throw 'hello' // this will render errorBoundary component
    throw json({ message: "No notes yet" }, { status: 404, statusText: "Not Found" }); // this will render the CatchBounday component
  }
  // and what ever we return will render the actual component
  const noteId = params.noteId;
  const selectedNote = notes.find(note => note.id === noteId);

  if (!selectedNote) {
    throw json({ message: "Couldn't find note for id" }, { status: 404 }); // this will render the CatchBounday component
  }
  return selectedNote;
  // return json(notes); can use it like this
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function meta(data) {
  // console.log(data);
  const { data: selectedNote } = data;
  if (!selectedNote) {
    return {
      title: "Not found | " + data.params.noteId,
    };
  }
  return {
    title: selectedNote.title,
    description: selectedNote.content,
  };
}
