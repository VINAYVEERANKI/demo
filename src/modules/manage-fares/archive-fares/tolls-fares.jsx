import React from "react";
import { useLocation, useParams } from "react-router";
import ArchiveFaresView from "./archive-fares-view";
import FaresTollTable from "../../../components/manage-fares/manage-fare/fare-tables/fares-tolls/faresTollTable";

const ArchiveTollsFares = ({ children }) => {
  const params = useParams();
  const paramsdata = params?.id;
  const paramsId = paramsdata?.split("&");
  const pathname = window?.location?.pathname;
  const location = useLocation();
  return (
    <ArchiveFaresView>
      {pathname.startsWith("/archived-toll-fares/view") ? (
        children
      ) : (
        <FaresTollTable paramsId={paramsId} location={location} />
      )}
    </ArchiveFaresView>
  );
};

export default ArchiveTollsFares;
