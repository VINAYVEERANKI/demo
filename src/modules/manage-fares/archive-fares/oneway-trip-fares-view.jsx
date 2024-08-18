import React from "react";
import { useLocation, useParams } from "react-router";
import FaresonewayTripEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-one-way-trip/fares-one-way-trip-edit";
import ArchiveOnewayTripFares from "./oneway-trip-fares";

const ArchiveOnewayTripFaresView = () => {
  const params = useParams();
  const location=useLocation();
  return (
    <ArchiveOnewayTripFares>
      <FaresonewayTripEdit params={params?.id} location={location}/>
    </ArchiveOnewayTripFares>
  );
};

export default ArchiveOnewayTripFaresView;
