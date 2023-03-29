import React ,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import SearchBar from '../../component/StudentPYQ&Notes/SearchBar';
import * as StudentApi from '../../api/StudentApi.js'
import DocumentViewer from '../../component/StudentPYQ&Notes/DocumentViewer';

const StudentPYQ = () => {

    const [selectedSubject, setSelectedSubject] =useState("All")
    const user = useSelector(state => state.auth.user.user)
    const [data, setData] = useState([])
    console.log(user);
    
    const setSubject = (e) => {
        console.log(e.target.value);
        setSelectedSubject(e.target.value)
    }

    useEffect(() => {
        const fetchPyq = async () => {
            const data = await StudentApi.getNotes(user.class)
            console.log(data);
            setData(data.data)
        }
        fetchPyq()
    },[]);

    return (
        <div className='pt-20 font-[Poppins]'>

            <select required={false} id="class" className='md:mx-[3%] mx-[5%] border-2 p-2 rounded-md my-[2%]' type="String" value={selectedSubject} onChange={setSubject} >
                <option value="All">All Subjects</option>
                {
                    user.courses.map((item, index) => {
                        return (
                            <option key={index} value={item}>{item}</option>
                        )
                    })
                }
            </select>

            <SearchBar placeholder="Enter File Name..." data={data} />

            <DocumentViewer data={data} studentId= {user.studentId}  selectedSubject ={selectedSubject} currentPage= "PYQ"/>
        </div>
    )
}

export default StudentPYQ
