import React, { useState } from "react";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
 

  const [editedNote, setEditedNote] = useState({
    title: "",
    content: "",
  });

  function handleDelete() {
    // props.onDelete(props.id);
    const confirmDelete = window.confirm( 
      "Are you sure you want to  delete this note?");
      if (confirmDelete){
        props.onDelete(props.id);
      }
  }

  function handleEditToggle() {
    setEditedNote({
      title: props.title,
      content: props.content,
    });
    setIsEditing(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setEditedNote((prev) => ({
      ...prev, 
      [name]: value,
    }));
  }

  function handleSave() {
    props.onUpdate(props.id, editedNote);
    setIsEditing(false);
  }

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            name="title"
            value={editedNote.title}
            onChange={handleChange}
          />
          
          <textarea
            
            className="edit-content"
            name="content"
            value={editedNote.content}
            onChange={(e) => {
              handleChange(e);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h3>{props.title}</h3>
          <p>{props.content}</p>
         <small>
            Last updated: {new Date(props.updatedAt).toLocaleString()}
         </small>

          <button onClick={handleEditToggle}>Edit</button>
          <button onClick={handleDelete}> Delete </button>
        </>
      )}
    </div>
  );


}
export default Note;
