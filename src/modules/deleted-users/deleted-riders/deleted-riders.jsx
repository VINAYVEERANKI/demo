import React from "react";
import "../deleted-users.css";
import RidersTable from "../../../components/manage-riders/ridersTable";

const DeletedRiders = () => {
  return (
    <>
      <RidersTable type="deletedRiders" />
    </>
  );
};

export default DeletedRiders;
