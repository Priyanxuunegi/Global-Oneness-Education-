import React, { useState } from "react";


import Carousel from "../../component/Home/Carousel";
import g from "../../images/divider.jpg";
import p from "../../images/dummy-profile-pic.jpg";
import About from "./About";
import { Link } from "react-router-dom";
import TeachersSlide from "../../component/Home/TeachersSlide";

import CoursesList from "../../component/Admin/CoursesList";
import { useSelector } from "react-redux";
import Gallary from "../../component/Admin/Gallary";

const Home = () => {
  const user = useSelector((state) => state.auth.user.user);
  


  return (
    <div id="home" className="">
      {user.usertype === "" && (
        <section className="flex flex-col gap-3">
          <div className="w-5/6 mx-auto  flex flex-row justify-center items-center md:pt-[5%] pt-10 ">
            <h1 className="lg:text-5xl lg:font-bold  sm:text-2xl text-xs font-normal font-[Roboto] text-[var(--colorPrimary)] mt-8">
              10 Day Free Demo Classes!!
            </h1>
            <Link to="../studentRegister">
              <button className=" btn hover:bg-transparent bg-[var(--buttonBlue)] font-[Poppins]  text-white mt-8 ml-8 hover:text-[var(--buttonBlue)]  font-semiboldtext-white py-1 px-2  sm:py-2 sm:px-3  border-[var(--buttonBlue)] border-2 hover:border-[var(--colorPrimary)] rounded">
                Apply Now
              </button>
            </Link>
          </div>
          <span className="flex flex-row mt-[] justify-center items-center text-[var(--grayDark)] ">
            Our result speaks about us !
          </span>
        </section>
      )}

      <Carousel />
      <section className="w-5/6 mx-auto sm:px-[10%]  font-[Poppins] text-center   py-10  ">
        <div className=" bg-white ">
          <h1 className=" sm:text-xl text-sm text-[var(--colorPrimary)] sm:pb-0 pb-[5%]  ">
            OUR STUDENTS LOVE US ❤️{" "}
          </h1>
          <div className="sm:flex  sm:justify-center sm:items-center py-[1%] px-[5%]  ">
            <img
              src={p}
              alt="students studying in institute"
              className="rounded-[150px] w-[90px] h-[90px] sm:w-[150px] sm:h-[150px]  ring-1 ring-[#ffd658] shadow-md  shadow-[#ffd658] mx-auto  "
            />
            <div className="px-[5%] py-[5%] font-medium  sm:text-xl text-sm ">
              Teacher covered all topics in a structured manner which makes you
              want to study. They have made the course easy to understand for
              students. I will also get my sister to enroll ." VARAD INGALE
            </div>
          </div>
        </div>
      </section>
      <section
        style={{ backgroundImage: `url(${g})` }}
        className=" h-[200px] font-[Poppins] flex justify-around items-center  text-white  sm:font-semibold text-center sm:text-xl  "
      >
        <div>
          <span> Best </span>
          <div> Result </div>
        </div>
        <div>
          <span> 1000+ </span>
          <div> Student Taught </div>
        </div>

        <div>
          <span> Best</span>
          <div> Faculty </div>
        </div>
      </section>
      <TeachersSlide />

      <About/>
      <CoursesList />

      <Gallary/>
      
      <section className="font-[Poppins] ">
        <h1 className="text-3xl font-semibold w-5/6 mx-auto  py-10 ">
          Visit Our Center{" "}
        </h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1167.1337449959974!2d78.03165136870169!3d30.282019460174578!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929ccf6910483%3A0x6c5f7ee06e119885!2sGlobal%20Oneness!5e0!3m2!1sen!2sin!4v1677933166313!5m2!1sen!2sin"
          height="500"
          className="mx-auto   w-full ring-4 ring-orange     "
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
};

export default Home;
