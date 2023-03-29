import React, { useState } from "react";
import * as HiIcon from 'react-icons/hi';
import * as AiIcons from 'react-icons/ai';
import pdf from "../../images/pdf.png"


function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs flex border-2 rounded-2xl mx-[3%] mt-[2%] items-center">

        <div className="searchIcon  pl-[2%] text-[24px] bg-white grid place-items-center">
          {filteredData.length === 0 ? (
            <HiIcon.HiOutlineSearch className="font-[35px]" />
          ) : (
            <AiIcons.AiOutlineClose id="clearBtn" onClick={clearInput} />
          )}
        </div>

        <input
          className="bg-white focus:outline-none font-[18px] p-5 mx-[2%] h-[30px] w-full"
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />

      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult w-[90%] h-[200px] bg-white overflow-x-hidden rounded-xl mb-[5%] scrollbar-hide border mx-[4%]">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div  key= {key} className="flex flex-row m-[2%]">
                <img src={pdf} alt="pdf icon" />
                <div className="flex flex-col  justify-center">
                  <span className="text-[18px] font-medium">{value.name}</span> 
                  <div className="flex flex-row text-[14px] gap-2 text-start">
                    <span>{value.Board}</span>
                    <span className="">{value.size}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;