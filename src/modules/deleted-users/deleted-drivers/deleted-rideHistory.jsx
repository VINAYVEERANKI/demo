import React from "react";
import { useLocation } from "react-router";
import "../deleted-users.css";
import DriverRideHistory from "../../../components/manage-drivers/driverRideHistory";

const DeletedDriverRideHistory = () => {
  const profileData = useLocation();


  return (
    <>
      <DriverRideHistory
        profileData={profileData}
        type={"deletedDriverRideHistory"}
      />
    </>
  );
};

export default DeletedDriverRideHistory;
