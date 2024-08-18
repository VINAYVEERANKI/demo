import React, { useState } from "react";
import IntraCreateMap from "../map/intraCreateMap";
import IntraZoneTable from "../intraZoneTable";
import "../manage-zone-components.css";

const ArchivedLocalOutstationView = ({
  archiveZonesData,
  loading,
  error,
  loadError = "",
  isLoaded = false,
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
          tableHeading="Local - Defined Cities"
          loading={loading}
          error={error}
          tableList={archiveZonesData?.localZone}
          setIntraType={setIntraType}
          setEditId={setEditId}
          setActionType={setActionType}
          setShowMap={setShowMap}
          headingClassName={"local_zone_head_container"}
          is_editable={false}
          intraZoneType={"local"}
        />
        <IntraZoneTable
          tableHeading="Outstation - Defined Cities"
          loading={loading}
          error={error}
          tableList={archiveZonesData?.outStationZone}
          setIntraType={setIntraType}
          setEditId={setEditId}
          setActionType={setActionType}
          setShowMap={setShowMap}
          headingClassName={"outstation_zone_head_container"}
          is_editable={false}
          intraZoneType={"outstation"}
        />

        <IntraCreateMap
          archived={true}
          isLoaded={isLoaded}
          loadError={loadError}
          zoneEdit={editId}
          show={showMap}
          action={actionType}
          name={"coordinates"}
          intraZoneType={intraType}
          closeModal={() => {
            setActionType("");
            setShowMap(false);
            setIntraType("");
          }}
          mapData={polyData}
          zoneID={archiveZonesData?.zoneDetails?.main_zone_code}
          zoneName={archiveZonesData?.zoneDetails?.zone_name}
          is_editable={false}
        />
      </div>
    </>
  );
};

export default ArchivedLocalOutstationView;
