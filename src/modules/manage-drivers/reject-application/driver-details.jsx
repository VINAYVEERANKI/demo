import React from "react";
import "../manageDrivers.css";
import { useLocation } from "react-router";
import DriverDetailComponent from "../../../components/manage-drivers/driverDetailComponent";

const RejectDriverDetails = () => {
  const profileData = useLocation();

  return (
    <>
      <DriverDetailComponent
        type={"rejectedApplications"}
        profileData={profileData}
      />
    </>
  );
};
export default RejectDriverDetails;
