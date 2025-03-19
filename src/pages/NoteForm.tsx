import React, { useState } from 'react';
import { Field } from '@base-ui-components/react/field';
import { Form } from '@base-ui-components/react/form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useNotesStore from '../stores/notes';
import { Button } from '@mui/material';

export default function NoteForm({ note, handleSave }) {
    const [title, setTitle] = useState(note ? note.title : '');
    const [content, setContent] = useState(note ? note.content : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave({ id: note ? note.id : null, title, content })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                    required
                    id="title"
                    label="Note Title"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    required
                    id="content"
                    label="Note Content"
                    placeholder="Note Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <Button type='submit'>Submit</Button>
        </form>
    )
}