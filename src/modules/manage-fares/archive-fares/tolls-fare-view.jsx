import React from "react";
import { useLocation, useParams } from "react-router";
import FaresTollsEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-tolls/fares-tolls-edit";
import ArchiveTollsFares from "./tolls-fares";

const ArchiveTollFareView = () => {
    const params = useParams();
    const location = useLocation();
  return (
    <ArchiveTollsFares>
      <FaresTollsEdit params={params?.id} location={location} />
    </ArchiveTollsFares>
  );
};

export default ArchiveTollFareView;
