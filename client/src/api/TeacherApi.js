import axios from 'axios';

// const Api = axios.create({ baseURL: 'http://localhost:5000' });
const Api = axios.create({ baseURL: 'https://globaloneness-server.onrender.com' });


export const addNotesAndPYQ = (formData) => Api.post('/teacher/addnotesandpyq', formData);
export const getPreviousUploadedNotes = (teacherId) => Api.get(`/teacher/getpreviousuploadednotes/${teacherId}`);
export const deleteNotesAndPYQ = (pdfid) => Api.delete(`/teacher/deletenotesandpyq/${pdfid}`);