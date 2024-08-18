import React, { useMemo } from "react";
import { useParams } from "react-router";
import ManageFaresLayout from "../../../components/layout/manageFaresLayout";

const ArchiveFaresView = ({ children }) => {

  const params = useParams();
  const pathName = window?.location?.pathname;
  const pathNameData = window?.location?.pathname.split("&");

  const archiveNavBarList = [
    {
      label: "Local",
      value: "local",
      fare: "archivedFare",
      navigation: `/archived-local-fares/${params?.id}`,
    },
    {
      label: "SpecialZone",
      value: "special",
      fare: "archivedFare",
      navigation: `/archived-special-fares/${params?.id}`,
    },
    {
      label: "Tolls",
      value: "toll",
      fare: "archivedFare",
      navigation: `/archived-toll-fares/${params?.id}`,
    },
    {
      label: "Rental",
      value: "rental",
      fare: "archivedFare",
      navigation: `/archived-rental-fares/${params?.id}`,
    },

    {
      label: "One-Way Trip(Outstation)",
      value: "oneway",
      fare: "archivedFare",
      navigation: `/archived-oneway-trip-fares/${params?.id}`,
    },
    {
      label: "Round Trip(Outstation)",
      value: "roundtrip",
      fare: "archivedFare",
      navigation: `/archived-round-trip-fares/${params?.id}`,
    },
   
  ];

  const currentZone = useMemo(() => {
    if (pathName?.startsWith("/archived-local")) {
      return "local";
    } else if (pathName?.startsWith("/archived-special")) {
      return "special";
    } else if (pathName?.startsWith("/archived-oneway")) {
      return "oneway";
    } else if (pathName?.startsWith("/archived-toll")) {
      return "toll";
    } else if (pathName?.startsWith("/archived-rental")) {
      return "rental";
    }else if (pathName?.startsWith("/archived-round-trip")) {
      return "roundtrip";
    }
  }, [pathName]);
  
  return (
    <>
        <ManageFaresLayout
          location={pathNameData[1] + " " + "Zone - Fare"}
          navBarList={archiveNavBarList}
          PathName={currentZone}
          mainNavigate={`/archive-fares`}
        >
          {children}
        </ManageFaresLayout>
    </>
  );
};

export default ArchiveFaresView;
