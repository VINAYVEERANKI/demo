import React from "react";
import { useLocation } from "react-router";
import RiderReferralComponent from "../../../components/referrals/riderReferrals/riderReferral";

const RiderReferral = () => {
  const location = useLocation();
  return (
    <>
        <RiderReferralComponent location={location} />
    </>
  );
};

export default RiderReferral;
