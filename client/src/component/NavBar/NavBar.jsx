import React, { useState } from 'react'
import logo from '../../images/global-logo.png'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import './Navbar.css';
import { SidebarData } from './SidebarData';
import Modal from '../ui/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logoutReq } from '../../features/auth/authSlice';


const NavBar = () => {

  const [sidebar, setSidebar] = useState(false);

  const dispatch = useDispatch();

  const showSidebar = () => {
    setSidebar(!sidebar);

  }

  const location = useLocation();
  const user = useSelector(state => state.auth.user)

  const handleLogout = () => {
    console.log('logout');
    dispatch(logoutReq())
  }
  const buttonhoverstyle = user.user.usertype === "teacher" ? "hover:bg-[#4BB543]" : user.user.usertype === "student" ? "hover:bg-[#6674CC]" : "hover:bg-[#F56968]"
  const buttontextcolor = user.user.usertype === "teacher" ? "text-[#4BB543]" : user.user.usertype === "student" ? "text-[#6674CC]" : "text-[#F56968]"
  const buttonbordercolor = user.user.usertype === "teacher" ? "border-[#4BB543]" : user.user.usertype === "student" ? "border-[#6674CC]" : "border-[#F56968]"
         
  return (
    <Modal>
      <>
        <div className='navbar fixed top-0 w-full  bg-[#ffffff] h-[60px] flex justify-between items-center drop-shadow-lg px-[2%] '>
          <div className='flex items-center'>
            <Link to='#' className={(location.pathname === '/home' || location.pathname === '/studentLogin' || location.pathname === '/teacherLogin' || location.pathname === '/adminLogin') ? 'menu-bars ml-4 text-[2rem] md:hidden ' : 'menu-bars ml-4 text-[2rem] '}>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <img src={logo} alt="logo of globla oneness" width={140} className='ml-[3%]' />
          </div>

          {(location.pathname === '/home' || location.pathname === '/studentLogin' || location.pathname === '/teacherLogin' || location.pathname === '/adminLogin') &&
            <div className='w-full md:flex justify-end hidden '>
              <ul className="flex  flex-row list-none  ml-auto mr-[2%] ">
                <li className="nav-item">
                  <Link to='../home'>
                    <span className="px-3 py-2 flex items-center uppercase leading-snug hover:opacity-75 " style={{ fontFamily: 'Poppins', letterSpacing: '3px' }} >HOME</span>
                  </Link>
                </li>

                <li className="nav-item lg:ml-2">
                  <a href='home#about'>
                    <span className="px-3 py-2 flex items-center uppercase leading-snug hover:opacity-75 " style={{ fontFamily: 'Poppins', letterSpacing: '3px' }} >ABOUT</span>
                  </a>
                </li>
                <li className="nav-item lg:ml-2">
                  <a href='#courses'>
                    <span className="px-3 py-2 flex items-center uppercase leading-snug hover:opacity-75 " style={{ fontFamily: 'Poppins', letterSpacing: '3px' }} >COURSES</span>
                  </a>
                </li>

                <li className="nav-item lg:ml-2">
                  <a href='#gallery'>
                    <span className="px-3 py-2 flex items-center uppercase leading-snug hover:opacity-75 " style={{ fontFamily: 'Poppins', letterSpacing: '3px' }} >GALLERY</span>
                  </a>
                </li>
                {!user.user.usertype &&

                  <li className="nav-item">
                    <Link to='../teacherLogin'>
                      <span className="px-3 py-2 flex items-center  uppercase  leading-snug hover:opacity-75 " style={{ fontFamily: 'Poppins', letterSpacing: '3px' }} >EMPLOYEE ZONE</span>

                    </Link>
                  </li>
                }
                {!user.user.usertype &&
                  <li className="nav-item lg:ml-2 ">
                    <Link to='../studentLogin'>
                      <button className=" btn bg-transparent hover:bg-[var(--buttonBlue)] text-[var(--buttonBlue)] font-semibold hover:text-white py-2 px-3  border-[var(--buttonBlue)] border-2 hover:border-transparent rounded" style={{ fontFamily: 'Lato' }}>
                        Student Login
                      </button>
                    </Link>
                  </li>
                }
                {user.user.usertype &&
                  <li className="nav-item lg:ml-2 ">
                    <Link to={`${user.user.usertype === 'student' ? '../studentDashboard' : user.user.usertype === 'admin' ? '../adminDashboard' : '../teacherDashboard'}`}>
                      <span className="px-3 py-2 flex items-center  uppercase  leading-snug hover:opacity-75 " style={{ fontFamily: 'Poppins', letterSpacing: '3px' }} >DASHBOARD</span>
                    </Link>
                  </li>
                }
              </ul>
            </div>
          }
          {user.user.usertype !== '' &&
            <Link to='../home'>
              <button className={`btn bg-transparent ${buttonhoverstyle} ${buttonbordercolor} ${buttontextcolor}  items-end font-semibold hover:text-white py-2 px-3 border-2 hover:border-transparent rounded`} style={{ fontFamily: 'Lato' }} onClick={handleLogout}>
                Logout
              </button>
            </Link>
          }
        </div>
        <nav className={sidebar ? 'nav-menu active ' : 'nav-menu'}>
          <ul className='nav-menu-items w-[100%] overflow-y-scroll scroll scrollbar-hide' onClick={showSidebar}>
            <li className='flex justify-start px-2 gap-2 '>
              <div className=' bg-[#ffffff]  flex justify-start items-center '>
                <Link to='#' className='menu-bars text-[2rem]'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </div>
              <div className='text-stat  text-[20px] py-[16px] cursor-pointer'>
                <span className='font-[Poppins] '> Hello {user.user.firstname}</span>
              </div>
            </li>  
            {user.user.usertype === '' && SidebarData.map((item) => {
              return (
                <div key={item._id}>
                  {(item.title === 'Student Zone' || item.title === 'Admin' || item.title === 'Employee Zone' || item.title === 'Home' || item.title === 'About' || item.title === "AllCourses" || item.title ==="Gallery") &&
                    <li className={location.pathname === item.path ? item.cName + " bg-[var(--buttonBlue)] text-white rounded-l-3xl ml-5" : item.cName} >
                      <a href={item.path}> {item.icon} <span className='pl-[2%] ml-[2%]'>{item.title}</span> </a>
                    </li>
                  }
                </div>
              );
            })}

            {user.user.usertype !== '' &&
              SidebarData.map((item) => {
                const activeSidebaColor = user.user.usertype === "teacher" ? "bg-[#4BB543]" : user.user.usertype === "student" ? "bg-[#6674CC]" : "bg-[#F56968]"
                const hoverstyle = user.user.usertype === "teacher" ? "hover:bg-[#4BB543] rounded-l-3xl ml-5" : user.user.usertype === "student" ? "hover:bg-[#6674CC] rounded-l-3xl ml-5" : "hover:bg-[#F56968] rounded-l-3xl ml-5"
                return (
                  <div key={item._id}>
                    {(item.title !== 'Student Zone' && item.title !== 'Employee Zone' && item.title !== 'Admin' && (item.user === user.user.usertype || item.user === 'Home' || item.user === 'About')) &&
                      <li className={`${location.pathname === item.path ? `${activeSidebaColor}  text-white rounded-l-3xl ml-5 ` : ""} ${hoverstyle} ${item.cName} `}  >
                        <Link to={item.path}>
                          {item.icon}
                          <span className='ml-[7%] '>{item.title}</span>
                        </Link>
                      </li>
                    }
                  </div>
                );
              })
            }
          </ul>
        </nav>
      </>
    </Modal >

  )
}
export default NavBar