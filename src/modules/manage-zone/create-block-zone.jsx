import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import StaticMap from "../../components/manage-zones/map/staticMap";
import CreateMap from "../../components/manage-zones/map/createMap";
import { useJsApiLoader } from "@react-google-maps/api";
import { libraries } from ".";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { findAllCoordinatesAction } from "../../redux/actions/manageZones/manageZoneAction";
import UpdateZonesPassword from "../../components/manage-zones/manage-zone-modal/updateZonePassword";
import InnerLayout from "../../components/layout/innerLayout";

const CreateBlockZone = () => {
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
      blocked_reason: "",
      coordinates: [],
      latlngCoordinated: [],
    },
    validationSchema: Yup.object({
      zone_name: Yup.string().trim().required("Please enter zone name"),
      blocked_reason: Yup.string().trim().required("Please enter reason"),
      coordinates: Yup.array().min(1, "Please draw zone"),
    }),
    onSubmit: (values) => {
      console.log(values);
      setType("AddBlockZone");
      handlChangesUpdateShow();
    },
  });

  useEffect(() => {
    dispatch(findAllCoordinatesAction(onSuccess, onError));
  }, [showMap]);
  function onSuccess(data) {
    const allData = [
      ...data.data.ActiveZones,
      ...data.data.BlockedZones,
      // ...outstations,
    ];
    const filteredData = allData.map((item) => {
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
    setMapData(filteredData);
  }
  function onError() {}
  function handleMapError(value) {
    setMapError(value);
  }
  function handleMapCenter(value) {
    setMapCenter(value);
  }
  return (
    <>
      <>
        <InnerLayout mainHeading={"Create Block Zone"} backBtnClassName="ms-4">
          <CreateMap
            zoneTypeName="BlockedMainZone"
            zoneType="B"
            handleMapCenter={handleMapCenter}
            center={mapCenter}
            error={mapError}
            handleError={handleMapError}
            isLoaded={isLoaded}
            loadError={loadError}
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
          />
          <UpdateZonesPassword
            changeUpdatePasswordshow={changeUpdatePasswordshow}
            handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
            type={type}
            formik={formik}
          />
          {/* <IntraCreateMap
      isLoaded={isLoaded} loadError={loadError}
      id={editId}
      mapData={mapData}
      show={showMap}
      action={actionType}
      formik={formik}
      name={"coordinates"}
      closeModal={() => {
        setShowMap(false);
        setActionType("");
      }}
    /> */}

          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex justify-content-center mt-4">
              <div className="col-lg-8 col-12">
                <div className="row">
                  <div className="col-sm-3 text-sm-end">
                    <span className="fs_16 secondary_color text-nowrap fw_500">
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
                    />

                    {formik.errors.zone_name && formik.touched.zone_name && (
                      <span className="text-danger mt-1 fs_14 d-flex align-items-center mx-2 fw_600">
                        {formik.errors.zone_name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row mt-5">
                  <div className="col-sm-3 text-sm-end">
                    <span className="fs_16 secondary_color  fw_500">
                      Reason For Block*
                    </span>
                  </div>
                  <div className="col-sm-9">
                    <textarea
                      className={`${
                        formik.errors.blocked_reason &&
                        formik.touched.blocked_reason
                          ? `w-100 error_border_dark border_radius_7px outline_none ps-2 p-1 fs_15 fw_500 primary_color manage_zone_note_textArea`
                          : `w-100 input_border_dark border_radius_7px outline_none ps-2 p-1 fs_15 fw_500 primary_color manage_zone_note_textArea`
                      }`}
                      name="blocked_reason"
                      placeholder="Reason for block"
                      value={formik.values.blocked_reason}
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                    />
                    {formik.errors.blocked_reason &&
                      formik.touched.blocked_reason && (
                        <span className="text-danger mt-1 fs_14 d-flex align-items-center mx-2 fw_600">
                          {formik.errors.blocked_reason}
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
                      center={{
                        lat: 12.349928594850034,
                        lng: 76.54419729957652,
                      }}
                      coord={formik.values.latlngCoordinated}
                      polyData={mapData}
                      error={mapError}
                      is_editable={true}
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
                      zoneTypeName="BlockedMainZone"
                    />
                    {formik.errors.coordinates &&
                      formik.touched.coordinates && (
                        <span className="text-danger mt-1 fs_14 d-flex align-items-center mx-2 fw_600">
                          {formik.errors.coordinates}
                        </span>
                      )}
                    {mapError && (
                      <span className="red_color mb-2 fw_600 fs_14">
                        Error! {mapError}!
                      </span>
                    )}
                    <div className="d-flex justify-content-end gap-2 mt-4">
                      <button
                        className="primart_border border_radius_3px primart_color background_none px-2 py-1 fs_16 fw_500"
                        type="button"
                        onClick={() => formik.resetForm()}
                      >
                        Undo Changes
                      </button>
                      <button
                        className="light_green_bg white_color border_radius_3px border_none px-5 py-1 fs_16 fw_500"
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
        </InnerLayout>
      </>
    </>
  );
};

export default CreateBlockZone;
