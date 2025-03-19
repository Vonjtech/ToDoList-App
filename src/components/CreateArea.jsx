import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea({ onAdd, noteToEdit, onEdit }) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    priority: "Medium",
    dueDate: "",
  });

  // If there's a note to edit, load it into the form
  useEffect(() => {
    if (noteToEdit) {
      setNote({
        title: noteToEdit.title,
        content: noteToEdit.content,
        priority: noteToEdit.priority,
        dueDate: noteToEdit.dueDate,
      });
    }
  }, [noteToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const submitNote = (event) => {
    event.preventDefault();
    if (note.title.trim() || note.content.trim()) {
      if (noteToEdit) {
        onEdit(note); // Edit existing note
      } else {
        onAdd(note); // Add new note
      }
      setNote({ title: "", content: "", priority: "Medium", dueDate: "" });
    }
  };

  const expand = () => {
    setExpanded(true);
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <select
          name="priority"
          value={note.priority}
          onChange={handleChange}
          style={{
            backgroundColor: priorityColor(note.priority),
            color: "white",
          }}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={note.dueDate}
          onChange={handleChange}
        />

        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            {noteToEdit ? <EditIcon /> : <AddIcon />}
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

CreateArea.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  noteToEdit: PropTypes.object,
};

export default CreateArea;
