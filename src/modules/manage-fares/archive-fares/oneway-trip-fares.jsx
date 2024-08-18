import React from "react";
import { useLocation, useParams } from "react-router";
import ArchiveFaresView from "./archive-fares-view";
import FaresOnewayTripTable from "../../../components/manage-fares/manage-fare/fare-tables/fares-one-way-trip/faresOnewayTripTable";

const ArchiveOnewayTripFares = ({ children }) => {
  const params = useParams();
  const paramsdata = params?.id;
  const paramsId = paramsdata?.split("&");
  const pathname = window?.location?.pathname;
  const location = useLocation();
  return (
    <ArchiveFaresView>
      {" "}
      {pathname?.startsWith("/archived-oneway-trip-fares/view") ? (
        children
      ) : (
        <FaresOnewayTripTable paramsId={paramsId} location={location}/>
      )}
    </ArchiveFaresView>
  );
};

export default ArchiveOnewayTripFares;
