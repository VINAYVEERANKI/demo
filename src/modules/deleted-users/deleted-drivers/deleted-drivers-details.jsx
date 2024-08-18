import React from "react";
import "../deleted-users.css";
import { useLocation } from "react-router";
import DriverDetailComponent from "../../../components/manage-drivers/driverDetailComponent";
const DeletedDriversDetails = () => {
  const profileData = useLocation();

  return (
    <>
      <DriverDetailComponent
        type={"deletedDrivers"}
        profileData={profileData}
      />
    </>
  );
};
export default DeletedDriversDetails;
