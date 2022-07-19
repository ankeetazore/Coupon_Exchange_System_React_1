import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import swal from "sweetalert2";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import {API_URL} from "./Const/Const";

const Modal = ({ setIsOpen, id }) => {

    function addCouponCategory (event) {
        event.preventDefault();
        let categoryName = document.getElementById('CategoryName').value;
        let categoryId = parseInt(document.getElementById('CategoryId').value);

        if(categoryName.length === 0)
        alert("Enter Category Name");

        let UserData = null;
            if(sessionStorage.getItem("LoggedInUserDetails") !== null && sessionStorage.getItem("LoggedInUserDetails") !== undefined){
              UserData =  JSON.parse(sessionStorage.getItem("LoggedInUserDetails"));
            }

        let couponCategory={
          CouponCategoryId:(categoryId != undefined && categoryId != null)? categoryId : 0,
          CategoryName:categoryName,
          CategoryImagePath:"",
          UserId: (UserData != null)? UserData.userId : 0
            };
            fetch(API_URL + 'CouponCategory',{
                method: 'POST',
                headers:{'Content-type':'application/json'},
                  body: JSON.stringify(couponCategory)
              }).then(r=>r.json())
              .then((data) => {
                  axios.get(API_URL+ 'CouponCategory').then(res =>
         {
        sessionStorage.setItem("CouponCategoryList",JSON.stringify(res.data));
         });
         if(couponCategory.CouponCategoryId == 0){
                  swal.fire({
                    title: "Coupon Category Added Successfully",
                icon: "success",
                confirmButtonText: "OK",
              }).then(function () {
                  setIsOpen(false);
                });
                }
                else{
                    swal.fire({
                        title: "Coupon Category Updated Successfully",
                    icon: "success",
                    confirmButtonText: "OK",
                  }).then(function () {
                      setIsOpen(false);
                    });
                }
                window.location.href = "/";
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

            const category_data= JSON.parse(sessionStorage.getItem("CouponCategoryList")).find(x => x.couponCategoryId == id );
    if(category_data !== undefined && category_data!== null && category_data.length !== 0){
        return (
            <>
          <div className={styles.darkBG} onClick={()=>{setIsOpen(false)}}/>
          <div className={styles.centered}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h5 className={styles.heading}>Update Coupon Category</h5>
              </div>
              <div className={styles.modalContent}>
              <form className={styles.modalForm}>
                <input style={{display:"none"}} id="CategoryId" value={category_data.couponCategoryId}></input>
                    <input className={styles.modalFormInput} type="text" disabled value={category_data.categoryName}/>
                    <input className={styles.modalFormInput} type="text" placeholder="Enter New Coupon Category Name*" id='CategoryName' />
                  </form>
              </div>
              <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                  <button className={styles.addBtn} onClick={addCouponCategory}>Update</button>
                  <button className={styles.cancelBtn} onClick={()=>{setIsOpen(false)}}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }else{
        return (
            <>
          <div className={styles.darkBG} onClick={()=>{setIsOpen(false)}}/>
          <div className={styles.centered}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h5 className={styles.heading}>Add Coupon Category</h5>
              </div>
              <div className={styles.modalContent}>
              <form className={styles.modalForm}>
              <input style={{display:"none"}} id="CategoryId" value={0}></input>
                    <input className={styles.modalFormInput} type="text" placeholder="Enter Coupon Category Name*" id='CategoryName'/>
                    <br></br>
                  </form>
              </div>
              <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                  <button className={styles.addBtn} onClick={addCouponCategory}>Add</button>
                  <button className={styles.cancelBtn} onClick={()=>{setIsOpen(false)}}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }


};

export default Modal;