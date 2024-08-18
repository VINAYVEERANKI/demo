import React from "react";
import "../../../../components/rider-coupons/coupon-component.css";
import { useLocation, useParams } from "react-router";
import RiderCouponDetails from "../../../../components/coupons/riderCoupons/coupon-broadcast-details";

const DeletedCouponView = () => {
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
export default DeletedCouponView;
