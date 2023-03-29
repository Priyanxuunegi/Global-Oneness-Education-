import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as AdminApi from "../../api/AdminApi";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";
import * as AuthApi from "../../api/AuthApi";
import bin from "../../images/bin.png";

const RecordItem = ({ data, onDeleteCourse }) => {
  return (
    <>
      <div className="hidden  lg:block">
        <div className={`grid grid-cols-11  gap-4 px-[1%]  font-medium `}>
          <span> StudentID </span>
          <span> Photo </span>
          <span className="col-span-2"> Name </span>
          <span> Class </span>
          <span> Date of Join </span>
          <span className="col-span-2"> Email </span>
          <span> Phone </span>
        </div>
        <div className="bg-adminbg ">
          {data.map((d, index) => {
            let date = new Date(d.joiningDate);
            date = date.toLocaleString().slice(0, 8);
            return (
              <div
                key={index}
                className={`grid grid-cols-11 text-grayDark w-full items-center bg-white my-[1%] rounded-md  gap-4 p-[1%] shadow-md`}
              >
                <span className="text-sky-500 "> #{d.studentId} </span>

                <img
                  src={d.photo}
                  className=" h-16 w-16 object-cover rounded-full   hover:scale-105 "
                />
                <span className="col-span-2">
                  {" "}
                  {d.firstname} {d.lastname}{" "}
                </span>
                <span> {d.class} </span>
                <span> {date} </span>
                <span className="overflow-hidden col-span-2"> {d.email} </span>
                <span> {d.phone} </span>
                <button
                  className="flex justify-end"
                  onClick={() => {
                    onDeleteCourse(d._id);
                  }}
                >
                  <img width="16px" src={bin} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="lg:hidden grid md:grid-cols-2 sm:grid-cols-2 gap-3">
        {data.map((d, index) => {
          let date = new Date(d.joiningDate);
          date = date.toLocaleString().slice(0, 8);
          return (
            <div
              key={index}
              className=" bg-white p-4 rounded-lg shadow flex justify-start sm:items-start items-center gap-4 relative "
            >
              {/* <img src={d.photo} className="w-[30%]  " alt='photo alter' /> */}
              <img
                src={d.photo}
                className=" h-24 w-24 object-cover   hover:scale-105 "
              />
              <div
                className={`flex flex-col item-center  text-grayDark  rounded-md  text-sm `}
              >
                <span className="text-sky-500 font-medium">
                  {" "}
                  #{d.studentId}{" "}
                </span>
                <span className="font-medium">
                  {" "}
                  {d.firstname} {d.lastname}{" "}
                </span>
                <span>Class: {d.class} </span>
                <span> D.O.J: {date} </span>
                <span className="overflow-hidden "> {d.email} </span>
                <span> Ph: {d.phone} </span>
              </div>
              <button
                  className="flex justify-end absolute right-3 top-3 "
                  onClick={() => {
                    onDeleteCourse(d._id);
                  }}
                >
                  <img width="16px" src={bin} />
                </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

const RecordLists = ({ title }) => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");



  useEffect(() => {
    AdminApi.getAllStudents()
      .then((response) => {
        //   console.log(res.data);
        response.data.map((d) => {
          if (d.photo == null) {
            setData((prev) => [...prev, d]);
          }
          const imgStorageRef = ref(storage, `profile/${d.photo}`);
          getDownloadURL(imgStorageRef)
            .then((url) => {
              const temp = { ...d, photo: url };
              //  console.log("temp" , temp);
              setData((prev) => {
                return [...prev, temp];
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
        // setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);



  const onChangeInput = (e) => {
    setSearchData(e.target.value);

    const newdata = data.filter((d) => {
      return (
        d.name.toLowerCase().includes(searchData.toLowerCase()) ||
        d.id.toLowerCase().includes(searchData.toLowerCase())
      );
    });

    setData(newdata);
  };

  const onSearchData = (e) => {
    e.preventDefault();
    console.log(searchData.toLowerCase());
    const newdata = data.filter((d) => {
      return (
        d.name.toLowerCase() === searchData.toLowerCase() ||
        d.id.toLowerCase() == searchData.toLowerCase()
      );
    });
    setData(newdata);
  };

  const onDeleteCourse =  (id)=>{
    
    AuthApi.deleteStudent(id).then((res)=>{
     toast.success(res.data)
     if(res.status === 200 )
     {
       const DATA = data.filter((d) => {
         return d._id !== id;
       });
       setData(DATA);
     }
    }).catch(err=>console.log(err))

 }

  return (
    <div className="flex flex-col gap-5 bg-adminbg  p-[2%] font-[Roboto]  ">
      <h1 className="font-semibold text-xl ">List of {title}s</h1>
      <form onSubmit={onSearchData} className="flex w-full gap-2 ">
        <div className="flex items-center gap-2 p-1 w-full  bg-white rounded-2xl border-2 border-[#BFBFBF]">
          <BsSearch />
          <input
            className="w-full p-1 px-3 "
            type="text"
            placeholder="Search by ID/Name"
            value={searchData}
            onChange={onChangeInput}
          />
        </div>
        <button type="submit" className="bg-orange px-[3%] rounded-2xl">
          Search
        </button>
      </form>
      {data.length > 0 && <RecordItem data={data} onDeleteCourse={onDeleteCourse} />}
    </div>
  );
};

const AdminStudentList = () => {
  const [studentData, setStudentData] = useState([]);

  return (
    <div className="bg-adminbg  pt-[90px] py-10 px-3 ">
      <RecordLists title="Student" />
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
  );
};

export default AdminStudentList;
