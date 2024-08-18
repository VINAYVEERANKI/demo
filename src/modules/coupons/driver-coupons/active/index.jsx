import React from "react";
import { useLocation, useParams } from "react-router";
import DriverCouponDetails from "../../../../components/coupons/driverCoupons/driverCouponDetails";

const DriverCouponActive = () => {
  
  const params = useParams();
  const location = useLocation();

  return (
    <>
      <DriverCouponDetails params={params?.id} location={location} />
    </>
  );
};

export default DriverCouponActive;
