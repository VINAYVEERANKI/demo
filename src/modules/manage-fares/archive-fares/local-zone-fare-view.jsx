import React from "react";
import { useLocation, useParams } from "react-router";
import ArchiveLocalZoneFares from "./local-zone-fares";
import ManageFaresLocalZonesEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-local-zones/fares-local-zones-edit";

const ArchiveLocalZoneFareview = () => {
  const params = useParams();
  const location=useLocation();
  return (
    <ArchiveLocalZoneFares>
      <ManageFaresLocalZonesEdit
        params={params?.id}
        location={location}
      />
    </ArchiveLocalZoneFares>
  );
};

export default ArchiveLocalZoneFareview;
