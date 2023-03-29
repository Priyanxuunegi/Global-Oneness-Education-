import React, { useEffect, useState } from 'react'
import pdf from '../../images/pdf green.png'
import bin from '../../images/bin.png'
import uuid from 'react-uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from '../../config/firebase.js';
import * as TeacherApi from '../../api/TeacherApi';

const TeacherPYQandNotes = () => {
  const user = useSelector(state => state.auth.user.user);

  const [doc, setDoc] = useState({ 'pdfid': null, "name": "", "board": "", "type": "", "subject": "", "classes": null, "size": "", teacherId: null })
  const [file, setFile] = useState([]);
  const [prevdoc, setPrevdoc] = useState([]);

  useEffect(() => {
    TeacherApi.getPreviousUploadedNotes(user.teacherId).then((res) => {
      setPrevdoc(res.data.allnotes);
      console.log(prevdoc);
    }).catch((err) => {
      console.log(err);
      toast.error('Fail to load previous uploaded Documents');
    });
  }, []);

  const updateDoc = (e) => {
    setDoc({ ...doc, [e.target.name]: e.target.value });
    console.log(doc);
  }

  const handleSubmit = (e) => {
    console.log(file);
    if (doc.name === "" || doc.board === "" || doc.type === "" || doc.subject === "" || doc.classes === null) {
      e.preventDefault();
      toast.warning('Please Fill all the Fields');
    } else if (file.length === 0) {
      e.preventDefault();
      toast.warning('Please Select a File');
    }
    else {
      e.preventDefault();

      doc.size = file.size;
      if (doc.size >= 1073741824) { doc.size = (doc.size / 1073741824).toFixed(2) + " GB"; }
      else if (doc.size >= 1048576) { doc.size = (doc.size / 1048576).toFixed(2) + " MB"; }
      else if (doc.size >= 1024) { doc.size = (doc.size / 1024).toFixed(2) + " KB"; }
      else if (doc.size > 1) { doc.size = doc.size + "B"; }
      else if (doc.size === 1) { doc.size = doc.size + "B"; }
      else { doc.size = "0 bytes"; }

      if (file !== null) {

        doc.pdfid = uuid();
        doc.teacherId = user.teacherId;

        const storageRef = ref(storage, `pdf/${doc.pdfid}`);
        uploadBytes(storageRef, file).then((snapshot) => {

        }).catch((error) => {
          toast.error('File Upload Failed');
        });
        console.log(doc);
        TeacherApi.addNotesAndPYQ(doc).then((res) => {
          toast.success('File Uploaded Successfully');

          TeacherApi.getPreviousUploadedNotes(user.teacherId).then((res) => {
            setPrevdoc(res.data.allnotes);
            console.log(prevdoc);
          }).catch((err) => {
            console.log(err);
            toast.error('Fail to load previous uploaded Documents');
          });

        }).catch((err) => {
          toast.error('File Upload Failed');
        });
      } else {
        toast.warning('Please Select a File');
      }
    }
  }

  const openDoc = (pdfid) => {
    const pdfStorageRef = ref(storage, `pdf/${pdfid}`);
    getDownloadURL(pdfStorageRef).then((url) => {
      window.open(url);
    }).catch((error) => {
      toast.error('File Download Failed');
    });
  }

  const deleteDoc = (pdfid) => {
    const pdfDeleteRef = ref(storage, `pdf/${pdfid}`);
    deleteObject(pdfDeleteRef).then(() => {
      TeacherApi.deleteNotesAndPYQ(pdfid).then((res) => {
        toast.success('File Deleted Successfully');
        TeacherApi.getPreviousUploadedNotes(user.teacherId).then((res) => {
          setPrevdoc(res.data.allnotes);
          console.log(prevdoc);
        }).catch((err) => {
          console.log(err);
          toast.error('Fail to load previous uploaded Documents');
        });
      }).catch((err) => {
        toast.error('File Delete Failed');
      });
    }).catch((error) => {
      toast.error('File Delete Failed');
    });
  }

  return (
    <div className='pt-20 mx-[5%] font-[Poppins] md:text-[14px] text-[12px]  '>
      <div className=' py-[2%] flex flex-row justify-between rounded-xl bg-white drop-shadow-xl border '>
        <form className='flex md:flex-row flex-col w-full'>

          <section className='p-[3%]  flex flex-col ml-[5%] text-Start md:w-[30%] '>
            <div className='bg-graydimmer w-[120px] h-[120px]'>
              <img src={pdf} className="p-[3%] justify-center m-auto" alt="pdf icon" />
            </div>
            <span className='text-[12px]'>Upload Document</span>
            <input
              className="block   text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
      file:rounded-xl file:border-2 file:border-[var(--teacherGreen)]
      file:text-sm file:font-semibold 
      file:bg-[var(--teacherGreen)] file:text-white
      hover:file:bg-white hover:file:text-[var(--teacherGreen)] 
    "
              type="file" accept='application/pdf' required={true} onChange={(e) => { setFile(e.target.files[0]) }} />
          </section>

          <section className='flex flex-col md:w-[50%] my-[2%] mx-[5%] sm:mx-[2%] md:mx-[0%]'>
            <div className='flex flex-col justify-around '>
              <div className='flex md:flex-row  flex-col'>
                <select required={true} className='md:mx-[3%] md:w-[50%] w-[100%] bg-graydimmer border-2 p-2 rounded-md my-[2%]' type="String" name='type' onChange={updateDoc} >
                  <option value=" ">Document Type</option>
                  <option value="Notes">Notes</option>
                  <option value="PYQ">PYQ</option>
                </select>

                <select required={true} className='md:mx-[3%] md:w-[50%] w-[100%] bg-graydimmer border-2 p-2 rounded-md my-[2%]' type="String" name="board" onChange={updateDoc}   >
                  <option value=" ">Select Board</option>
                  <option value="ALL">All Boards</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="CISE">CISE</option>
                  <option value="NIOS">NIOS</option>
                  <option value="IB">IB</option>
                  <option value="State Boards"> Other State Boards</option>
                </select>
              </div>
              <input required={true} className='md:mx-[3%] text-black bg-graydimmer border-2 p-2 rounded-md md:my-[2%] mt-[2%]' name="name" placeholder='Name of Document' type="String" onChange={updateDoc} />
            </div>
          </section>

          <section className='flex flex-col md:w-[50%] md:my-[2%] md:mx-[0%] mx-[5%] '>
            <div className=' flex flex-col  justify-around'>
              <select required={true} className='md:mx-[3%] md:w-[70%] w-[100%] bg-graydimmer border-2 p-2 rounded-md my-[2%]' type="String" name='classes' onChange={updateDoc} >
                <option value=" ">Select Class</option>
                {
                  user.classes.map((item, index) => {
                    return (
                      <option key={index} value={item}>{item}</option>
                    );

                  })
                }
              </select>

              <select required={true} className='md:mx-[3%] md:w-[70%] w-[100%] bg-graydimmer border-2 p-2 rounded-md my-[2%]' type="String" name='subject' onChange={updateDoc} >
                <option value=" ">Select Subject</option>
                {
                  user.courses.map((item, index) => {
                    return (
                      <option key={index} value={item}>{item}</option>
                    );

                  })
                }
              </select>
              <button className="md:mx-[3%] border-2 md:w-[70%]  w-[100%] py-[2%] px-[3%] rounded-md my-[2%] bg-graydimmer text-white bg-[var(--teacherGreen)]" onClick={handleSubmit}>Upload</button>

            </div>
          </section>
        </form>
      </div>



      <div className='text-[24px] font-Regular mt-[5%]'>
        <span>Your Documents</span>
        <div className='mb-[5%] mt-[2%]'>
          <hr className='w-full  bg-black h-[2px] rounded-xl' />
        </div>
      </div>


      {
        prevdoc.map((item, index) => {
          return (
            <>
              <div className="flex justify-between flex-row my-[3%] border-2 rounded-2xl bg-[white] hover:cursor-pointer " >
                <div className="flex justify-between flex-row mx-[3%] my-[1%] w-[90%]  bg-[white]  hover:cursor-pointer " onClick={() => { openDoc(item.pdfid) }}>
                  <div className="flex flex-row">
                    <img src={pdf} alt="pdf icon" />
                    <div className="flex flex-col justify-center">
                      <span className="md:text-[18px] text-[16px] font-medium">{item.name}</span>
                      <div className="flex flex-row md:text-[14px] text-[12px] gap-2 text-start">
                        <span>{item.board}</span>
                        <span className="">{item.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* if the pdf is already marked as important then if we want to mark it as not important then we use this markimportant function */}
                <div className="flex  flex-row items-center gap-4 mr-[5%]" onClick={() => { deleteDoc(item.pdfid) }} >
                  <img src={bin} alt="pen" width={"32px"} />
                </div>
              </div>
            </>
          );
        })
      }

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

export default TeacherPYQandNotes
