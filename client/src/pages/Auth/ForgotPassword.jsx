import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as AuthApi from '../../api/AuthApi'

const ForgotPassword = () => {
    const [userDetail, setUserDetail] = useState({ email: "", userId: null, password: "534658", usertype: "" })

    const onChangeHandler = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setUserDetail((pre) => {
            return { ...pre, [key]: value }
        })
    }

    const submitReq = async (e) => {
        if (userDetail.email === "" || userDetail.userId === null || userDetail.usertype === "") {
            toast.error("Please fill all the fields");
        }
        e.preventDefault();
        console.log(userDetail);
        try {
            const response = await AuthApi.forgotPassword(userDetail);
            console.log(response);
            toast.success(response.data.message);
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.error);
        }
    }

    return (
        <div className='min-h-[100vh] flex justify-center items-center font-[Poppins]'>
            <div className='flex flex-col items-center justify-center h-full border rounded-xl'>
                <div className='flex flex-col items-center justify-center w-[400px] h-[400px] bg-white rounded-xl shadow-lg p-[20px]'>
                    <h1 className='text-3xl font-semibold mb-[3%]'>Forgot Password</h1>
                    <p className='text-gray-500'>Enter your email address and we'll send you an email with instructions to reset your password.</p>
                    <form className='flex flex-col w-full mt-8' onSubmit={submitReq}>
                        <input type='email' required={true} placeholder='Email' className='border-2 border-gray-300 p-2 rounded-md mb-4' value={userDetail.email} name="email" onChange={onChangeHandler} />
                        <input type='number' required={true} placeholder='Student/Admin/Teacher ID' className='border-2 border-gray-300 p-2 rounded-md mb-4' name="userId" value={userDetail.userId} onChange={onChangeHandler} />
                        <select required={true} className='border-2 border-gray-300 p-2 rounded-md mb-4' type="string" name="usertype" value={userDetail.usertype} onChange={onChangeHandler}>
                            <option value=""   >User Type</option>
                            <option value="student" >Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button className='bg-[#ff6b00] text-white p-2 rounded-md'>Send Email</button>
                    </form>
                </div>
            </div>
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
    )
}

export default ForgotPassword
