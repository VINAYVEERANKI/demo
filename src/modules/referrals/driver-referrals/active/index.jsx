import React from "react";
import DriverReferralDetails from "../../../../components/referrals/driverReferrals/driverReferralDetails";
import { useLocation, useParams } from "react-router";

const DriverRefActive = () => {
  const params = useParams();
  const location = useLocation();
  console.log(location);
  return (
    <>
      <DriverReferralDetails params={params?.id} location={location} />
    </>
  );
};

export default DriverRefActive;
