import React from "react";
import "./App.css";
import App from "./App"
import homeImage from "./assets/home_page.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  sessionStorage.clear();
  return (
    <div className="parent">
      <div className="home-container" style={{backgroundImage: `url(${homeImage})`}}>
        <div className="font-bold mt-5 p-2" style={{fontSize:'xx-large'}}>Welcome To Coupon Exchange System</div>
        <br>
        </br>
         <br>
        </br>
<div className="p-5" style={{fontSize:'x-large'}}>
Coupon Exchange System application mainly used to swap unused or unwanted coupons, deals or offers gained from online sources.
Many coupons and offers are left unused as they might not be relevant to that user. These coupons can be used by some other users.
Users can upload their unwanted coupons so that others who are in need of the coupon can access it.

</div>
      </div>
      
    </div>
  
  );
}

export default Home;
