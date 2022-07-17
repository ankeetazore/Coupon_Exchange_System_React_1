import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Link} from 'react-router-dom';
import DefaultProfilePath from './admin-assets/profile-image.png';
//jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import "bootstrap/dist/css/bootstrap.min.css";

let LoggedInUserDetails = null;

class CouponCategoryList extends Component{
constructor(props){
    super(props);
    if(sessionStorage.getItem("LoggedInUserDetails") !== null && sessionStorage.getItem("LoggedInUserDetails") !== undefined){
      LoggedInUserDetails =  JSON.parse(sessionStorage.getItem("LoggedInUserDetails"));
    }else{
        sessionStorage.clear();
    window.location.href = "/";
    window.location.reload();
    }
}

render() {
   
const category_list = JSON.parse(sessionStorage.getItem("CouponCategoryList"));
      return (
<>
<div className="row p-4" style={{height:"75vh",overflowY:"scroll"}}>
            <table class="table">
              <thead>
                <th>Sr No.</th>
                <th>Category Image</th>
                <th>Category Name</th>
                <th>Action</th>
              </thead>
              <tbody>
           {
               category_list.map((value)=>
                    <tr>
                      <td style={{height:"15px"}}>{value.couponCategoryId}</td>
                      <td style={{height:"15px"}}>{value.categoryImagePath}</td>
                      <td style={{height:"15px"}}>{value.categoryName}</td>
                      <td className="p-0" style={{height:"15px"}}>
                      <div>
                      <button className="btn btn-secondary waves-effect waves-light">Edit</button>
                      <button className="btn btn-danger waves-effect waves-light m-2">Delete</button>
                                        </div>
                        </td>
                    </tr>
                  
               )
           }
           </tbody>
           </table>
                   </div>
        </>
);

}
}

export default CouponCategoryList;