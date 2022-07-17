import React,{Component} from "react";
import styled from "styled-components";
import swal from "sweetalert2"; 


class AddCouponCategory extends Component{
  addCouponCategory(event){
    event.preventDefault();
    let categoryName = document.getElementById('CategoryName').value;
    if(categoryName.length === 0)
    alert("Enter Category Name");

    let UserData = null;
        if(sessionStorage.getItem("LoggedInUserDetails") !== null && sessionStorage.getItem("LoggedInUserDetails") !== undefined){
          UserData =  JSON.parse(sessionStorage.getItem("LoggedInUserDetails"));
        }

    let couponCategory={
      CouponCategoryId:0,
      CategoryName:categoryName,
      CategoryImagePath:"",
      UserId: (UserData != null)? UserData.userId : 0
        };
        fetch('https://localhost:44346/api/CouponCategory',{
            method: 'POST',
            headers:{'Content-type':'application/json'},
              body: JSON.stringify(couponCategory)
          }).then(r=>r.json())
          .then((data) => {
            console.log(data);
            if(data.couponCategoryId !== 0){
              swal.fire({
                title: "Coupon Category Added Successfully",
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

        cancelAddCouponCategory(event){
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
              <Title>Add Coupon Category</Title>
              <Form>
                <Input type="text" placeholder="Enter Coupon Category Name*" id='CategoryName'/>
                {/* image */}
                <br></br>
                <Div>
                <Button onClick={this.addCouponCategory}>Add</Button>
                <Button onClick={this.cancelAddCouponCategory}>Cancel</Button>
                </Div>
              </Form>
            </Wrapper>
          </Container>
        );
    }
}

export default AddCouponCategory;