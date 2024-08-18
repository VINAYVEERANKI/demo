import React, { useState } from "react";
import IntraCreateMap from "../map/intraCreateMap";
import IntraZoneTable from "../intraZoneTable";
import "../manage-zone-components.css";

const ArchivedSpecialZonesTolls = ({
  archiveZonesData,
  loading,
  error,
  isLoaded,
  loadError,
  polyData = [],
}) => {
  const [intraType, setIntraType] = useState("");
  const [actionType, setActionType] = useState("view");
  const [showMap, setShowMap] = useState(false);
  const [editId, setEditId] = useState(null);
  return (
    <>
      <div className="row gx-5">
        <IntraZoneTable
          tableHeading="Special Zones"
          loading={loading}
          error={error}
          tableList={archiveZonesData?.specialZone}
          setIntraType={setIntraType}
          setEditId={setEditId}
          setActionType={setActionType}
          setShowMap={setShowMap}
          headingClassName={"special_zone_head_container"}
          is_editable={false}
          intraZoneType={"special"}
        />
        <IntraZoneTable
          tableHeading="Toll Zones"
          loading={loading}
          error={error}
          tableList={archiveZonesData?.tollsZone}
          setIntraType={setIntraType}
          setEditId={setEditId}
          setActionType={setActionType}
          setShowMap={setShowMap}
          headingClassName={"tools_zone_head_container"}
          is_editable={false}
          intraZoneType={"toll"}
        />

        <IntraCreateMap
          archived={true}
          isLoaded={isLoaded}
          loadError={loadError}
          zoneEdit={editId}
          show={showMap}
          action={actionType}
          mapData={polyData}
          name={"coordinates"}
          intraZoneType={intraType}
          closeModal={() => {
            setActionType("");
            setShowMap(false);
            setIntraType("");
          }}
          zoneID={archiveZonesData?.zoneDetails?.main_zone_code}
          zoneName={archiveZonesData?.zoneDetails?.zone_name}
          is_editable={false}
        />
      </div>
    </>
  );
};

export default ArchivedSpecialZonesTolls;
