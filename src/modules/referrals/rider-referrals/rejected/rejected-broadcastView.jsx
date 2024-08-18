import React from "react";
import { useLocation } from "react-router";
import ReferralBroadcastDetails from "../../../../components/referrals/riderReferrals/broadcast-details";

const ReferralRejectBroadcastView = () => {
  const Data = useLocation();

  return (
      <>
        <ReferralBroadcastDetails Data={Data} />
      </>
  );
};

export default ReferralRejectBroadcastView;
