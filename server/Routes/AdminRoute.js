import express from 'express';
import {  AddCourse , getAllCoursebyclass ,deleteCourse ,  getAllStudents, getAllCourse , getStudentApplication  , deleteStudentApplication }  from '../Controllers/AdminController.js';

const router = express.Router();

router.post('/addCourse', AddCourse)
router.get('/getAllCourse/:class', getAllCoursebyclass)
router.get('/getAllCourse', getAllCourse)
router.get('/getAllStudents', getAllStudents)
router.get('/getStudentApplication', getStudentApplication)
router.delete('/deleteStudentApplication/:id', deleteStudentApplication)
router.delete('/deleteCourse/:id', deleteCourse)




export default router;