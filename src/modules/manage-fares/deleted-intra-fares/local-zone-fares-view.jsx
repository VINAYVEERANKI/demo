import React from "react";
import { useLocation, useParams } from "react-router";
import DeletedLocalFaresTable from "../../../components/manage-fares/deleted-intra-fares/local-fares-table";
import DeletedLocalZoneFares from "./local-zone-fares";

const DeletedLocalZoneFaresView = ({ children }) => {
  const params = useParams();
  const location = useLocation();
  const pathName = window.location.pathname;
  return (
    <DeletedLocalZoneFares>
      <DeletedLocalFaresTable params={params?.id} location={location} />
    </DeletedLocalZoneFares>
  );
};

export default DeletedLocalZoneFaresView;
