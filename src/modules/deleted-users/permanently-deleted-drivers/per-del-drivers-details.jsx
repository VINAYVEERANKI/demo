import React from "react";
import { useLocation } from "react-router";
import DriverDetailComponent from "../../../components/manage-drivers/driverDetailComponent";
import "../deleted-users.css";

const PerDelDriversDetails = () => {
  const profileData = useLocation();

  return (
    <>
      <DriverDetailComponent
        type={"permanentlyDeletedDrivers"}
        profileData={profileData}
      />
    </>
  );
};

export default PerDelDriversDetails;
