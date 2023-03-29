import pdf from "../../images/pdf.png"
import React, { useState, useEffect } from 'react'
import * as AiIcon from 'react-icons/ai';
import *as StudentReq from '../../api/StudentApi.js'
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../../config/firebase.js';

const DocumentViewer = ({ data, studentId, selectedSubject, currentPage }) => {

    const [important, setImportant] = useState(null) //this will store the important pdfs
    let fetchedData = {}
    const [all, setAll] = useState(true)    //if this state is true then all pdfs will be shown else only important pdfs will be shown
    const userCourses = useSelector(state => state.auth.user.user.courses)

    //fetchdata and set it to important
    useEffect(() => {
        const fetchdata = async () => {
            fetchedData = await StudentReq.getAllImportantPdf(studentId)
            setImportant(fetchedData.data)
        }
        fetchdata()
    }, [studentId])

    //this function will mark the pdf as important and if already marked important it will unmark it.
    const markImportant = (id) => {
        const updataeImportant = async () => {
            currentPage === "PYQ" ? fetchedData = await StudentReq.addImportantPYQ({ studentId: studentId, ImportantPYQ: id })
                : fetchedData = await StudentReq.addImportantNotes({ studentId: studentId, ImportantNotes: id })
            setImportant(fetchedData.data)
        }
        updataeImportant()
    }

    const openDoc = (pdfid) => {
        const pdfStorageRef = ref(storage, `pdf/${pdfid}`);
        getDownloadURL(pdfStorageRef).then((url) => {
            window.open(url);
        }).catch((error) => {
            toast.error('File Download Failed');
        });
    }

    return (
        <div>
            <div className='flex mx-[3%] my-[2%] gap-[5%] font-medium '>
                <span className={`  ${all ? "text-red-600" : "text-black"}`} onClick={() => setAll(true)}>{currentPage === "PYQ" ? 'All PYQs' : "All Notes"}</span>
                <span className={` ${!all ? "text-red-600" : "text-black"}`} onClick={() => setAll(false)}>{currentPage === "PYQ" ? "Important PYQs" : "Important Notes"}</span>
            </div>

            <div className='flex flex-col w-full h-[500px] overflow-x-hidden scrollbar-hide'>
                {console.log(important)}
                {
                    data.map((value, key) => {
                        if (all) {   //if the all page is selected
                            if ((selectedSubject === "All" || selectedSubject === value.subject) && value.type === currentPage) { //then check if the subject is selected or not
                                if (userCourses.includes(value.subject)) { //then check if the subject is in the user courses or not
                                    return (

                                        <div key={key} className="flex justify-between flex-row mx-[3%] my-[1%] border-2 rounded-2xl bg-[white] hover:drop-shadow-lg hover:cursor-pointer ">

                                            <div className="flex flex-row w-[90%]" onClick={() => { openDoc(value.pdfid) }} >
                                                <img src={pdf} alt="pdf icon" />
                                                <div className="flex flex-col justify-center">
                                                    <span className="text-[18px] font-medium">{value.name}</span>
                                                    <div className="flex flex-row text-[14px] gap-2 text-start">
                                                        <span>{value.board}</span>
                                                        <span className="">{value.size}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* if the important page is selected then it will mark the star as yellow else black */}
                                            {
                                                important !== null ? //if there are no important pdfs then it will show the star as black
                                                    <div className="flex items-center w-[40px] mr-[5%] " onClick={() => markImportant(value.pdfid)} >
                                                        {
                                                            (currentPage === "PYQ" ? important.ImportantPYQ.includes(value.pdfid) : important.ImportantNotes.includes(value.pdfid)) ?
                                                                <AiIcon.AiFillStar className="text-[20px] text-yellow-400 mx-[2%] my-[2%] " />
                                                                : <AiIcon.AiOutlineStar className="text-[20px] text-black mx-[2%] my-[2%] " />
                                                        }
                                                    </div>
                                                    : <div className="flex items-center w-[40px] mr-[5%] " onClick={() => markImportant(value.pdfid)} >
                                                        <AiIcon.AiOutlineStar className="text-[20px] text-black mx-[2%] my-[2%] " />
                                                    </div>
                                            }
                                        </div>
                                    );
                                }
                            }
                        } else { //if the important pdf page is selected
                            if (selectedSubject === "All" || selectedSubject === value.subject) { //then check if the subject is selected or not
                                if (important !== null && important.ImportantPYQ.includes(value.pdfid) && currentPage === "PYQ") { // use to render the pyq only  if they exist in the important pdfs
                                    return (
                                        <div key={key} className="flex justify-between flex-row mx-[3%] my-[1%] border-2 rounded-2xl bg-[white]  hover:drop-shadow-lg hover:cursor-pointer ">

                                            <div className="flex flex-row w-[90%]" onClick={() => { openDoc(value.pdfid) }}>
                                                <img src={pdf} alt="pdf icon" />
                                                <div className="flex flex-col justify-center">
                                                    <span className="text-[18px] font-medium">{value.name}</span>
                                                    <div className="flex flex-row text-[14px] gap-2 text-start">
                                                        <span>{value.Board}</span>
                                                        <span className="">{value.size}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* if the pdf is already marked as important then if we want to mark it as not important then we use this markimportant function */}
                                            <div className="flex items-center mr-[5%]" onClick={() => markImportant(value.pdfid)} >
                                                <AiIcon.AiFillStar className="text-[20px] text-yellow-400 mx-[2%] my-[2%] " />
                                            </div>
                                        </div>
                                    );
                                } else if (important !== null && important.ImportantNotes.includes(value.pdfid) && currentPage === "Notes") { // use to render the notes only  if they exist in the important pdfs
                                    return (
                                        <div key={key} className="flex justify-between flex-row mx-[3%] my-[1%] border-2 rounded-2xl bg-[white]  hover:drop-shadow-lg hover:cursor-pointer ">

                                            <div className="flex flex-row w-[90%]" onClick={() => { openDoc(value.pdfid) }}>
                                                <img src={pdf} alt="pdf icon" />
                                                <div className="flex flex-col justify-center">
                                                    <span className="text-[18px] font-medium">{value.name}</span>
                                                    <div className="flex flex-row text-[14px] gap-2 text-start">
                                                        <span>{value.Board}</span>
                                                        <span className="">{value.size}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* if the pdf is already marked as important then if we want to mark it as not important then we use this markimportant function */}
                                            <div className="flex items-center mr-[5%]" onClick={() => markImportant(value.pdfid)} >
                                                <AiIcon.AiFillStar className="text-[20px] text-yellow-400 mx-[2%] my-[2%] " />
                                            </div>
                                        </div>
                                    );
                                }
                            }
                            else {
                                return null
                            }
                        }
                    })
                }
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
        </div >
    )
}

export default DocumentViewer
