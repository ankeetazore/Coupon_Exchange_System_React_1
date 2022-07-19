import React from "react";
import styled from "styled-components";
import axios from 'axios';
import {API_URL} from "./Const/Const";
import { Label } from "reactstrap";

function FilteredCouponList(){
  const category_list = JSON.parse(sessionStorage.getItem("CouponCategoryList"));
  const category_obj = [];
    category_list.map((x) => {
      const obj = {
        "id": x.couponCategoryId,
        "name": x.categoryName
      }
      category_obj.push(obj);
    })
  
    return (
        <div className="row p-5" style={{textAlign: "left"}}>
          <span>
          <label>Filter by Coupon Category </label>
     <select name="CouponCategory" id='CouponCategoryId'  className="form-control">
        <option selected value={0}>Select...</option>
        {
          category_obj.map((value)=>
          <option value={value.id}>{value.name}</option>
     )
        }
        </select>
        </span>
      <div className="col-12">
                                      <div className="card border-0 bg-light">
                                      <h5 className="card-header bg-transparent border-bottom text-uppercase"  >
                                        company name
                                   </h5>
                                 <br/>
                                          <div className="card-body">
                                          <label>Valid Till </label>
                                          <label>Spend Minimum 100 Rs.</label>
                                          <label>Get 10% Off </label>
                                          <label>Valid for following products </label>
                                          <br></br>
<a className="btn btn-primary waves-effect waves-light" id='EditProfileBtn'>Select Coupon For Exchange</a>

                                          </div>
                                      </div>
                                  </div>
                                  
        </div>
    );
}

export default FilteredCouponList;