import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import *as StudentApi from '../../api/StudentApi'
const dummyData = ["Mr. Pawan Dev Kanduri", "Mr. Rahul Kumar", "Mr. Satpal Singh", "Mr. Rakesh Kumar", "Mr. Manoj Yadav",]

const StudentFeedback = () => {

  const [feedback, setFeedback] = useState({ feedback: "", teacher: "" , senderClass:null ,ghostId:null})

  const user = useSelector(state => state.auth.user.user)
  console.log(user._id);

  const handleFeedback = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
    console.log(feedback);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(feedback);
    if (feedback.teacher === "") {
      toast.warning('Please Select a Teacher', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else if (feedback.feedback === "") {
      toast.error('Please Enter Feedback', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {

      feedback.senderClass=user.class;
      feedback.ghostId=user._id;
      
      console.log(feedback);
      try {
        const res = await StudentApi.addFeedback(feedback);
        console.log(res);
        toast.success('Feedback Submitted Successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setFeedback({ feedback: "", teacher: "",senderClass:null, ghostId:null });
      }catch(err){
        toast.error('Something went wrong', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      
    }
  }


  return (
    <div className='py-20 h-[500] w-full'>
      <div className='flex flex-col text-center border rounded-lg mx-[5%] font-[Poppins]'>
        <span>Feedback Form</span>

        <form action="">
          <select required={false} id="class" className='md:mx-[3%] w-[25%] border-2 p-2 rounded-md mt-[1%]' type="String" name="teacher" value={feedback.teacher} onChange={handleFeedback} >
            <option value="">Select Teacher</option>
            {
              dummyData.map((item, index) => {
                return (
                  <option key={index} name="teacher" value={item}>{item}</option>
                )
              })
            }
          </select>

          <textarea rows='15' name="feedback" className='md:mx-[3%]  w-[90%] border-2 p-2 rounded-md mt-[1%]' placeholder="Enter your feedback here..." value={feedback.feedback} onChange={handleFeedback} />

          <button className="md:mx-[5%] border-2 py-[1%] px-[3%] rounded-md my-[2%] text-white bg-[var(--buttonBlue)]" onClick={handleSubmit}>Submit</button>
        </form>
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
    </div>
  )
}

export default StudentFeedback
