import React from 'react'
import {Line} from "@ant-design/charts"

function ChartComponent({sortedTransections}) {
    const data = sortedTransections.map((item)=>{
      return { date: item.date, amount: item.amount}
    })

    const config = {
      data,
      width:800,
      height:400,
      autoFit:false,
      xField: 'date',
      yField: 'amount',
      point:{
        size: 5,
        shape: "diamond",
      },
      label: {
        style:{
          fill:"#aaa",
        },
      },
    };
 let chart;
  return (
    <div>
       <Line {...config} onReady={(chartInstance) => (chart = chartInstance)}
       style={{marginBottom:"1.5rem"}} />
    </div>
  )
}

export default ChartComponent