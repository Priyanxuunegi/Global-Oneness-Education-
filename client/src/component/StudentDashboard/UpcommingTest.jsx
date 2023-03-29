import React from 'react'
import Physics from  "../../images/Physics.png"

const UpcommingTest = () => {
  return (
    <div className='w-full mt-[5%] mb-[5%] justify-center items-center text-center  border rounded-lg md:ml-[15%] md:mr-[15%] ml-[5%] mr-[5%] font-[Poppins] bg-[white] drop-shadow-lg '>
    
    <div className='p-[3%]'>
      <span >Upcomming Test </span>
    </div>
     

     <div className='overflow-x-auto  h-[500px] scrollbar-hide'>
     <div className='flex felx-row justify-start pl-[3%] p-[2%] mt-[2%]  items-center border bg-[white]  hover:scale-110  transition duration-500 hover:drop-shadow-lg hover:cursor-pointer rounded-lg ml-[20%] mr-[20%]'>
          <img src={Physics} className='w-9 h-9 mr-1'/>
          <div className='flex flex-col justify-start items-start'>
          <span className="">Physics</span>
          <span className='text-[var(--orange)] text-[10px]'>15 May</span>
          </div>
          
      </div>
     </div>
    </div>
  )
}

export default UpcommingTest