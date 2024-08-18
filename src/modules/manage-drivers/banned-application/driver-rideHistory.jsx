import React from "react";
import { useLocation } from "react-router";
import "../manageDrivers.css";
import DriverRideHistory from "../../../components/manage-drivers/driverRideHistory";

const BannedRideHistory = () => {
  const profileData = useLocation();
  return (
    <>
      <DriverRideHistory profileData={profileData} type={"bannedApplication"} />
    </>
  );
};
export default BannedRideHistory;