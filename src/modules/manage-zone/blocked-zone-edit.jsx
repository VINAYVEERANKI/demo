import { useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import "./manage-zone.css";
import { libraries } from ".";
import { useEffect } from "react";
import { findAllCoordinatesAction } from "../../redux/actions/manageZones/manageZoneAction";
import errorToast from "../../components/utilits/errorToast";
import { useDispatch } from "react-redux";
import ZonesPassword from "../../components/manage-zones/manage-zone-modal/zonesPassword";
import BlockedZoneDetails from "../../components/manage-zones/blocked-zone/zone-details";
import InnerLayout from "../../components/layout/innerLayout";

const BlockedZoneEdit = () => {
  const zoneData = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const [tab, setTab] = useState("BlockedZoneDetails");
  const [type, setType] = useState("");
  const [changeUpdatePasswordshow, setchangeUpdatePasswordshow] =
    useState(false);
  const handlChangesUpdateShow = () => {
    setchangeUpdatePasswordshow(true);
    setType("UnBlockZone");
  };
  const handleChangeUpdatePasswordClose = () =>
    setchangeUpdatePasswordshow(false);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB8W0Fdu5rDH9x-wN4C4Fy09pw1qUWxj1o",
    libraries,
  });
  const [polyData, setPolyData] = useState([]);
  const [blockedZone, setBlockedZone] = useState({});
  const [center, setCenter] = useState({
    lat: 12.349928594850034,
    lng: 76.54419729957652,
  });

  useEffect(() => {
    dispatch(findAllCoordinatesAction(onSuccess, onError));
  }, []);
  function onSuccess(data) {
    const allData = [...data.data.ActiveZones, ...data.data.BlockedZones];
    const filteredData = allData
      .filter((item) => item.id !== params?.id)
      .map((item) => {
        return {
          id:
            item.outstation_zone_code ??
            item.main_zone_code ??
            item.blocked_zone_code,
          name: item.city_name ?? item.zone_name,
          coord: item.coordinates.map((item) => {
            return { lat: item[0], lng: item[1] };
          }),
        };
      });

    const currBlockedZone = allData.find((item) => item.id === params?.id);
    let finaCurrBlockedZone = {
      id: currBlockedZone.blocked_zone_code,
      name: currBlockedZone.zone_name,
      coord: currBlockedZone.coordinates.map((item) => {
        return { lat: item[0], lng: item[1] };
      }),
    };
    finaCurrBlockedZone.coord.pop();
    setCenter(finaCurrBlockedZone.coord[0]);

    setBlockedZone(finaCurrBlockedZone);
    setPolyData(filteredData);
  }

  function onError() {
    errorToast("failed to load map data");
  }

  const is_editable = zoneData?.state?.edit;
  const blockZoneObject = {
    zoneName: zoneData.state.zoneName,
    zoneCode: zoneData.state.zoneID,
    id: params?.id,
  };

  const buttonList = [
    <>
      {is_editable === true ? (
        <button
          className="green_color_bg border_radius_5px border_none px-3 d-flex align-items-center py-2 fs_16 fw_500 white_color"
          onClick={() => {
            handlChangesUpdateShow();
          }}
        >
          Unblock Zone
        </button>
      ) : (
        <></>
      )}
    </>,
  ];

  const statusList=[
    {backGroundColor:"light_red_bg",value:"Blocked Zone"}
  ]
  return (
    <>
      <ZonesPassword
        changeUpdatePasswordshow={changeUpdatePasswordshow}
        handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
        type={type}
        zoneObject={blockZoneObject}
      />
      <>
        <InnerLayout
          mainHeading={`${zoneData?.state?.zoneName ?? "--"} Zone - ${
            zoneData?.state?.zoneID ?? "--"
          }`}
          navigateEnable={true}
          buttons={buttonList}
          statusList={statusList}
          backBtnClassName={"ms-4"}

        >
            <div className="row">
              <div className="mt-3">
                <div className="d-flex gap-4 p-2 text-nowrap mx-4 overflow_x_auto manage_zone_heading_container border_radius_7px">
                  <button
                    onClick={() => {
                      setTab("BlockedZoneDetails");
                    }}
                    className={
                      tab === "BlockedZoneDetails"
                        ? " cursor-pointer  text-decoration-none background_none px-4  list_heading_border fw_400 orange_yellow_color"
                        : "cursor-pointer text-decoration-none fw_400  white_color fs_16 px-4 list_heading_border background_none"
                    }
                  >
                    Zone Details
                  </button>
                </div>
                <div className="mx-4">
                  {tab === "BlockedZoneDetails" && (
                    <BlockedZoneDetails
                      blockedZone={blockedZone}
                      center={center}
                      polyData={polyData}
                      isLoaded={isLoaded}
                      loadError={loadError}
                      params={params}
                      is_editable={is_editable}
                    />
                  )}
                </div>
              </div>
            </div>
        </InnerLayout>
      </>
    </>
  );
};

export default BlockedZoneEdit;
