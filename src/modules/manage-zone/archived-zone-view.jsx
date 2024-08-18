import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import ArchivedLocalOutstationView from "../../components/manage-zones/archived-zone/local-outstation-view";
import ArchivedZoneDetailsView from "../../components/manage-zones/archived-zone/zone-details-view";
import ZonesPassword from "../../components/manage-zones/manage-zone-modal/zonesPassword";
import errorToast from "../../components/utilits/errorToast";
import "./manage-zone.css";
import { archiveZoneViewAction } from "../../redux/actions/manageZones/archiveZoneAction";
import { useDispatch } from "react-redux";
import ArchivedDeletedIntraZonesView from "../../components/manage-zones/archived-zone/deleted-intra-zones-view";
import LoadingSpinnerTable from "../../components/utilits/loadingSpinnerTable";
import ArchivedSpecialZonesTolls from "../../components/manage-zones/archived-zone/special-zones-tolls-view";
import { useJsApiLoader } from "@react-google-maps/api";
import { libraries } from "../../modules/manage-zone";
import InnerLayout from "../../components/layout/innerLayout";

const ArchivedZoneIndividual = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB8W0Fdu5rDH9x-wN4C4Fy09pw1qUWxj1o",
    libraries,
  });
  const params = useParams();
  const zoneData = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("ZoneDetails");
  const [archivetable, setArchivetable] = useState(false);
  const [type, setType] = useState("");
  const [changeUpdatePasswordshow, setchangeUpdatePasswordshow] =
    useState(false);
  const handlChangesUpdateShow = () => {
    setchangeUpdatePasswordshow(true);
    setType("RestoreArchiveZone");
  };
  const handleChangeUpdatePasswordClose = () =>
    setchangeUpdatePasswordshow(false);
  const [archiveZonesData, setArchiveZoneData] = useState({
    zoneDetails: [],
    localZone: [],
    outStationZone: [],
    specialZone: [],
    tollsZone: [],
    deletedIntraZones: [],
  });

  const [loading, setLoading] = useState(false);
  const [polyData, setPolyData] = useState([]);
  const [center, setCenter] = useState({
    lat: 12.349928594850034,
    lng: 76.54419729957652,
  });
  const [error, setError] = useState(false);
  useEffect(() => {
    setTab(localStorage.getItem("archiveZonetab") ?? "ArchivedZoneDetailsView");
    setLoading(true);
    dispatch(
      archiveZoneViewAction(
        {
          main_zone_id: params?.id,
        },
        onSuccess,
        onError
      )
    );
  }, []);
  const onSuccess = (data) => {
    console.log(data);
    setLoading(false);
    setError(false);
    setArchiveZoneData({
      zoneDetails: data?.data?.ArchivedZones,
      localZone: data?.data?.ArchivedZones?.local_defined_cities.filter(
        (item) => item?.city_name !== "local undefined city"
      ),
      outStationZone:
        data?.data?.ArchivedZones?.outstation_defined_cities.filter(
          (item) => item.city_name !== "outstation undefined city"
        ),
      specialZone: data?.data?.ArchivedZones?.special_zones,
      tollsZone: data?.data?.ArchivedZones?.toll_zones,
      deletedIntraZones: [
        ...data?.data?.deletedIntraZones?.local_defined_cities,
        ...data?.data?.deletedIntraZones?.outstation_defined_cities,
        ...data?.data?.deletedIntraZones?.special_zones,
        ...data?.data?.deletedIntraZones?.toll_zones,
      ],
    });
    setCenter({
      lat: data?.data?.ArchivedZones?.coordinates[0][0],
      lng: data?.data?.ArchivedZones?.coordinates[0][1],
    });
    setPolyData(
      [
        ...data?.data?.ArchivedZones?.special_zones,
        ...data?.data?.ArchivedZones?.toll_zones,
        ...data?.data?.ArchivedZones?.local_defined_cities.filter(
          (item) => item?.city_name !== "local undefined city"
        ),
        ...data?.data?.ArchivedZones?.outstation_defined_cities.filter(
          (item) => item.city_name !== "outstation undefined city"
        ),
        {
          id: data?.data?.ArchivedZones?.id,
          main_zone_code: data?.data?.ArchivedZones?.main_zone_code,
          zone_name: data?.data?.ArchivedZones?.zone_name,
          coordinates: data?.data?.ArchivedZones?.coordinates,
        },
      ].map((item) => {
        return {
          uuid: item.id,
          id:
            item.special_zone_code ??
            item.toll_zone_code ??
            item.local_zone_code ??
            item.outstation_zone_code ??
            item.main_zone_code,
          name: item.city_name ?? item.zone_name,
          coord: item.coordinates.map((item) => {
            return { lat: item[0], lng: item[1] };
          }),
        };
      })
    );
  };
  const onError = (data) => {
    setLoading(false);
    setError(true);
    errorToast(data?.data?.data);
  };
  console.log(archiveZonesData);

  const navBarList = [
    { label: "Zone Details", value: "ArchivedZoneDetailsView" },
    {
      label: "Local & Outstation (Defined Cities)",
      value: "ArchivedLocalOutstationView",
    },
    { label: "Special Zones & Tolls", value: "ArchivedSpecialZonesTolls" },
    { label: "Deleted Intra Zones", value: "ArchivedDeletedIntraZonesView" },
  ];

  const statusList = [
    { backGroundColor: "light_red_bg", value: "Archived Zone" },
  ];

  const is_editable = zoneData?.state?.edit;
  const archiveZoneObject = {
    zoneName: zoneData?.state?.zoneName,
    zoneCode: zoneData?.state?.zoneID,
    id: params?.id,
  };

  const buttonList = [
    <>
      {is_editable === true ? (
        <button
          className="green_color_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center fs_16 fw_500 white_color"
          onClick={() => {
            handlChangesUpdateShow();
          }}
        >
          Restore Zone
        </button>
      ) : (
        <></>
      )}
    </>,
  ];
  return (
    <>
      <ZonesPassword
        changeUpdatePasswordshow={changeUpdatePasswordshow}
        handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
        type={type}
        zoneObject={archiveZoneObject}
        title="Are you sure you want to restore this zone ?"
        reloadTable={archivetable}
        setReloadTable={setArchivetable}
      />
      <>
        {loading ? (
          <LoadingSpinnerTable />
        ) : (
          <InnerLayout
            mainHeading={`${
              archiveZonesData?.zoneDetails?.zone_name ?? "--"
            } Zone - ${archiveZonesData?.zoneDetails?.main_zone_code ?? "--"}`}
            buttons={buttonList}
            statusList={statusList}
          >
            <div className="row mt-3">
              <div className="mt-4">
                <div className="d-flex gap-4 p-2 text-nowrap mx-sm-4 overflow_x_auto manage_zone_heading_container border_radius_7px">
                  {navBarList?.map((item) => {
                    return (
                      <React.Fragment key={item?.value}>
                        <button
                          onClick={() => {
                            setTab(item?.value);
                            localStorage.setItem("archiveZonetab", item?.value);
                          }}
                          className={
                            tab === item?.value
                              ? "cursor-pointer  text-decoration-none background_none px-4  list_heading_border fw_400 orange_yellow_color"
                              : "cursor-pointer text-decoration-none fw_400  white_color fs_16 px-4 list_heading_border background_none"
                          }
                        >
                          {item?.label}
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
                <div className="mx-sm-4">
                  {tab === "ArchivedZoneDetailsView" && (
                    <ArchivedZoneDetailsView
                      center={center}
                      polyData={polyData}
                      isLoaded={isLoaded}
                      loadError={loadError}
                      archiveZonesData={archiveZonesData}
                    />
                  )}
                  {tab === "ArchivedLocalOutstationView" && (
                    <ArchivedLocalOutstationView
                      archiveZonesData={archiveZonesData}
                      loading={loading}
                      error={error}
                      isLoaded={isLoaded}
                      loadError={loadError}
                      polyData={polyData}
                    />
                  )}
                  {tab === "ArchivedSpecialZonesTolls" && (
                    <ArchivedSpecialZonesTolls
                      archiveZonesData={archiveZonesData}
                      loading={loading}
                      error={error}
                      isLoaded={isLoaded}
                      loadError={loadError}
                      polyData={polyData}
                    />
                  )}
                  {tab === "ArchivedDeletedIntraZonesView" && (
                    <ArchivedDeletedIntraZonesView
                      archiveZonesData={archiveZonesData}
                      loading={loading}
                      error={error}
                    />
                  )}
                </div>
              </div>
            </div>
          </InnerLayout>
        )}
      </>
    </>
  );
};
export default ArchivedZoneIndividual;
