import React,{Component} from "react";
import styled from "styled-components";

class UploadCoupon extends Component{

    render(){
        const Container = styled.div`
        width: 100vw;
        height: 100vh;
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

        return(
            <Container>
            <Wrapper>
              <Title>Upload Coupon</Title>
              <Form>
                <Input type="text" placeholder="Enter Name*" id='Name'/>
                <Input type="text" placeholder="Enter Email*" id='EmailId'/>
                <Input type="number" placeholder="Enter Mobile Number" id='MobileNo' maxLength="10"/>
                <Input type="password" placeholder="Enter Password*" id='Password'/>
                <Input type="password" placeholder="Confirm Password*" id='ConfirmPassword'/>
                <br></br>
                <Div>
                    <Button onClick={this.onRegisterUser}>Upload</Button>
                <Button onClick={this.onRegisterUser}>Cancel</Button>
                </Div>
              </Form>
            </Wrapper>
          </Container>
        );
    }
}

export default UploadCoupon;