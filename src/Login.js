import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import styled from "styled-components";
import swal from "sweetalert2"; 
import {API_URL} from "./Const/Const";

let LoggedInUserDetails = {};

class Login extends Component{
  validateCredentials (event){
    event.preventDefault();
    let username = document.getElementById('EmailId').value;
    let password = document.getElementById('Password').value;
    if(username.length === 0)
    alert("Enter Email");
    else if(password.length === 0)
    alert("Enter Password");
    else
    {
      const apiurl=API_URL + "Login?username=" + username+ "&password=" + password;
      axios.post(apiurl).then((response)=>{
          if (response.status === 200 && response.data === "Success")
          {            
                const apiurl=API_URL + "UserRegistration/" + username;
                axios.get(apiurl).then((response)=>{
               if (response.status === 200)
               {            
              console.log(response.data);
              LoggedInUserDetails=response.data;
              sessionStorage.setItem("LoggedInUserDetails",JSON.stringify(response.data));
              if(LoggedInUserDetails.userRole === "Admin"){
               swal.fire({
                  title: "Login Successfull",
                  text: "Redirecting to Admin Dashboard",
                  icon: "success",
                  confirmButtonText: "OK",
                }).then(function () {
                    //redirect to admin dashboard
                    window.location.href = "/";
                  });
                
              }
              else{
                swal.fire({
                  title: "Login Successfull",
                  text: "Redirecting to User Dashboard",
                  icon: "success",
                  confirmButtonText: "OK",
                }).then(function () {
                    //redirect to user dashboard
                    window.location.href = "/";
                  });
                 
              }
            }
        else{
          swal.fire({
            title: "Invalid Email or Password",
            text: "Try Again",
            icon: "warning",
            confirmButtonText: "OK",
          }).then(function () {
            });
        }
            })
            }
else{
  swal.fire({
    title: "Invalid Email or Password",
    text: "Try Again",
    icon: "warning",
    confirmButtonText: "OK",
  }).then(function () {
    });
}
      })
    }
    }

render(){
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
  width: 25%;
  padding: 20px;
  background-color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 10px 15px;
  background-color: #ff5678;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Div = styled.div`
text-align: center;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

  return (
    <Container>
          <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
              <Input type="text" placeholder="Enter Email" id='EmailId' />
              <Input type="password" placeholder="Enter Password" id='Password' />
              <Div><Button onClick={this.validateCredentials}>LOGIN</Button></Div>
              <Link>Forgot your password?</Link>
            </Form>
          </Wrapper>
        </Container>
        );
}
}

export default Login;
