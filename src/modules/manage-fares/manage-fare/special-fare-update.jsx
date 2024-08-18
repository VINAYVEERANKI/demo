import React from "react";
import { useLocation, useParams } from "react-router";
import FaresSpecialZonesEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-special-zones/special-zones-edit";
import SpecialZoneFares from "./special-zone-fares";

const SpecialFareUpdate = () => {
  const params = useParams();
  const location = useLocation();
  return (
    <SpecialZoneFares>
      <FaresSpecialZonesEdit params={params?.id} location={location}/>
    </SpecialZoneFares>
  );
};

export default SpecialFareUpdate;
