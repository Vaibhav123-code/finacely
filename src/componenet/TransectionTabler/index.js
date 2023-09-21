import { Button, Radio, Select, Table } from 'antd'
import React, { useState } from 'react'
import searchImg from '../../assets/searchImg.webp'
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';

function TransectionTable({ transections, addTransection, fetchTransections }) {
  const [search,setSearch] = useState("");
  const [typeFilter,setTypeFilter] = useState("");
  const { Option } = Select;
  const [sortKey, setSortKey] = useState("");

  const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount"
    },
    {
        title: "tag",
        dataIndex: "tag",
        key:"tag"
    },
    {
        title:"Date",
        dataIndex:"date",
        key:"date"
    }
  ]
  
  let filteredTransections = transections.filter((item) => (
    item.name.toLowerCase().includes(search.toLowerCase()) && 
    item.type.includes(typeFilter)  
  ));

  let sortedTransections = filteredTransections.sort((a,b) => {
    if(sortKey === 'date'){
      console.log("done")
      return new Date(a.date) - new Date(b.date);    
    }else if(sortKey === 'amount'){
      console.log("amount done")
      return a.amount - b.amount;
    }else {
      return 0;
    }
  })

    function exportCSV(){
      var csv = unparse(transections,{
        fields: ["name","type","tag","date","amount"]
      })
    
    const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transection.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importFromCsv(event){
    event.preventDefault();
    try{
      parse(event.target.files[0], {
        header: true,
        complete: async function (result){
          for(const transection of  result.data) {
            console.log("transections",transection)
            const newTransection = {
              ...transection,
              amount: parseFloat(transection.amount),
            }
            await addTransection(newTransection, true);
          }
        },
      })
      toast.success("Transection added successfully");
      fetchTransections();
      event.target.files = null;
  }catch(e){
     toast.error(e.message);
  }
}

  return (
  <div 
  style={{
    width:"95%",
    padding:"0rem 2rem"
  }}>

    <div 
    style={{
      display:"flex",
      justifyContent:"space-between",
      gap:"1rem",
      alignItems:"center",
      marginBottom:"1rem"
    }} 
    >
      <div className='input-flex' >
        <img src={searchImg} width='20' />
        <input 
            value={search}
            onChange={(e) =>  setSearch(e.target.value) }
            placeholder='Search by Name'
            />
      </div>
    
      <Select
      className='select-input'
      onChange={(value) => setTypeFilter(value)}
      value = {typeFilter}
      placeholder='Filter'
      allowClear
      >
        <Option value="">All</Option>
        <Option value="income">Income</Option>
        <Option value="expense">Expense</Option>
      </Select>
      </div>
      

   <div className='my-table' >
      
       <div style={{
           display: "flex",
           justifyContent: "space-between",
           alignItems: "center",
           width:"100",
           marginBottom:"1rem"
         }}
         >
          <h2> My Transection </h2>
         
 
  <div>
     <Radio.Group
        className='input-radio'
        onChange={(e) => setSortKey(e.target.value)}
        value={sortKey}
        >
      <Radio.Button value="" >No Sort</Radio.Button>
      <Radio.Button value="date">Sort by Date</Radio.Button>
      <Radio.Button value="amount">Sort by Amount</Radio.Button>\
      </Radio.Group>
      </div>
      <div 
style={{
   display:"flex",
   justifyContent: "center",
   gap:"1rem",
   width:"400px"
}}
>

  <Button className='btn' onClick={exportCSV}>
    Export to CSV
    </Button>
    <label for="file-csv" className='btn btn-blue'>
      Import from CSV
    </label>
    <input
      id='file-csv'
      type='file'
      accept='.csv'
      required
      onChange={importFromCsv}
      style={{ display: "none" }}
      />
      </div>
     </div>
     
           
      
  <Table dataSource={sortedTransections}  columns={columns} />
  </div>

  </div>
  
  )
}

export default TransectionTable;

