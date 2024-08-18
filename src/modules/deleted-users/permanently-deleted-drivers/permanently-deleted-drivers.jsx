import React from "react";
import "../deleted-users.css";
import DriversTable from "../../../components/manage-drivers/manageDriversTable/driversTable";

const PermanentlyDeletedDrivers = () => {
  return (
    <>
      <DriversTable type={"permanentlyDeletedDrivers"} />
    </>
  );
};

export default PermanentlyDeletedDrivers;
