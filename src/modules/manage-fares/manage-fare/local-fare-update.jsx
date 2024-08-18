import React from "react";
import { useLocation, useParams } from "react-router";
import ManageFaresLocalZonesEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-local-zones/fares-local-zones-edit";
import LocalZoneFares from "./local-zone-fares";

const LocalFareUpdate = () => {
  const params = useParams();
  const location = useLocation();
  console.log(location);
  return (
    <>
      <LocalZoneFares>
        <ManageFaresLocalZonesEdit params={params?.id} location={location}/>
      </LocalZoneFares>
    </>
  );
};

export default LocalFareUpdate;
