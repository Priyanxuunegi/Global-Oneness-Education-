import React from 'react'
import p from "../../images/pawan_sir.jpeg" 


const About = () => {
    return (
      
        <section id="aboutpage" className='w-5/6 mx-auto py-10  '>
            <h1 className='text-xl sm:text-4xl my-5  font-[Poppins] '> <span className='text-grayDark  sm:text-3xl  '>know about  </span><span className='font-semibold '>GLOBAL ONENESS </span> </h1>
            <div className='sm:flex sm:flex-row  justify-between  items-center  '>
                <div className='sm:order-2 flex flex-col justify-center    ' >
                    <img className='    h-[200px] w-[200px]  m-5   sm:w-[300px] sm:h-[300px]  ' src={p} alt="pawan" />
                    <div className='text-center font-bold '>Director Mr. Pawan Dev Khanduri</div>
                </div>
                <div className=' flex flex-col gap-5 w-full  sm:w-[60%] font-[Poppins]   '>
                    <span>  At Global Oneness, we strive to foster a strong foundation of knowledge and concepts in students, in order to help them achieve their career goals. Our highly qualified and experienced faculty are devoted to providing students with the best academic support and personal care, as well as a platform for the preparation of competitive exams and board level education. We are dedicated to helping our students achieve success in JEE (Main+Advanced), JEE (Main), Pre-Medical (NEET-UG), Pre-Nurture & Career Foundation (Class VI to X, NTSE & Olympiads) and Commerce Education (11th, 12th, CA & CS). We also strive to provide our students with value-based career education, abundant resources, and individual attention, while also being responsible to the parents and society to nurture ethical and responsible career leadership in the children, and to provide a lifelong connection to ethics and excellence in global leaders.</span>

                    <span>  We provide specialized courses for students of classes 11 and 12, to help them prepare for their board exams. Our experienced faculty members guide and mentor the students, to ensure they are well-prepared to face the challenges of the board exams. We also provide personalized attention to each student, so that every student can excel in their respective fields. We strive to provide our students with the best resources and guidance, to ensure their success in the board exams.</span>
                </div>

            </div>
        </section>
    )
}

export default About