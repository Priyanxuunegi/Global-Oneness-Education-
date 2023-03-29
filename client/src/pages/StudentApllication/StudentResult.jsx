import React from 'react'
import FeeDonutChart from '../../component/Graphs/FeeDonutChart';
import ProgressChart from '../../component/Graphs/ProgressChart';
import * as data from '../../Data/Result.json'

const StudentResult = () => {

    const tempdata = {
        "studentId": 12345,
        "Subject": "Math",
        "Date": "2019-01-01",
        "Correct": 70,
        "Incorrect": 26,
        "NotAttempted": 14
    }


    return (
        <div className='pt-20  font-[Poppins]'>

            <span className=' mx-[5%] font-medium text-[20px]'>Progress Report</span>

            <ProgressChart chartwidth='100%' chartheight='400' chartdata={[{
                name: "Chemistry", data: [{ x: "Mar", y: 11 },
                { x: "Apr", y: 41 },
                { x: "May", y: 21 },
                { x: "Jun", y: 51 },
                { x: "Jul", y: 42 },
                { x: "Aug", y: 88 },
                { x: "Sept", y: 99 },
                { x: "Oct", y: 45 },
                { x: "Nov", y: 25 },
                { x: "Dec", y: 36 },
                { x: "Jan", y: 12 },
                { x: "Feb", y: 36 }]
            },
            {
                name: "Physics", data: [{ x: "Mar", y: 21 },
                { x: "Apr", y: 81 },
                { x: "May", y: 61 },
                { x: "Jun", y: 71 },
                { x: "Jul", y: 32 },
                { x: "Aug", y: 88 },
                { x: "Sept", y: 29 },
                { x: "Oct", y: 49 },
                { x: "Nov", y: 54 },
                { x: "Dec", y: 63 },
                { x: "Jan", y: 21 },
                { x: "Feb", y: 66 }]
            }, {
                name: "Maths", data: [{ x: "Mar", y: 41 },
                { x: "Apr", y: 85 },
                { x: "May", y: 56 },
                { x: "Jun", y: 74 },
                { x: "Jul", y: 38 },
                { x: "Aug", y: null },
                { x: "Sept", y: null },
                { x: "Oct", y: 52 },
                { x: "Nov", y: 32 },
                { x: "Dec", y: 63 },
                { x: "Jan", y: null },
                { x: "Feb", y: 79 }]
            }
            ]} />

            <div className='mx-[5%] mt-[3%] font-medium text-[20px]'>Subject Wise Report</div>
            <div className='grid  justify-between md:grid-cols-2 lg:grid-cols-3 mx-[5%] h-[600px] overflow-x-hidden scrollbar-hide  md:gap-[2%]'>

                {
                    data.default.map((item, index) => {
                        return (
                            <div key={index} className='flex flex-row items-center border rounded-2xl my-[3%]'>
                                <div className='flex flex-col'>
                                    <span className='text-[16px] px-[3%] pt-[3%]'>Subject:{item.Subject}</span>
                                    <span className='text-[12px] px-[3%] pb-[3%] text-grayDark'>Test Date:{item.Date}</span>
                                    <FeeDonutChart
                                        chartwidth={350}
                                        chartheight={350}
                                        chartdata={[item.Correct, item.Incorrect, item.NotAttempted]}
                                        chartlabels={['Correct', 'Incorrect', 'NotAttempted']}
                                        chartcolors={['#F2B600', '#FF1752', '#0086FF']}
                                    />
                                </div>
                            </div>
                        )
                    }
                    )
                }

            </div>
        </div>
    )
}

export default StudentResult
