import React from "react";
import "../manageDrivers.css";
import { useLocation } from "react-router";
import DriverDetailComponent from "../../../components/manage-drivers/driverDetailComponent";

const BannedDriverDetails = () => {
  const profileData = useLocation();

  return (
    <>
      <DriverDetailComponent
        type={"bannedApplication"}
        profileData={profileData}
      />
    </>
  );
};

export default BannedDriverDetails;
