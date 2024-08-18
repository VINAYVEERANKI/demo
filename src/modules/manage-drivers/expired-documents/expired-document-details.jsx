import React from "react";
import { useLocation } from "react-router";
import DriverDetailComponent from "../../../components/manage-drivers/driverDetailComponent";

const ExpiredDocumentDetails = () => {
  const profileData = useLocation();

  return (
    <>
      <DriverDetailComponent
        type={"expiredDocuments"}
        profileData={profileData}
      />
    </>
  );
};
export default ExpiredDocumentDetails;
