import React from "react";
import { useLocation, useParams } from "react-router";
import ManageFaresUpdate from "./manage-fares";
import FaresRoundTripTable from "../../../components/manage-fares/manage-fare/fare-tables/fares-round-trip/faresRoundTripTable";

const RoundTripFares = ({ children }) => {
  const params = useParams();
  const paramsdata = params?.id;
  const paramsId = paramsdata?.split("&");
  const pathname = window?.location?.pathname;
  const location = useLocation();
  return (
    <ManageFaresUpdate>
      {pathname?.startsWith("/manage-fares/round-trip-fares/edit/") ||
      pathname?.startsWith("/manage-fares/round-trip-fares/view/") ? (
        children
      ) : (
        <FaresRoundTripTable paramsId={paramsId} location={location}/>
      )}
    </ManageFaresUpdate>
  );
};

export default RoundTripFares;
