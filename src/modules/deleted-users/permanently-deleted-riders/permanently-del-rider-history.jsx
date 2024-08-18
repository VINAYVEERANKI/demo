import React from "react";
import "../deleted-users.css";
import RiderHistoryComponent from "../../../components/manage-riders/riderHistoryComponent";

const PermanentlyDelRiderHistory = () => {
  return (
    <>
      <RiderHistoryComponent type="permanentlyDeletedRiders" />
    </>
  );
};

export default PermanentlyDelRiderHistory;
