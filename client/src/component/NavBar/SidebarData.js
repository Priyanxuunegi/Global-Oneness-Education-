import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons5 from "react-icons/io5";
import * as MdIcon from 'react-icons/md';
import * as BiIcon from 'react-icons/bs';
import * as GiIcon from 'react-icons/gi';
import * as GrIcon from 'react-icons/gr';
export const SidebarData = [
  {
    _id: '1',
    title: 'Home',
    path: '/home#home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    user: 'Home'

  },            
  {
    _id: '2',
    title: 'About',
    path: '/home#aboutpage',
    icon: <AiIcons.AiFillInfoCircle />,
    cName: 'nav-text',
    user: 'About'
  },
  {
    _id: '3',
    title: 'Employee Zone',
    path: '/teacherLogin',
    icon: <FaIcons.FaUsers />,
    cName: 'nav-text'
  },
  {
    _id: '4',
    title: 'Student Zone',
    path: '/studentLogin',
    icon: <IoIcons5.IoPersonSharp />,
    cName: 'nav-text'
  },
  {
    _id: '5',
    title: 'Dashboard',
    path: '/studentDashboard',
    icon: <MdIcon.MdSpaceDashboard />,
    cName: 'nav-text',
    user: 'student'
  },
  {
    _id: '6',
    title: 'PYQs',
    path: '/pyq',
    icon: <GiIcon.GiPapers />,
    cName: 'nav-text',
    user: 'student'
  },
  {
    _id: '7',
    title: 'Notes',
    path: '/notes',
    icon: <BiIcon.BsFileEarmarkPdfFill />,
    cName: 'nav-text',
    user: 'student'
  },
  {
    _id: '8',
    title: 'Test',
    path: '/test',
    icon: <FaIcons.FaPenSquare />,
    cName: 'nav-text',
    user: 'student'
  },
  {
    _id: '9',
    title: 'Result',
    path: '/result',
    icon: <BiIcon.BsGraphUp />,
    cName: 'nav-text',
    user: 'student'
  },
  {
    _id: '10',
    title: 'Settings',
    path: '/setting',
    icon: <AiIcons.AiFillSetting />,
    cName: 'nav-text'
    ,user: 'student'
  },
  {
    _id: '11',
    title: 'Feedback',
    path: '/feedback',
    icon: <FaIcons.FaComments />,
    cName: 'nav-text',
    user: 'student'
  } ,
  {
    _id: '12',  
    title: 'Dashboard',
    path: '/adminDashboard',
    icon: <MdIcon.MdSpaceDashboard />,
    cName: 'nav-text',
    user: 'admin'
  },
  {
    _id: '13',
    title: 'Earning',
    path: '/adminearning',
    icon: <GiIcon.GiMoneyStack />,
    cName: 'nav-text',
    user: 'admin'
  },
  {
    _id: '14',
    title: 'Courses',
    path: '/courses',
    icon: <AiIcons.AiFillBook />,
    cName: 'nav-text',
    user: 'admin'
  },
  {
    _id: '15',
    title: 'Teacher',
    path: '/teacher',
    icon: <GiIcon.GiTeacher />,
    cName: 'nav-text',
    user: 'admin'
  },
  {
    _id: '16',
    title: 'Student',
    path: '/student',
    icon: <FaIcons.FaUserGraduate />,
    cName: 'nav-text',
    user: 'admin'
  },
  {
    _id: '17',
    title: 'Settings',
    path: '/adminsetting',
    icon: <AiIcons.AiFillSetting />,
    cName: 'nav-text'
    ,user: 'admin'
  },
  {
    _id: '18',
    title: 'Feedback',
    path: '/adminfeedback',
    icon: <FaIcons.FaComments />,
    cName: 'nav-text',
    user: 'admin'
  },
  {
    _id: '19',
    title: 'Dashboard',
    path: '/teacherDashboard',
    icon: <MdIcon.MdSpaceDashboard />,
    cName: 'nav-text',
    user: 'teacher'
  },
  {
    _id: '20',
    title: 'Earning',
    path: '/teacherearning',
    icon: <GiIcon.GiMoneyStack />,
    cName: 'nav-text',
    user: 'teacher'
  },
  {
    _id: '21',
    title: 'Courses',
    path: '/teachercourses',
    icon: <AiIcons.AiFillBook />,
    cName: 'nav-text',
    user: 'teacher'
  },
  {
    _id: '22',
    title: 'Test',
    path: '/teachertest',
    icon: <FaIcons.FaPenSquare />,
    cName: 'nav-text',
    user: 'teacher'
  },
  {
    _id: '23',
    title: 'Attendance',
    path: '/teacherattendance',
    icon: <FaIcons.FaUserCheck />,
    cName: 'nav-text',
    user: 'teacher'
  },
  {
    _id: '24',
    title: 'PYQ/Notes',
    path: '/teachernotesandpyq',
    icon: <BiIcon.BsFileEarmarkPdfFill />,
    cName: 'nav-text',
    user: 'teacher'
  },
  {
    _id: '25',
    title: 'Settings',
    path: '/teachersetting',
    icon: <AiIcons.AiFillSetting />,
    cName: 'nav-text'
    ,user: 'teacher'
  },
  {
    _id: '26',
    title: 'Registration',
    path: '/adminregistration',
    icon: <GiIcon.GiMoneyStack />,
    cName: 'nav-text',
    user: 'admin'
  },
  {
    _id: '201',
    title: 'AllCourses',
    path: '/homecourses',
    icon: <AiIcons.AiFillBook />,
    cName: 'nav-text',
    user: 'About'
  },
  {
    _id: '202',
    title: 'Gallery',
    path: '/gallery',
    icon: <GrIcon.GrGallery />,
    cName: 'nav-text',
    user: 'About'
  },
];