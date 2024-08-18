import React from "react";
import { useParams } from "react-router";
import FaresRoundTripEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-round-trip/fares-round-trip-edit";
import RoundTripFares from "./round-trip-fares";

const RoundTripFaresUpdate = () => {
  const params = useParams();
  return (
    <RoundTripFares>
      <FaresRoundTripEdit params={params?.id} />
    </RoundTripFares>
  );
};

export default RoundTripFaresUpdate;
