import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import RiderCouponDetails from "../../../../components/coupons/riderCoupons/coupon-broadcast-details";

const CreateNewCoupon = () => {
  const Location = useLocation();
  const couponData = Location?.state;

  return (
    <div>
      <>
        <RiderCouponDetails couponData={couponData} type="createRiderCoupon" Location={Location}/>
      </>
    </div>
  );
};

export default CreateNewCoupon;
