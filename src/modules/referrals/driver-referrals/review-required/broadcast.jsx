import React from "react";
import { useLocation, useParams } from "react-router";
import DriverReferralBroadcastDetails from "../../../../components/referrals/driverReferrals/driverReferralBroadcastDetails";

const ReviewReqDriverRefBroadcast = () => {
  const location = useLocation();
  const params = useParams();

  return (
    <>
        <DriverReferralBroadcastDetails
          location={location}
          params={params?.id}
        />
    </>
  );
};

export default ReviewReqDriverRefBroadcast;
