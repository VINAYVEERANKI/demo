import React from "react";
import { useLocation, useParams } from "react-router";
import FaresonewayTripEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-one-way-trip/fares-one-way-trip-edit";
import DeletedOnewayTripFares from "./oneway-trip-fares";

const DeletedOnewayTripFareView = () => {
  const params = useParams();
  const location = useLocation();
  return (
    <DeletedOnewayTripFares>
      <FaresonewayTripEdit params={params?.id} fare={`deletedIntraFares`} location={location} />
    </DeletedOnewayTripFares>
  );
};

export default DeletedOnewayTripFareView;
