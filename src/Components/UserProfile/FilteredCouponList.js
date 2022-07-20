import React from "react";
import styled from "styled-components";
import axios from 'axios';
import {API_URL} from "./Const/Const";
import swal from "sweetalert2"; 

function FilteredCouponList(props){
  console.log(props.coupondata);
  const [filteredcouponlist, setList] = React.useState([]);
  const coupon = JSON.parse(sessionStorage.getItem("UploadedCouponDetails"));
  const [templist, setTempList] = React.useState([]);

  React.useEffect(() => {
    async function loadList() {
      fetch(API_URL + 'Coupon/GetAllFilteredCoupons',{
        method: 'POST',
        headers:{'Content-type':'application/json'},
          body: JSON.stringify(coupon)
      }).then(r=>r.json())
      .then((data) => {
        console.log(data);
        setList(data);
        setTempList(data);
      })
      .catch((error) => {
        
      });
    }
    loadList()
}, []);

  const category_list = JSON.parse(sessionStorage.getItem("CouponCategoryList"));
  const category_obj = [];
    category_list.map((x) => {
      const obj = {
        "id": x.couponCategoryId,
        "name": x.categoryName
      }
      category_obj.push(obj);
    });
  
const selectCoupon = (event) =>{
  let id = parseInt(event.target.name);
  let data = templist.find(x => x.couponId === id);
  sessionStorage.setItem("CouponSelectedForExchange",JSON.stringify(data));
  window.location.href = "/exchangecoupon";
}

const filterList = () =>{
  let couponCategoryId = parseInt(document.getElementById('CouponCategoryId').value);
  let data = templist;
  data = data.filter(x => x.couponCategoryId === couponCategoryId);
  setList(data);
}

const uploadWithoutExchange = () => {
        fetch(API_URL + 'Coupon/UploadCoupon',{
            method: 'POST',
            headers:{'Content-type':'application/json'},
              body: JSON.stringify(coupon)
          }).then(r=>r.json())
          .then((data) => {
            if(data.couponId !== undefined && data.couponId !== 0){
              swal.fire({
                title: "Coupon Added Successfully",
            icon: "success",
            confirmButtonText: "OK",
          }).then(function () {
            let UserData = null;
        if(sessionStorage.getItem("LoggedInUserDetails") !== null && sessionStorage.getItem("LoggedInUserDetails") !== undefined){
          UserData =  JSON.parse(sessionStorage.getItem("LoggedInUserDetails"));
        }
              //update add coupon count
              UserData.couponUploadCount++;
              sessionStorage.setItem("LoggedInUserDetails",JSON.stringify(UserData));
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
              }).then(function () {
               //redirect to dashboard
          window.location.href = "/";
            });
            }
          })
          .catch((error) => {
            swal.fire({
              title: "Error Occured",
              text: "Try Again",
              icon: "error",
              confirmButtonText: "OK",
            }).then(function () {
              //redirect to dashboard
         window.location.href = "/";
            });
          });
         
        }

const cancelAddCoupon = () => {
  sessionStorage.removeItem("UploadedCouponDetails");
            //redirect to dashboard
            window.location.href = "/";
      }

    return (
      <div className="container">
    <div className="row m-4">
        <div className="col-md-12">
            <div className="input-group border-bottom border-light border-2">
            <label className="p-2">Filter by Coupon Category </label>
     <select name="CouponCategory" id='CouponCategoryId'  className="form-control" onChange={filterList}>
        <option selected value={0}>Select...</option>
        {
          category_obj.map((value)=>
          <option value={value.id}>{value.name}</option>
     )
        }
        </select>
            </div>
        </div>
    </div>
    <div className="row" style={{height:"68vh",overflowY:"scroll"}}>
    <div className="col-xl-12">
{
  filteredcouponlist.map((value)=>
  
                        <div className="card border-0 border-bottom bg-light p-4 pb-2 pt-2">
                                    <div className="card-body p-1">
                                        <div className="card-title row">
                                            <div className="col-8 p-0">
                                                <h4 className="card-header bg-transparent border-bottom text-uppercase" id="BrandName">{value.brandName}</h4>
                                            </div>
                                            <div className="col-4" style={{display:"flex", justifyContent: "end"}}>
                                            <a className="btn btn-primary waves-effect waves-light" name={value.couponId} onClick={selectCoupon}> 
                                              Select Coupon For Exchange</a>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <span className="card-text d-block">
                                                <label className="p-1">Valid Till </label>
                                                    <label id="ExpiryDate" style={{fontWeight:"500", background: "gold"}}>{value.expiryDate}</label>
                                                </span>
                                                <span className="card-text d-block">
                                                        <label className="p-1">Spend Minimum </label>
                                                        <label id="MinSpend" style={{fontWeight:"500"}}> {value.minSpend} </label>
                                                        <label className="p-1"> Rs.</label>
                                                </span>
                                                <span className="card-text d-block">
                                                        <label className="p-1">Get </label>
                                                        <label id="MaxOff" style={{fontWeight:"500"}}> {value.maxOff} </label>
                                                        <label >% Off </label>
                                                </span>
                                            </div>
                                            <div className="col-md-9">
                                                <span className="card-text d-block">
                                                    <small>
                                                        <label className="p-1">Valid for following products: </label>
                                                        <label id="ProductList" style={{fontWeight:"500"}}>{value.productList}</label>
                                                    </small>
                                                </span>
                                            </div>
                                    </div>
                                    </div>
                        </div>                 
                
)
}
</div>
</div>
<div className="row" style={{justifyContent: "center"}}>
                  <button className="btn btn-primary waves-effect waves-light m-2" style={{width: "fit-content"}} onClick={uploadWithoutExchange}>Upload Without Exchange</button>
                  <button className="btn btn-secondary waves-effect waves-light m-2"  style={{width: "fit-content"}} onClick={cancelAddCoupon}>Cancel</button>
                                    </div>
</div>
    );
}

export default FilteredCouponList;