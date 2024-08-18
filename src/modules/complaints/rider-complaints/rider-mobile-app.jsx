import React from "react";
import ComplaintsMobileApp from "../../../components/complaints/mobileApp";
import { useLocation } from "react-router";

const RiderMobileApp = () => {
  const navLoaction = useLocation()
  return (
    <>
      <ComplaintsMobileApp type="riderComplaints" navLoaction={navLoaction}/>
    </>
  );
};

export default RiderMobileApp;
