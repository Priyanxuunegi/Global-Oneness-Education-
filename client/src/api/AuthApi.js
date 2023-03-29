import axios from 'axios';

// const Api = axios.create({ baseURL: 'http://localhost:5000' });
const Api = axios.create({ baseURL: 'https://globaloneness-server.onrender.com' });

export const StudentRegister= (formData) => Api.post('/auth/studentregister', formData);   

export const studentLogin= (formData) => Api.post('/auth/studentlogin', formData);

export const adminLogin= (formData) => Api.post('/auth/adminlogin', formData);

export const teacherLogin= (formData) => Api.post('/auth/teacherlogin', formData);

export const ChangePassword = (formData) => Api.post('/auth/changepassword', formData);

export const ChangeAdminPassword = (formData) => Api.post('/auth/changeadminpassword', formData);

export const ChangeTeacherPassword = (formData) => Api.post('/auth/changeteacherpassword', formData);

export const forgotPassword = (formData) => Api.post('/auth/forgotpassword', formData);

export const deleteStudent= (query) => Api.delete(`/auth/deleteStudent/${query}`);
