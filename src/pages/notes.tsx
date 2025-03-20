import React, { useState } from "react";
import { nanoid } from "nanoid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useDialogs } from '@toolpad/core/useDialogs';
import { useNotifications } from '@toolpad/core/useNotifications';

import useNotesStore from "../stores/notes";
import NoteForm from "./noteForm";

const NotesList = () => {

  const { notes, createNote, updateNote, deleteNote } = useNotesStore();

  const [open, setOpen] = React.useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const dialogs = useDialogs();
  const notifications = useNotifications();


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
      notifications.show('Note Updated Successfully', {
        severity: "success",
        autoHideDuration: 3000,
      });
    } else {
      // Add new note
      const newNote = { ...note, id: nanoid() };
      createNote(newNote);
      notifications.show('Note Added Successfully', {
        severity: "success",
        autoHideDuration: 3000,
      });
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
                    okText: 'Delete',
                    cancelText: 'Cancel',
                  });
                  if (confirmed) {
                    deleteNote(note.id);
                    notifications.show('Note Deleted Successfully', {
                      severity: "success",
                      autoHideDuration: 3000,
                    });
                  } else {
                    dialogs.close;
                  }
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
