import React from "react";
import Layout from "../../../components/layout/layout";
import "../rider-complaints/rider-complaints.css";
import CallComplaintsGenerate from "../../../components/complaints/complaints-generate";

const DriverCall = () => {
  return (
    <>
        <CallComplaintsGenerate type="driverCallComplaint" />
    </>
  );
};
export default DriverCall;
