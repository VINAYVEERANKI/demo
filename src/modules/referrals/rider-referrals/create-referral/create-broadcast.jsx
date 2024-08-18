import React from "react";
import ReferralBroadcastDetails from "../../../../components/referrals/riderReferrals/broadcast-details";
import { useLocation } from "react-router";

const ReferralCreateBroadcast = () => {
  const location = useLocation();
  return (
      <>
        <ReferralBroadcastDetails location={location} type = "createRiderReferral"/>
      </>
  );
};

export default ReferralCreateBroadcast;
