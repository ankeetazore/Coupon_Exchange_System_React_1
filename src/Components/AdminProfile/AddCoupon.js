import React,{Component} from "react";
import styled from "styled-components";
import swal from "sweetalert2"; 


class AddCoupon extends Component{
  addCoupon(event){
    event.preventDefault();
    let expiryDate = document.getElementById('ExpiryDate').value;
    let couponCode = document.getElementById('CouponCode').value;
    let couponCategoryId = document.getElementById('CouponCategoryId').value;

    if(expiryDate.length === 0)
    alert("Enter Expiry Date");
    if(couponCode.length === 0)
    alert("Enter Coupon Code");
    if(couponCategoryId.length === 0)
    alert("Enter Coupon Category Id");

    let UserData = null;
        if(sessionStorage.getItem("LoggedInUserDetails") !== null && sessionStorage.getItem("LoggedInUserDetails") !== undefined){
          UserData =  JSON.parse(sessionStorage.getItem("LoggedInUserDetails"));
        }
       
    let coupon={
      CouponId:0,
      ExpiryDate:expiryDate,
      MinSpend:document.getElementById('MinSpend').value,
      MaxOff:document.getElementById('MaxOff').value,
      BrandName:document.getElementById('BrandName').value,
      CouponCode:couponCode,
      ProductList:document.getElementById('ProductList').value,
      CouponCategoryId:couponCategoryId,
      UserId: (UserData != null)? UserData.userId : 0
        };
        fetch('https://localhost:44346/api/Coupon',{
            method: 'POST',
            headers:{'Content-type':'application/json'},
              body: JSON.stringify(coupon)
          }).then(r=>r.json())
          .then((data) => {
            console.log(data);
            if(data.couponId !== 0){
              swal.fire({
                title: "Coupon Added Successfully",
            icon: "success",
            confirmButtonText: "OK",
          }).then(function () {
              //redirect to dashboard
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

        cancelAddCoupon(event){
          event.preventDefault();                  
                    //redirect to dashboard
                    window.location.href = "/";
              }

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
        width: 30%;
        border: none;
        padding: 10px 10px;
        background-color: #ff5678;
        color: white;
        cursor: pointer;
        margin: 5px 5px;
      `;

      const Div = styled.div`
        text-align: center;
    `;
   
        return(
            <Container>
            <Wrapper>
              <Title>Add Coupon</Title>
              <Form>
                <Input type="text" placeholder="Enter Expiry Date*" id='ExpiryDate'/>                
                <Input type="text" placeholder="Enter Min Spend" id='MinSpend'/>
                <Input type="text" placeholder="Enter Max Off" id='MaxOff'/>
                <Input type="text" placeholder="Enter Brand Name" id='BrandName'/>
                <Input type="text" placeholder="Enter Coupon Code*" id='CouponCode'/>
                <Input type="text" placeholder="Enter Product List" id='ProductList'/>
                <Input type="text" placeholder="Enter Coupon Category Id*" id='CouponCategoryId'/>
                <br></br>
                <Div>
                <Button onClick={this.addCoupon}>Add</Button>
                <Button onClick={this.cancelAddCoupon}>Cancel</Button>
                </Div>
              </Form>
            </Wrapper>
          </Container>
        );
    }
}

export default AddCoupon;