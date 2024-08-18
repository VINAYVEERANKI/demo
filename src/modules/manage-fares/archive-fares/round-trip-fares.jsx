import React from "react";
import { useLocation, useParams } from "react-router";
import ArchiveFaresView from "./archive-fares-view";
import FaresRoundTripTable from "../../../components/manage-fares/manage-fare/fare-tables/fares-round-trip/faresRoundTripTable";

const ArchiveRoundTripFares = ({children}) => {
  const params = useParams();
  const paramsdata = params?.id;
  const paramsId = paramsdata?.split("&");
  const pathname = window?.location?.pathname;
  const location = useLocation();
  return (
    <ArchiveFaresView>
      {pathname?.startsWith("/archived-round-trip-fares/view") ? (
        children
      ) : (
        <FaresRoundTripTable paramsId={paramsId} location={location}/>
      )}
    </ArchiveFaresView>
  );
};

export default ArchiveRoundTripFares;
