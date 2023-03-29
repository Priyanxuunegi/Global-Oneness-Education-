import React from "react";
import { CiFacebook, CiTwitter, CiLinkedin, CiInstagram } from "react-icons/ci"
import { useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {

    const location = useLocation();
    const user = useSelector(state => state.auth.user.user)
    const d = new Date();

    return (
        <footer className="bg-gray-900 text-white font-[Lato]  mt-auto ">

            {user.usertype === "" &&
                <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
                    <h1
                        className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
         md:w-2/5"
                    >
                        <span className="text-logo-color  ">Get</span> started with us
                    </h1>
                    <div>
                        <Link to='../studentRegister'>
                            <button
                                className="bg-logo-color hover:bg-yellow-500 duration-300 px-10 py-2.5 font-[Poppins]
           rounded-md text-white md:w-auto w-full"
                            >
                                Apply
                            </button>
                        </Link>
                    </div>
                </div>
            }
            <div className="grid grid-cols-1 sm:grid-cols-3  sm:justify-items-center gap-8   py-10 w-5/6 mx-auto ">
                <ul className=" ">
                    <h1 className="mb-1 text-xl font-semibold">About Us</h1>

                    {(location.pathname === '/home' || location.pathname === '/studentLogin' || location.pathname === '/teacherLogin' || location.pathname === '/adminLogin') && (user.usertype === '' || user.usertype === 'admin') &&
                        <li  >
                            <a className="text-gray-400 hover:text-logo-color       text-sm cursor-pointer   " href="../adminDashboard" >
                                Admin
                            </a>
                        </li>}
                    <li  >

                        <a className="text-gray-400 hover:text-logo-color       text-sm cursor-pointer   " href="" >
                            Global Onesness
                        </a>

                    </li>
                    <li >

                        <a className="text-gray-400 hover:text-logo-color    text-sm cursor-pointer   " href="" >
                            Our Inspiration
                        </a>

                    </li>
                    <li >

                        <a className="text-gray-400 hover:text-logo-color    text-sm cursor-pointer   " href="" >
                            Director's Message
                        </a>

                    </li>
                </ul>
                <ul className=" ">
                    <h1 className="mb-1  text-xl font-semibold">Courses And Programmes</h1>

                    <li >

                        <a className="text-gray-400 hover:text-logo-color    text-sm cursor-pointer   " href="" >
                            JEE{"(Mains & Advanced"}
                        </a>

                    </li>
                    <li >

                        <a className="text-gray-400 hover:text-logo-color     text-sm cursor-pointer   " href="" >
                            Pre-Medical NEET
                        </a>

                    </li>
                    <li >

                        <a className="text-gray-400 hover:text-logo-color      text-sm cursor-pointer   " href="" >
                            Class 6th to 10th
                        </a>

                    </li>
                    <li >

                        <a className="text-gray-400 hover:text-logo-color     text-sm cursor-pointer   " href="" >
                            Class 11th to 12th
                        </a>

                    </li>
                </ul>
                <ul className=" ">
                    <h1 className="mb-1 text-xl font-semibold">Result</h1>

                    <li >

                        <a className="text-gray-400 hover:text-logo-color      text-sm cursor-pointer   " href="" >
                            IIT  JEE
                        </a>

                    </li>
                    <li >

                        <a className="text-gray-400 hover:text-logo-color     text-sm cursor-pointer   " href="" >
                            NEET {"(UG)"}
                        </a>

                    </li>
                    <li >

                        <a className="text-gray-400 hover:text-logo-color    text-sm cursor-pointer   " href="" >
                            Class 6th-10th
                        </a>

                    </li>
                    <li >

                        <a className="text-gray-400 hover:text-logo-color    text-sm cursor-pointer   " href="" >
                            Class 11th-12th
                        </a>

                    </li>
                </ul>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
                <span>© {d.getFullYear()} Appy. All rights reserved.</span>
                <div>
                    <Link className="text-gray-400 hover:text-logo-color text-sm cursor-pointer" to="termsofuse" >Terms </Link>
                    <Link to="privacypolicy" className="text-gray-400 hover:text-logo-color text-sm cursor-pointer" >· Privacy Policy</Link>
                    <Link to="refundandcancellatoin" className="text-gray-400 hover:text-logo-color text-sm cursor-pointer" >· Refund and Cancellation</Link>

                </div>


                <div className="text-logo-color">

                    <span className="p-2 cursor-pointer inline-flex items-center   rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-logo-color    duration-300 "    >
                        <CiFacebook />
                    </span>
                    <span className="p-2 cursor-pointer inline-flex items-center   rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-logo-color    duration-300 "    >
                        <CiTwitter />
                    </span>
                    <span className="p-2 cursor-pointer inline-flex items-center   rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-logo-color    duration-300 "    >
                        <CiLinkedin />
                    </span>
                    <span className="p-2 cursor-pointer inline-flex items-center   rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-logo-color    duration-300 "    >
                        <CiInstagram />
                    </span>


                </div>

            </div>
            <div className="w-full font-[Poppins]  gap-1 text-gray-400 text-sm flex justify-center   ">
                Devloped By : <a target="_blank" href="https://www.linkedin.com/in/ashutoshuniyal-012/">Ashutosh </a>&<a  target="_blank" href="https://www.linkedin.com/in/ankit-rawat-2397791bb/">Ankit </a> &<a  target="_blank" href="https://www.linkedin.com/in/priyanshu-negi-839b41203/">Priyanshu </a> 
            </div>
        </footer>
    );
};

export default Footer;