import React from "react";
import "../manageDrivers.css";
import { useLocation } from "react-router";
import DriverDetailComponent from "../../../components/manage-drivers/driverDetailComponent";
const DriverDetail = () => {
  const profileData = useLocation();

  return (
    <>
      <DriverDetailComponent type={"manageDrivers"} profileData={profileData} />
    </>
  );
};

export default DriverDetail;
