import React from "react";
import DriverIncentiveBroadcast from "../../../../components/incentives/driverIncentives/driverIncentiveBroadcast";
import { useLocation } from "react-router";

const CreateDriverIncentiveBroadcast = () => {
  const location = useLocation();
  return (
    <>
      <DriverIncentiveBroadcast 
      location={location}
      />
    </>
  );
};

export default CreateDriverIncentiveBroadcast;
