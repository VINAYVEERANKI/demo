import React from "react";
import "../deleted-users.css";

import DriversTable from "../../../components/manage-drivers/manageDriversTable/driversTable";

const DeletedDrivers = () => {
  return (
    <>
      <DriversTable type={"deletedDrivers"} />
    </>
  );
};

export default DeletedDrivers;
