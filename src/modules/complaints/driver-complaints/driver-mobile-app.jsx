import React from "react";
import ComplaintsMobileApp from "../../../components/complaints/mobileApp";
import { useLocation } from "react-router";

const DriverMobileApp = () => {
  const navLoaction = useLocation()
  return (
    <>
      <ComplaintsMobileApp type="driverComplaints" navLoaction={navLoaction}/>
    </>
  );
};
export default DriverMobileApp;
