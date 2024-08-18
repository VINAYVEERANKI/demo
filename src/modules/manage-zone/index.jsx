import React from "react";
import "../manage-zone/manage-zone.css";
import ManageZoneMainTable from "../../components/manage-zones/mainTable";
export const libraries = ["places", "geometry", "visualization", "drawing"];

const ManageZone = () => {
  return (
    <>
      <ManageZoneMainTable type={"ManageZones"}/>

    </>
  );
};

export default ManageZone;
