import NewNote, { links as newNoteLinks } from "~/components/NewNote";

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
