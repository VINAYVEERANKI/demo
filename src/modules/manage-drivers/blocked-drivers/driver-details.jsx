import React from "react";
import { useLocation } from "react-router";
import DriverDetailComponent from "../../../components/manage-drivers/driverDetailComponent";

const BlockedDriverDetails = () => {
  const profileData = useLocation();

  return (
    <>
      <DriverDetailComponent
        type={"blockedDrivers"}
        profileData={profileData}
      />
    </>
  );
};

export default BlockedDriverDetails;
