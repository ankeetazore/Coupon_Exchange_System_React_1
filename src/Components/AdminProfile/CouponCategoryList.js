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
import { MDBDataTable } from "mdbreact";

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
    const category_table = {
        columns: [
          {
            label: "Sr No.",
            field: "col_1",
            sort: "asc",
            width: 100,
          },
          {
            label: "Category Image",
            field: "col_2",
            sort: "asc",
            width: 200,
          },
          {
            label: "Category Name",
            field: "col_3",
            sort: "asc",
            width: 200,
          },
          {
            label: "Action",
            field: "col_4",
            sort: "asc",
            width: 100,
          },
        ],
        rows:JSON.parse(sessionStorage.getItem("CouponCategoryList"))
      };

      return (
            <div className="row p-5">
            <MDBDataTable striped bordered small data={category_table} id="CouponCategoryListTable" />
            </div>
);

}
}

export default CouponCategoryList;