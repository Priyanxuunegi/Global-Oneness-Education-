import React from 'react'
import StudentDetails from '../../component/StudentDashboard/StudentDetails'
import CourseDetails from '../../component/StudentDashboard/CourseDetails'
import UpcommingTest from '../../component/StudentDashboard/UpcommingTest'
import FeeOverview from '../../component/StudentDashboard/FeeOverview'
import Announcement from '../../component/StudentDashboard/Accouncement'


const StudentDashboard = () => {

  
  return (

    <div className='pt-20 flex flex-col '>
    
      <div className='flex md:flex-row flex-col '>
        <div className="felx flex-col md:w-[66%] w-full ">
          <StudentDetails />
          <CourseDetails />
        </div>

        <div className="flex md:w-[33%] w-full md:h-auto h-[450px]">
          <UpcommingTest />
        </div>

      </div>


      <div className='flex md:flex-row  flex-col justify-center '>

        <div className='flex md:w-[50%] mr-[5%] ml-[1%] flex-row'>
          <FeeOverview />
        </div>

        <div className='flex md:w-[50%]  mr-[10%]   flex-row'>
          <Announcement />
        </div>

      </div>

    </div>
  )
}

export default StudentDashboard