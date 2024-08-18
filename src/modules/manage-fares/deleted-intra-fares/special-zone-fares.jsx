import React from "react";
import { useLocation, useParams } from "react-router";
import DeletedIntraFareTable from "../../../components/manage-fares/deleted-intra-fares/deleted-intra-fare-table";
import DeletedIntraFareView from "./deleted-intra-fare-view";

const DeletedSpecialZoneFares = ({ children }) => {
  const params = useParams();
  const pathName = window?.location?.pathname;
  const location = useLocation();
  console.log(location);
  return (
    <DeletedIntraFareView>
      {pathName?.startsWith("/deleted-intra-fares/special/view") ? (
        children
      ) : (
        <DeletedIntraFareTable
          params={params?.id}
          tableType={"SpecialFare"}
          location={location}
        />
      )}
    </DeletedIntraFareView>
  );
};

export default DeletedSpecialZoneFares;
