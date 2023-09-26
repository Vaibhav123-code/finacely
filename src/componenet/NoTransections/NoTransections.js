import React from 'react';
import transections from "../../assets/transections.png"

function NoTransections() {
  return (
    <div
        style={{
          display: "flex",
          justifyContent: "center", 
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
          marginBottom: "2rem"
        }}
        >
          <img src={transections} alt="transections" 
            style={{ width: "400px", margin:"1rem"}}/>
            <p style={{ textAlign: "center", fontSize: "1.2rem"}}>
              You don't have any transection yet.
            </p>
    </div>
  )
}

export default NoTransections;