import React from "react";
import "../manageDrivers.css";
import DriversTable from "../../../components/manage-drivers/manageDriversTable/driversTable";

const RejectApplication = () => {
  return (
    <>
      <DriversTable type={"rejectApplication"} />
    </>
  );
};
export default RejectApplication;
