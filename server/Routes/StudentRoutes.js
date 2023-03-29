import express from 'express';
import {AddImportantNotes, AddImportantPYQ,getAllImportantNotes,getAllImportantPYQ,getAllDocuments} from '../Controllers/studentController.js';
import {addFeedback} from '../Controllers/feedbackController.js';

const router = express.Router();

router.post('/addImportantNotes', AddImportantNotes)
router.post('/addImportantPYQ', AddImportantPYQ)
router.get('/getAllImportantNotes/:studentId', getAllImportantNotes)
router.get('/getAllImportantPYQ/:studentId', getAllImportantPYQ)
router.post('/feedback', addFeedback)
router.get('/getNotes/:classes', getAllDocuments)
export default router;