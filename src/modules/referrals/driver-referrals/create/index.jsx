import React from "react";
import { useLocation } from "react-router";
import DriverReferralDetails from "../../../../components/referrals/driverReferrals/driverReferralDetails";

const CreateDriverReferrals = () => {
  const location = useLocation();

  return (
    <>
      <DriverReferralDetails location={location} type="createDriverReferral" />
    </>
  );
};

export default CreateDriverReferrals;
