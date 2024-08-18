import React from "react";

import DriversTable from "../../../components/manage-drivers/manageDriversTable/driversTable";

const BlockedDrivers = () => {
  return (
    <>
      <DriversTable type={"blockedDrivers"} />
    </>
  );
};

export default BlockedDrivers;
