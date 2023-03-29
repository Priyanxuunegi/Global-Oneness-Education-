import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { useLocation } from "react-router-dom";

import * as AdminApi from "../../api/AdminApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai"; // close btn
import bin from "../../images/bin.png"
import possible_courses from "../../Data/PossibleCourses.json";


const Course = ({ d , onDeleteCourse  }) => {
  const user = useSelector((state) => state.auth.user.user);

  const src = d.Course;
  return (
    <div className="flex flex-col gap-2 bg-white p-2 rounded-2xl shadow-lg ">
      {user.usertype !== "" && (
        <button className="flex justify-end"  onClick={() => {
            onDeleteCourse(d._id);
          }} >
        <img width="16px"  src={bin}/>
      
        </button>
      )}
      <div className="p-1  flex items-center  border-grayDark">
        {" "}
        <img
          src={require(`../../images/${src}.png`)} //  md:h-full md:w-full
          alt="+"
          className="object-cover md:h-[180px] md:w-[180px] h-[116px] w-[116px]"
        />{" "}
      </div>
      <div className="flex flex-col w-full px-2 text-center ">
        <h2 className="font-medium w-full sm:text-xl  ">{d.Course}</h2>
        <p className="text-grayDark sm:text-sm text-xs ">{d.Faculty}</p>
        <p className="text-grayDark sm:text-sm text-xs ">
          {d.Lectures} Classes
        </p>
      </div>
    </div>
  );
};

const AddNewCourse = ({ toggleForm , setListOfAllCourses })=> {
  const [addCourseData, setAddCourseData] = useState({
    CourseId: "",
    Course: "",
    Class: "",
  });
  const [availableCourse, setAvailableCourse] = useState([]);
  
  const onChangeHandler = (e) => {
 
    const key = e.target.name;
    const val = e.target.value;

   if(key === 'Class')
   {  
    setAvailableCourse(possible_courses.filter((c) => {
      return  (c.class === val)
    }))
   
   }
    setAddCourseData((pre) => {
      return { ...pre, [key]: val };
    });
    
  };
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      CourseId:addCourseData.Class + addCourseData.Course.slice(0, 3).toUpperCase()+addCourseData.Course.length,
      Course: addCourseData.Course,
      Class: addCourseData.Class,
    };
      AdminApi.addCourse(data)
      .then((res) => {
        setListOfAllCourses((pre) => [...pre, data]);
       toast.success(res.data);
         toggleForm()
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
    setAddCourseData({
      CourseId: "",
      Course: "",
      Class: "",
    });
  };
  return (
    <div className="w-full  absolute  py-[5%]">
      <div className=" sm:w-[60%]  border-2 ring-2 ring-graylight shadow-2xl  bg-adminbg  mx-auto p-3 ">
        <div className="grid grid-cols-3 justify-items-end px-[4%] mt-[2%] ">
          <h1 className="font-semibold sm:text-2xl   col-span-2  ">
            {" "}
            Add a new Course{" "}
          </h1>
          <button
            onClick={() => {
              toggleForm();
            }}
          >
            <AiOutlineClose className="sm:text-2xl" />
          </button>
        </div>
        <form className="grid p-[2%] " onSubmit={onSubmitHandler}>
          <select
            required={true}
            name="Class"
            className="md:w-full  w-[90%] border-2 p-2 rounded-md mt-8"
            type="text"
            value={addCourseData.Class}
            onChange={onChangeHandler}
          >
            <option value="">Class</option>
            
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">JEE</option>
            <option value="14">NEET</option>
          </select>
          <select
            required={true}
            name="Course"
            className=" md:w-full  w-[90%] border-2 p-2 rounded-md mt-8"
            value={addCourseData.Course}
            onChange={onChangeHandler}
          >
            <option value="">Select Course </option>
            {availableCourse.map((c) => {
              return (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              );
            })}
          </select>
          <div className="flex justify-center mt-[5%]">
            <button
              className="bg-[#FBD540] p-2    rounded-lg w-[40%]  "
              type="submit"
            >
              <span className="font-medium ">Add</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CoursesList = () => {
  const [listOfAllCourses, setListOfAllCourses] = useState([]); //
  const [query, setQuery] = useState("12");
  const [queryCoursesList, setQueryCoursesList] = useState([]); //
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    AdminApi.getAllCourse()
      .then((res) => {
        setListOfAllCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
          setListOfAllCourses([]);
      
      });
  }, []);

  useEffect(()=>{
    setQueryCoursesList([]);
    listOfAllCourses.map((c) => {
      if (c.Class === query) {
        setQueryCoursesList((pre) => [...pre, c]);
      }
    });
   
  } , [query , listOfAllCourses])

 
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const onDeleteCourse =  (id)=>{
    
     AdminApi.deleteCourse(id).then((res)=>{
      toast.success(res.data)
      if(res.status === 200 )
      {
        const DATA = listOfAllCourses.filter((d) => {
          return d._id !== id;
        });
        setListOfAllCourses(DATA);
      }
      

     }).catch(err=>console.log(err))


  }

  return (
    <section
      className="font-[Roboto]  pt-[90px] py-10 px-3 "
      id="courses"
    >
      <div className="flex flex-col gap-5  sm:w-5/6 mx-auto    relative ">
        <h1 className="font-semibold sm:text-3xl ">Lists of courses </h1>
        <div className="flex ">
          <div>
            <select
              required={true}
              name="class"
              className="md:mx-[3%]  border-2 p-2 px-4  rounded-md mt-[1%]"
              type="number"
              value={query}
              onChange={(e)=>{ setQuery(e.target.value)}}
            >
              <option value="" >Class</option>
              <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">JEE</option>
            <option value="14">NEET</option>
            </select>
          </div>
          <div className="w-11/12  mx-auto  flex justify-end  ">
            {location.pathname !== "/home" && (
              <button
                className="bg-[#FBD540]  px-[2%] flex  justify-center items-center gap-3 rounded-lg  "
                onClick={() => {
                  setShowForm(!showForm);
                }}
              >
                <span className="text-white font-bold text-3xl"> + </span>
                <span className="px-1">Add new Course </span>
              </button>
            )}
          </div>
        </div>
        <div className={`h-0.5   bg-grayDark`}></div>
        {queryCoursesList.length > 0 ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-3   grid-cols-2 gap-4  justify-items-center p-[1%]  ">
            {queryCoursesList.map((d , index) => {
              return <Course key={index} d={d}  onDeleteCourse={onDeleteCourse} />;
            })}
          </div>
        ) : (
          <div className="text-center"> No Courses Available </div>
        )}
        
        {showForm && <AddNewCourse  toggleForm={toggleForm} setListOfAllCourses={setListOfAllCourses} />}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </section>
  );
};

export default CoursesList;
