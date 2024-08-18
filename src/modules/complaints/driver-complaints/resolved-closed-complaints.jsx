import React from "react";
import Layout from "../../../components/layout/layout";
import "../rider-complaints/rider-complaints.css";
import ResolvedAndClosedComplaintsTable from "../../../components/complaints/complaintsTable/resolvedAndClosedTable";
import { useLocation } from "react-router";

const DriverResolvedClosedComplaints = () => {
  const navLocation = useLocation();
  return (
    <>
      <ResolvedAndClosedComplaintsTable
        type="driverResolvedClosedComplaints"
        navLocation={navLocation}
      />
    </>
  );
};
export default DriverResolvedClosedComplaints;
