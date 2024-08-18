import React from "react";
import "../deleted-users.css";
import RidersTable from "../../../components/manage-riders/ridersTable";

const PermanentlyDeletedRiders = () => {
  return (
    <>
      <RidersTable type="permanentlyDeletedRiders" />
    </>
  );
};

export default PermanentlyDeletedRiders;
