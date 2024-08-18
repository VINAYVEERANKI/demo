import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router";
import ManageFaresLayout from "../../../components/layout/manageFaresLayout";

const DeletedIntraFareView = ({ children }) => {
  const params = useParams();
  const location=useLocation()
  const PathName = window?.location?.pathname;
  const pathNameData = window?.location?.pathname.split("&");

  const fare_type=location?.state?.fare_type ??localStorage.getItem("fare_type");

  const navBarList = [
    {
      label: "Local",
      value: "local",
      fare: fare_type,
      navigation: `/deleted-intra-fares/local/${params?.id}`,
    },
    {
      label: "SpecialZone",
      value: "special",
      fare: fare_type,
      navigation: `/deleted-intra-fares/special/${params?.id}`,
    },
    {
      label: "Tolls",
      value: "toll",
      fare: fare_type,
      navigation: `/deleted-intra-fares/tolls/${params?.id}`,
    },

    {
      label: "One-Way Trip(Outstation)",
      value: "oneway",
      fare: fare_type,
      navigation: `/deleted-intra-fares/oneway/${params?.id}`,
    },
  ];

  const currentZone = useMemo(() => {
    if (PathName?.startsWith("/deleted-intra-fares/local")) {
      return "local";
    } else if (PathName?.startsWith("/deleted-intra-fares/special")) {
      return "special";
    } else if (PathName?.startsWith("/deleted-intra-fares/oneway")) {
      return "oneway";
    } else if (PathName?.startsWith("/deleted-intra-fares/tolls")) {
      return "toll";
    }
  }, [PathName]);

 
  
  return (
    <>
      <ManageFaresLayout
        location={pathNameData[1] + " " + "Zone - Fare"}
        navBarList={navBarList}
        PathName={currentZone}
        mainNavigate={`/deleted-intra-fares`}
      >
        {children}
      </ManageFaresLayout>
    </>
  );
};

export default DeletedIntraFareView;
