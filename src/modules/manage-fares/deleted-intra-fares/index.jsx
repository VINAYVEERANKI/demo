import React from "react";
import FaresMainTable from "../../../components/manage-fares/main-table";
import "../fare.css";

const DeletedIntraZoneFares = () => {
  return (
    <>
          <FaresMainTable type={"deletedIntraFares"}/>
    </>
  );
};

export default DeletedIntraZoneFares;
