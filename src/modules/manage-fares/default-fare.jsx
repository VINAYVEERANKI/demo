import React, { useEffect, useState } from "react";
import LocalZonesTable from "../../components/manage-fares/default-fares/tables/localZonesTable";
import OneWayTripTable from "../../components/manage-fares/default-fares/tables/oneWayTripTable";
import RentalTable from "../../components/manage-fares/default-fares/tables/rentalTable";
import RoundTripTable from "../../components/manage-fares/default-fares/tables/roundTripTable";
import SpecialZonesTable from "../../components/manage-fares/default-fares/tables/specialZonesTable";
import TollsTable from "../../components/manage-fares/default-fares/tables/tollsTable";
import "./fare.css";
import InnerLayout from "../../components/layout/innerLayout";
import usePermissions from "../../components/usePermissionChecker";

const DefaultFare = () => {
  const { canRead, canWrite } = usePermissions();
  const [tab, setTab] = useState("Local");
  useEffect(() => {
    setTab(localStorage.getItem("defaulFaretab") ?? "Local");
  }, []);

  const navBarList = [
    { label: "Local", value: "Local" },
    { label: "SpecialZone", value: "SpecialZone" },
    { label: "Tolls", value: "Tolls" },
    { label: "Rental", value: "Rental" },
    { label: "One-Way Trip(Outstation)", value: "OneWayTrip" },
    { label: "Round Trip(Outstation)", value: "RoundTrip" },
  ];

  return (
    <InnerLayout
      mainHeading="Default Fare"
      navigateEnable={false}
      backBtnClassName="ms-4"
    >
      {canRead("defualt_fares") === false ? (
        <div className="position-absolute top-50 start-50 translate-middle  fs_sm_13 fs_16">
          <span>---You are not authorized to view the default fares ---</span>
        </div>
      ) : (
        <div className="local_fare_list_container mt-4">
          <div className=" default_fare_nav_list d-flex gap-5 pt-3  text-nowrap mx-4 border-bottom border-bottom overflow_x_auto manage_fare_heading_container">
            {navBarList?.map((item) => {
              return (
                <button
                  onClick={() => {
                    setTab(item?.value);
                    localStorage.setItem("defaulFaretab", item?.value);
                  }}
                  className={
                    tab === item?.value
                      ? " cursor-pointer   text-decoration-none background_none border_bottom px-4 border-top-0 border-start-0 border-end-0 pb-3 fw_600 primary_color"
                      : "cursor-pointer  text-decoration-none fw_500  secondary_color fs_16 px-4 pb-3 border_none  background_none"
                  }
                  key={item?.value}
                >
                  {item?.label}
                </button>
              );
            })}
          </div>
          <div className="mx-4">
            {tab === "Local" && <LocalZonesTable />}
            {tab === "SpecialZone" && <SpecialZonesTable />}
            {tab === "Tolls" && <TollsTable />}
            {tab === "Rental" && <RentalTable />}
            {tab === "OneWayTrip" && <OneWayTripTable />}
            {tab === "RoundTrip" && <RoundTripTable />}
          </div>
        </div>
      )}
    </InnerLayout>
  );
};

export default DefaultFare;
