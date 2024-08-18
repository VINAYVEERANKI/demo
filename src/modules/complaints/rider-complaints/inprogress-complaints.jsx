import React from "react";
import "./rider-complaints.css"
import ComplaintsTable from "../../../components/complaints/complaintsTable/complaintsTable";
import { useLocation } from "react-router";

const RiderInprogressComplaints = () => {
  const navLocation = useLocation();
  return (
    <>
        <ComplaintsTable type="riderInprogressComplaints" navLocation={navLocation} />
    </>
  );
};
export default RiderInprogressComplaints;
