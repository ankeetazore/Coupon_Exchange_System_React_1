import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Link} from 'react-router-dom';
import DefaultCategoryPath from './admin-assets/category-icon.png';
//jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert2"; 
import Modal from "./Modal";
import axios from 'axios';
import {API_URL} from "./Const/Const";

class CouponCategoryList extends Component{
  constructor(props) {
    super(props);
    this.handleChange = this.deleteCouponCategory.bind(this);
    this.handleChange = this.editCouponCategory.bind(this);
    this.state = {
        isOpen:false,
        id:0,
        data:[]
    }
  }

  componentDidMount(){
    axios.get(API_URL + 'CouponCategory').then(res => 
    {
      this.setState({ data: res.data });
      sessionStorage.setItem("CouponCategoryList",JSON.stringify(res.data));
    }); 
  }

  setIsOpen = (e) => {
    this.setState({isOpen: !this.state.isOpen});
  }
  setId = (couponCategoryId) => {
    this.setState({id: couponCategoryId});
  }
  editCouponCategory = (event) => {
    event.preventDefault();
    let couponCategoryId = parseInt(event.target.value);
   this.setIsOpen();
this.setId(couponCategoryId);
  };

deleteCouponCategory = (event) => {
  event.preventDefault();
  let couponCategoryId = parseInt(event.target.value);
  fetch(API_URL + `CouponCategory/${couponCategoryId}`, {
    method: "DELETE",
  })
    .then((res) => res.text())
    .then((res) => {
      if(res === "Success"){
        swal.fire({
          title: "Coupon Category Deleted Successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
    axios.get(API_URL+ 'CouponCategory').then(res =>
      {
        this.setState({ data: res.data });
        sessionStorage.setItem("CouponCategoryList",JSON.stringify(res.data));
      });
      window.location.href = "/";
      }
      else{
        swal.fire({
          title: res,
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
};

render() {
   
let sr_no = 1;
      return (
<>
<div className="row p-4" style={{height:"75vh",overflowY:"scroll"}}>
            <table className="table">
              <thead>
                <tr>
                <th>Sr No.</th>
                <th>Category Image</th>
                <th>Category Name</th>
                <th>Action</th>
                  </tr>
              </thead>
              <tbody>
           {
                this.state.data.map((value)=>
                <tr id={"categoryrow-" + value.couponCategoryId} key={value.couponCategoryId}>
                  <td>{sr_no++}</td>
                  <td>
                  <img className="card-img-top img-fluid profile-img" src={DefaultCategoryPath} alt="Card image cap" style={{height: "50px",width:"50px"}}/>
                  </td>
                  <td>{value.categoryName}</td>
                  <td className="p-0">
                  <div>
                  <button className="btn btn-secondary waves-effect waves-light" onClick={this.editCouponCategory} value={value.couponCategoryId}>Edit</button>
                  <button className="btn btn-danger waves-effect waves-light m-2"  onClick={this.deleteCouponCategory} value={value.couponCategoryId}>Delete</button>
                                    </div>
                    </td>
                </tr>
              
           )
            
           }
           </tbody>
           </table>
           {this.state.isOpen && <Modal setIsOpen={this.setIsOpen} id={this.state.id} />}
                   </div>
        </>
);

}
}

export default CouponCategoryList;