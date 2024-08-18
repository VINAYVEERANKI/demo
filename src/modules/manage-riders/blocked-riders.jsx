import React from "react";
import "./manageRiders.css";
import RidersTable from "../../components/manage-riders/ridersTable";

const BlockedRidersList = () => {
  return (
    <>
      <RidersTable type="blockedRiders" />
    </>
  );
};

export default BlockedRidersList;
