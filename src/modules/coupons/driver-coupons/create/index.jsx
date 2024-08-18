import React from "react";
import DriverCouponDetails from "../../../../components/coupons/driverCoupons/driverCouponDetails";
import { useLocation } from "react-router";

const CreateDriverCoupons = () => {
  const location = useLocation();
  return (
    <>
      <DriverCouponDetails type="createDriverCoupon" location={location} />
    </>
  );
};

export default CreateDriverCoupons;
