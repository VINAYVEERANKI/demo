import React, { useState } from "react";
import "../manage-zone-components.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import StaticMap from "../map/staticMap";
import CreateMap from "../map/createMap";
import { useJsApiLoader } from "@react-google-maps/api";
import { libraries } from "../../../modules/manage-zone";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { findAllCoordinatesAction } from "../../../redux/actions/manageZones/manageZoneAction";
import UpdateZonesPassword from "../manage-zone-modal/updateZonePassword";
import { numRegex } from "../../helper";
import errorToast from "../../utilits/errorToast";

const AddZoneDetails = () => {
  const dispatch = useDispatch();
  const [mapCenter, setMapCenter] = useState({
    lat: 12.349928594850034,
    lng: 76.54419729957652,
  });
  const [type, setType] = useState("");
  const [changeUpdatePasswordshow, setchangeUpdatePasswordshow] =
    useState(false);
  const handlChangesUpdateShow = () => {
    setchangeUpdatePasswordshow(true);
  };
  const handleChangeUpdatePasswordClose = () =>
    setchangeUpdatePasswordshow(false);
  const [actionType, setActionType] = useState("view");
  const [showMap, setShowMap] = useState(false);
  const [mapError, setMapError] = useState("");
  const [mapData, setMapData] = useState([]);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB8W0Fdu5rDH9x-wN4C4Fy09pw1qUWxj1o",
    libraries,
  });
  const formik = useFormik({
    initialValues: {
      zone_name: "",
      outstation_oneway_limit: "",
      zone_notes: "",
      coordinates: [],
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
    }),
    onSubmit: (values) => {
      console.log(values);
      setType("AddMainZone");
      handlChangesUpdateShow();
    },
  });

  useEffect(() => {
    dispatch(findAllCoordinatesAction(onSuccess, onError));
  }, [showMap]);
  function onSuccess(data) {
    const allData = [...data.data.ActiveZones, ...data.data.BlockedZones]; //combine main and block zones
    const formattedData = allData.map((item) => {
      return {
        id: item.main_zone_code ?? item.blocked_zone_code,
        name: item.zone_name,
        coord: item.coordinates.map((item) => {
          return { lat: item[0], lng: item[1] };
        }),
      };
    }); //formatted data format
    setMapData(formattedData);
  }
  function onError(data) {
    errorToast("Falied to load map data");
    console.log(data);
  }
  function handleMapError(value) {
    setMapError(value);
  }
  function handleMapCenter(value) {
    setMapCenter(value);
  }

  console.log("====================================");
  console.log(formik.values);
  console.log("====================================");
  return (
    <>
      <CreateMap
        handleMapCenter={handleMapCenter}
        center={mapCenter}
        error={mapError}
        handleError={handleMapError}
        isLoaded={isLoaded}
        loadError={loadError}
        zoneType={"Z"}
        mapData={mapData}
        show={showMap}
        action={actionType}
        formik={formik}
        name={"coordinates"}
        latlng={"latlngCoordinated"}
        closeModal={() => {
          setShowMap(false);
          setActionType("");
        }}
        zoneTypeName="AddMainZone"
      />
      <UpdateZonesPassword
        changeUpdatePasswordshow={changeUpdatePasswordshow}
        handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
        type={type}
        formik={formik}
        title={`Are you sure you want add new zone ?`}
      />

      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex justify-content-center mt-4">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-sm-3 text-sm-end">
                <span className="fs_16 secondary_color fw_500">Zone Name*</span>
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
                />

                {formik.errors.zone_name && formik.touched.zone_name && (
                  <span className="text-danger mt-1 fs_14 d-flex align-items-center mx-2 fw_600">
                    {formik.errors.zone_name}
                  </span>
                )}
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-3 text-end">
                <span className="fs_16 secondary_color fw_500 ">Status*</span>
              </div>
              <div className="col-9">
                <span className=" ps-2 p-1 fs_16 fw_500 primary_color">
                  Inactive
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
              <div className="col-sm-3 text-sm-end">
                <span className="fs_16 secondary_color fw_500">Map*</span>
              </div>
              <div className="col-sm-9">
                <StaticMap
                  center={mapCenter}
                  newPoly={{
                    id: "",
                    name: "",
                    coord: formik.values.latlngCoordinated,
                  }}
                  polyData={mapData}
                  error={mapError}
                  onPencilClick={() => {
                    setActionType("create");
                    setShowMap(true);
                  }}
                  onFullScreenClick={() => {
                    setActionType("view");
                    setShowMap(true);
                  }}
                  isLoaded={isLoaded}
                  loadError={loadError}
                  is_editable={true}
                  zoneTypeName="AddMainZone"
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
                <div className="d-flex justify-content-end gap-sm-5 gap-2 mt-4">
                  <button
                    className="primart_border border_radius_3px primart_color background_none px-sm-2 py-sm-1 fs_16 fw_500"
                    type="button"
                    onClick={() => formik.resetForm()}
                  >
                    Undo Changes
                  </button>
                  <button
                    className="light_green_bg white_color border_radius_3px border_none px-sm-5 px-3 py-1 fs_16 fw_500"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddZoneDetails;
