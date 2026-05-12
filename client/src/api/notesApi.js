import axios from "axios";

const API_URL = "http://localhost:5000";

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