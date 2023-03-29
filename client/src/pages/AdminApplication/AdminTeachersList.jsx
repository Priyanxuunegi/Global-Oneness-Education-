import React, {useState} from "react";
import p1 from "../../images/pawan_sir.jpeg";
import p2 from "../../images/rahul.jpeg";
import p3 from "../../images/satpal.jpeg";
import p4 from "../../images/richa.jpeg";
import p5 from "../../images/manoj.jpeg";
import p6 from "../../images/gaurav.jpeg";
import RecordList from "../../component/Admin/RecordList";



const dummy_teacher = [
    {
        id: "110",
        photo: p1,
        name: "Pawan Sir",
        gender: "Male",
        course: "Chemistry",
        joiningDate: "01/01/2023",
        email: "pawandev@gmaiil.com",
        phone: "1234567890",
        salary: "20000",
       
      },
      {
        id: "103",
        name: "Satpal Sir",
        course: "Accounts",
        photo: p3,
        gender: "Male",
        email: "pawan@gmaiil.com",
        phone: "1234567890",
        salary: "20000",
        joiningDate: "01/01/2023",
      },
      {
        id: "104",
        name: "Richa Ma'am ",
        course: "Chemistry",
        photo: p4,
        gender: "Male",
        email: "pawan@gmaiil.com",
        phone: "1234567890",
        salary: "20000",
        joiningDate: "01/01/2023",
      },
      {
        id: "105",
        name: "Manoj Sir",
        course: "Physics",
        photo: p5,
        gender: "Male",
        email: "pawan@gmaiil.com",
        phone: "1234567890",
        salary: "20000",
        joiningDate: "01/01/2023",
      },
      {
        id: "106",
        name: "Gaurav Sir ",
        course: "Maths",
        photo: p6,
        gender: "Male",
        email: "pawan@gmaiil.com",
        phone: "1234567890",
        salary: "20000",
        joiningDate: "01/01/2023",
      },
      {
        id: "111",
        photo: p1,
        name: "Pawan Sir",
        gender: "Male",
        course: "Chemistry",
        joiningDate: "01/01/2023",
        email: "pawan@gmaiil.com",
        phone: "1234567890",
        salary: "20000",
       
      },
  {
    id: "101",
    photo: p1,
    name: "Pawan Sir",
    gender: "Male",
    course: "Chemistry",
    joiningDate: "01/01/2023",
    email: "pawan@gmaiil.com",
    phone: "1234567890",
    salary: "20000",
   
  },
  {
    id: "102",
    name: "Rahul Sir",
    course: "Physics",
    photo: p2,
    gender: "Male",
    email: "pawan@gmaiil.com",
    phone: "1234567890",
    salary: "20000",
    joiningDate: "01/01/2023",
  },
  {
    id: "103",
    name: "Satpal Sir",
    course: "Accounts",
    photo: p3,
    gender: "Male",
    email: "pawan@gmaiil.com",
    phone: "1234567890",
    salary: "20000",
    joiningDate: "01/01/2023",
  },
  {
    id: "104",
    name: "Richa Ma'am ",
    course: "Chemistry",
    photo: p4,
    gender: "Male",
    email: "pawan@gmaiil.com",
    phone: "1234567890",
    salary: "20000",
    joiningDate: "01/01/2023",
  },
  {
    id: "105",
    name: "Manoj Sir",
    course: "Physics",
    photo: p5,
    gender: "Male",
    email: "pawan@gmaiil.com",
    phone: "1234567890",
    salary: "20000",
    joiningDate: "01/01/2023",
  },
  {
    id: "106",
    name: "Gaurav Sir ",
    course: "Maths",
    photo: p6,
    gender: "Male",
    email: "pawan@gmaiil.com",
    phone: "1234567890",
    salary: "20000",
    joiningDate: "01/01/2023",
  },
];




 

const AdminTeachersList = () => {
  return (
   <div className="bg-adminbg pt-[90px] py-10 px-3">
     <RecordList title="Teacher" DATA={dummy_teacher } />
   </div>
  );
};

export default AdminTeachersList;
