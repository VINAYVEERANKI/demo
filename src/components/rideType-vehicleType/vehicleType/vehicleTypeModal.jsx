import React, { useEffect, useRef, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import { newRideTypeSource } from "../../mui-styles/mui-styles";
import Savebtn from "../../utilits/buttons/savebtn";
import VehicelTypePassWModal from "./passwordModal";
import { useDispatch } from "react-redux";
import {
  rideTypeDropDownAction,
  vehicleTypeViewAction,
} from "../../../redux/actions/vehicleTypeAction";
import { uploadImageRideTypeAction } from "../../../redux/actions/imageUploadAction";
import SpinnerLoading from "../../utilits/spinnerLoading";
import errorToast from "../../utilits/errorToast";
import RideTypeDetails from "../rideType-details";
import CloseIcon from "../../../assets/icons/close-icon";

const VehicleTypeModal = ({
  vehicleTypeModal,
  handleVehicleTypeClose,
  vehicleTypeTable,
  setVehicleTypeTable,
  setVehicleTypeView,
  vehicleTypeView,
  vehicleTypeID,
  type,
  detailsVehicleType,
  setDetailsVehicleType,
}) => {
  console.log(type);
  console.log(vehicleTypeID);
  const [rideTypeDropdown, setRideTypeDropdown] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(rideTypeDropDownAction(onSuccess, onError));
  }, []);

  const onSuccess = (data) => {
    setRideTypeDropdown(data?.data);
  };
  const onError = (data) => {
    console.log(data?.data);
  };

  const RideTypeDropdown = Object.values(rideTypeDropdown)?.map((item) => {
    return {
      value: item?.id,
      label: item?.ride_type,
      rideTypeId: item?.ridetype_id2,
    };
  });

  console.log(RideTypeDropdown, "RideTypeDropdown");
  const [uploaded, setUploaded] = useState(false);

  const [vehicleTypePassWShow, setVehicleTypePassWShow] = useState(false);
  const handleVehicleTypePassWClose = () => setVehicleTypePassWShow(false);
  const handleVehicleTypePassWShow = () => setVehicleTypePassWShow(true);

  const formRef = useRef();
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const [findoneLoading, setFindoneLoading] = useState(false);
  useEffect(() => {
    setFindoneLoading(true);
    if (type === "viewVehicleType" || type === "editVehicleType") {
      dispatch(
        vehicleTypeViewAction(
          {
            vehicle_type_id: vehicleTypeID,
          },

          onFetchSuccess,
          onFetchError
        )
      );
    }
  }, [type, vehicleTypeID, vehicleTypeTable]);

  const onFetchSuccess = (data) => {
    setVehicleTypeView(data?.data);
    console.log("Success", "mhgjhgjgk");
    setFindoneLoading(false);
  };
  const onFetchError = (data) => {
    console.log(data);
    errorToast(data?.data);
    setFindoneLoading(false);
    console.log(data, "mhgjhgjgk");
  };

  console.log(vehicleTypeView);
  const validationSchema = yup.object({
    vehicleMake: yup
      .string("")
      .trim()
      .required("Please fill All the fields to proceed"),
    vehicleModel: yup
      .string("")
      .trim()
      .required("Please fill All the fields to proceed"),
    rideType: yup
      .string("")
      .trim()
      .required("Please fill All the fields to proceed"),
    vehicleColor: yup
      .string("")
      .trim()
      .required("Please fill All the fields to proceed"),
    seatingCapacity: yup
      .string("")
      .trim()
      .required("Please fill All the fields to proceed"),
    Upload: yup.mixed("").required("Please fill All this field to proceed"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      vehicleMake: vehicleTypeView?.vehicle_make ?? "",
      vehicleModel: vehicleTypeView?.vehicle_model?.vehicle_model ?? "",
      rideType: vehicleTypeView?.ride_type?.id ?? "",
      vehicleColor: vehicleTypeView?.vehicle_color?.vehicle_color ?? "",
      seatingCapacity: vehicleTypeView?.comride_seating_capacity ?? "",
      Upload: vehicleTypeView?.image ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      handleVehicleTypePassWShow();
    },
  });

  console.log(formik.values);

  const comrideSeatingCapacity = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
  ];

  const [uploadLoading, setUploadLoading] = useState(false);

  function handlePendingAddressFileChange(e) {
    if (e.target?.files.length !== 0) {
      setUploadLoading(true);
      dispatch(
        uploadImageRideTypeAction(
          e.target.files[0],
          onUploadSuccess,
          onUploadError
        )
      );
    }
  }
  const onUploadSuccess = (data) => {
    console.log(data.data);
    setUploaded(true);
    setUploadLoading(false);
    formik.setFieldValue("Upload", data?.data?.data?.location);
  };
  const onUploadError = (data) => {
    console.log(data);
    setUploadLoading(false);
  };

  function FormReset() {
    formik.setFieldValue("vehicleMake", formik.initialValues.vehicleMake);
    formik.setFieldValue("vehicleModel", formik.initialValues.vehicleModel);
    formik.setFieldValue("rideType", formik.initialValues.rideType);
    formik.setFieldValue("vehicleColor", formik.initialValues.vehicleColor);
    formik.setFieldValue(
      "seatingCapacity",
      formik.initialValues.seatingCapacity
    );
    formik.setFieldValue("Upload", formik.initialValues.Upload);
    setUploaded(false);
  }

  console.log(formik.values);

  useEffect(() => {
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      setDisabled(false);
    } else if (
      JSON.stringify(formik.initialValues) === JSON.stringify(formik.values)
    ) {
      setDisabled(true);
    }
  }, [formik.values]);

  return (
    <>
      <VehicelTypePassWModal
        vehicleTypePassWShow={vehicleTypePassWShow}
        handleVehicleTypePassWClose={handleVehicleTypePassWClose}
        handleVehicleTypeClose={handleVehicleTypeClose}
        vehicleTypeTable={vehicleTypeTable}
        setVehicleTypeTable={setVehicleTypeTable}
        formik={formik}
        setUploaded={setUploaded}
        vehicleTypeID={vehicleTypeID}
        type={type}
        title={
          type === "createVehicleType"
            ? "Are you sure you want to create a new 'Vehicle type'?"
            : "Are you sure you want to make changes?"
        }
      />
      <Modal
        centered
        show={vehicleTypeModal}
        onHide={handleVehicleTypeClose}
        dialogClassName="ride_type_container"
        contentClassName="border_radius_10px"
        backdropClassName="add_admin_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body className=" pt-2">
          <div className="d-flex justify-content-between ">
            <div>
              <span className="fs_20 fw_600 primary_color">
                New Vehicle Type
              </span>
            </div>
            <button
              className="border_none background_none"
              onClick={() => handleVehicleTypeClose()}
              type="button"
            >
              <CloseIcon
                fill="white"
                className={`primary_bg fs_21 rounded-5 fw_500 p-1`}
                width={20}
                height={20}
              />
            </button>
          </div>
          {type !== "createVehicleType" && (
            <div className={`d-flex justify-content-end `}>
              <div
                className="light_blue_color details_text fs_14 fw_500 cursor_pointer position-relative"
                onClick={() => setDetailsVehicleType(!detailsVehicleType)}
              >
                More Details
              </div>
            </div>
          )}

          {detailsVehicleType ? (
            <>
              <div className="vehicleType_details_container border white_bg border_radius">
                <RideTypeDetails item={vehicleTypeView} />
              </div>
            </>
          ) : null}

          <form onSubmit={formik.handleSubmit} autocomplete="off">
            <div className=" mt-5 ">
              <div className="d-flex justify-content-center">
                <div className="">
                  {uploadLoading ? (
                    <div
                      className={
                        formik.touched.Upload && formik.errors.Upload
                          ? "ride_type_source_image_container border_radius_3px error_border d-flex justify-content-center align-items-center mt-3"
                          : "ride_type_source_image_container border_radius_3px disabled_border  d-flex justify-content-center align-items-center mt-3"
                      }
                    >
                      <SpinnerLoading />
                    </div>
                  ) : formik.values.Upload ? (
                    <img
                      src={formik.values.Upload}
                      className={
                        formik.touched.Upload && formik.errors.Upload
                          ? "ride_type_source_image_container border_radius_3px error_border d-flex justify-content-center align-items-center mt-3"
                          : "ride_type_source_image_container border_radius_3px disabled_border  d-flex justify-content-center align-items-center mt-3"
                      }
                    />
                  ) : (
                    <div
                      className={
                        formik.touched.Upload && formik.errors.Upload
                          ? "ride_type_source_image_container border_radius_3px error_border d-flex justify-content-center align-items-center mt-3"
                          : "ride_type_source_image_container border_radius_3px disabled_border  d-flex justify-content-center align-items-center mt-3"
                      }
                    >
                      No Image
                    </div>
                  )}
                  {type === "createVehicleType" ||
                  type === "editVehicleType" ? (
                    <div className="d-flex justify-content-end mt-2">
                      <label
                        className="upload_btn px-3 white_color dark_blue_bg border_radius_3px fs_14 "
                        for="files"
                      >
                        <input
                          type="file"
                          id="files"
                          className="upload_document_input cursor_pointer"
                          name="Upload"
                          onChange={(e) => {
                            formik.setFieldValue("Upload", e.target.files[0]);
                            handlePendingAddressFileChange(e);
                          }}
                        />
                        {formik?.values?.Upload ? (
                          <span> Re-upload</span>
                        ) : (
                          <span> Upload</span>
                        )}
                      </label>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mt-3 d-flex gap-3 justify-content-center ">
                <TextField
                  size="small"
                  style={{ width: "14rem" }}
                  sx={newRideTypeSource.select}
                  id="vehicleMake"
                  autoComplete="off"
                  name="vehicleMake"
                  onBlur={formik.handleBlur}
                  label="Vehicle Make*"
                  type="text"
                  value={formik.values.vehicleMake}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.vehicleMake &&
                    Boolean(formik.errors.vehicleMake)
                  }
                  disabled={type === "viewVehicleType"}
                />

                <TextField
                  size="small"
                  style={{ width: "14rem" }}
                  sx={newRideTypeSource.select}
                  id="vehicleModel"
                  autoComplete="off"
                  name="vehicleModel"
                  onBlur={formik.handleBlur}
                  label="Vehicle Model*"
                  type="text"
                  value={formik.values.vehicleModel}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.vehicleModel &&
                    Boolean(formik.errors.vehicleModel)
                  }
                  disabled={type === "viewVehicleType"}
                />
              </div>
              <div className="mt-3 d-flex gap-3 justify-content-center ">
                <TextField
                  size="small"
                  style={{ width: "9.5rem" }}
                  sx={newRideTypeSource.select}
                  variant="outlined"
                  name="rideType"
                  id="rideType"
                  select
                  label="Ride Type"
                  placeholder="none"
                  value={formik.values.rideType}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.rideType && Boolean(formik.errors.rideType)
                  }
                  disabled={type === "viewVehicleType"}
                >
                  <MenuItem value="" defaultChecked>
                    <em>-None-</em>
                  </MenuItem>
                  {RideTypeDropdown.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  size="small"
                  style={{ width: "9rem" }}
                  sx={newRideTypeSource.select}
                  id="vehicleColor"
                  autoComplete="off"
                  name="vehicleColor"
                  onBlur={formik.handleBlur}
                  label="Vehicle Colour*"
                  type="text"
                  value={formik.values.vehicleColor}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.vehicleColor &&
                    Boolean(formik.errors.vehicleColor)
                  }
                  disabled={type === "viewVehicleType"}
                />

                <TextField
                  size="small"
                  style={{ width: "9rem" }}
                  sx={newRideTypeSource.select}
                  variant="outlined"
                  name="seatingCapacity"
                  id="seatingCapacity"
                  select
                  label="Seating Capacity*"
                  placeholder="none"
                  value={formik.values.seatingCapacity}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.seatingCapacity &&
                    Boolean(formik.errors.seatingCapacity)
                  }
                  disabled={type === "viewVehicleType"}
                >
                  <MenuItem value="" defaultChecked>
                    <em>-None-</em>
                  </MenuItem>
                  {comrideSeatingCapacity.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="d-flex justify-content-center error_mes_height">
              {(formik.errors.vehicleMake && formik.touched.vehicleMake && (
                <span className="dark_red_color mt-1 fs_14">
                  {formik.errors.vehicleMake}
                </span>
              )) ||
                (formik.errors.vehicleModel && formik.touched.vehicleModel && (
                  <span className="dark_red_color mt-1 fs_14">
                    {formik.errors.vehicleModel}
                  </span>
                )) ||
                (formik.errors.rideType && formik.touched.rideType && (
                  <span className="dark_red_color mt-1 fs_14">
                    {formik.errors.rideType}
                  </span>
                )) ||
                (formik.errors.vehicleColor && formik.touched.vehicleColor && (
                  <span className="dark_red_color mt-1 fs_14">
                    {formik.errors.vehicleColor}
                  </span>
                )) ||
                (formik.errors.seatingCapacity &&
                  formik.touched.seatingCapacity && (
                    <span className="dark_red_color mt-1 fs_14">
                      {formik.errors.seatingCapacity}
                    </span>
                  )) ||
                (formik.errors.Upload && formik.touched.Upload && (
                  <span className="dark_red_color mt-1 fs_14">
                    {formik.errors.Upload}
                  </span>
                ))}
            </div>
            {type === "createVehicleType" && (
              <div className="d-flex justify-content-center me-3 mt-3">
                <button
                  className="body_bg border_none py-2 px-5 border_radius_5px fw_600 d-flex align-items-center gap-2"
                  type="button"
                  onClick={() => {
                    FormReset();
                  }}
                >
                  <i className="ri-restart-line fw_500"></i> RESET
                </button>

                <Savebtn submitFn={handleSubmit} />
              </div>
            )}

            {type === "editVehicleType" && (
              <div className="d-flex justify-content-center me-3 mt-3">
                <button
                  className="body_bg border_none py-2 px-5 border_radius_5px fw_600 d-flex align-items-center gap-2"
                  type="button"
                  onClick={() => {
                    FormReset();
                  }}
                >
                  <i className="ri-restart-line fw_500"></i> RESET
                </button>
                <Savebtn
                  disabled={disabled}
                  btnClassName={`${
                    disabled
                      ? `disabled_color_bg white_color px-5`
                      : `light_green_bg px-5`
                  }`}
                />
              </div>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VehicleTypeModal;
