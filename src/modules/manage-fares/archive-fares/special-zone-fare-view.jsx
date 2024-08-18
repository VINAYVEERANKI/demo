import React from "react";
import { useLocation, useParams } from "react-router";
import FaresSpecialZonesEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-special-zones/special-zones-edit";
import ArchiveSpecialZoneFare from "./special-zone-fare";

const ArchiveSpecialfareView = () => {
  
  const params = useParams();
  const location=useLocation();

  return (
    <ArchiveSpecialZoneFare>
      <FaresSpecialZonesEdit params={params?.id} location={location}/>
    </ArchiveSpecialZoneFare>
  );
};

export default ArchiveSpecialfareView;
