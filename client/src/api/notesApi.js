import axios from "axios";

const API_URL = "https://note-app-api-j6m9.onrender.com";

// Get all notes
export const getNotes = () => axios.get(`${API_URL}/notes`);

// Create note
export const createNote = (note) =>
  axios.post(`${API_URL}/notes`, note);

// Update note
export const updateNote = (id, note) =>
  axios.put(`${API_URL}/notes/${id}`, note);

// Delete note
export const deleteNote = (id) =>
  axios.delete(`${API_URL}/notes/${id}`);