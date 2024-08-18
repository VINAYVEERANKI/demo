import React from "react";
import { useLocation, useParams } from "react-router";
import ArchiveFaresView from "../archive-fares/archive-fares-view";
import FaresSpecialZonesTable from "../../../components/manage-fares/manage-fare/fare-tables/fares-special-zones/faresSpecialZonesTable";

const ArchiveSpecialZoneFare = ({ children }) => {
  const params = useParams();
  const paramsdata = params?.id;
  const paramsId = paramsdata?.split("&");
  const pathname = window?.location?.pathname;
  const location = useLocation();
  console.log(location);
  return (
    <>
      <ArchiveFaresView>
        <>
          {pathname?.startsWith("/archived-special-fares/view") ? (
            children
          ) : (
            <FaresSpecialZonesTable paramsId={paramsId} location={location} />
          )}
        </>
      </ArchiveFaresView>
    </>
  );
};

export default ArchiveSpecialZoneFare;
