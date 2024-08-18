import React from "react";
import { useLocation, useParams } from "react-router";
import DriverReferralBroadcastDetails from "../../../../components/referrals/driverReferrals/driverReferralBroadcastDetails";

const RejectedDriverRefBroadcast = () => {
  const location = useLocation();
  const params = useParams();
  console.log(location);
  return (
    <>
        <DriverReferralBroadcastDetails
          location={location}
          params={params?.id}
        />
    </>
  );
};

export default RejectedDriverRefBroadcast;
