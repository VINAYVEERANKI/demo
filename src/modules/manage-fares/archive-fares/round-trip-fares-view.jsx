import React from "react";
import { useParams } from "react-router";
import FaresRoundTripEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-round-trip/fares-round-trip-edit";
import ArchiveRoundTripFares from "./round-trip-fares";

const ArchiveRoundTripFaresView = () => {
  const params = useParams();
  return (
    <ArchiveRoundTripFares>
      <FaresRoundTripEdit params={params?.id} />
    </ArchiveRoundTripFares>
  );
};

export default ArchiveRoundTripFaresView;
