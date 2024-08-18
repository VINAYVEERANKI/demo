import React from "react";
import "../manage-zone/manage-zone.css";
import ManageZoneMainTable from "../../components/manage-zones/mainTable";

const BlockedZone = () => {
  return (
    <>
       <ManageZoneMainTable type={"BlockedZones"}/>
    </>
  );
};

export default BlockedZone;