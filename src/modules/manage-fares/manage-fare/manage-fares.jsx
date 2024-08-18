import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router";
import ManageFaresLayout from "../../../components/layout/manageFaresLayout";
import "../fare.css";

const ManageFaresUpdate = ({ children }) => {
  const params = useParams();
  const location = useLocation();
  console.log(location);
  const PathName = window?.location?.pathname;
  const pathNameData = window?.location?.pathname.split("&");
  const navBarList = [
    {
      label: "Local",
      value: "local",
      navigation: `/manage-fares/local-zone-fares/${params?.id}`,
    },
    {
      label: "SpecialZone",
      value: "special",
      navigation: `/manage-fares/special-zone-fares/${params?.id}`,
    },
    {
      label: "Tolls",
      value: "toll",
      navigation: `/manage-fares/toll-zone-fares/${params?.id}`,
    },
    {
      label: "Rental",
      value: "rental",
      navigation: `/manage-fares/rental-fares/${params?.id}`,
    },
    {
      label: "One-Way Trip(Outstation)",
      value: "oneway",
      navigation: `/manage-fares/oneway-trip-fares/${params?.id}`,
    },
    {
      label: "Round Trip(Outstation)",
      value: "roundtrip",
      navigation: `/manage-fares/round-trip-fares/${params?.id}`,
    },
  ];

  const currentZone = useMemo(() => {
    if (PathName?.startsWith("/manage-fares/local-zone-fares")) {
      return "local";
    } else if (PathName?.startsWith("/manage-fares/special")) {
      return "special";
    } else if (PathName?.startsWith("/manage-fares/rental")) {
      return "rental";
    } else if (PathName?.startsWith("/manage-fares/oneway")) {
      return "oneway";
    } else if (PathName?.startsWith("/manage-fares/round")) {
      return "roundtrip";
    } else if (PathName?.startsWith("/manage-fares/toll")) {
      return "toll";
    }
  }, [PathName]);

  return (
    <>
      <ManageFaresLayout
        location={pathNameData[1] + " " + "Zone - Fare"}
        navBarList={navBarList}
        PathName={currentZone}
        mainNavigate={`/manage-fares`}
        statusChange={true}
        edit={location?.state?.edit}
        params={params?.id}
      >
        {children}
      </ManageFaresLayout>
    </>
  );
};

export default ManageFaresUpdate;
