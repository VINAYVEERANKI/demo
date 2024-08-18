import React from "react";
import { useLocation, useParams } from "react-router";
import ManageFaresUpdate from "./manage-fares";
import FaresTollTable from "../../../components/manage-fares/manage-fare/fare-tables/fares-tolls/faresTollTable";

const TollsZoneFares = ({ children }) => {
  const params = useParams();
  const paramsdata = params?.id;
  const paramsId = paramsdata?.split("&");
  console.log(window?.location?.pathname);
  const pathname = window?.location?.pathname;
  const location = useLocation();
  return (
    <ManageFaresUpdate>
      {pathname.startsWith("/manage-fares/toll-zone-fares/edit") ||
      pathname.startsWith("/manage-fares/toll-zone-fares/view") ? (
        children
      ) : (
        <FaresTollTable paramsId={paramsId} location={location} />
      )}
    </ManageFaresUpdate>
  );
};

export default TollsZoneFares;
