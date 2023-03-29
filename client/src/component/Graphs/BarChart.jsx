import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ title , datax, datay }) => {
  return (
    <div className="bg-white p-2 rounded snap-x ">
      <Chart
        type="bar"
        width={350}
        height={300}
        series={[
          {
           
            data: datay,
          },
        ]}
        options={{
     
         plotOptions : {
            bar:{
              columnWidth : "20%"
            }
         },
      
          title: {
            text: `${title}`,
            style: { fontSize: 20, fontWeight: 500 },
          },
          colors: ["#6B68F5"],
          theme: { mode: "light" },
         

          xaxis: {
            tickPlacement: "on",
            categories: datax,
            labels:{
              style :{fontSize : 7}
            }
          },
          yaxis: {
            // min : 0 ,
            // max :
            labels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: { fontSize: 8, colors: ["#767474"] },
            },
          },
          legend: {
            show: true,
            position: "right",
          },
          dataLabels: {
            formatter: (val) => {
              return `${val}`;
            },
          
            style: {
              colors: ["#767474", "#E91E63", "#9C27B0"],
              fontSize: 10,
            },
          },
        }}
      >
       
      </Chart>
    </div>
  );
};

export default BarChart;
