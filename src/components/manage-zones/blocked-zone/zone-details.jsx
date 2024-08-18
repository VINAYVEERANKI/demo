import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { blockZoneViewAction } from "../../../redux/actions/manageZones/blockedZoneAction";
import CreateMap from "../map/createMap";
import StaticMap from "../map/staticMap";
import errorToast from "../../utilits/errorToast";
import "../manage-zone-components.css";
import * as Yup from "yup";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import UpdateZonesPassword from "../manage-zone-modal/updateZonePassword";
import Cancelbtn from "../../utilits/buttons/cancelbtn";

const BlockedZoneDetails = ({
  isLoaded = false,
  loadError = "",
  polyData = [],
  center = {
    lat: 12.349928594850034,
    lng: 76.54419729957652,
  },
  blockedZone = {},
  params,
  is_editable,
}) => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [actionType, setActionType] = useState("view");
  const [mapError, setMapError] = useState("");
  const [mapCenter, setMapCenter] = useState({
    lat: 12.349928594850034,
    lng: 76.54419729957652,
  });
  const [editId, setEditId] = useState(null);
  const [changeUpdatePasswordshow, setchangeUpdatePasswordshow] =
    useState(false);
  const handlChangesUpdateShow = () => {
    setchangeUpdatePasswordshow(true);
  };
  const handleChangeUpdatePasswordClose = () =>
    setchangeUpdatePasswordshow(false);
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blockedDetails, setBlockedDetails] = useState({});
  useEffect(() => {
    setLoading(true);
    dispatch(
      blockZoneViewAction(
        {
          main_zone_id: params?.id,
        },
        onFetchSuccess,
        onFetchError
      )
    );
  }, []);

  const onFetchSuccess = (data) => {
    setLoading(false);
    setBlockedDetails(data?.data);
  };
  const onFetchError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
  };
  console.log(blockedDetails, "blockedDetails");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      zone_name: blockedDetails.zone_name ?? "",
      blocked_reason: blockedDetails.blocked_reason ?? "",
      coordinates: blockedDetails?.coordinates ?? [],
      latlngCoordinated: [],
    },
    validationSchema: Yup.object({
      zone_name: Yup.string().trim().required("Please enter zone name"),
      blocked_reason: Yup.string().trim(),
      coordinates: Yup.array().min(1, "Please draw zone"),
      latlngCoordinated: Yup.array(),
    }),
    onSubmit: (values) => {
      console.log(values);
      setType("EditBlockZone");
      if (
        JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
      ) {
        handlChangesUpdateShow();
      }
    },
  });

  function handleMapError(value) {
    setMapError(value);
  }
  console.log("====================================");
  console.log(formik.values);
  console.log("====================================");

  useEffect(() => {
    setMapCenter(center);
  }, [center]);

  return (
    <>
      <UpdateZonesPassword
        changeUpdatePasswordshow={changeUpdatePasswordshow}
        handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
        type={type}
        formik={formik}
        params={params}
        zoneID={blockedDetails?.blocked_zone_code}
        zoneName={blockedDetails?.zone_name}
      />
      {loading ? (
        <LoadingSpinnerTable />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex justify-content-center mt-4">
            <div className="col-lg-7">
              <div className="row mt-3">
                <div className="col-3 text-end">
                  <span className="fs_16 secondary_color fw_500">
                    Zone Name*
                  </span>
                </div>
                <div className="col-9">
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
              {/* <div className="row mt-4">
                <div className="col-3 text-end">
                  <span className="fs_16 secondary_color fw_500 ">Status*</span>
                </div>
                <div className="col-9">
                  <span className=" ps-2 p-1 fs_16 fw_500 primary_color">
                    Inactive
                  </span>
                </div>
              </div> */}
              <div className="row mt-5">
                <div className="col-3 text-end">
                  <span className="fs_16 secondary_color fw_500">
                    Reason For Block
                  </span>
                </div>
                <div className="col-9">
                  <textarea
                    className="w-100 input_border_dark border_radius_7px outline_none ps-2 p-1 fs_15 fw_500 primary_color manage_zone_note_textArea"
                    name="blocked_reason"
                    placeholder="Write about zone(optional)"
                    value={formik.values.blocked_reason}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    disabled={is_editable === false}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-3 text-end">
                  <span className="fs_16 secondary_color fw_500">Map*</span>
                </div>
                <div className="col-9">
                  <StaticMap
                    error={mapError}
                    newPoly={{
                      id: blockedZone.id,
                      name: blockedZone.name,
                      coord:
                        formik.values.latlngCoordinated?.length > 0
                          ? formik.values?.latlngCoordinated
                          : blockedDetails?.coordinates?.map((item) => {
                              return { lat: item[0], lng: item[1] };
                            }),
                    }}
                    onFullScreenClick={() => {
                      setActionType("view");
                      setEditId(null);
                      setShowMap(true);
                    }}
                    onPencilClick={() => {
                      setActionType("edit");
                      setShowMap(true);
                    }}
                    center={mapCenter}
                    polyData={polyData}
                    isLoaded={isLoaded}
                    loadError={loadError}
                    is_editable={is_editable}
                    zoneTypeName="BlockedMainZone"
                  />
                  {formik.errors.coordinates && formik.touched.coordinates && (
                    <span className="text-danger mt-1 fs_14 d-flex align-items-center mx-2 fw_600">
                      {formik.errors.coordinates}
                    </span>
                  )}
                  {/* {mapError && (
                    <span className="red_color mb-2 fw_600 fs_14">
                      Error! {mapError}!
                    </span>
                  )} */}
                  {is_editable === true ? (
                    <div className="d-flex justify-content-end gap-5 mt-4">
                      <Cancelbtn
                        cancelFn={() => {
                          localStorage.setItem("MainZoneEdit", false);
                        }}
                      />
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

      <CreateMap
        error={mapError}
        handleError={handleMapError}
        zoneType="B"
        editZone={blockedZone}
        center={center}
        isLoaded={isLoaded}
        loadError={loadError}
        mapData={polyData}
        show={showMap}
        formik={formik}
        action={actionType}
        closeModal={() => {
          setShowMap(false);
        }}
        name={"coordinates"}
        latlng={"latlngCoordinated"}
        zoneTypeName="BlockedMainZone"
      />
    </>
  );
};

export default BlockedZoneDetails;
