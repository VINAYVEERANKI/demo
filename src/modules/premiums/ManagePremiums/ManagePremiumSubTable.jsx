import React from "react";
import ManageViewTable from "../../../components/premiums/tables/ManageSubTable";
import { useLocation, useParams } from "react-router";

const ManagePremiumViewTable = () => {
  const location = useLocation();
  const params = useParams();
  return (
    <div>
      <ManageViewTable location={location} params={params}/>
    </div>
  );
};

export default ManagePremiumViewTable;
