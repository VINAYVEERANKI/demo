import React from "react";
import "../deleted-users.css";
import RiderHistoryComponent from "../../../components/manage-riders/riderHistoryComponent";

const DeletedRiderHistory = () => {
  return (
    <>
      <RiderHistoryComponent type={"deletedRiders"} />
    </>
  );
};

export default DeletedRiderHistory;
