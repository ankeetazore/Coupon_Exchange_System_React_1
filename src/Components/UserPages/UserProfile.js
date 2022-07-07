import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

function UserProfile() {
      return (
   
    <div className="container-lm ">      
      <nav className="navbar navbar-expand-lg navheader">    
    <div className="collapse navbar-collapse p-1" >    
    
      <h4 className='m-0'><span>User Dashboard</span></h4>
      
      <ul className="navbar-nav ms-auto fw-bold"> 
        <li className="nav-item">    
          <Link to='/' className="nav-link text-dark"><h5 className='m-0'>Logout</h5></Link>    
      </li>
      </ul>    
    </div>    
  </nav> 
    </div>
  );
}

export default UserProfile;


