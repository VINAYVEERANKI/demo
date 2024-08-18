import React from "react";
import { useLocation, useParams } from "react-router";
import ManageFaresUpdate from "./manage-fares";
import FaresOnewayTripTable from "../../../components/manage-fares/manage-fare/fare-tables/fares-one-way-trip/faresOnewayTripTable";

const OneWayTripFares = ({ children }) => {
  const params = useParams();
  const paramsdata = params?.id;
  const paramsId = paramsdata?.split("&");
  const pathname = window?.location?.pathname;
  const location = useLocation();
  return (
    <ManageFaresUpdate>
      {pathname?.startsWith("/manage-fares/oneway-trip-fares/edit/") ||
      pathname?.startsWith("/manage-fares/oneway-trip-fares/view/") ? (
        children
      ) : (
        <FaresOnewayTripTable paramsId={paramsId} location={location}/>
      )}
    </ManageFaresUpdate>
  );
};

export default OneWayTripFares;
