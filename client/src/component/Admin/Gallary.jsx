import React, { useState  , useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import promotionglobaloneness from "../../images/promotionglobaloneness.jpg";
import teamglobaloneness from "../../images/teamglobaloneness.jpg";
import promotion2globaloneness from "../../images/promotion2globaloneness.jpg";
import dummy_profile from "../../images/dummy-profile-pic.jpg";
import { AiOutlineClose } from "react-icons/ai"; // close btn
import { MdCloudUpload } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uuid from "react-uuid";
import { getDownloadURL, ref, listAll,  uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";

const Gallary = () => {
    const user = useSelector((state) => state.auth.user.user);
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState();
  const [imageList  , setImageList] = useState([]);
  
  console.log(user.usertype)
  useEffect(() => {
    const fetch = async () => {
   
         setImageList([])
          const imageListRef = ref(storage, `gallary/`);
          listAll(imageListRef).then((response)=>{
            response.items.map((item)=>{
                getDownloadURL(item).then((url)=>{
                    setImageList((pre)=>[...pre , url])
                }).catch(err=>console.log(err));
            })
          }).catch(err=>console.log(err))
    
    };
    fetch();
    
  }, []);


  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const onSubmitHandler = (e) => {
    if (file.length === 0) {
      e.preventDefault();
      toast.warning("Please Select a Image");
    } else {
      e.preventDefault();
      console.log(file);   
      const PHOTTO = uuid();
      const storageRef = ref(storage, `gallary/${PHOTTO}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        const imgStorageRef = ref(storage, `gallary/${PHOTTO}`);
        getDownloadURL(imgStorageRef)
          .then((url) => {
            console.log(url);
            setImageList((pre)=>[...pre , url])
            setFile();
            setShowForm(!showForm)
           
          })
          .catch((error) => {
            toast.error("Can not load profile image");
          });
      });
    }
  };

  return (
    <section className="font-[Poppins] relative py-10  ">
      <div className="flex items-center justify-between w-5/6 mx-auto ">
        <h1 className="sm:text-3xl font-semibold   py-10 "> Our Events </h1>

        {user.usertype === "admin" && (
          <button
            className="bg-[#FBD540]  px-[2%] flex  justify-center items-center gap-3 rounded-lg  "
            onClick={() => {
              setShowForm(!showForm);
            }}
          >
            <span className="text-white font-bold text-3xl"> + </span>
            <span className="px-1">Add Photo </span>
          </button>
        )}
      </div>
      {showForm && (
        <div className="absolute z-10 w-full ">
          <form
            onSubmit={onSubmitHandler}
            className="  flex flex-col justify-center  items-center space-y-6  w-fit  rounded-lg shadow-2xl mx-auto bg-white p-4"
          >
            <div className="grid grid-cols-4 justify-items-end px-[4%] mt-[2%] ">
              <h2 className="font-medium    col-span-3  ">
                {" "}
                Select a Image to Upload
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setFile();
                }}
              >
                <AiOutlineClose className="sm:text-xl hover:scale-125" />
              </button>
            </div>
            <div className="shrink-0">
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  className="md:h-36 md:w-48 h-28 w-32 object-contain "
                />
              ) : (
                <img
                  src={dummy_profile}
                  className="md:h-36 md:w-48 h-28 w-32 object-cover "
                />
              )}
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                required={true}
                type="file"
                className="block w-full text-sm text-slate-500
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
            <button
              type="submit"
              className=" flex items-center space-x-3 bg-green-500 text-white p-1 px-4 rounded-full  font-medium shadow-2xl hover:bg-green-600 hover:scale-105 duration-200 "
            >
              {" "}
              <MdCloudUpload />
              <span> Upload</span>{" "}
            </button>
          </form>
        </div>
      )}

      <div className="relative flex items-center">
        <MdChevronLeft
          className="opacity-50 cursor-pointer hover:opacity-100 "
          onClick={slideLeft}
          size={40}
        />
        <div
          id="slider"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {
            imageList.map((image)=>{
                return (
                    <img key={Math.random()}
            className="md:h-60 h-44 inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
            src={image}
            alt="/"
          />
                )
            })
          }
        </div>
        <MdChevronRight
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideRight}
          size={40}
        />
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
    </section>
  );
};

export default Gallary;
