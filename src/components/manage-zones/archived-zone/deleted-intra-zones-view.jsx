import React from "react";
import DeletedIntraZoneTable from "../deletedIntraZoneTable";
import "../manage-zone-components.css";

const ArchivedDeletedIntraZonesView = ({
  archiveZonesData,
  loading,
  error,
}) => {
  return (
    <>
      <DeletedIntraZoneTable
        loading={loading}
        error={error}
        is_editable={false}
        tableList={archiveZonesData?.deletedIntraZones}
      />
    </>
  );
};

export default ArchivedDeletedIntraZonesView;
