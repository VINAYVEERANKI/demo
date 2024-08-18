import React from "react";
import CreateReferralDetails from "../../../../components/referrals/riderReferrals/create-referral-details";
import { useLocation } from "react-router";

const ReferralCreateReferral = () => {
  const location = useLocation();
  return (
    <>
        <CreateReferralDetails location={location} type = "createRiderReferral"/>
    </>
  );
};

export default ReferralCreateReferral;
