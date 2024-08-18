import React from "react";
import { useLocation, useParams } from "react-router";
import ManageFaresRentalEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-rental/manage-fares-rental-edit";
import ArchiveRentalFares from "./rental-fares";

const ArchiveRentalFaresView = () => {
  const params = useParams();
  const location = useLocation();
  return (
    <ArchiveRentalFares>
      <ManageFaresRentalEdit params={params?.id} location={location}/>
    </ArchiveRentalFares>
  );
};

export default ArchiveRentalFaresView;
