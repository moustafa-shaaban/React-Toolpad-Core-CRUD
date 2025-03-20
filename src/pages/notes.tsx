import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogsProvider, useDialogs } from '@toolpad/core/useDialogs';

import useNotesStore from "../stores/notes";
import NoteForm from "./noteForm";
import { nanoid } from "nanoid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NotesList = () => {

  const { notes, createNote, updateNote, deleteNote } = useNotesStore();

  const [open, setOpen] = React.useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const dialogs = useDialogs();


  const handleClickOpen = () => {
    setSelectedNote(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setOpen(true);
  };

  const handleSubmit = (note) => {
    if (note.id) {
      // Update existing note
      updateNote(note.id, { title: note.title, content: note.content });
    } else {
      // Add new note
      const newNote = { ...note, id: nanoid() };
      createNote(newNote);
    }
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Create Note</Button>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedNote ? "Update Note" : "Create Note"}
        </DialogTitle>
        <NoteForm
          note={selectedNote}
          handleSave={handleSubmit}
          closeDialog={handleClose}
        />
      </Dialog>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
          gap: 2,
        }}
      >
        {notes.map((note) => (
          <Card sx={{ maxWidth: 345 }} key={note.id}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {note.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {note.content}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={() => handleEdit(note)}>Update</Button>
              <Button
                onClick={async () => {
                  // preview-start
                  const confirmed = await dialogs.confirm(`Are you sure you want to delete ${note.title}? `, {
                    okText: 'Yes',
                    cancelText: 'No',
                  });
                  if (confirmed) {
                    await deleteNote(note.id);
                  } else {
                    await dialogs.close;
                  }
                  // preview-end
                }}
                >
                Delete
              </Button>
                {/* <Button onClick={() => deleteNote(note.id)}>Delete</Button> */}
            </CardActions>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default NotesList;
