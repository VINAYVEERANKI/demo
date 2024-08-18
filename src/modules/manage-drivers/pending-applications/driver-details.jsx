import React from "react";
import "../manageDrivers.css";
import { useLocation } from "react-router";
import DriverDetailComponent from "../../../components/manage-drivers/driverDetailComponent";

const PendingDriverDetails = () => {
  const profileData = useLocation();

  return (
    <>
      <DriverDetailComponent
        type={"pendingApplications"}
        profileData={profileData}
      />
    </>
  );
};

export default PendingDriverDetails;
