import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import DriverCouponBroadcastDetails from "../../../../components/coupons/driverCoupons/driverCouponBroadcastDetails";

const CreateDriverCouponBroadcast = () => {
  const location = useLocation();
  const [couponData] = useState(location?.state?.data?.data);
  const params = useParams();

  return (
    <>
      <DriverCouponBroadcastDetails
        couponData={couponData}
        params={params?.id}
        type="createDriverCoupon"
      />
    </>
  );
};

export default CreateDriverCouponBroadcast;
