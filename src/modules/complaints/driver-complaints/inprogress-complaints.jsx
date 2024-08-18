import React from "react";
import Layout from "../../../components/layout/layout";
import "../rider-complaints/rider-complaints.css";
import ComplaintsTable from "../../../components/complaints/complaintsTable/complaintsTable";
import { useLocation } from "react-router";

const DriverInprogressComplaints = () => {
  const navLocation = useLocation();
  return (
    <>
        <ComplaintsTable type="driverInprogressComplaints" navLocation={navLocation} />
    </>
  );
};
export default DriverInprogressComplaints;
