import React , {useState , useEffect} from 'react'
import { BsSearch } from "react-icons/bs";

import Record from "../../component/Admin/Record";

const RecordList = ({title ,  DATA}) => {

  useEffect(() => {
    const fetchData = async () => {
      //  const res = await axios.get(`http://localhost:5000/${title}`);
      // setData(res.data);
    };
    // if (query.length === 0 || query.length > 2) fetchData();
  }, []);


    const [data , setData] = useState(DATA);
  const [searchData , setSearchData] = useState("");

  const onChangeInput = (e)=>{
 
    setSearchData(e.target.value)
    
    const newdata = DATA.filter((d)=>{
        return d.name.toLowerCase().includes(searchData.toLowerCase())  || d.id.toLowerCase().includes(searchData.toLowerCase());
    })
 
     setData(newdata);
   
  }
  
  const onSearchData = (e)=>{
    e.preventDefault();
    console.log(searchData.toLowerCase())
    const newdata = DATA.filter((d)=>{
        return d.name.toLowerCase() === searchData.toLowerCase() || d.id.toLowerCase() == searchData.toLowerCase();
    })
     setData(newdata);

  }


  return (
    <div className="flex flex-col gap-5   p-[2%] font-[Roboto]  ">
      <h1 className="font-semibold text-xl ">List of {title}s</h1>
      <form onSubmit={onSearchData} className="flex w-full gap-2 ">
   
       <div className="flex items-center gap-2 p-1 w-full  bg-white rounded-2xl border-2 border-[#BFBFBF]">
          <BsSearch />
          <input  className="w-full p-1 px-3 "  type="text" placeholder="Search by ID/Name" value={searchData} onChange={onChangeInput} />
        </div>
        <button  type="submit" className="bg-orange px-[3%] rounded-2xl">Search</button>
      
      </form>
    { data.length > 0  && <Record data={data} />}
    </div>
  )
}

export default RecordList