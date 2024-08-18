import React from "react";
import DriverIncentiveBroadcast from "../../../../components/incentives/driverIncentives/driverIncentiveBroadcast";
import { useLocation, useParams } from "react-router";

const ReviewReqIncentiveBroadcast = () => {
  const location = useLocation();
  const params = useParams();
  return (
    <>
      <DriverIncentiveBroadcast location={location} params={params} />
    </>
  );
};

export default ReviewReqIncentiveBroadcast;
