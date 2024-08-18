import React from "react";
import "./rider-complaints.css";
import ResolvedAndClosedComplaintsTable from "../../../components/complaints/complaintsTable/resolvedAndClosedTable";
import { useLocation } from "react-router";

const ResolvedClosedComplaints = () => {
  const navLocation = useLocation();
  return (
    <>
      <ResolvedAndClosedComplaintsTable
        type="riderResolvedClosedComplaints"
        navLocation={navLocation}
      />
    </>
  );
};
export default ResolvedClosedComplaints;
