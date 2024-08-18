import React, { useState } from "react";
import { useLocation } from "react-router";
import CouponBroadcastDetails from "../../../../components/coupons/riderCoupons/coupon-broadcast-details/broadcast-details";

const CreateBroadcast = () => {
  const Location = useLocation();
  const broadcastData = Location?.state?.data;
  return (
    <div>
      <>
        <CouponBroadcastDetails
          Location={Location}
          type="createRiderCoupon"
          broadcastData={broadcastData}
        />
      </>
    </div>
  );
};

export default CreateBroadcast;
