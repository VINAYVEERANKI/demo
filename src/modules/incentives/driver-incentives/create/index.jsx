import React from "react";
import DriverIncentivesDetails from "../../../../components/incentives/driverIncentives/driverIncentivesDetails";
import { useLocation } from "react-router";

const CreateDriverIncentive = () => {
  const location = useLocation();

  return (
    <>
      <DriverIncentivesDetails
        location={location}
        is_editable={true}
        type="createIncentive"
      />
    </>
  );
};

export default CreateDriverIncentive;
