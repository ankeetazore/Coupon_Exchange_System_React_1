import React from "react";
import styled from "styled-components";
import {API_URL} from "./Const/Const";
import swal from "sweetalert2"; 

function ExchangeCoupon(){
    const uploadedCoupon = JSON.parse(sessionStorage.getItem("UploadedCouponDetails"));
    const couponSelectedForExchange = JSON.parse(sessionStorage.getItem("CouponSelectedForExchange"));

    const cancelAddCoupon = () => {
        sessionStorage.removeItem("UploadedCouponDetails");
        sessionStorage.removeItem("CouponSelectedForExchange");
                  //redirect to dashboard
                  window.location.href = "/";
            }

            const exchangeCoupon = (event) =>{
                    fetch(API_URL + 'Coupon/ExchangeCoupon?selectedCouponId=' + parseInt(couponSelectedForExchange.couponId),{
                        method: 'POST',
                        headers:{'Content-type':'application/json'},
                          body:  JSON.stringify(uploadedCoupon)
                      }).then(r=>r.json())
                      .then((data) => {
                        if(data.couponId !== undefined && data.couponId !== 0){
                          swal.fire({
                            title: "Coupon Exchanged Successfully",
                        icon: "success",
                        confirmButtonText: "OK",
                      }).then(function () {
                        let UserData = null;
                    if(sessionStorage.getItem("LoggedInUserDetails") !== null && sessionStorage.getItem("LoggedInUserDetails") !== undefined){
                      UserData =  JSON.parse(sessionStorage.getItem("LoggedInUserDetails"));
                    }
                          //update add coupon count
                          UserData.couponUploadCount++;
                          UserData.couponExchangeCount++;
                          sessionStorage.setItem("LoggedInUserDetails",JSON.stringify(UserData));
                      window.location.href = "/selectedcoupon";
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
                      // window.location.href = "/";
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
                    //  window.location.href = "/";
                        });
                      });
                     
              }
                 

    return (
        <div className="container">
      <div className="row p-2">
      <div className="col-6 p-4">
  
                          <div className="card border-0 border-bottom p-4 pb-2 pt-2" style={{background:"#ebd0ad"}}>
                            <h3 style={{textAlign:"center"}} className="card-header bg-transparent border-bottom p-2">Uploaded Coupon</h3>
                                      <div className="card-body p-1">
                                          <div className="card-title row">
                                              <div className="col-12 p-0">
                                                  <h4 className="card-header border-0 bg-transparent text-uppercase mt-2" id="BrandName">{uploadedCoupon.BrandName}</h4>
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-md-12">
                                                  <span className="card-text d-block">
                                                  <label className="p-1">Valid Till </label>
                                                      <label id="ExpiryDate" style={{fontWeight:"500", background: "#e38c22"}}>{uploadedCoupon.ExpiryDate}</label>
                                                  </span>
                                                  <span className="card-text d-block">
                                                          <label className="p-1">Spend Minimum </label>
                                                          <label id="MinSpend" style={{fontWeight:"500"}}> {uploadedCoupon.MinSpend} </label>
                                                          <label className="p-1"> Rs.</label>
                                                  </span>
                                                  <span className="card-text d-block">
                                                          <label className="p-1">Get </label>
                                                          <label id="MaxOff" style={{fontWeight:"500"}}> {uploadedCoupon.MaxOff} </label>
                                                          <label >% Off </label>
                                                  </span>
                                              </div>
                                                  <span className="card-text d-block">
                                                      <small>
                                                          <label className="p-1">Valid for following products: </label>
                                                          <label id="ProductList" style={{fontWeight:"500"}}>{uploadedCoupon.ProductList}</label>
                                                      </small>
                                                  </span>
                                      </div>
                                      </div>
                          </div>                 
                  
  </div>

  <div className="col-6 p-4">
  
  <div className="card border-0 border-bottom p-4 pb-2 pt-2" style={{background:"#008b8b"}}>
                            <h3 style={{textAlign:"center"}} className="card-header bg-transparent border-bottom p-2">Coupon Selected For Exchange</h3>
                                      <div className="card-body p-1">
                                          <div className="card-title row">
                                              <div className="col-12 p-0">
                                                  <h4 className="card-header border-0 bg-transparent text-uppercase mt-2" id="BrandName">{couponSelectedForExchange.brandName}</h4>
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-md-12">
                                                  <span className="card-text d-block">
                                                  <label className="p-1">Valid Till </label>
                                                      <label id="ExpiryDate" style={{fontWeight:"500", background: "gold"}}>{couponSelectedForExchange.expiryDate}</label>
                                                  </span>
                                                  <span className="card-text d-block">
                                                          <label className="p-1">Spend Minimum </label>
                                                          <label id="MinSpend" style={{fontWeight:"500"}}> {couponSelectedForExchange.minSpend} </label>
                                                          <label className="p-1"> Rs.</label>
                                                  </span>
                                                  <span className="card-text d-block">
                                                          <label className="p-1">Get </label>
                                                          <label id="MaxOff" style={{fontWeight:"500"}}> {couponSelectedForExchange.maxOff} </label>
                                                          <label >% Off </label>
                                                  </span>
                                              </div>
                                                  <span className="card-text d-block">
                                                      <small>
                                                          <label className="p-1">Valid for following products: </label>
                                                          <label id="ProductList" style={{fontWeight:"500"}}>{couponSelectedForExchange.productList}</label>
                                                      </small>
                                                  </span>
                                      </div>
                                      </div>
                          </div>                 
                  
  </div>
  </div>
  <div className="row" style={{justifyContent: "center"}}>
                    <button className="btn btn-primary waves-effect waves-light m-2" style={{width: "fit-content"}} onClick={exchangeCoupon}> Exchange</button>
                    <button className="btn btn-secondary waves-effect waves-light m-2"  style={{width: "fit-content"}} onClick={cancelAddCoupon}>Cancel</button>
                                      </div>
  </div>
      );
}

export default ExchangeCoupon;