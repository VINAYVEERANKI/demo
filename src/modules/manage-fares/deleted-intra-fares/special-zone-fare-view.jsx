import React from "react";
import { useLocation, useParams } from "react-router";
import FaresSpecialZonesEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-special-zones/special-zones-edit";
import DeletedSpecialZoneFares from "./special-zone-fares";

const DeletedSpecialZoneFareView = () => {
  const params = useParams();
  const location = useLocation();
  return (
    <DeletedSpecialZoneFares>
      <FaresSpecialZonesEdit params={params?.id} fare={`deletedIntraFares`} location={location}/>
    </DeletedSpecialZoneFares>
  );
};

export default DeletedSpecialZoneFareView;
