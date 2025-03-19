import { create } from "zustand";
import { persist } from 'zustand/middleware';

const useNotesStore = create(
  persist(
    (set) => ({
      notes: [], // Array to store CRUD notes
      createNote: (note) =>
        set((state) => ({ notes: [...state.notes, note] })),
      updateNote: (id, updatednote) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...updatednote } : note
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
    }),
    {
      name: 'notes-storage', // Local storage key
      getStorage: () => localStorage, // Use localStorage
    }
  )
);

export default useNotesStore;