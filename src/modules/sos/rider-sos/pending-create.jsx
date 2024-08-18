import React from "react";
import "../../complaints/rider-complaints/rider-complaints.css";
import SosTable from "../../../components/sos/sosTable";

const PendingCreateRiderSos = () => {
  return (
    <>
        <SosTable type={"pendingRiderSos"} />
    </>
  );
};

export default PendingCreateRiderSos;
