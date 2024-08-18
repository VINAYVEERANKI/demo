import React, { useEffect, useState } from "react";
import { clearReducerDriverCouponAction } from "../../../redux/actions/riderCoupon/clearCouponAction";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import DriverCouponComponent from "../../../components/coupons/driverCoupons/driverCoupon";

const DriverCoupons = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location?.pathname === "/driver-coupons") {
      dispatch(clearReducerDriverCouponAction());
    }
  }, []);

  return (
    <>
      <DriverCouponComponent />
    </>
  );
};

export default DriverCoupons;
