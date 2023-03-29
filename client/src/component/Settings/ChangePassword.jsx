import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeStudentPassword } from '../../features/auth/authAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {

    const [data, setData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '', StudentId: null });

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);

        if (data.newPassword !== data.confirmPassword) {
            toast.error('New Passwords does not match');
            setData({ oldPassword: '', newPassword: '', confirmPassword: '', StudentId: null });
        } else {
            data.StudentId = user.user.user.studentId;
            console.log(data);
            dispatch(changeStudentPassword(data))
            if (user.loading === false) {

                if (user.error !== null) {
                    toast.error(user.error.error);
                }else {
                    toast.success("Password Changed Successfully");
                }
            } 
    
            setData({ oldPassword: '', newPassword: '', confirmPassword: '', StudentId: null });
        }
    }

    const buttonColor = user.user.usertype === "teacher" ? "bg-[#4BB543]" : user.user.usertype === "student" ? "bg-[#6674CC]" : "bg-[#F56968]"
    return (
        <div className='flex pt=[20] flex-col w-[100%] h-[300px] mx-[5%] font-[Poppins] border rounded-lg'>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <span className='mx-[2%] mt-[2%]'> Change Password </span>
                <input className="md:mx-[5%] border-2 p-[2%] rounded-md mt-[5%]"
                    type="password"
                    name='oldPassword'
                    value={data.oldPassword}
                    placeholder="Old Password"
                    onChange={handleChange}
                />
                <input className="md:mx-[5%] border-2 p-[2%] rounded-md mt-[5%]"
                    type="password"
                    name='newPassword'
                    value={data.newPassword}
                    placeholder="New Password"
                    onChange={handleChange}
                />
                <input className="md:mx-[5%] border-2 p-[2%] rounded-md mt-[5%]"
                    type="password"
                    name='confirmPassword'
                    value={data.confirmPassword}
                    placeholder="Confirm New Password"
                    onChange={handleChange}
                />

                <button className='md:mx-[5%] border-2 p-[2%] rounded-md mt-[5%] text-white bg-[var(--buttonBlue)]' onClick={handleSubmit}>Change Password</button>
            </form>

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

export default ChangePassword