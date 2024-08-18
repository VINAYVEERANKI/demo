import React from "react";
import "../manageDrivers.css";
import PendingApplicationTable from "../../../components/manage-drivers/manageDriversTable/pendingApplicationTable";

const PendingApplications = () => {
  return (
    <>
      <PendingApplicationTable type={"pendApplFilter"}/>
    </>
  );
};
export default PendingApplications;
