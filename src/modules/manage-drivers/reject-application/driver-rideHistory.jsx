import React from "react";
import { useLocation } from "react-router";
import "../manageDrivers.css";
import DriverRideHistory from "../../../components/manage-drivers/driverRideHistory";

const RejectRideHistory = () => {
  const profileData = useLocation();

  return (
    <>
      <DriverRideHistory profileData={profileData} type={"rejectApplication"} />
    </>
  );
};

export default RejectRideHistory;
