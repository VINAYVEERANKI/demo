import React from "react";
import ManageFaresUpdate from "./manage-fares";
import { useLocation, useParams } from "react-router";
import FaresLocalZonesTable from "../../../components/manage-fares/manage-fare/fare-tables/fares-local-zones/faresLocalZonesTable";

const LocalZoneFares = ({ children }) => {
  const params = useParams();
  const paramsdata = params?.id;
  const paramsId = paramsdata?.split("&");
  const pathname = window?.location?.pathname;
  const location = useLocation();
  return (
    <>
      <ManageFaresUpdate>
        <>
          {pathname.startsWith("/manage-fares/local-zone-fares/edit/") ||
          pathname.startsWith("/manage-fares/local-zone-fares/view/") ? (
            children
          ) : (
            <FaresLocalZonesTable paramsId={paramsId} location={location} />
          )}
        </>
      </ManageFaresUpdate>
    </>
  );
};

export default LocalZoneFares;
