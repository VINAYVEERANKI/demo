import React from "react";
import { useLocation, useParams } from "react-router";
import "../../../../components/rider-coupons/coupon-component.css";
import RiderCouponDetails from "../../../../components/coupons/riderCoupons/coupon-broadcast-details";

const ExpiredCouponView = () => {
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
export default ExpiredCouponView;
