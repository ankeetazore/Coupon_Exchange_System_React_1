import React,{Component} from "react";
import styled from "styled-components";
import swal from "sweetalert2"; 
import Select from "react-dropdown-select";
import {API_URL} from "./Const/Const";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddCoupon extends Component{
  constructor(props) {
    super(props);
    this.state = {  
      expiryDate: new Date()  
    };  
    this.handleChange = this.handleChange.bind(this);  
  }

  handleChange(date) {  
    this.setState({  
      expiryDate: date  
    })  
  }  

  addCoupon(event){
    event.preventDefault();
    let expiryDate = document.getElementById('ExpiryDate').value;
    let couponCode = document.getElementById('CouponCode').value;
    let couponCategoryId = parseInt(document.getElementById('CouponCategoryId').value);

    if(expiryDate.length === 0){
      alert("Enter Expiry Date");
      return false;
    }
    
    if(couponCode.length === 0){
      alert("Enter Coupon Code");
      return false;
    }
   
    if(couponCategoryId === 0 || couponCategoryId === undefined){
      alert("Select Coupon Category Id");
      return false;
    }

    let UserData = null;
        if(sessionStorage.getItem("LoggedInUserDetails") !== null && sessionStorage.getItem("LoggedInUserDetails") !== undefined){
          UserData =  JSON.parse(sessionStorage.getItem("LoggedInUserDetails"));
        }
       
    let coupon={
      CouponId:0,
      ExpiryDate:expiryDate,
      MinSpend:(document.getElementById('MinSpend').value === "") ? 0 : document.getElementById('MinSpend').value,
      MaxOff:(document.getElementById('MaxOff').value === "") ? 0 : document.getElementById('MaxOff').value,
      BrandName:document.getElementById('BrandName').value,
      CouponCode:couponCode,
      ProductList:document.getElementById('ProductList').value,
      CouponCategoryId:couponCategoryId,
      UserId: (UserData != null)? UserData.userId : 0
        };
        fetch(API_URL + 'Coupon/UploadCoupon',{
            method: 'POST',
            headers:{'Content-type':'application/json'},
              body: JSON.stringify(coupon)
          }).then(r=>r.json())
          .then((data) => {
            console.log(data);
            if(data.couponId !== undefined && data.couponId !== 0){
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
      const category_list = JSON.parse(sessionStorage.getItem("CouponCategoryList"));
      const category_obj = [];
        category_list.map((x) => {
          const obj = {
            "id": x.couponCategoryId,
            "name": x.categoryName
          }
          category_obj.push(obj);
        })
      
        const Container = styled.div`
        width: 100vw;
        height: 100vh;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      
      const Wrapper = styled.div`
        width: 40%;
        padding: 20px;
        background-color: white;
      `;
      //${mobile({ width: "75%" })}
      const Title = styled.h1`
        font-size: 24px;
        font-weight: 300;
        text-align: center;
      `;
      
      const Form = styled.form`
        display: grid;
        flex-wrap: wrap;
      `;
      
      const Input = styled.input`
        flex: 1;
        width: 100%;
        margin: 15px 10px 0px 0px;
        padding: 10px;
      `;

      const Label = styled.label`
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

    const Table = styled.table`
    `;
   
        return(
            <Container>
            <Wrapper>
              <Title>Add Coupon</Title>
              <Form>
                <Table>
                  <tbody>
                  <tr>
                    <td><Label>Select Expiry Date<span style={{color:"red"}}>*</span></Label></td>
                    <td>
                      <DatePicker  id='ExpiryDate'  className="form-control"
              selected={ this.state.expiryDate }  
              onChange={ this.handleChange }  
              dateFormat="MMMM d, yyyy"  
              minDate={new Date()}  
          />  
                      </td>
                  </tr>
                  <tr>
                  <td><Label>Enter Min Spend (In Rs.)</Label></td>
                    <td><Input type="text" id='MinSpend' className="form-control"/></td>
                  </tr>
                  <tr>
                  <td><Label>Enter Max Off (In %)</Label></td>
                    <td><Input type="text" id='MaxOff' className="form-control"/></td>
                  </tr>
                  <tr>
                  <td><Label>Enter Company Name<span style={{color:"red"}}>*</span></Label></td>
                    <td><Input type="text" id='BrandName' className="form-control"/></td>
                  </tr>
                  <tr>
                  <td><Label>Enter Coupon Code<span style={{color:"red"}}>*</span></Label></td>
                    <td><Input type="text" id='CouponCode' className="form-control"/></td>
                  </tr>
                  <tr>
                  <td><Label>Enter Product List</Label></td>
                    <td><textarea type="text" id='ProductList' className="form-control mt-1"/></td>
                  </tr>
                  <tr>
                  <td><Label>Enter Coupon Category Id<span style={{color:"red"}}>*</span></Label></td>
                    <td>
        <select name="CouponCategory" id='CouponCategoryId'  className="form-control">
        <option selected value={0}>Select...</option>
        {
          category_obj.map((value)=>
          <option value={value.id}>{value.name}</option>
     )
        }
        </select>
                      </td>
                  </tr>
                    </tbody>
                </Table>

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