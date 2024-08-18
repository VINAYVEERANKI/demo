import { useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import Layout from "../../components/layout/layout";
import ZonesPassword from "../../components/manage-zones/manage-zone-modal/zonesPassword";
import DeletedIntraZones from "../../components/manage-zones/manage-zone/deleted-intra-zones";
import LocalOustationDefinedCities from "../../components/manage-zones/manage-zone/local-outstation";
import SpecialZonesAndTolls from "../../components/manage-zones/manage-zone/specialZones-tolls";
import ZoneDetails from "../../components/manage-zones/manage-zone/zone-details";
import "./manage-zone.css";
import { libraries } from "../../modules/manage-zone";
import { findAllCoordinatesAction } from "../../redux/actions/manageZones/manageZoneAction";
import errorToast from "../../components/utilits/errorToast";
import { useDispatch } from "react-redux";
import { latLangKeyAdder } from "../../components/manage-zones/map/maphelper"; 
import InnerLayout from "../../components/layout/innerLayout";

const MainZoneEdit = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB8W0Fdu5rDH9x-wN4C4Fy09pw1qUWxj1o",
    libraries,
  });
  const zoneData = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const [tab, setTab] = useState("ZoneDetails");
  const [type, setType] = useState("");
  const [mapData, setMapData] = useState([]);
  const [blockedListData, setBlockedListData] = useState([]);
  const [changeUpdatePasswordshow, setchangeUpdatePasswordshow] =
    useState(false);
  useEffect(() => {
    setTab(localStorage.getItem("Zonestab") ?? "ZoneDetails");
  }, []);

  useEffect(() => {
    dispatch(findAllCoordinatesAction(onSuccess, onError));
  }, [tab]);

  function onSuccess(data) {
    const allData = [...data.data.ActiveZones, ...data.data.BlockedZones];
    let outstationData = [];
    const filteredData = allData
      .filter((item) => {
        if (item.id === params.id) {
          outstationData = item.outstation_defined_cities
            .filter((item) => item.city_name !== "outstation undefined city")
            .map((item) => {
              return {
                id: item.outstation_zone_code,
                name: item.zone_name ?? item.city_name,
                coord: latLangKeyAdder(item.coordinates),
              };
            });
          return false;
        } else if (!is_editable) {
          return item.blocked_zone_code;
        } else return true;
      })
      .map((item) => {
        return {
          id: item.main_zone_code ?? item.blocked_zone_code,
          name: item.zone_name,
          coord: latLangKeyAdder(item.coordinates),
        };
      });
    setMapData([...filteredData, ...outstationData]);
    setBlockedListData([...data.data.BlockedZones]);
  }
  function onError(data) {
    console.log(data);
    errorToast("failed to load map data");
  }
  const handlChangesUpdateShow = () => {
    setchangeUpdatePasswordshow(true);
    setType("AddArchiveZone");
  };
  const handleChangeUpdatePasswordClose = () =>
    setchangeUpdatePasswordshow(false);

  const navBarList = [
    { label: "Zone Details", value: "ZoneDetails" },
    { label: "Local & Outstation (Defined Cities)", value: "LocalOutstation" },
    { label: "Special Zones & Tolls", value: "SpecialZonesAndTolls" },
    { label: "Deleted Intra Zones", value: "DeletedIntraZones" },
  ];

  const zoneID = zoneData?.state?.zoneID;
  const zoneName = zoneData?.state?.zoneName;
  const is_editable = zoneData?.state?.edit;

  const buttonList = [
    <>
      {is_editable === true ? (
        <button
          className="background_none error_border_dark border_radius_5px  px-2 py-1 d-flex align-items-center gap-2"
          onClick={() => {
            handlChangesUpdateShow();
          }}
        >
          <i className="ri-inbox-archive-line red_color fw_500" />
          <span className="fs_16 fw_600 red_color">Archive Zone</span>
        </button>
      ) : (
        <></>
      )}
    </>, 
  ];

  const statusList = [
    {
      backGroundColor: `${
        zoneData?.state?.zoneStatus === "Active" ? "active_bg" : "light_red_bg"
      }`,
      value: zoneData?.state?.zoneStatus,
    },
  ];

  return (
    <>
      <ZonesPassword
        changeUpdatePasswordshow={changeUpdatePasswordshow}
        handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
        type={type}
        params={params}
        title="Are you sure you want to archive this zone/ city?"
        title_color="red_color"
        zoneID={zoneID}
        zoneName={zoneName}
      />{" "}
      <>
        <InnerLayout
          mainHeading={`${zoneName} Zone - ${zoneID}`}
          buttons={buttonList}
          statusList={statusList}
          backBtnClassName={"ms-4"}
        >
          <div className="row">
            <div className="mt-2">
              <div className="  d-flex gap-4 p-2 text-nowrap mx-4 overflow_x_auto manage_zone_heading_container border_radius_7px">
                {navBarList?.map((item, index) => {
                  return (
                    <React.Fragment key={item?.value}>
                      <button
                        onClick={() => {
                          setTab(item?.value);
                          localStorage.setItem("Zonestab", item?.value);
                        }}
                        className={
                          tab === item?.value
                            ? `cursor-pointer  text-decoration-none background_none px-4 list_heading_border   fw_400 orange_yellow_color`
                            : `cursor-pointer text-decoration-none background_none fw_400  white_color fs_16 px-4 list_heading_border`
                        }
                      >
                        {item?.label}
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="mx-4">
                {tab === "ZoneDetails" && (
                  <ZoneDetails
                    mapData={mapData}
                    isLoaded={isLoaded}
                    loadError={loadError}
                    params={params}
                    is_editable={is_editable}
                    zoneData={zoneData}
                  />
                )}
                {tab === "LocalOutstation" && (
                  <LocalOustationDefinedCities
                    blockedListData={blockedListData}
                    isLoaded={isLoaded}
                    loadError={loadError}
                    params={params}
                    zoneID={zoneID}
                    zoneName={zoneName}
                    is_editable={is_editable}
                  />
                  //  <Test/>
                )}
                {tab === "SpecialZonesAndTolls" && (
                  <SpecialZonesAndTolls
                    blockedListData={blockedListData}
                    isLoaded={isLoaded}
                    loadError={loadError}
                    params={params}
                    zoneID={zoneID}
                    zoneName={zoneName}
                    is_editable={is_editable}
                  />
                )}
                {tab === "DeletedIntraZones" && (
                  <DeletedIntraZones
                    mapData={mapData}
                    params={params}
                    zoneID={zoneID}
                    zoneName={zoneName}
                    is_editable={is_editable}
                  />
                )}
              </div>
            </div>
          </div>
          {/* </div> */}
        </InnerLayout>
      </>
    </>
  );
};

export default MainZoneEdit;
