import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import NavBar from "./component/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Footer from "./component/Footer/Footer";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import TermsofUse from "./pages/Extras/TermsofUse";
import PrivacyPolicy from "./pages/Extras/PrivacyPolicy";
import RefundandCancellatoin from "./pages/Extras/RefundandCancellatoin";

import StudentLogin from "./pages/Auth/StudentLogin";
import StudentRegister from "./pages/Auth/StudentApply";
import TeacherLogin from "./pages/Auth/TeacherLogin";
import AdminLogin from "./pages/Auth/AdminLogin";

import AdminDashboard from "./pages/AdminApplication/AdminDashboard";
import AdminCoursesList from "./pages/AdminApplication/AdminCoursesList";
import AdminTeachersList from "./pages/AdminApplication/AdminTeachersList";
import AdminStudentList from "./pages/AdminApplication/AdminStudentList";
import AdminRegistration from "./pages/AdminApplication/AdminRegistration";
import AdminSetting from "./pages/AdminApplication/AdminSetting";

import StudentDashboard from './pages/StudentApllication/StudentDashboard';
import StudentPYQ from './pages/StudentApllication/StudentPYQ';
import StudentNotes from './pages/StudentApllication/StudentNotes';
import StudentFeedback from './pages/StudentApllication/StudentFeedback';
import StudentResult from './pages/StudentApllication/StudentResult';
import StudentTest from './pages/StudentApllication/StudentTest';
import StudentSetting from './pages/StudentApllication/StudentSetting';

import TeacherDashboard from './pages/TeacherApplication/TeacherDashboard';
import TeacherTest from './pages/TeacherApplication/TeacherTest';
import TeacherAttendance from './pages/TeacherApplication/TeacherAttendance';
import TeacherPYQandNotes from './pages/TeacherApplication/TeacherPYQandNotes';
import TeacherSetting from './pages/TeacherApplication/TeacherSetting';
import TeacherEarning from './pages/TeacherApplication/TeacherEarning';
import TeacherCourses from './pages/TeacherApplication/TeacherCourses';
const App = () => {


  const user = useSelector(state => state.auth.user)


  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/' element={user.user.usertype === '' ? <Navigate to="home" /> : user.user.usertype === 'student' ? <Navigate to="/studentLogin" /> : user.user.usertype === 'teacher' ? <Navigate to="/teacherLogin" /> : <Navigate to="/adminLogin" />} />
        <Route path='home' element={<Home />} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
        <Route path="termsofuse" element={<TermsofUse />} />
        <Route path="privacypolicy" element={<PrivacyPolicy />} />
        <Route path="refundandcancellatoin" element={<RefundandCancellatoin />} />

        <Route path='studentLogin' element={user.user.usertype !== '' ? <Navigate to='/studentDashboard' /> : <StudentLogin />} />
        <Route path='studentRegister' element={<StudentRegister />} />
        <Route path='teacherLogin' element={user.user.usertype !== '' ? <Navigate to='/teacherDashboard' /> : <TeacherLogin />} />
        <Route path='adminLogin' element={user.user.usertype !== '' ? <Navigate to='/adminDashboard' /> : <AdminLogin />} />


        <Route path='studentDashboard' element={user.user.usertype === 'student' ? <StudentDashboard /> : <Navigate to="/studentLogin" />} />
        <Route path='pyq' element={user.user.usertype === 'student' ? <StudentPYQ /> : <Navigate to="/studentLogin" />} />
        <Route path='notes' element={user.user.usertype === 'student' ? <StudentNotes /> : <Navigate to="/studentLogin" />} />
        <Route path='feedback' element={user.user.usertype === 'student' ? <StudentFeedback /> : <Navigate to="/studentLogin" />} />
        <Route path='result' element={user.user.usertype === 'student' ? <StudentResult /> : <Navigate to="/studentLogin" />} />
        <Route path='test' element={user.user.usertype === 'student' ? <StudentTest /> : <Navigate to="/studentLogin" />} />
        <Route path='setting' element={user.user.usertype === 'student' ? <StudentSetting /> : <Navigate to="/studentLogin" />} />



        <Route path="adminDashboard" element={user.user.usertype === 'admin' ? <AdminDashboard /> : <Navigate to='/adminLogin' />} />
        <Route path="courses" element={user.user.usertype === 'admin' ? <AdminCoursesList /> : <Navigate to='/adminLogin' />} />
        <Route path="teacher" element={user.user.usertype === 'admin' ? <AdminTeachersList /> : <Navigate to='/adminLogin' />} />
        <Route path="student" element={user.user.usertype === 'admin' ? <AdminStudentList /> : <Navigate to='/adminLogin' />} />
        <Route path="adminsetting" element={user.user.usertype === 'admin' ? <AdminSetting /> : <Navigate to='/adminLogin' />} />
        <Route path='/adminregistration' element={user.user.usertype === 'admin' ? <AdminRegistration /> : <Navigate to='/adminLogin' />} />

        <Route path='teacherDashboard' element={user.user.usertype === 'teacher' ? <TeacherDashboard /> : <Navigate to='/teacherLogin' />} />
        <Route path='teacherearning' element={user.user.usertype === 'teacher' ? <TeacherEarning /> : <Navigate to='/teacherLogin' />} />
        <Route path='teachercourses' element={user.user.usertype === 'teacher' ? <TeacherCourses /> : <Navigate to='/teacherLogin' />} />
        <Route path='teachertest' element={user.user.usertype === 'teacher' ? <TeacherTest /> : <Navigate to='/teacherLogin' />} />
        <Route path='teacherattendance' element={user.user.usertype === 'teacher' ? <TeacherAttendance /> : <Navigate to='/teacherLogin' />} />
        <Route path='teachernotesandpyq' element={user.user.usertype === 'teacher' ? <TeacherPYQandNotes /> : <Navigate to='/teacherLogin' />} />
        <Route path='teachersetting' element={user.user.usertype === 'teacher' ? <TeacherSetting /> : <Navigate to='/teacherLogin' />} />

      </Routes>

      <Footer />
    </>

  );
};

export default App;
