import React from "react";
import { useLocation, useParams } from "react-router";
import ManageFaresRentalEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-rental/manage-fares-rental-edit";
import RentalFares from "./rental-fares";

const RentalFaresUpdate = () => {
  const params = useParams();
  const location = useLocation();
  return (
    <RentalFares>
      <ManageFaresRentalEdit params={params?.id} location={location} />
    </RentalFares>
  );
};

export default RentalFaresUpdate;
