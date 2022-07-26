import React, { Component, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import DefaultProfilePath from './user-assets/profile-image.png';
import swal from "sweetalert2"; 
import {API_URL} from "./Const/Const";
import axios from 'axios';

let LoggedInUserDetails = null;
class UserDashboard extends Component{
constructor(props){
    super(props);
    if(sessionStorage.getItem("LoggedInUserDetails") !== null && sessionStorage.getItem("LoggedInUserDetails") !== undefined){
      LoggedInUserDetails =  JSON.parse(sessionStorage.getItem("LoggedInUserDetails"));
    }else{
        sessionStorage.clear();
    window.location.href = "/";
    window.location.reload();
    }

    this.state = {
        userdata : LoggedInUserDetails,
        name : LoggedInUserDetails.name,
        mobilenumber : LoggedInUserDetails.mobileNumber,
        isDisabled : true
    }

}

      EditProfile = (e) => {
        e.preventDefault();
        if(e.target.innerHTML === "Save"){
            if(document.getElementById("UserName").value == undefined || document.getElementById("UserName").value == "" || document.getElementById("UserName").value == null){
                alert("Name cannot be blank");
                return false;
            }
            LoggedInUserDetails.name = this.state.name;
            LoggedInUserDetails.mobileNumber = (this.state.mobilenumber === "") ? 0 : this.state.mobilenumber;
            let user = LoggedInUserDetails;
                fetch(API_URL + 'UserRegistration/RegisterUser',{
                    method: 'POST',
                    headers:{'Content-type':'application/json'},
                      body: JSON.stringify(user)
                  }).then(r=>r.json())
                  .then((data) => {
                    console.log(data);
                    swal.fire({
                        title: "Profile Updated Successfull",
                        icon: "success",
                        confirmButtonText: "OK",
                      })
                      e.target.innerHTML = "Edit Profile";
    e.target.nextSibling.style.display = "none";
    this.setState({isDisabled: !this.state.isDisabled });
    sessionStorage.setItem("LoggedInUserDetails",JSON.stringify(LoggedInUserDetails));
                  })
                  .catch((error) => {
                    swal.fire({
                      title: "Error Occured",
                      text: "Try Again",
                      icon: "error",
                      confirmButtonText: "OK",
                    })
                  });                
        }
        else{
            this.setState({isDisabled: !this.state.isDisabled });
            e.target.innerHTML = "Save";
            e.target.nextSibling.style.display = "inline";
        }
      }
      handleSubmit = (txt) => {
        this.props.onChange(txt);
    }

    CancelEdit = (e) =>{
        e.preventDefault();
        e.target.style.display = "none";
    this.setState({isDisabled: !this.state.isDisabled });
    document.getElementById("EditProfileBtn").innerHTML = "Edit Profile";
    this.setState({name: JSON.parse(sessionStorage.LoggedInUserDetails).name});
    this.setState({mobilenumber: JSON.parse(sessionStorage.LoggedInUserDetails).mobileNumber});
    }

    handleNameChange = (e) => {
        var value = e.target.value;
        this.setState({name: value});
        this.handleSubmit(value);
    }

    handleMobileNumberChange = (e) => {
        var value = e.target.value;
        this.setState({mobilenumber: value});
        this.handleSubmit(value);
    }

    componentDidMount(){
        axios.get(API_URL + 'CouponCategory').then(res => 
        {
          sessionStorage.setItem("CouponCategoryList",JSON.stringify(res.data));
        }); 
      }

render() {
      return (
  <div className="row p-5" style={{textAlign: "left"}}>
  <div className="col-4">
  <div className="card border-0 bg-light">
  <img className="card-img-top img-fluid profile-img" id='UserProfileImage' src={DefaultProfilePath} alt="Card image cap" style={{height: "130px",width:"150px"}}/> 
  <br/>
                                   <input className="card-header bg-transparent border-bottom text-uppercase" id='UserName' 
                                   value={this.state.name} disabled={this.state.isDisabled} onChange={this.handleNameChange}/>
                                 <br/>
                                    <input className="card-text p-1" id='EmailId' value={this.state.userdata.emailId} readOnly disabled="disabled"/>
                                    <br/>
                                <input className="card-text p-1" id='MobileNumber' value={this.state.mobilenumber} 
                                disabled={this.state.isDisabled} onChange={this.handleMobileNumberChange}/>
<br/>
<div>
<a className="btn btn-primary waves-effect waves-light" id='EditProfileBtn' onClick={this.EditProfile}>Edit Profile</a>
<a className="btn btn-secondary waves-effect waves-light m-2" id='CancelEditProfileBtn' style={{display:"none"}} onClick={this.CancelEdit}>Cancel</a>
</div>
                                    
                                
</div>
</div>

<div className="col-3">
                                <div className="card border-0 bg-light">
                                    <div className="card-body">
                                        <h5 className="mt-0">Uploaded Coupon Count</h5>
                                        <input className="border-0" id='UploadedCouponCount' value={this.state.userdata.couponUploadCount} 
                                        readOnly disabled="disabled" style={{fontSize: "xx-large",width:"100%"}}/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-3">
                                <div className="card border-0 bg-light">
                                    <div className="card-body">
                                    <h5 className="mt-0">Exchanged Coupon Count</h5>
                                        <input className="border-0" id='ExchangedCouponCount' value={this.state.userdata.couponExchangeCount} 
                                        readOnly disabled="disabled" style={{fontSize: "xx-large",width:"100%"}}/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-2">
                                <div className="card border-0 bg-light">
                                    <div className="card-body">
                                    <Link to='/uploadcoupon'>
                                    <a className="btn btn-primary waves-effect waves-light">Upload New Coupon
                        </a>
                                      </Link>                  
                                    </div>
                                </div>
                            </div>
  </div>
  );
}
}

export default UserDashboard;


