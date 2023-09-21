import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import "./App.css";
import {ToastContainer , toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <>
      <ToastContainer />
       <Router>
          <Routes>
              <Route path="/" element={<Signup/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
       </Router>
       </>
    </div>
  )
}

export default App