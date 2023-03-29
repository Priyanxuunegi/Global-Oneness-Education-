import React from 'react'
import Physics from "../../images/Physics.png"

const CourseDetails = () => {
  return (
    <div className='font-[Poppins] border m-[3%] ml-[5%]  rounded-md  bg-white drop-shadow-lg'>

      <div className='md:text-[16px] text-[12px]  m-[2%] ml-[5%] mb-[2%]'>
        <span  >Enrolled Courses</span>
      </div>

      <div className='justify-around flex md:text-[16px] text-[12px]  ml-[2%] text-[#BFBFBF] '>
        <span>Course Title</span>
        <span>Lesson Completed</span>
        <span>Classes Attended</span>
        <span>Faculty Assigned</span>
      </div>


      <hr className=' p-[1px] m-[2%] bg-[#727272] rounded-md ' />



      <div className='h-[250px]  overflow-x-auto  scrollbar-hide'>
        <div className='flex flex-row justify-around  md:text-[16px] text-[10px] font-[Poppins]'>

          <div className='flex felx-row justify-start items-center'>
            <img className="md:flex hidden w-9 h-9 mr-1" src={Physics} />
            <span className="">Physics</span>
          </div>

          <span>100/200(50%)</span>
          <span>56</span>
          <span>Rahul Mehra</span>

        </div>

      </div>

    </div>
  )
}

export default CourseDetails