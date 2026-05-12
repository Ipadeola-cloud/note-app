import React, {useEffect, useState } from "react";
import {getNotes, createNote, deleteNote, updateNote} from "../api/notesApi";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  // Load Notes when React Start
  useEffect(() => {
  fetchNotes();
}, []);

const fetchNotes = async () => {
  try {
    const res = await getNotes();
    setNotes(res.data);
  } catch (error) {
    console.error(error);
    alert("Failed to load notes.")
  }
};

const addNote = async (newNote) => {
  try {
    await createNote(newNote);
    fetchNotes(); // reload from database
  } catch (error) {
    console.error(error);
    alert("Failed to add note.");
  }
};

  const deleteNoteHandler = async (id) => {
  try {
    await deleteNote(id);
    fetchNotes();
  } catch (error) {
    console.error(error);
    alert("Failed to delete note.");
  }
};
  
  const updateNoteHandler = async (id, updatedNote) => {
  try {
    await updateNote(id, updatedNote); // 🔥 send to backend
    fetchNotes(); // 🔄 refresh UI
  } catch (error) {
    console.error(error);
    alert("Failed to update note.")
  }
};

    return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />

      {notes.map((note) => (
  <Note
    key={note.id}
    id={note.id}
    title={note.title}
    content={note.content}
    createdAt={note.created_at}
    updatedAt={note.updated_at}
    onDelete={deleteNoteHandler}
    onUpdate={updateNoteHandler}
  />
))}

        <Footer />
    </div>
  );
}
export default App;
