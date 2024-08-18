import React from "react";
import { useLocation, useParams } from "react-router";
import ManageFaresUpdate from "./manage-fares";
import FaresRentalTable from "../../../components/manage-fares/manage-fare/fare-tables/fares-rental/faresRentalTable";

const RentalFares = ({ children }) => {
  const params = useParams();
  const paramsdata = params?.id;
  const paramsId = paramsdata?.split("&");
  const pathname = window?.location?.pathname;
  const location = useLocation();
  return (
    <ManageFaresUpdate>
      {pathname?.startsWith("/manage-fares/rental-fares/edit/") ||
      pathname?.startsWith("/manage-fares/rental-fares/view/") ? (
        children
      ) : (
        <FaresRentalTable paramsId={paramsId} location={location} />
      )}
    </ManageFaresUpdate>
  );
};

export default RentalFares;
