import React from "react";
import { useLocation, useParams } from "react-router";
import FaresLocalZonesTable from "../../../components/manage-fares/manage-fare/fare-tables/fares-local-zones/faresLocalZonesTable";
import ArchiveFaresView from "./archive-fares-view";

const ArchiveLocalZoneFares = ({ children }) => {
  const params = useParams();
  const paramsdata = params?.id;
  const paramsId = paramsdata?.split("&");
  const pathname = window?.location?.pathname;
  const location = useLocation();
  console.log(location?.state);
  return (
    <ArchiveFaresView>
      <>
        {pathname.startsWith("/archived-local-fares/view") ? (
          children
        ) : (
          <FaresLocalZonesTable paramsId={paramsId} location={location} />
        )}
      </>
    </ArchiveFaresView>
  );
};

export default ArchiveLocalZoneFares;
