import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AddCoupon from './AddCoupon';

class AdminProfile extends Component{
  Logout() {
    sessionStorage.clear();
    window.location.href = "/";
    window.location.reload();
  }

render() {
      return (
        <Router>
        <div className="App">
    <div className="container-lm ">      
      <nav className="navbar navbar-expand-lg navheader bg-dark text-light">    
    <div className="collapse navbar-collapse p-1" >    
      <h4 className='m-2'><span>Admin Dashboard</span></h4>
      <ul className="navbar-nav ms-auto fw-bold"> 
        <li className="nav-item">    
        <Link to="/"><h5 className='btn m-0 text-light' style={{fontSize: "large"}}>Home</h5></Link>
          <h5 className='btn m-0 text-light' style={{fontSize: "large"}} onClick={this.Logout}>Logout</h5>
      </li>
      </ul>    
    </div>    
  </nav> 
    </div>
    </div>
    <Routes>
    <Route exact path="/" element={<AdminDashboard/>}></Route> 
    <Route exact path="/addcoupon" element={<AddCoupon/>}></Route> 
  </Routes>
  </Router>
  );
}
}

export default AdminProfile;


