import axios from 'axios';

// const Api = axios.create({ baseURL: 'http://localhost:5000' });
const Api = axios.create({ baseURL: 'https://globaloneness-server.onrender.com' });

   

export const ApplyRegisteration= (formData) => Api.post('/registration/Applyregistration', formData);