import './App.css';  
import React, { Component } from 'react';
import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

class App extends Component {
  render() {
  return ( 
<Router>
           <div className="App">
           <div className="container-lm">
  <nav className="navbar navbar-expand-lg navheader">    
    <div className="collapse navbar-collapse p-1" >    
    
      <h4 className='m-0'><span>Coupon Exchange System</span></h4>
      
      <ul className="navbar-nav ms-auto fw-bold"> 
      <li className="nav-item">    
      <Link to='/' className="nav-link text-dark"><h5 className='m-0'>Home</h5></Link>    
      </li>  
        <li className="nav-item">    
          <Link to='/login' className="nav-link text-dark"><h5 className='m-0'>Login</h5></Link>    
      </li>  
      <li className="nav-item">    
          <Link to='/registration' className="nav-link text-dark"><h5 className='m-0'>Register</h5></Link>    
      </li>
      </ul>    
    </div>    
  </nav> 
  </div>
  </div>
  <Routes>
    <Route exact path="/" element={<Home/>}></Route>
    <Route exact path='/login' element={<Login/>}></Route>
    <Route exact path='/registration'  element={<Registration/>}></Route>
  </Routes>
  </Router>
  );  
  }
};

export default App; 
