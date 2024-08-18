import React from "react";
import "../manageDrivers.css";
import DriversTable from "../../../components/manage-drivers/manageDriversTable/driversTable";

const BannedApplication = () => {
  return (
    <>
      <DriversTable type={"bannedApplication"} />
    </>
  );
};

export default BannedApplication;
