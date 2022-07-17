import React, { Component } from 'react';
import swal from "sweetalert2"; 
import './App.css';
import styled from "styled-components";
//import {mobile} from "../responsive";

class Registration extends Component{
       onRegisterUser(event){
        event.preventDefault();
        let MobileNo = 0;
        if(document.getElementById('MobileNumber') != null || document.getElementById('MobileNumber') != undefined)
            MobileNo = document.getElementById('MobileNumber').value;
            
        let user={
            UserId:0,
            Name:document.getElementById('Name').value,
            EmailId:document.getElementById('EmailId').value,
            MobileNumber:MobileNo,
            Password:document.getElementById('Password').value,
            UserRole:"User",
            CouponExchangeCount:0,
            couponUploadCount:0
            };
            fetch('https://localhost:44346/api/UserRegistration',{
                method: 'POST',
                headers:{'Content-type':'application/json'},
                  body: JSON.stringify(user)
              }).then(r=>r.json())
              .then((data) => {
                console.log(data);
                if(data.userId !== 0){
                   sessionStorage.setItem("LoggedInUserDetails",JSON.stringify(data));
                  swal.fire({
                    title: "Registration Successfull",
                    text: "Redirecting to User Dashboard",
                icon: "success",
                confirmButtonText: "OK",
              }).then(function () {
                  //redirect to user dashboard
                  window.location.href = "/";
                });
                }
                else{
                  swal.fire({
                    title: data,
                    text: "Try Again",
                    icon: "error",
                    confirmButtonText: "OK",
                  })
                }
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
    
    render() {
      sessionStorage.clear();
      
        const Container = styled.div`
        width: 100vw;
        height: 100vh;
        background-image: linear-gradient(to right, #b24592, #f15f79);
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      
      const Wrapper = styled.div`
        width: 30%;
        padding: 20px;
        background-color: white;
      `;
      //${mobile({ width: "75%" })}
      const Title = styled.h1`
        font-size: 24px;
        font-weight: 300;
      `;
      
      const Form = styled.form`
        display: grid;
        flex-wrap: wrap;
      `;
      
      const Input = styled.input`
        flex: 1;
        min-width: 40%;
        margin: 15px 10px 0px 0px;
        padding: 10px;
      `;

      const Button = styled.button`
        width: 40%;
        border: none;
        padding: 10px 15px;
        background-color: #ff5678;
        color: white;
        cursor: pointer;
      `;

      const Div = styled.div`
        text-align: center;
    `;

return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input type="text" placeholder="Enter Name*" id='Name'/>
          <Input type="text" placeholder="Enter Email*" id='EmailId'/>
          <Input type="number" placeholder="Enter Mobile Number" id='MobileNo' maxLength="10"/>
          <Input type="password" placeholder="Enter Password*" id='Password'/>
          <Input type="password" placeholder="Confirm Password*" id='ConfirmPassword'/>
          <br></br>
          <Div><Button onClick={this.onRegisterUser}>CREATE</Button></Div>
        </Form>
      </Wrapper>
    </Container>
  );

}
}

export default Registration;
