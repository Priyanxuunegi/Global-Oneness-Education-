import React from 'react'
import invoice from "../../images/invoice.png"
import approval from "../../images/approved.png"
import FeeDonutChart from '../Graphs/FeeDonutChart'

const FeeOverview = () => {
  return (
    <div className='font-[Poppins] border h-[400px] min-w-full m-[3%] ml-[5%] rounded-md flex flex-col' >
      <div className='m-[3%] font-semibold font-[Lato]'>
        <span>Fees Payments</span>
      </div>

      <div className='flex flex-row justify-around'>
        <div className='flex-col md:flex hidden'>
          <div className='flex flex-row '>
            <span className='p-2 text-[16px] px-[20%] border-black border-[1px] rounded mr-[-6px]'>Paid</span>
            <span className='p-2 text-[16px] px-[20%] border-black border-[1px] text-white bg-black rounded '>Total</span>
          </div>

          <div className='mt-[5%] md:block hidden'>
            <span className="md:text-[26px] text-[16px] font-[Lato] ">₹ 14000</span>
            <span className='md:text-[16px] text-[10px] text-grayDark '>/20000</span>
          </div>
        </div>

        <div>
          <FeeDonutChart
            chartwidth={260}
            chartheight={260}
            chartdata={[14000, 6000]}
            chartlabels={['Paid', 'Remainig']}
            chartcolors={ ['#505BA0', '#BBC1E6']}

          />
        </div>

        <div className='flex flex-col items-end justify-center'>
          <button className=" btn bg-transparent w-[80px] h-[40px] hover:bg-black text-black  font-semibold hover:text-white py-2 px-3  border-black border-[1px] hover:border-transparent rounded" style={{ fontFamily: 'Lato' }} >
            See All
          </button>
        </div>
      </div>


      <span className='mx-[5%]'>Invoices</span>

      <div className='px-[5%] overflow-x-auto   scrollbar-hide flex flex-col '>
        <div className='flex flex-row mb-[3%] border-2 p-2 rounded-md bg-[white]  hover:scale-105  transition duration-500 hover:drop-shadow-lg hover:cursor-pointer'>
          <img className='w-[32px] h-[32px] mr-[5%]' src={invoice} alt="invoice icon" />
          <span>Invoice IND05/01/2023</span>
          <img className='w-[32px] h-[32px] mx-[5%]' src={approval} alt="approved icon" />
          <span className='text-[#8BC34A]'> Paid</span>
        </div>
        <div className='flex flex-row  mb-[3%] border-2 p-2 rounded-md bg-[white]  hover:scale-105  transition duration-500 hover:drop-shadow-lg hover:cursor-pointer'>
          <img className='w-[32px] h-[32px] mr-[5%]' src={invoice} alt="invoice icon" />
          <span>Invoice IND05/01/2023</span>
          <img className='w-[32px] h-[32px] mx-[5%]' src={approval} alt="approved icon" />
          <span className='text-[#8BC34A]'> Paid</span>
        </div>
        <div className='flex flex-row  mb-[3%] border-2 p-2 rounded-md bg-[white]  hover:scale-105  transition duration-500 hover:drop-shadow-lg hover:cursor-pointer'>
          <img className='w-[32px] h-[32px] mr-[5%]' src={invoice} alt="invoice icon" />
          <span>Invoice IND05/01/2023</span>
          <img className='w-[32px] h-[32px] mx-[5%]' src={approval} alt="approved icon" />
          <span className='text-[#8BC34A]'> Paid</span>
        </div>
      </div>

    </div>
  )
}

export default FeeOverview