import axios from 'axios';

// const Api = axios.create({ baseURL: 'http://localhost:5000' });
const Api = axios.create({ baseURL: 'https://globaloneness-server.onrender.com' });

export const addCourse= (formData) => Api.post('admin/addCourse', formData);

export const getAllCoursebyClass= (query) => Api.get(`admin/getAllCourse/${query}`);
export const getAllCourse= () => Api.get(`admin/getAllCourse`);
export const getAllStudents= () => Api.get(`admin/getAllStudents`);
export const getStudentApplication= () => Api.get(`admin/getStudentApplication`);
export const deleteStudentApplication= (query) => Api.delete(`admin/deleteStudentApplication/${query}`);
export const deleteCourse= (query) => Api.delete(`admin/deleteCourse/${query}`);
export const postStudentApplication= (query) => Api.post(`admin/postStudentApplication/${query}`);

export const ChangePassword = (formData) => Api.post('/auth/changepassword', formData);
