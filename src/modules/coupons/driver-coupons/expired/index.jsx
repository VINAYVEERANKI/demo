import React from "react";
import { useLocation, useParams } from "react-router";
import DriverCouponDetails from "../../../../components/coupons/driverCoupons/driverCouponDetails";

const ExpiredDriverCoupon = () => {
  const params = useParams();
  const location = useLocation();
  return (
    <>
        <DriverCouponDetails params={params?.id} location={location} />
    </>
  )
}

export default ExpiredDriverCoupon