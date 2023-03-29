import express from 'express';
import {addNotesandPYQ,getPreviousUploadedNotes,deleteNotesAndPYQ} from '../Controllers/TeacherController.js';

const router = express.Router();

router.post('/addnotesandpyq', addNotesandPYQ);
router.get('/getpreviousuploadednotes/:teacherId', getPreviousUploadedNotes);
router.delete('/deletenotesandpyq/:pdfid', deleteNotesAndPYQ);

export default router;