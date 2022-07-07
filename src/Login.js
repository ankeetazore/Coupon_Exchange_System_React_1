import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import styled from "styled-components";
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserProfile from './Components/UserPages/UserProfile';
import AdminProfile from './Components/AdminPages/AdminProfile';
//import {mobile} from "../responsive";

let LoggedInUserDetails = {};

class Login extends Component{
    submitHandler(event) {
        event.preventDefault();
        const data={
            username : document.getElementById('EmailId').value,
            password : document.getElementById('Password').value
                   };

        const apiurl="https://localhost:44346/api/Login?username=" + document.getElementById('EmailId').value + "&password=" + document.getElementById('Password').value;
        axios.post(apiurl).then((response)=>{
            if (response.status === 200){            
                console.log(response.data);
                if(response.data === "Success"){
                  const apiurl="https://localhost:44346/api/UserRegistration/" + document.getElementById('EmailId').value;
                  axios.get(apiurl).then((response)=>{
                 if (response.status === 200){            
                console.log(response.data);
                LoggedInUserDetails=response.data;
                if(LoggedInUserDetails.userRole === "Admin"){
                  window.location.reload();
                }else{

                }

              }
          else
            alert('Invalid User'); 
              })
                }
              }
else
  alert('Invalid User'); 
        })
    }
    
    render() {
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
//${mobile({ width: "75%" })}
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
          <Input type="text" placeholder="Enter Email" id='EmailId'/>
          <Input type="password" placeholder="Enter Password" id='Password'/>
          <Div><Button onClick={this.submitHandler}>LOGIN</Button></Div>
          <Link>Forgot your password?</Link>
        </Form>
      </Wrapper>
    </Container>);

}
}

export default Login;
