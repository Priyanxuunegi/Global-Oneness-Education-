import React from 'react'
import Chart from 'react-apexcharts';

const FeeDonutChart = (props) => {
    return (
        <div>
            <Chart
                width={props.chartwidth}
                height={props.chartheight}
                series={props.chartdata}
                type="donut"
                options={{
                    labels: props.chartlabels,
                    colors: props.chartcolors,

                    plotOptions: {
                        pie: {
                            donut: {
                                labels: {
                                    show: true,
                                    total: {
                                        show: true,
                                        fontSize: '16px',
                                    }
                                }
                            }
                        }
                    }
                }}


            />
        </div >
    )
}

export default FeeDonutChart
