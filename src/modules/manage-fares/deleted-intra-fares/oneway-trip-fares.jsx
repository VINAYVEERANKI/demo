import React from "react";
import { useLocation, useParams } from "react-router";
import DeletedIntraFareTable from "../../../components/manage-fares/deleted-intra-fares/deleted-intra-fare-table";
import DeletedIntraFareView from "./deleted-intra-fare-view";

const DeletedOnewayTripFares = ({ children }) => {
  const params = useParams();
  const pathName = window?.location?.pathname;
  const location = useLocation();
  return (
    <DeletedIntraFareView>
      {pathName?.startsWith("/deleted-intra-fares/oneway/view") ? (
        children
      ) : (
        <DeletedIntraFareTable
          params={params?.id}
          tableType={"onewayTripFare"}
          location={location}
        />
      )}
    </DeletedIntraFareView>
  );
};

export default DeletedOnewayTripFares;
