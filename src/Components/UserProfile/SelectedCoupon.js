import React from "react";
import styled from "styled-components";
import {API_URL} from "./Const/Const";

function SelectedCoupon(){
    const couponSelectedForExchange = JSON.parse(sessionStorage.getItem("CouponSelectedForExchange"));
    const id = parseInt(couponSelectedForExchange.couponId);
    const [couponData, setData] = React.useState([]);

    React.useEffect(() => {
        async function loadData() {
          fetch(API_URL + 'Coupon/' + id ,{
            method: 'GET',
            headers:{'Content-type':'application/json'},
          }).then(r=>r.json())
          .then((data) => {
            setData(data);
          })
          .catch((error) => {
            
          });
        }
        loadData()
    }, []);

    const close = () => {
        sessionStorage.removeItem("UploadedCouponDetails");
        sessionStorage.removeItem("CouponSelectedForExchange");
                  //redirect to dashboard
                  window.location.href = "/";
            }

            return (
                <div className="container">
              <div className="row p-2">
              <div className="col-3">
          
          </div>
              <div className="col-6 p-4">
                                  <div className="card border-0 border-bottom p-4 pb-2 pt-2 bg-light">
                                    <h3 style={{textAlign:"center"}} className="card-header bg-transparent border-bottom p-2">Coupon Details</h3>
                                              <div className="card-body p-1">
                                                  <div className="card-title row">
                                                      <div className="col-12 p-0">
                                                          <h4 className="card-header border-0 bg-transparent text-uppercase mt-2" id="BrandName">{couponData.brandName}</h4>
                                                      </div>
                                                  </div>
                                                  <div className="row">
                                                      <div className="col-md-12">
                                                          <span className="card-text d-block">
                                                          <label className="p-1">Valid Till </label>
                                                              <label id="ExpiryDate" style={{fontWeight:"500", background: "#e38c22"}}>{couponData.expiryDate}</label>
                                                          </span>
                                                          <span className="card-text d-block">
                                                          <label className="p-1">Coupon Code </label>
                                                              <label id="CouponCode" style={{fontWeight:"500", background: "#e38c22"}}>{couponData.couponCode}</label>
                                                          </span>
                                                          <span className="card-text d-block">
                                                                  <label className="p-1">Spend Minimum </label>
                                                                  <label id="MinSpend" style={{fontWeight:"500"}}> {couponData.minSpend} </label>
                                                                  <label className="p-1"> Rs.</label>
                                                          </span>
                                                          <span className="card-text d-block">
                                                                  <label className="p-1">Get </label>
                                                                  <label id="MaxOff" style={{fontWeight:"500"}}> {couponData.maxOff} </label>
                                                                  <label >% Off </label>
                                                          </span>
                                                      </div>
                                                          <span className="card-text d-block">
                                                              <small>
                                                                  <label className="p-1">Valid for following products: </label>
                                                                  <label id="ProductList" style={{fontWeight:"500"}}>{couponData.productList}</label>
                                                              </small>
                                                          </span>
                                              </div>
                                              </div>
                                  </div>                 
          </div>
        
          <div className="col-3">
          
          </div>
          </div>
          <div className="row" style={{justifyContent: "center"}}>
                            <button className="btn btn-secondary waves-effect waves-light m-2"  style={{width: "fit-content"}} onClick={close}>Close</button>
                                              </div>
          </div>
              );
}

export default SelectedCoupon;