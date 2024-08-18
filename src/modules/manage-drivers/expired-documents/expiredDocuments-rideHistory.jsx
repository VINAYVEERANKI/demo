import React from "react";
import { useLocation } from "react-router";
import DriverRideHistory from "../../../components/manage-drivers/driverRideHistory";

const ExpiredDocumentsRideHistory = () => {
  const profileData = useLocation();

  return (
    <>
      <DriverRideHistory profileData={profileData} type={"expiredDocuments"} />
    </>
  );
};
export default ExpiredDocumentsRideHistory;
