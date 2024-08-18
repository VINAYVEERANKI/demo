import React from "react";
import { useLocation, useParams } from "react-router";
import DriverCouponBroadcastDetails from "../../../../components/coupons/driverCoupons/driverCouponBroadcastDetails";
import InnerLayout from "../../../../components/layout/innerLayout";

const RejectedDriverCouponBroadcast = () => {
  const location = useLocation();
  const params = useParams();
  
  return (
    <>

          <DriverCouponBroadcastDetails
            location={location}
            params={params?.id}
          />
    </>
  );
};

export default RejectedDriverCouponBroadcast;