import React from "react";
import { useLocation } from "react-router";
import DriverReferralBroadcastDetails from "../../../../components/referrals/driverReferrals/driverReferralBroadcastDetails";

const DriverReferralCreateBroadcast = () => {
  const location = useLocation();

  return (
    <>
        <DriverReferralBroadcastDetails location={location} type="createDriverReferral" />
      </>
  );
};

export default DriverReferralCreateBroadcast;
