import React from "react";
import { useLocation, useParams } from "react-router";
import ArchiveFaresView from "./archive-fares-view";
import FaresRentalTable from "../../../components/manage-fares/manage-fare/fare-tables/fares-rental/faresRentalTable";

const ArchiveRentalFares = ({children}) => {
  const params = useParams();
  const paramsdata = params?.id;
  const paramsId = paramsdata?.split("&");
  const pathname = window?.location?.pathname;
  const location = useLocation();

  return (
    <ArchiveFaresView>
      {" "}
      {pathname?.startsWith("/archived-rental-fares/view") ? (
        children
      ) : (
        <FaresRentalTable paramsId={paramsId} location={location}/>
      )}
    </ArchiveFaresView>
  );
};

export default ArchiveRentalFares;
