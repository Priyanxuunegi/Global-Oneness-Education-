import React from 'react'

const Record = ({ data }) => {
    const data_header = Object.keys(data[0]);
    for (var i = 0; i < data_header.length; i++) {
      data_header[i] = data_header[i].charAt(0).toUpperCase() + data_header[i].slice(1);
  
  }
    
  const s =   (data_header.length === 9 ) ? "grid-cols-9 " : "grid-cols-8"
    return (
      <>
       <div className='hidden  lg:block'>
       <div className={`grid ${s} gap-4 px-[1%]  font-medium `}>
          {data_header.map((d) => {
            return <span key={Math.random()}> {d} </span>;
          })}
        </div>
        <div className=" ">
          {data.map((d) => {
            return (
              <div key={d.id} className={`grid ${s}  text-grayDark w-full items-center  bg-white my-[1%] rounded-md  gap-4 p-[1%]`}>
                <span className='text-sky-500 font-medium'> #{d.id} </span>
                <img src={d.photo} className="w-[30%] " />
                <span> {d.name} </span>
                <span> {d.gender} </span>
                <span> {d.course} </span>
                <span> {d.joiningDate} </span>
                <span className="overflow-hidden"> {d.email} </span>
                <span> {d.phone} </span>
                <span> {d.salary} </span>
              </div>
            );
          })}
        </div>
       </div>
       <div className='lg:hidden grid md:grid-cols-2 sm:grid-cols-2 gap-3'>
  
          {data.map((d) => {
            return (
              <div key={d.id}  className=' bg-white p-4 rounded-lg shadow flex justify-start sm:items-start items-center gap-4 '>
              <img src={d.photo} className="w-[30%]  " alt='photo alter' />
              <div  className={`flex flex-col item-center -space-y-1 text-grayDark  rounded-md  text-sm `}>
             
                <span className='text-sky-500 font-medium'> #{d.id} </span>
                <span className='font-medium'> {d.name} </span>
                <span className='text-xs'> {d.gender} </span>
                <span>Course: {d.course} </span>
                <span> D.O.J: {d.joiningDate} </span>
                <span className="overflow-hidden "> {d.email} </span>
                <span> Ph: {d.phone} </span>
                <span>{data_header[8]} {d.salary} </span>
               
              </div>
              </div>
            );
          })}
        </div>

        
      </>
    );
  };

  export default Record