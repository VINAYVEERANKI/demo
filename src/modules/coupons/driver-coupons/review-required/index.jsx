import React from "react";
import { useLocation, useParams } from "react-router";
import DriverCouponDetails from "../../../../components/coupons/driverCoupons/driverCouponDetails";

const DriverCouponReviewRequired = () => {
  const params = useParams();
  const location = useLocation();
  console.log(params);
  return (
    <>
      <DriverCouponDetails params={params?.id} location={location} />
    </>
  );
};

export default DriverCouponReviewRequired;
