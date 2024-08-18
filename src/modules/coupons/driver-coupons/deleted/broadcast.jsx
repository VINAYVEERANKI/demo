import React from "react";
import { useLocation, useParams } from "react-router";
import DriverCouponBroadcastDetails from "../../../../components/coupons/driverCoupons/driverCouponBroadcastDetails";

const DeletedDriverCouponBroadcast = () => {
  const location = useLocation();
  const params = useParams();

  return (
    <>
      <DriverCouponBroadcastDetails location={location} params={params?.id} />
    </>
  );
};

export default DeletedDriverCouponBroadcast;
