import React from "react";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import RiderCouponDetails from "../../../../components/coupons/riderCoupons/coupon-broadcast-details";

const ReviewRequiredview = () => {
  const Location = useLocation();
  const params = useParams();
  // const couponData = Location?.state;

  return (
    <>
        <RiderCouponDetails
          // couponData={couponData}
          // type="createRiderCoupon"
          params={params}
          Location={Location}
        />
    </>
  );
};
export default ReviewRequiredview;
