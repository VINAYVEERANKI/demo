import React from "react";
import { useLocation } from "react-router";
import DriverReferralComponent from "../../../components/referrals/driverReferrals/driverReferral";

const DriverReferral = () => {
  const location = useLocation();

  return (
    <>
        <DriverReferralComponent location={location} />
    </>
  );
};

export default DriverReferral;