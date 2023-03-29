import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ChangePassword from '../../component/Settings/ChangePassword'
import pic from "../../images/dummy-profile-pic.jpg"
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";
import { changeAdminPassword } from '../../features/auth/authAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSetting = () => {


    const [data, setData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '', adminId: null });
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    console.log("user", user.user.user.firstname)
    const [imgRef, serImgRef] = useState(null);

    useEffect(() => {
        const fetchImg = async () => {
            const imgStorageRef = ref(storage, `profile/${user.user.user.photo}`);
            console.log("imgStorageRef", imgStorageRef)
            getDownloadURL(imgStorageRef)
                .then((url) => {
                    serImgRef(url);
                    console.log("url", url)
                }).catch((error) => {
                    console.log(error);
                });
        }
        fetchImg();
        console.log("imgref", imgRef)
    }, [])


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);

        if (data.newPassword !== data.confirmPassword) {
            toast.error('New Passwords does not match');
            setData({ oldPassword: '', newPassword: '', confirmPassword: '', adminId: null });
        } else {
            data.adminId = user.user.user.adminId;
            console.log(data);
            dispatch(changeAdminPassword(data))

            if (user.loading === false) {
                if (user.error !== null) {
                    toast.error(user.error.error);
                } else {
                    toast.success("Password Changed Successfully");
                }
            }

            setData({ oldPassword: '', newPassword: '', confirmPassword: '', adminId: null });
        }
    }

    return (
        <div className='flex flex-col md:flex-row pt-20  gap-10 mx-[5%]'>
            <section className='flex md:flex-row flex-col w-full border rounded-xl h-full p-5 bg-white'>
                <div className='flex flex-col my-[3%] items-center'>
                    <span className='font-[Poppins] text-[20px]'>Your Details</span>
                    <img src={imgRef ? imgRef : pic} className="w-[180px] object-contain h-[180px]" />
                </div>
                <div className='flex flex-col mx-[3%] gap-y-3 font-[Poppins] w-full '>
                    <div className='flex flex-row border p-2 gap-2 rounded-lg w-full '><span>Name:</span> <span className='font-light text-graylight '>{user.user.user.firstname + " " + user.user.user.lastname}</span></div>
                    <div className='flex flex-row border p-2 gap-2 rounded-lg w-full '><span>Admin ID:</span><span className='font-light text-graylight '>{user.user.user.adminId}</span></div>
                    <div className='flex flex-row border p-2 gap-2 rounded-lg w-full '><span>Phone Number:</span> <span className='font-light text-graylight '>{user.user.user.phone}</span></div>
                    <div className='flex flex-row border p-2 gap-2 rounded-lg w-full '><span>Email:</span> <span className='font-light text-graylight '>{user.user.user.email}</span></div>
                    <div className='flex flex-row border p-2 gap-2 rounded-lg w-full '><span>Address:</span> <span className='font-light text-graylight '>{user.user.user.address}</span></div>
                </div>

            </section>

            <section className='flex flex-col md:w-[40%] md:h-[500px] items-center '>
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

                        <button className='bg-[#F56968] md:mx-[5%] border-2 p-[2%] rounded-md mt-[5%] text-white bg-[var(--buttonBlue)]' onClick={handleSubmit}>Change Password</button>
                    </form>
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
            </section>
        </div>
    )
}

export default AdminSetting
