import React from "react";
import { useLocation } from "react-router";
import CouponBroadcastDetails from "../../../../components/coupons/riderCoupons/coupon-broadcast-details/broadcast-details";


const ReviewBroadCastViewEdit = () => {
  const Location = useLocation();

  return (
    <>
        <CouponBroadcastDetails Location={Location} />
    </>
  );
};

export default ReviewBroadCastViewEdit;