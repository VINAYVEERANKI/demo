import React, { useRef, useState } from "react";
import "../manage-zone-components.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import StaticMap from "../map/staticMap";
import CreateMap from "../map/createMap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  findAllCoordinatesAction,
  mainZoneViewAction,
} from "../../../redux/actions/manageZones/manageZoneAction";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import UpdateZonesPassword from "../manage-zone-modal/updateZonePassword";
import errorToast from "../../utilits/errorToast";
import { numRegex } from "../../helper";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import MoreDetails from "./moreDetails";
import { latLangKeyAdder } from "../map/maphelper";
import useDisplayToggle from "../../useDisplayToggle";
import CloseIcon from "../../../assets/icons/close-icon";
const ZoneDetails = ({
  params,
  isLoaded = false,
  loadError = "",
  is_editable,
  zoneData,
  mapData = [],
}) => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [changeUpdatePasswordshow, setchangeUpdatePasswordshow] =
    useState(false);
  const handlChangesUpdateShow = () => {
    setchangeUpdatePasswordshow(true);
  };
  const handleChangeUpdatePasswordClose = () =>
    setchangeUpdatePasswordshow(false);
  const [detailsShow, setDetailsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState("view");
  const [showMap, setShowMap] = useState(false);
  const [editZone, setEditZone] = useState({});
  const [mapError, setMapError] = useState("");
  const [mapCenter, setMapCenter] = useState({
    lat: 12.349928594850034,
    lng: 76.54419729957652,
  });
  // const [mapData, setMapData] = useState([]);
  const [innerZoneData, setInnerZoneData] = useState([]);
  const [mainOneData, setMainOneData] = useState({});
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      main_zone_code: mainOneData.main_zone_code ?? "",
      zone_name: mainOneData.zone_name ?? "",
      outstation_oneway_limit: mainOneData.outstation_oneway_limit ?? "",
      zone_notes: mainOneData.zone_notes ?? "",
      coordinates: mainOneData?.coordinates ?? [],
      latlngCoordinated: [],
    },
    validationSchema: Yup.object({
      zone_name: Yup.string().trim().required("Please enter zone name"),
      outstation_oneway_limit: Yup.string()
        .trim()
        .matches(numRegex, "Invalid value")
        .required("Please enter Limit"),
      zone_notes: Yup.string().trim(),
      coordinates: Yup.array().min(1, "Please draw zone"),
      latlngCoordinated: Yup.array(),
    }),
    onSubmit: (values) => {
      console.log(values);
      setType("EditMainZone");
      if (
        JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
      ) {
        handlChangesUpdateShow();
      }
    },
  });
  useEffect(() => {
    setLoading(true);
    // dispatch(findAllCoordinatesAction(onSuccess, onError));
    dispatch(
      mainZoneViewAction(
        { main_zone_id: params.id },
        onViewOneSuccess,
        onViewOneError
      )
    );
  }, []);
  // function onSuccess(data) {
  //   // console.log(data);
  //   const allData = [...data.data.ActiveZones, ...data.data.BlockedZones];
  //   let outstationData = [];
  //   const filteredData = allData
  //     .filter((item) => {
  //       if (item.id === params.id) {
  //         outstationData = item.outstation_defined_cities.map((item) => {
  //           return {
  //             id: item.outstation_zone_code,
  //             name: item.zone_name ?? item.city_name,
  //             coord: latLangKeyAdder(item.coordinates),
  //           };
  //         });
  //         return false;
  //       } else if (!is_editable) {
  //         return item.blocked_zone_code;
  //       } else return true;
  //     })
  //     .map((item) => {
  //       return {
  //         id: item.main_zone_code ?? item.blocked_zone_code,
  //         name: item.zone_name,
  //         coord: latLangKeyAdder(item.coordinates),
  //       };
  //     });
  //   setMapData([...filteredData, ...outstationData]);
  // }
  // function onError(data) {
  //   console.log(data);
  //   errorToast("failed to load map data");
  // }
  function onViewOneSuccess(data) {
    setLoading(false);
    setMainOneData(data.data);
    const currMainZone = {
      id: data.data.main_zone_code,
      name: data.data.zone_name,
      coord: latLangKeyAdder(data.data.coordinates),
    };
    handleMapCenter(currMainZone.coord[0]);
    currMainZone.coord.pop();
    setEditZone(currMainZone);
    const allData = [
      ...data.data.special_zones,
      ...data.data.toll_zones,
      ...data.data.local_defined_cities,
    ].filter((item) => item.city_name !== "local undefined city");
    setInnerZoneData(
      allData.map((item) => {
        return {
          id:
            item.special_zone_code ??
            item.toll_zone_code ??
            item.local_zone_code,
          name: item.city_name ?? item.zone_name,
          coord: latLangKeyAdder(item.coordinates),
        };
      })
    );
  }
  function onViewOneError(data) {
    setLoading(false);
    errorToast("failed to load map data");
  }
  function handleMapError(value) {
    setMapError(value);
  }
  function handleMapCenter(value) {
    setMapCenter(value);
  }

  // const [value, setvalue] = useState(0);

  // let count = 0
  // setTimeout(() => {
  //   // setvalue((prev) => prev + 1);
  //   count++
  //   count > 40 && setvalue((prev) => prev + 1)
  //   console.log("imer");
  // }, 1000);
  // console.log(value, "runnned");
  // console.log(formik.values);
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setDetailsShow,
  });
  return (
    <>
      <CreateMap
        innerZoneData={innerZoneData}
        handleMapCenter={handleMapCenter}
        center={mapCenter}
        error={mapError}
        handleError={handleMapError}
        isLoaded={isLoaded}
        loadError={loadError}
        editZone={editZone}
        mapData={mapData}
        show={showMap}
        zoneType={"Z"}
        action={actionType}
        formik={formik}
        name={"coordinates"}
        latlng={"latlngCoordinated"}
        closeModal={() => {
          setShowMap(false);
          setActionType("");
        }}
        zoneTypeName="EditMainZone"
        is_editable={is_editable}
      />
      <UpdateZonesPassword
        changeUpdatePasswordshow={changeUpdatePasswordshow}
        handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
        type={type}
        formik={formik}
        params={params}
        zoneID={zoneData?.state?.zoneID}
        zoneName={zoneData?.state?.zoneName}
      />
      {loading ? (
        <LoadingSpinnerTable />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex justify-content-center mt-4">
            <div className="col-lg-8 text-end">
              {detailsShow ? (
                <div
                  className="more_details_card more_details_container"
                  ref={insideClickRef}
                >
                  <MoreDetails mainOneData={mainOneData} zoneData={zoneData} />
                </div>
              ) : null}
              <span
                className="blue_color fw_600 text_underline cursor_pointer"
                onClick={() => {
                  setDetailsShow(!detailsShow);
                }}
                ref={onClickRef}
              >
                More Details
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-sm-3 text-sm-end">
                  <span className="fs_16 secondary_color fw_500">
                    Zone Name*
                  </span>
                </div>
                <div className="col-sm-9">
                  <input
                    className={`${
                      formik.errors.zone_name && formik.touched.zone_name
                        ? "error_border_dark w-100  border_radius_7px outline_none ps-2 p-1 fs_16 fw_500 primary_color"
                        : "input_border_dark w-100  border_radius_7px outline_none ps-2 p-1 fs_16 fw_500 primary_color"
                    }`}
                    name="zone_name"
                    placeholder="Enter zone name"
                    value={formik.values.zone_name}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    disabled={is_editable === false}
                  />
                  {formik.errors.zone_name && formik.touched.zone_name && (
                    <span className="text-danger mt-1 fs_14 d-flex align-items-center mx-2 fw_600">
                      {formik.errors.zone_name}
                    </span>
                  )}
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-3 text-sm-end">
                  <span className="fs_16 secondary_color fw_500 ">Status*</span>
                </div>
                <div className="col-9">
                  <span
                    className={`ps-2 p-1 fs_16 fw_500 ${
                      mainOneData?.zone_status === "Inactive"
                        ? "red_color"
                        : "green_color"
                    }`}
                  >
                    {mainOneData?.zone_status ? mainOneData?.zone_status : "--"}
                  </span>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-3 text-sm-end">
                  <span className="fs_16 secondary_color fw_500">Notes</span>
                </div>
                <div className="col-sm-9">
                  <textarea
                    className="w-100 input_border_dark border_radius_7px outline_none ps-2 p-1 fs_15 fw_500 primary_color manage_zone_note_textArea"
                    name="zone_notes"
                    placeholder="Write about zone(optional)"
                    value={formik.values.zone_notes}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    disabled={is_editable === false}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-3 text-sm-end">
                  <span className="fs_16 secondary_color fw_500">
                    Outstation Oneway Limit (Km)*
                  </span>
                </div>
                <div className="col-sm-9">
                  <input
                    className={`${
                      formik.errors.outstation_oneway_limit &&
                      formik.touched.outstation_oneway_limit
                        ? "error_border_dark w-25  border_radius_7px outline_none ps-2 p-1 fs_16 fw_500 primary_color"
                        : "input_border_dark w-25  border_radius_7px outline_none ps-2 p-1 fs_16 fw_500 primary_color"
                    }`}
                    name="outstation_oneway_limit"
                    placeholder="Enter limit (km)"
                    value={formik.values.outstation_oneway_limit}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    disabled={is_editable === false}
                  />

                  {formik.errors.outstation_oneway_limit &&
                    formik.touched.outstation_oneway_limit && (
                      <span className="text-danger mt-1 fs_14 d-flex align-items-center mx-2 fw_600">
                        {formik.errors.outstation_oneway_limit}
                      </span>
                    )}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-3 text-sm- end">
                  <span className="fs_16 secondary_color fw_500">Map*</span>
                </div>
                <div className="col-sm-9">
                  <StaticMap
                    center={mapCenter}
                    newPoly={{
                      id: mainOneData.main_zone_code ?? "",
                      name: mainOneData.zone_name ?? "",
                      coord:
                        formik.values.latlngCoordinated.length > 0
                          ? formik.values.latlngCoordinated
                          : editZone.coord,
                    }}
                    is_editable={is_editable}
                    polyData={[...mapData, ...innerZoneData]}
                    error={mapError}
                    onPencilClick={() => {
                      setActionType("edit");
                      setShowMap(true);
                    }}
                    onFullScreenClick={() => {
                      setActionType("view");
                      setShowMap(true);
                    }}
                    isLoaded={isLoaded}
                    loadError={loadError}
                    zoneTypeName="EditMainZone"
                  />
                  {formik.errors.coordinates && formik.touched.coordinates && (
                    <span className="text-danger mt-1 fs_14 d-flex align-items-center mx-2 fw_600">
                      {formik.errors.coordinates}
                    </span>
                  )}
                  {mapError && (
                    <span className="red_color mb-2 fw_600 fs_14">
                      Error! {mapError}!
                    </span>
                  )}
                  {is_editable === true ? (
                    <div className="d-flex justify-content-end gap-5 mt-4">
                      <Cancelbtn />
                      <button
                        className="light_green_bg white_color border_radius_3px border_none px-5 py-1 fs_16 fw_500"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ZoneDetails;
