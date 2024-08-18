import React from "react";
import "../fare.css";
import FaresMainTable from "../../../components/manage-fares/main-table";

const ManageFares = () => {
  return (
    <>
      <FaresMainTable type={"manageFares"} />
    </>
  );
};

export default ManageFares;
