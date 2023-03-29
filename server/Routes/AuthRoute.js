import express from 'express';
import { studentlogin, teacherlogin , deleteStudent ,studentregister, changepassword,adminlogin, adminregister,changeadminpassword, teacherregister,forgotpassword , changeteacherpassword} from '../Controllers/AuthController.js';

const router = express.Router();

router.post('/studentregister', studentregister)
router.post('/studentlogin', studentlogin)
router.post('/changepassword', changepassword)

router.post('/teacherlogin', teacherlogin)
router.post('/teacherregister', teacherregister)
router.post('/changeteacherpassword', changeteacherpassword)

router.post('/adminlogin',adminlogin)
router.post('/adminregister', adminregister)
router.post('/changeadminpassword', changeadminpassword)
router.post('/forgotpassword', forgotpassword)

router.delete('/deleteStudent/:id', deleteStudent)


export default router;