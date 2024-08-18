import React from "react";
import { useLocation, useParams } from "react-router";
import DeletedIntraFareTable from "../../../components/manage-fares/deleted-intra-fares/deleted-intra-fare-table";
import DeletedIntraFareView from "./deleted-intra-fare-view";

const DeletedTollZoneFares = ({ children }) => {
  const params = useParams();
  const pathName = window?.location?.pathname;
  const location = useLocation();
  return (
    <DeletedIntraFareView>
      {pathName?.startsWith(`/deleted-intra-fares/tolls/view`) ? (
        children
      ) : (
        <DeletedIntraFareTable
          params={params?.id}
          tableType={"TollFare"}
          location={location}
        />
      )}
    </DeletedIntraFareView>
  );
};

export default DeletedTollZoneFares;
