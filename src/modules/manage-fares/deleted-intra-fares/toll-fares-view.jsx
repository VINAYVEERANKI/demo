import React from "react";
import { useLocation, useParams } from "react-router";
import FaresTollsEdit from "../../../components/manage-fares/manage-fare/fare-tables/fares-tolls/fares-tolls-edit";
import DeletedTollZoneFares from "./toll-fares";

const DeletedTollFaresView = ({children}) => {
  const params = useParams();
  const location = useLocation();
  return (
    <DeletedTollZoneFares>
      <FaresTollsEdit params={params?.id} fare={`deletedIntraFares`} location={location} />
    </DeletedTollZoneFares>
  );
};

export default DeletedTollFaresView;
