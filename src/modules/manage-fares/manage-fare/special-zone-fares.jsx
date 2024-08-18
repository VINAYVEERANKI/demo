import React from "react";
import { useLocation, useParams } from "react-router";
import ManageFaresUpdate from "./manage-fares";
import FaresSpecialZonesTable from "../../../components/manage-fares/manage-fare/fare-tables/fares-special-zones/faresSpecialZonesTable";

const SpecialZoneFares = ({ children }) => {
  const params = useParams();
  const paramsdata = params?.id;
  const paramsId = paramsdata?.split("&");
  const pathname = window?.location?.pathname;
  const location = useLocation();
  return (
    <>
      <ManageFaresUpdate>
        <>
          {pathname?.startsWith("/manage-fares/special-zone-fares/view") ||
          pathname?.startsWith("/manage-fares/special-zone-fares/edit") ? (
            children
          ) : (
            <FaresSpecialZonesTable paramsId={paramsId} location={location} />
          )}
        </>
      </ManageFaresUpdate>
      {/* )} */}
    </>
  );
};

export default SpecialZoneFares;
