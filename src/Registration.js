import React, { Component } from 'react';
import swal from "sweetalert2"; 
import './App.css';
import styled from "styled-components";
//import {mobile} from "../responsive";
import {API_URL} from "./Const/Const";

class Registration extends Component{
       onRegisterUser(event){
        event.preventDefault();
        let MobileNo = 0;
        let Name = document.getElementById("Name").value;
        let EmailId = document.getElementById("EmailId").value;
        let Password = document.getElementById("Password").value;
        let ConfirmPassword = document.getElementById("ConfirmPassword").value;

        if(document.getElementById('MobileNo') !== null && document.getElementById('MobileNo') !== undefined)
            MobileNo = document.getElementById('MobileNo').value;

            if(Name.length === 0){
              alert("Enter Name");
              return false;
            }

            if(EmailId.length === 0){
              alert("Enter Email Id");
              return false;
            }

            function isValidEmail(email) {
              return /\S+@\S+\.\S+/.test(email);
            }
            if(!isValidEmail(document.getElementById("EmailId").value)){
              alert("Enter Valid Email Id");
              return false;
            }

            if(Password.length === 0){
              alert("Enter Password");
              return false;
            }

            if(ConfirmPassword.length === 0){
              alert("Enter Confirm Password");
              return false;
            }

            if(ConfirmPassword !== Password){
              alert("Confirm Password does not match with Password");
              return false;
            }
            
        let user={
            UserId:0,
            Name:Name,
            EmailId:EmailId,
            MobileNumber:(MobileNo === "") ? 0 : MobileNo,
            Password:Password,
            UserRole:"User",
            CouponExchangeCount:0,
            couponUploadCount:0
            };
            fetch(API_URL + 'UserRegistration/RegisterUser',{
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
