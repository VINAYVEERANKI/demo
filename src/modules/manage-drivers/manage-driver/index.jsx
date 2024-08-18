import React, { useEffect } from "react";
import "../manageDrivers.css";
import DriversTable from "../../../components/manage-drivers/manageDriversTable/driversTable";
import { useLocation } from "react-router";

const ManageDrivers = () => {
  const params = useLocation();
  useEffect(() => {
    if (!params?.pathname.includes("/manage-drivers/driver-details-edit/") || !params?.pathname.includes("/manage-drivers/driver-rideHistory/"))
      localStorage.removeItem("manageDriverActiveTab");
  }, [])

  return (
    <>
      <DriversTable type={"manageDrivers"} />
    </>
  );
};

export default ManageDrivers;
