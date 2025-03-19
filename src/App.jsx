import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [noteToEdit, setNoteToEdit] = useState(null); // Track note being edited

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add new note
  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  // Delete note
  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((_, index) => index !== id));
  }

  // Edit note
  function editNote(updatedNote) {
    setNotes((prevNotes) =>
      prevNotes.map((note, index) =>
        index === updatedNote.id ? updatedNote : note
      )
    );
    setNoteToEdit(null); // Reset the edit state
  }

  // Start editing a note
  function startEditing(id) {
    const noteToEdit = notes[id];
    setNoteToEdit({ ...noteToEdit, id }); // Set the note data and its index
  }

  return (
    <div>
      <Header />
      <CreateArea
        onAdd={addNote}
        onEdit={editNote}
        noteToEdit={noteToEdit}
      />
      <div className="notes-container">
        {notes.map((noteItem, index) => (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            priority={noteItem.priority}
            dueDate={noteItem.dueDate}
            image={noteItem.image}
            onDelete={deleteNote}
            onEdit={startEditing} // Pass the startEditing function to Note
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
