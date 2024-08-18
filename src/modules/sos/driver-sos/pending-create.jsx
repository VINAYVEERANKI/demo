import React from "react";
import "../../complaints/rider-complaints/rider-complaints.css";
import SosTable from "../../../components/sos/sosTable";

const PendingCreateDriverSos = () => {
  return (
    <>
        <SosTable type={"pendingDriverSos"} />
    </>
  );
};

export default PendingCreateDriverSos;
