import React from 'react'
import './StudentDetails.css'
import { useSelector } from 'react-redux';
const StudentDetails = () => {
  const user = useSelector(state => state.auth.user.user);
  return (
    <div className='flex flex-col ml-[5%] mr-[5%] md:mr-[0] font-[Lato] '>
      <span className='text-md mb-[2%] ml-[2%] text-[#727272]'>Overview</span>
      <div className='flex flex-row '>

        <div className='w-[180px] h-[140px] rounded-lg hover:scale-105  transition duration-300 hover:cursor-pointer bg-white  hover:drop-shadow-lg border'>
          <div className="flex flex-col">
            <div className='flex flex-row p-[7%] items-center  '>
              <div className='w-[7px] h-[7px] rounded-lg bg-[#F75836] mr-[5%]'></div>
              <span className='md:text-sm text-[12px]'>Courses in Progress</span>
            </div>
            <h1 className='text-[48px] ml-[8%] font-semibold font-[Poppins]'>{user.courses.length}</h1>
            <hr  className='md:w-[100px] w-[50px] p-[1px] ml-[8%] bg-[#F75836] rounded-md '/>
          </div>
        </div>

        <div className=' card w-[180px] h-[140px] rounded-lg  hover:scale-105  transition duration-300 hover:cursor-pointer bg-white  hover:drop-shadow-lg border ml-[10%]'>
          <div className="flex flex-col">
            <div className='flex flex-row p-[7%] items-center  '>
              <div className='w-[7px] h-[7px] rounded-lg bg-[#79D957] mr-[5%]'></div>
              <span className='md:text-sm text-[12px]'>Test Attempted</span>
            </div>
            <h1 className='text-[48px] ml-[8%] font-semibold font-[Poppins]'>00</h1>
            <hr  className='md:w-[100px] w-[50px]  p-[1px] ml-[8%] bg-[#79D957] rounded-md '/>
          </div>
        </div>

        <div className='card2 w-[180px] h-[140px] rounded-lg hover:scale-105  transition duration-300 hover:cursor-pointer bg-white  hover:drop-shadow-lg border  ml-[10%]'>
          <div className="flex flex-col">
            <div className='flex flex-row p-[7%] items-center  '>
              <div className='w-[7px] h-[7px] rounded-lg bg-[#2B9EDF] mr-[5%]'></div>
              <span className='md:text-sm text-[12px]'>Batch Rank</span>
            </div>
            <h1 className='text-[48px] ml-[8%] font-semibold font-[Poppins]'>00</h1>
            <hr  className='md:w-[100px] w-[50px] p-[1px] ml-[8%] bg-[#2B9EDF] rounded-md '/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetails