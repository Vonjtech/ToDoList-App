import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

function Note({
  id,
  title,
  content,
  onDelete,
  onSave, // Assume this function is passed to save the edited note
  priority,
  dueDate,
}) {
  // State for editable note (title, content, priority)
  const [editableNote, setEditableNote] = useState({
    title,
    content,
    priority,
    dueDate,
  });

  // Flag to track whether the note is in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Using a priority-to-color mapping for better maintainability
  const priorityColors = {
    High: "#FF0000", // Red for High priority
    Medium: "#FFA500", // Orange for Medium priority
    Low: "#008000", // Green for Low priority
  };

  // Function to get the color based on priority
  const getPriorityColor = (priority) => priorityColors[priority] || "#000000";

  // Handle input change (for title, content, priority, or due date)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  // Save the edited note and exit edit mode
  const handleSave = () => {
    onSave(id, editableNote); // Pass the updated note to the onSave function
    setIsEditing(false); // Exit edit mode
  };

  // Format the due date if available
  const formattedDate = editableNote.dueDate
    ? new Date(editableNote.dueDate).toLocaleDateString()
    : null;

  return (
    <div
      className="note-box"
      style={{
        borderLeft: `5px solid ${getPriorityColor(editableNote.priority)}`,
      }}
    >
      <div className="note-header">
        {/* Editable title field when in edit mode */}
        <input
          type="text"
          value={editableNote.title}
          onChange={handleChange}
          name="title"
          className="note-title"
          readOnly={!isEditing} // Make it readonly unless in edit mode
        />
      </div>
      <textarea
        value={editableNote.content}
        onChange={handleChange}
        name="content"
        className="note-content"
        readOnly={!isEditing} // Make it readonly unless in edit mode
      />
      <div className="note-details">
        {/* Editable priority select dropdown when in edit mode */}
        {isEditing ? (
          <select
            name="priority"
            value={editableNote.priority}
            onChange={handleChange}
            className="note-priority"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        ) : (
          <span className="note-priority">Priority: {editableNote.priority}</span>
        )}

        {/* Editable due date field when in edit mode */}
        {isEditing ? (
          <input
            type="date"
            name="dueDate"
            value={editableNote.dueDate || ""}
            onChange={handleChange}
            className="note-dueDate"
          />
        ) : (
          formattedDate && <span className="note-dueDate">Due: {formattedDate}</span>
        )}
      </div>
      <div className="note-actions">
        {/* Edit button */}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)} // Enter edit mode
            aria-label={`Edit note titled "${editableNote.title}"`}
          >
            <EditIcon />
          </button>
        )}

        {/* Save button appears only in edit mode */}
        {isEditing && (
          <button
            onClick={handleSave}
            aria-label={`Save edited note titled "${editableNote.title}"`}
          >
            Save
          </button>
        )}

        {/* Delete button */}
        <button
          onClick={() => onDelete(id)}
          aria-label={`Delete note titled "${editableNote.title}"`}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

Note.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired, // Save edited note
  priority: PropTypes.string.isRequired,
  dueDate: PropTypes.string, // Optional due date
};

export default Note;
