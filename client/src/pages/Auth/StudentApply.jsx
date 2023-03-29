import React, { useState } from "react";
import * as AdminApi from "../../api/AdminApi";
import { Link } from "react-router-dom"
import { ApplyRegisteration } from "../../api/RegisterApi";
import dummy_profile from "../../images/dummy-profile-pic.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uuid from "react-uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";

const StudentApply = () => {
  const [CourseeData, setCourseeData] = useState([]);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    guardianNumber: "",
    class: "",
    address: "",
    school: "",
    photo: "",
  });
  const [course, setCourse] = useState([]);
  const [file, setFile] = useState();

  const onChangeHandler = (e) => {
    const key = e.target.id;
    const value = e.target.value;

    setUserData((pre) => {
      return { ...pre, [key]: value };
    });

    if (key === "class") {
      setCourseeData([]);
      AdminApi.getAllCoursebyClass(value)
        .then((res) => {
          res.data.map((c) => {
            setCourseeData((pre) => {
              return [c, ...pre];
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onAddCourse = (e) => {
    if (e.target.value !== "") {
      console.log(e.target.value);
      if (course.indexOf(e.target.value) === -1) {
        setCourse((pre) => {
          return [e.target.value, ...pre];
        });
      }
    }
  };

  const onDeleteCourse = (e) => {
    console.log(e);

    console.log(e.target.id);

    setCourse(course.filter((item) => item !== e.target.id));
  };

  const onSubmitHandler = (e) => {
    console.log(userData);
    if (
      userData.firstname === "" ||
      userData.lastname === "" ||
      userData.email === "" ||
      userData.phone === "" ||
      userData.guardianNumber === "" ||
      userData.class === "" ||
      userData.address === "" ||
      userData.school === ""
    ) {
      e.preventDefault();
      toast.warning("Please Fill All the Fields");
    } else if (CourseeData.length === 0) {
      e.preventDefault();
      toast.warning("Please Select a Course");
    } else if (!file) {
      e.preventDefault();
      toast.warning("Please Select a Image");
    } else if (userData.phone.length !== 10 || userData.guardianNumber.length !== 10) {
      e.preventDefault();
      toast.warning("Please Enter a Valid Phone Number");
    } else {
      console.log(userData);
      userData.photo = uuid();
      const storageRef = ref(storage, `profile/${userData.photo}`);
      uploadBytes(storageRef, file).then((snapshot) => {

        ApplyRegisteration({ userData, course })
          .then((res) => {
            if (res.status === 200) toast.success(res.data);
            setUserData({
              firstname: "",
              lastname: "",
              email: "",
              phone: "",
              guardianNumber: "",
              class: "",
              address: "",
              school: "",
              photo: "",
            });
            setCourse([]);
            setFile();
          })
          .catch((err) => {
            console.log(err);

            toast.error(err.response.data);
          });
      }).catch((err) => {
        console.log(err);
        toast.error("Can't Regisger Now, Please Try Again Later");
      });
      e.preventDefault();

    }
  };

  return (
    <div className="pt-20 ">
      <div className="  font-[Poppins] md:flex md:flex-row rounded-2xl bg-white content-center    mx-5 drop-shadow-2xl ">
        <div className="righSide flex flex-col md:px-20 md:w-[100%] pt-5 md:pt-0 item-center justify-center">
          <h1 className=" md:text-[32px] text-[16px] font-normal text-center">
            Welcome to
          </h1>
          <div className="flex fex-row text-center justify-center">
            <h1 className=" md:text-[32px] text-[16px] font-bold text-center">
              GLOBAL
            </h1>
            <h1 className=" md:text-[32px] text-[16px] font-bold text-[var(--orange)] text-center">
              {" "}
              ONENESS
            </h1>
          </div>

          <span className="text-center   mt-3">
            Please enter your details carefully !
          </span>
          <form
            className="flex flex-col max-w-full mt-5  "
            onSubmit={onSubmitHandler}
          >
            <div className="flex md:flex-row flex-col   gap-3 justify-around    ">
              <div className="flex flex-col justify-center  items-center space-y-3 cursor-pointer text-center m-[5%]  ">
                <div className="text-md font-medium "> Upload Photo</div>
                <div className="  w-[150px]     ">
                  {file ? (
                    <img
                      src={URL.createObjectURL(file)}
                      className="md:h-36 md:w-48 h-28 w-32 object-contain "
                    />
                  ) : (
                    <img
                      src={dummy_profile}
                      className="md:h-36 md:w-48 h-28 w-32 object-contain "
                    />
                  )}
                </div>

                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    required={true}
                    type="file"
                    accept="image/png, image/jpeg"
                    className="block   text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-yellow-300 file:text-black
      hover:file:bg-yellow-500 hover:file:text-white 
    "
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </label>
              </div>

              <div className="flex flex-col  max-w-[400px] w-full md:mt-0  mt-5  ">
                <input
                  required={true}
                  id="firstname"
                  className=" md:mx-0 mx-5 border-2 p-2 rounded-md "
                  type="text"
                  value={userData.firstname}
                  onChange={onChangeHandler}
                  placeholder="First Name"
                />
                <input
                  required={true}
                  id="lastname"
                  className=" md:mx-0 mx-5 border-2 p-2 rounded-md mt-8"
                  type="text"
                  value={userData.lastname}
                  onChange={onChangeHandler}
                  placeholder="Last Name"
                />
                <input
                  required={true}
                  id="email"
                  className=" md:mx-0 mx-5 border-2 p-2 rounded-md mt-8"
                  type="email"
                  value={userData.email}
                  onChange={onChangeHandler}
                  placeholder="Email"
                />
                <select
                  required={true}
                  id="class"
                  className="md:mx-0 mx-5 border-2 p-2 rounded-md mt-8"
                  type="number"
                  value={userData.class}
                  onChange={onChangeHandler}
                >
                  <option value="">
                    Class
                  </option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="jeemain">JEE-MAIN</option>
                  <option value="neet">NEET</option>
                </select>
                <select
                  required={true}
                  id="course"
                  className="md:mx-0 mx-5 border-2 p-2 rounded-md mt-8 snap-y  "
                  value={course.length === 0 ? "" : course[0]}
                  onChange={onAddCourse}
                >
                  <option value="" className="text-black">
                    Select Course{" "}
                  </option>
                  {CourseeData.map((c) => {
                    return (
                      <option
                        key={c._id}
                        value={c.Course}
                        className="text-black"
                      >
                        {c.Course}
                      </option>
                    );
                  })}
                </select>

              </div>
              <div className="flex flex-col md:mt-0 mt-4 max-w-[400px] w-full ">



                <input
                  required={true}
                  id="phone"
                  className=" md:mx-0 mx-5 border-2 p-2 rounded-md "
                  type="tel"
                  value={userData.phone}
                  onChange={onChangeHandler}
                  placeholder="Phone Number"
                />
                <input
                  required={true}
                  id="guardianNumber"
                  className=" md:mx-0 mx-5 border-2 p-2 rounded-md mt-8"
                  type="tel"
                  value={userData.guardianNumber}
                  onChange={onChangeHandler}
                  placeholder="Guardian Number"
                />
                <input
                  required={true}
                  id="school"
                  className=" md:mx-0 mx-5 border-2 p-2 rounded-md mt-8"
                  type="text"
                  value={userData.school}
                  onChange={onChangeHandler}
                  placeholder="School"
                />
                <input
                  required={true}
                  id="address"
                  className=" md:mx-0 mx-5 border-2 p-2 rounded-md mt-8"
                  type="text"
                  value={userData.address}
                  onChange={onChangeHandler}
                  placeholder="Address"
                />

              </div>
            </div>

            {course.length >= 1 && (
              <span className="text-center text-red-500  md:text-[12px] text-[6px]  mt-3">
                Click on subject to Delete
              </span>
            )}
            <div className="w-full flex flex-row gap-2 justify-center mt-5 my-3 ">
              {course.map((c) => {
                return (
                  <div
                    key={Math.random()}
                    className="relative border-2 border-blue-400 text-blue-500 rounded-md p-2 px-3 hover:text-red-600 hover:border-red-600 cursor-pointer  "
                    id={c}
                    onClick={onDeleteCourse}
                  >
                    {c}
                  </div>
                );
              })}
            </div>
            <label className=" md:mt-6 p-2 text-center"> <input required={true} type="checkbox" className="rounded text-pink-500" />
              <span > I , accept <Link to="../termsofuse" className="text-blue-500">terms</Link> , <Link to="../privacypolicy" className="text-blue-500">privacy policy</Link>  , <Link to="../refundandcancellatoin" className="text-blue-500">refund and cancellation</Link>   by submitted my application </span>
            </label>
            <button className="md:mx-10 mx-12 border-2 p-2 font-[Poppins] rounded-md   btn bg-[var(--buttonBlue)] text-white py-2 px-3 ">
              Register
            </button>
            <span className="mx-5 md:mx-0 my-5  md:text-[16px] text-[12px] justify-center text-center ">
              have an account ?{" "}
              <a className="text-red-600" href="../studentLogin">
                Login
              </a>
            </span>
          </form>
        </div>
      </div>
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
    </div>
  );
};

export default StudentApply;
