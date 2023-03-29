import express from 'express';
import {Applyregistration } from '../Controllers/RegistrationController.js';

const router = express.Router();


router.post('/Applyregistration', Applyregistration)



export default router;