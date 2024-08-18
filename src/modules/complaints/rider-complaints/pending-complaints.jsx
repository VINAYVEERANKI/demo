import React from "react";
import "./rider-complaints.css";
import ComplaintsTable from "../../../components/complaints/complaintsTable/complaintsTable";
import { useLocation } from "react-router";

const RiderPendingComplaints = () => {
  const navLocation = useLocation();
  return (
    <>
        <ComplaintsTable type="riderPendingComplaints" navLocation={navLocation}/>
    </>
  );
};
export default RiderPendingComplaints;
