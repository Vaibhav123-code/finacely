import React from 'react'
import {Line, Pie} from "@ant-design/charts"
import { useState } from 'react'

function ChartComponent({sortedTransections}) {
  const [showSpending, setShowSpending] = useState(false);
  
  const toggleGraph = () => {
    setShowSpending(!showSpending);
  }
  
    const data = sortedTransections.map((item)=>{
      return { date: item.date, amount: item.amount}
    })
  // your analytics
    const config = {
      data:data,
      autoFit:false,
      xField: 'date',
      yField: 'amount',
    };
    //income data
    let incomeData = sortedTransections.filter((transection) => {
      if( transection.type === "income"){
        return { tag: transection.tag, amount: transection.amount}
      }
    });
    let finalIncome = incomeData.reduce((acc, obj) => {
      console.log("obj", obj)
      let key = obj.tag;
      if(!acc[key]) {
        acc[key] = { tag: obj.tag, amount: obj.amount}; //create new object with same propertiesd
      }else {
        acc[key].amount += obj.amount; //add the amount to the existing object
      }
      console.log("acc", acc)
      return acc;
    },{})

   //spending data
    let spendingData = sortedTransections.filter((transection) => {
      if( transection.type === "expense"){
        return { tag: transection.tag, amount: transection.amount}
      }
    });
    
    let finalSpendings = spendingData.reduce((acc, obj) => {
      console.log("obj", obj)
      let key = obj.tag;
      if(!acc[key]) {
        acc[key] = { tag: obj.tag, amount: obj.amount}; //create new object with same propertiesd
      }else {
        acc[key].amount += obj.amount; //add the amount to the existing object
      }
      console.log("acc", acc)
      return acc;
    },{})

    const incomeConfig = {
      data: Object.values(finalIncome),
      angleField: 'amount',
      colorField: 'tag',
    }
  const spendingConfig = {
    data: Object.values(finalSpendings),
    angleField: 'amount',
    colorField: 'tag',
  }


 let chart;
 let pieChart;
  return (
    <div className='charts-wrapper'>
       <div className='chart1'>
        <h2>Your Analytics</h2>
       <Line {...config} onReady={(chartInstance) => (chart = chartInstance)}
       style={{marginBottom:"1.5rem", width:"80%"}} />
    </div>

    <div className='chart2'>
      <button onClick={toggleGraph}className='btn chart-btn' >
         show {showSpending ? "income" : "spending"}
      </button>
      <h2>Your {showSpending ? "Spendings" : "Income"}</h2>

      {
        showSpending ? ( <Pie {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)}
        style={{marginBottom:"1.5rem"}} /> ) :
        (  <Pie {...incomeConfig} onReady={(chartInstance) => (pieChart = chartInstance)}
        style={{marginBottom:"1.5rem"}} /> )
      }     
    </div>
</div>
  )
}

export default ChartComponent