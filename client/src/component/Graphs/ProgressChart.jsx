import React from 'react'
import Chart from 'react-apexcharts';

const ProgressChart = (props) => {
    return (
        <div className='mx-[5%] font-[Poppins]'>
            <Chart
                fontFamily='Poppins'
                type='line'
                width={props.chartwidth}
                height={props.chartheight}
                series={props.chartdata}
                options={{
                    chart: {
                        id: 'apexchart-example'
                    },
                    xaxis: {
                        categories: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb',]
                    },
                    stroke: {
                        curve: 'smooth',
                    },
                    yaxis: [
                        {
                            title: {
                                text: 'Marks',
                            },
                            min: 0,
                            max: 100,
                        },
                    ],

                    grid: {
                        yaxis: {
                            lines: {
                                show: false
                            }
                        },
                    }
                }}
            />
        </div>
    )
}

export default ProgressChart