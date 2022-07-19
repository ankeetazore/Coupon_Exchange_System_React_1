import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserProfile from './Components/UserProfile/UserProfile';
import AdminProfile from './Components/AdminProfile/AdminProfile';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';   
import { store } from './app/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));

function RenderElement(){
  let LoggedInUserDetails = null;
  if(sessionStorage.getItem("LoggedInUserDetails") !== null && sessionStorage.getItem("LoggedInUserDetails") !== undefined){
    LoggedInUserDetails =  JSON.parse(sessionStorage.getItem("LoggedInUserDetails"));
  }
 
  if(LoggedInUserDetails !== null && LoggedInUserDetails.userRole === "Admin"){
    return(
      <AdminProfile/>
    );
  }
  else if(LoggedInUserDetails !== null && LoggedInUserDetails.userRole === "User"){
    return(
      <UserProfile/>
    );
  }
  else{
    return(
      <App/>
    );
  }
}

root.render(
  <React.StrictMode>
<RenderElement/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
