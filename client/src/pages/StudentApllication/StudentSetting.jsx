import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ChangePassword from '../../component/Settings/ChangePassword'
import pic from "../../images/dummy-profile-pic.jpg"
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";
const StudentSetting = () => {

  const user = useSelector(state => state.auth.user.user);
  const [imgRef ,serImgRef] = useState(null);
  useEffect(() => {
    const fetchImg = async () => {
      const imgStorageRef = ref(storage, `profile/${user.photo}`);
      console.log("imgStorageRef", imgStorageRef)
      getDownloadURL(imgStorageRef)
        .then((url) => {
          serImgRef(url);
          console.log("url", url)
        }).catch((error) => {
          console.log(error);
        });
    }
    fetchImg();
    console.log("imgref", imgRef)
  }, [])

  return (
    <main className='flex flex-col md:flex-row pt-20  gap-10 mx-[5%]'>
      <section className='flex md:flex-row flex-col w-full border rounded-xl h-full p-5 bg-white'>
        <div className='flex flex-col my-[3%] items-center'>
          <span className='font-[Poppins] text-[20px]'>Your Details</span>
          <img src={imgRef ? imgRef : pic} className="w-[180px] object-contain h-[180px]" />
        </div>
        <div className='flex flex-col mx-[3%] gap-y-3 font-[Poppins] w-full '>
          <div className='flex flex-row border p-2 gap-2 rounded-lg w-full '><span>Name:</span> <span className='font-light text-graylight '>{user.firstname + " " + user.lastname}</span></div>
          <div className='flex flex-row border p-2 gap-2 rounded-lg w-full '><span>StudentID:</span><span className='font-light text-graylight '>{user.studentId}</span></div>
          <div className='flex flex-row border p-2 gap-2 rounded-lg w-full '><span>Class:</span> <span className='font-light text-graylight '>{user.class}</span></div>
          <div className='flex flex-row border p-2 gap-2 rounded-lg w-full '>
            <span>Courses:</span>{user.courses.map((c) => {
              return (
                <span key={Math.random()} className='font-light text-graylight '>
                  {" "}
                  {c}{", "}
                </span>
              );
            })}
          </div>
          <div className='flex flex-row border p-2 gap-2 rounded-lg w-full '><span>Phone Number:</span> <span className='font-light text-graylight '>{user.phone}</span></div>
          <div className='flex flex-row border p-2 gap-2 rounded-lg w-full '><span>Email:</span> <span className='font-light text-graylight '>{user.email}</span></div>
          <div className='flex flex-row border p-2 gap-2 rounded-lg w-full '><span>Address:</span> <span className='font-light text-graylight '>{user.address}</span></div>
          <div className='flex flex-row border p-2 gap-2 rounded-lg w-full '><span>Guardian Number:</span><span className='font-light text-graylight '>{user.guardianNumber}</span></div>
        </div>

      </section>

      <section className='flex flex-col md:w-[40%] md:h-[500px] items-center '>
        <ChangePassword />
      </section>
    </main>

  )
}

export default StudentSetting
