import React from "react";
import { useLocation, useParams } from "react-router";
import FaresonewayTripEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-one-way-trip/fares-one-way-trip-edit";
import OneWayTripFares from "./one-way-trip-fares";

const OnewayTripfaresUpdate = () => {
  const params = useParams();
  const location = useLocation();
  return (
    <OneWayTripFares>
      <FaresonewayTripEdit params={params?.id} location={location}/>
    </OneWayTripFares>
  );
};

export default OnewayTripfaresUpdate;
