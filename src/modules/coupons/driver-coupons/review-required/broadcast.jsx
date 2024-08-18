import React from "react";
import { useLocation, useParams } from "react-router";
import DriverCouponBroadcastDetails from "../../../../components/coupons/driverCoupons/driverCouponBroadcastDetails";

const ReviewReqDriverCouponBroadcast = () => {
  const location = useLocation();
  const params = useParams();
  console.log(params?.id);
  console.log(location);
  return (
    <>
      <DriverCouponBroadcastDetails location={location} params={params?.id} />
    </>
  );
};

export default ReviewReqDriverCouponBroadcast;
