import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function NoteForm({ note, handleSave, closeDialog }) {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave({ id: note ? note.id : null, title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          label="Note Title"
          placeholder="Note Title"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="content"
          label="Note Content"
          placeholder="Note Content"
          fullWidth
          variant="standard"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </form>
  );
}
