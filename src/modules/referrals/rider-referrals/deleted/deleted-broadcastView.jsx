import React from "react";
import { useLocation } from "react-router";
import ReferralBroadcastDetails from "../../../../components/referrals/riderReferrals/broadcast-details";

const ReferralDeletedBroadcastView = () => {
  const Data = useLocation();

  return (
    <>
        <ReferralBroadcastDetails Data={Data} />
    </>
  );
};
export default ReferralDeletedBroadcastView;
