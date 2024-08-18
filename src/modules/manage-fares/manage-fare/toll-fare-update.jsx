import React from "react";
import { useLocation, useParams } from "react-router";
import FaresTollsEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-tolls/fares-tolls-edit";
import TollsZoneFares from "./tolls-zone-fares";

const TollFareUpdate = () => {
  const params = useParams();
  const location = useLocation();
  return (
    <TollsZoneFares>
      <FaresTollsEdit params={params?.id} location={location}/>
    </TollsZoneFares>
  );
};

export default TollFareUpdate;
