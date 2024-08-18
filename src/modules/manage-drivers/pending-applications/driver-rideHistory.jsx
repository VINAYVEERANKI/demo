import React from "react";
import { useLocation } from "react-router";
import "../manageDrivers.css";
import DriverRideHistory from "../../../components/manage-drivers/driverRideHistory";

const PendingRideHistory = () => {
  const profileData = useLocation();

  return (
    <>
      <DriverRideHistory
        profileData={profileData}
        type={"pendingRideHistory"}
      />
    </>
  );
};

export default PendingRideHistory;
