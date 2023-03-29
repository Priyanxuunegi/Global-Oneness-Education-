import React  from 'react'
import p1 from "../../images/pawan_sir.jpeg"
import p2 from "../../images/rahul.jpeg"
import p3 from "../../images/satpal.jpeg"
import p4 from "../../images/richa.jpeg"
import p5 from "../../images/manoj.jpeg"
import p6 from "../../images/gaurav.jpeg"


const dummy_teacher = [
  {
    id: 1,
    name: "Pawan Dev Khanduri",
    course: " Director & HOD Chemistry",
    src: p1
  },
  {
    id: 2,
    name: "Rahul Mehra",
    course: "Co-Director & HOD Maths",
    src: p2
  },
  {
    id: 3,
    name: "Satpal Rana",
    course: "HOD Commerce & Accounts",
    src: p3
  },
  {
    id: 4,
    name: "Chhavi Barthwal",
    course: "HOD Biology",
    src: p4
  },
  {
    id: 5,
    name: "Manoj Rawat",
    course: "HOD Physics",
    src: p5
  },
  {
    id: 6,
    name: "Gaurav Bhatt ",
    course: "AP Maths ",
    src: p6
  }
]





const TeachersSlide = () => {

 

  return (
    <section className='sm:w-5/6 mx-auto p-2  py-10    '>
      <div>
      <h1 className='text-xl sm:text-4xl my-10 font-bold font-[Roboto] '>Our faculty </h1>
        <div className='grid grid-flow-col auto-cols-max  overflow-x-auto   scrollbar-hide gap-10  sm:gap-20 ' >
          {dummy_teacher.map((t) => {
          
            return (
              <div key={t.id} className="flex flex-col     text-center " >
                <img className='w-[200px] h-[200px] rounded-[200px] drop-shadow-2xl   ' src={`${t.src}`}  alt="imagejkvfd" />
                <span className='text-xl mt-5 mb-1'> {t.name}</span>
                <span className='text-sm mb-5 '> {t.course}</span>

              
              </div>
            )
          })}
        
        </div>
      </div>

    </section>
  )
}

export default TeachersSlide