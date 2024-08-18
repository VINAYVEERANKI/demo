import React from "react";
import { useParams } from "react-router";
import ManageFaresLocalZonesEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-local-zones/fares-local-zones-edit";
import DeletedLocalZoneFares from "./local-zone-fares";

const DeletedLocalFaresIndividualView = () => {
  const params = useParams();

  return (
    <DeletedLocalZoneFares>
      <ManageFaresLocalZonesEdit
        params={params?.id}
        fare={`deletedIntraFares`}
        status={localStorage?.getItem("fare_type")}
      />
    </DeletedLocalZoneFares>
  );
};

export default DeletedLocalFaresIndividualView;
