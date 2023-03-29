import React, { useState, useEffect } from "react";
import * as AdminApi from "../../api/AdminApi";
import * as AuthApi from "../../api/AuthApi";
import dummy_profile from "../../images/dummy-profile-pic.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uuid from "react-uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";

const AppliactionRecord = ({ data, onRejectHandler, onAcceptHandler }) => {
  return (
    <div className="p-3  flex flex-col justify-center items-center rounded shadow-lg bg-white  ">
      {data.photo ? (
        <img src={data.photo} className="w-[20%]" />
      ) : (
        <img src={dummy_profile} className="w-[20%]" />
      )}
      <h1 className="text-xl font-semibold py-2">
        {" "}
        {data.firstname} {data.lastname}{" "}
      </h1>
      <div className="w-5/6 ">
        <div>
          Class : <span className="font-medium">{data.class}</span>
        </div>
        <div>
          {" "}
          Courses :
          {data.courses.map((c) => {
            return (
              <span key={Math.random()} className="font-medium">
                {" "}
                {c}{" "}
              </span>
            );
          })}
        </div>
        <div>School : {data.school}</div>
        <div>Email : {data.email}</div>
        <div>Phone : {data.phone}</div>
        <div>Address : {data.address}</div>
      </div>
      <div className="flex w-full my-3 justify-around items-center ">
        <button
          onClick={() => {
            onAcceptHandler(data);
          }}
          className="font-medium rounded-lg  border-2  border-green-500 text-green-500  w-2/6  p-2  hover:text-white hover:bg-green-500 "
        >
          Accept{" "}
        </button>
        <button
          onClick={() => {
            onRejectHandler(data._id);
          }}
          className="font-medium rounded-lg  border-2  border-red-500 text-red-500  w-2/6  p-2  hover:text-white hover:bg-red-500 "
        >
          Reject{" "}
        </button>
      </div>
    </div>
  );
};

const AdminRegistration = () => {
  const [studentApplyDataStore, setStudentApplyDataStore] = useState([]);
  const [studentApplyData, setStudentApplyData] = useState([]);
  const [btnClicked, setBtnClicked] = useState(false);


  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await AdminApi.getStudentApplication();
        console.log("feteching ->", response.data);
        setStudentApplyDataStore(response.data)  // x 
        setStudentApplyData([]);                // y

        response.data.map((d) => {
          if (d.photo == null) {
            setStudentApplyData((prev) => [...prev, d]);
          }
          const imgStorageRef = ref(storage, `profile/${d.photo}`);
          getDownloadURL(imgStorageRef)
            .then((url) => {
              const temp = { ...d, photo: url };
              //  console.log("temp" , temp);
              setStudentApplyData((prev) => {
                return [...prev, temp]
              })
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetch();

  }, []);

  const onRejectHandler =  (id) => {
    
     AdminApi.deleteStudentApplication(id).then((res)=>{
      if(res.status === 200 )
      {
        const DATA = studentApplyData.filter((d) => {
          return d._id !== id;
        });
        setStudentApplyData(DATA);
      }
    }).catch(err => { console.log(err) })


  };

  const onAcceptHandler = (data) => {
    // console.log(data);
    // const d = data;

    const date = new Date();
    const id = +(
      date.getFullYear().toString() + date.getTime().toString().slice(9, 13)
    );
   //  console.log("Store" , studentApplyDataStore)  
    studentApplyDataStore.map((d)=>{
      if(d._id === data._id) 
      {
      const NewStudent = {...data  ,  photo: d.photo ,  password: "student@123", studentId: id};
       AuthApi.StudentRegister(NewStudent).then((res)=>{
        if (res.status == 200) {
            onRejectHandler(data._id);
            
        }
       }).catch(err=>console.log(err))
      }
    })

  };


  return (
    <section className=" h-full font-[Poppins] bg-adminbg pt-[90px] py-10  px-5 ">

      {studentApplyData.length == 0 && (
        <div className="w-full text-center text-2xl  text-red-500 ">
          No Application Here !!
        </div>
      )}
      {studentApplyData.length > 0 && (
        <div>
          <h1 className="font-semibold sm:text-2xl py-4">
            List of Student Application{" "}
          </h1>
          <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-3  ">
            {studentApplyData.map((d) => {
              return (
                <AppliactionRecord
                  key={d._id}
                  data={d}
                  onRejectHandler={onRejectHandler}
                  onAcceptHandler={onAcceptHandler}
                />
              );
            })}
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
};

export default AdminRegistration;
