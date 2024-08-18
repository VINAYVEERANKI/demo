import React from "react";
import "../../../../components/rider-coupons/coupon-component.css";
import RiderCouponDetails from "../../../../components/coupons/riderCoupons/coupon-broadcast-details";
import { useLocation, useParams } from "react-router";

const ActiveCouponViewEdit = () => {
  const Location = useLocation();
  const params = useParams();
  return (
    <>
       <>
        <RiderCouponDetails params={params} Location={Location} />
      </>
    </>
  );
};
export default ActiveCouponViewEdit;
