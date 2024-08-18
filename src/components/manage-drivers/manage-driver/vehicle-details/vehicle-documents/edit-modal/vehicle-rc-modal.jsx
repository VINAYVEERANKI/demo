import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../../../manageDriversComponents.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { formatDateTime, openInNewTab } from "../../../../../helper";
import errorToast from "../../../../../utilits/errorToast";
import successToast from "../../../../../utilits/successToast";
import { useDispatch } from "react-redux";
import SuccessMessagemodal from "../../../../../modals/successMessageModal";
import { UploadRCAction } from "../../../../../../redux/actions/imageUploadAction";
import { driverRCAction } from "../../../../../../redux/actions/manageDriversAction";
import Savebtn from "../../../../../utilits/buttons/savebtn";
import ImageInputField from "../../../../../form/imageInputField";
import ModalInputField from "../../../../../form/modalInputField";
import ErrorField from "../../../../../form/errorField";
import CancelModalbtn from "../../../../../utilits/buttons/cancelModalbtn";
import {
  pendApplicantRCAction,
  pendApplicantRCApproveAction,
} from "../../../../../../redux/actions/pendApplicantAction";
import ModalHeading from "../../../../../utilits/buttons/modal-header";
import SpinnerLoading from "../../../../../utilits/spinnerLoading";
import { rejectApplicantRCAction } from "../../../../../../redux/actions/rejectedApplicantAction";
import { useNavigate } from "react-router";
import { expireddocumentRCAction } from "../../../../../../redux/actions/expiredDocumentAction";
import { blockedDriversRCAction } from "../../../../../../redux/actions/manageDrivers/blockedApplicantAction";
import DownloadIcon from "../../../../../../assets/icons/download-icon";
import EyeIcon from "../../../../../../assets/icons/eye-icon";

const VehicleRCModal = ({
  vehicleRegistrationShow,
  handleVehicleRegistrationClose,
  driverData,
  setDriverData,
  vehicleRCdata,
  action,
  setAction,
  id,
  is_editable,
  type = "",
}) => {
  const currentPath = window?.location?.pathname;
  const mainPagePath = "/" + currentPath?.split("/")[1];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [backUploadLoading, setBackUploadLoading] = useState(false);
  const dispatch = useDispatch();
  const [frontImageLink, setFrontImageLink] = useState({
    img: "",
    error: false,
  });
  const [backImageLink, setBackImageLink] = useState({
    img: "",
    error: false,
  });
  useEffect(() => {
    setFrontImageLink({
      img: vehicleRCdata?.front_photo,
      error: false,
    });
    setBackImageLink({
      img: vehicleRCdata?.back_photo,
      error: false,
    });
  }, [vehicleRCdata]);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    const shouldNavigate =
      (type === "rejectedApplications" || type === "expiredDocuments") &&
      vehicleRCdata?.status !== "Approved";

    if (shouldNavigate) {
      navigate(`${mainPagePath}`);
    } else {
      setDriverData(!driverData);
    }
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const [registrationfrontfile, setRegistrationFrontFile] = useState("");
  const [registrationbackfile, setRegistrationBackFile] = useState("");
  const [registrationUploaded, setRegistrationUploaded] = useState(false);
  const [registrationbackUploaded, setRegistrationBackUploaded] =
    useState(false);
  function handleFrontFileChange(e) {
    if (e.target?.files.length !== 0) {
      setRegistrationFrontFile(URL.createObjectURL(e.target.files[0]));
      setUploadLoading(true);
      dispatch(
        UploadRCAction(e.target.files[0], onUploadSuccess, onUploadError)
      );
    }
  }
  const onUploadSuccess = (data) => {
    setRegistrationUploaded(true);
    setUploadLoading(false);
    setFrontImageLink({ img: data.data.data.location, error: false });
  };
  const onUploadError = (data) => {
    setUploadLoading(false);
  };
  function handleBackFileChange(e) {
    if (e.target?.files.length !== 0) {
      setRegistrationBackFile(URL.createObjectURL(e.target.files[0]));
      setBackUploadLoading(true);
      dispatch(
        UploadRCAction(
          e.target.files[0],
          onBackImageUploadSuccess,
          onBackImageUploadError
        )
      );
    }
  }
  const onBackImageUploadSuccess = (data) => {
    setRegistrationBackUploaded(true);
    setBackUploadLoading(false);
    setBackImageLink({ img: data.data.data.location, error: false });
  };
  const onBackImageUploadError = (data) => {
    setBackUploadLoading(false);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      VehicleRegistration: vehicleRCdata?.vehicle_rc_id
        ? vehicleRCdata?.vehicle_rc_id
        : "",
      validUntil: formatDateTime(vehicleRCdata?.expiry_date, "YYYY-MM-DD", ""),
      upload: vehicleRCdata?.front_photo ? vehicleRCdata?.front_photo : "",
      backUpload: vehicleRCdata?.back_photo ? vehicleRCdata?.back_photo : "",
      action: "save",
    },
    validationSchema: Yup.object({
      VehicleRegistration: Yup.string("")
        // .matches(alphaNumeric, "Invalid Value")
        .trim()
        .required("Please fill this field to proceed"),
      validUntil: Yup.date()
        .required("Please fill this field to proceed")
        .nullable()
        .test(
          "",
          "The document as already been expired or document will be expiring soon",
          (val, props) => {
            const expiryDate = moment(val);
            const enteredDate = moment(props.parent.enteredDate);
            const tmpExpiryDate = moment(enteredDate).add(30, "days");

            if (!tmpExpiryDate.isAfter(expiryDate)) {
              return true;
            }
          }
        ),
      upload: Yup.mixed("").required("Please fill this field to proceed"),
      backUpload: Yup.mixed("").required("Please fill this field to proceed"),
    }),

    onSubmit: (values) => {
      const VehicleRcInputData = {
        driver_id: id,
        front_photo: frontImageLink?.img,
        back_photo: backImageLink?.img,
        vehicle_rc_id: values?.VehicleRegistration,
        expiry_date: values?.validUntil,
      };
      if (values.action === "save") {
        if (type === "manageDrivers") {
          setLoading(true);
          dispatch(driverRCAction(VehicleRcInputData, onSuccess, onError));
        } else if (type === "blockedDrivers") {
          setLoading(true);
          dispatch(
            blockedDriversRCAction(VehicleRcInputData, onSuccess, onError)
          );
        } else if (type === "pendingApplications") {
          setLoading(true);
          dispatch(
            pendApplicantRCAction(VehicleRcInputData, onSuccess, onError)
          );
        } else if (type === "rejectedApplications") {
          setLoading(true);
          dispatch(
            rejectApplicantRCAction(VehicleRcInputData, onSuccess, onError)
          );
        } else if (type === "expiredDocuments") {
          setLoading(true);
          dispatch(
            expireddocumentRCAction(VehicleRcInputData, onSuccess, onError)
          );
        }
      } else if (values?.action === "Approve") {
        setLoading(true);
        dispatch(
          pendApplicantRCApproveAction(VehicleRcInputData, onSuccess, onError)
        );
      }
    },
  });

  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (
      registrationUploaded ||
      registrationbackUploaded ||
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formik.values]);
  const onSuccess = (data) => {
    setLoading(false);
    if (
      registrationUploaded ||
      registrationbackUploaded ||
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      handleSuccessMessageShow();
      successToast(data?.message);
    }
    handleVehicleRegistrationClose();
  };
  const onError = (data) => {
    setLoading(false);
    setDriverData(false);
    errorToast(data?.data?.data);
  };

  return (
    <>
      <Modal
        centered
        show={vehicleRegistrationShow}
        onHide={handleVehicleRegistrationClose}
        dialogClassName="driver_license_modal_container"
        contentClassName="border_radius_10px"
        backdropClassName="add_admin_modal_backdrop"
        backdrop={action === "view" ? true : "static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-2">
            <ModalHeading
              title={"Vehicle Registration Certificate - RC"}
              closeFn={() => {
                handleVehicleRegistrationClose();
                formik?.resetForm();
              }}
              status={vehicleRCdata?.status ?? "Incomplete"}
            />

            <form onSubmit={formik.handleSubmit}>
              <div className="row mt-2">
                <div className="col-sm-6">
                  <ModalInputField
                    title={"Vehicle Registration ID*"}
                    type={"text"}
                    placeholder={"Enter the Vehicle Registration ID"}
                    itemName={"VehicleRegistration"}
                    inputValue={formik.values.VehicleRegistration}
                    onChangeFn={formik.handleChange}
                    onBlurFn={formik.handleBlur}
                    formikError={formik.errors.VehicleRegistration}
                    formikTouched={formik.touched.VehicleRegistration}
                    disabled={action === "view"}
                  />
                  <ErrorField
                    formikError={formik.errors.VehicleRegistration}
                    formikTouched={formik.touched.VehicleRegistration}
                  />
                </div>
                <div className="col-sm-6">
                  <ModalInputField
                    title={"Valid Until*"}
                    type={"date"}
                    placeholder={"Enter your date"}
                    itemName={"validUntil"}
                    inputValue={formik.values.validUntil}
                    onChangeFn={formik.handleChange}
                    onBlurFn={formik.handleBlur}
                    formikError={formik.errors.validUntil}
                    formikTouched={formik.touched.validUntil}
                    disabled={action === "view"}
                  />
                  <ErrorField
                    formikError={formik.errors.validUntil}
                    formikTouched={formik.touched.validUntil}
                  />
                </div>
              </div>

              <div className="mt-4 ms-1 ">
                <span className="fs_16 fw_500 primary_color">Front Photo*</span>
              </div>

              <div className="row mt-1 mx-1">
                <div className="d-sm-flex justify-content-between align-items-center document_upload_container py-2 border_radius ">
                  {registrationUploaded || vehicleRCdata?.front_photo ? (
                    <span className="green_color">document uploaded</span>
                  ) : (
                    <span className="light_red_color ">
                      {action === "view"
                        ? "document is yet to be uplaoded"
                        : "Please upload the document"}
                    </span>
                  )}

                  <div className="d-flex gap-sm-3 gap-2">
                    {action === "edit" && (
                      <ImageInputField
                        type="file"
                        name={"upload"}
                        onChangeFn={(e) => {
                          formik.setFieldValue("upload", e.target.files[0]);
                          handleFrontFileChange(e);
                        }}
                        title={
                          registrationUploaded || vehicleRCdata?.front_photo
                            ? "Re-upload"
                            : "upload"
                        }
                        loader={uploadLoading}
                      />
                    )}
                    {registrationUploaded || vehicleRCdata?.front_photo ? (
                      <>
                        <button
                          className="primary_bg white_color border_radius_5px border_none"
                          onClick={() =>
                            openInNewTab(
                              registrationUploaded
                                ? registrationfrontfile
                                : formik.values.upload
                            )
                          }
                          type="button"
                        >
                          <EyeIcon fill="white" className={`mb-1`} />
                        </button>

                        <a
                          className=""
                          href={
                            registrationUploaded
                              ? registrationfrontfile
                              : formik.values.upload
                          }
                          download={
                            registrationUploaded
                              ? registrationfrontfile
                              : formik.values.upload
                          }
                        >
                          <button
                            className="primary_bg white_color border_radius_5px border_none"
                            type="button"
                          >
                            <DownloadIcon fill="white" className={`mb-1`} />
                          </button>
                        </a>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 ms-1 ">
                <span className="fs_16 fw_500 primary_color">Back Photo*</span>
              </div>

              <div className="row mt-1 mx-1">
                <div className="d-sm-flex justify-content-between align-items-center document_upload_container py-2 border_radius ">
                  {registrationbackUploaded || vehicleRCdata?.back_photo ? (
                    <span className="green_color">document uploaded</span>
                  ) : (
                    <span className="light_red_color ">
                      {action === "view"
                        ? "document is yet to be uplaoded"
                        : "Please upload the document"}
                    </span>
                  )}

                  <div className="d-flex gap-sm-3 gap-2">
                    {action === "edit" && (
                      <ImageInputField
                        type="file"
                        name={"backUpload"}
                        onChangeFn={(e) => {
                          formik.setFieldValue("backUpload", e.target.files[0]);
                          handleBackFileChange(e);
                        }}
                        loader={backUploadLoading}
                        title={
                          registrationbackUploaded || vehicleRCdata?.back_photo
                            ? "Re-upload"
                            : "upload"
                        }
                      />
                    )}
                    {registrationbackUploaded || vehicleRCdata?.back_photo ? (
                      <>
                        <button
                          className="primary_bg white_color border_radius_5px border_none"
                          onClick={() =>
                            openInNewTab(
                              registrationbackUploaded
                                ? registrationbackfile
                                : formik.values.backUpload
                            )
                          }
                          type="button"
                        >
                          <EyeIcon fill="white" className={`mb-1`} />
                        </button>

                        <a
                          className=""
                          href={
                            registrationbackUploaded
                              ? registrationbackfile
                              : formik.values.backUpload
                          }
                          download={
                            registrationbackUploaded
                              ? registrationbackfile
                              : formik.values.backUpload
                          }
                        >
                          <button
                            className="primary_bg white_color border_radius_5px border_none"
                            type="button"
                          >
                            <DownloadIcon fill="white" className={`mb-1`} />
                          </button>
                        </a>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>

              {/* <div className="row mt-5">
                <div className="d-flex justify-content-end gap-4">
                  {action === "edit" ? (
                    <>
                      {" "}
                      <CancelModalbtn
                        cancelModalFn={handleVehicleRegistrationClose}
                      />
                      <Savebtn
                        submitFn={() => formik.setFieldValue("action", "save")}
                        disabled={disabled}
                        btnClassName={`${
                          disabled
                            ? `disabled_color_bg white_color px-5`
                            : `light_green_bg px-5`
                        }`}
                        loader={loading}
                      />
                    </>
                  ) : (
                    is_editable && (
                      <button
                        type="button"
                        className="white_color border_none px-5 me-1 py-1 fs_16 primary_bg border_radius_5px"
                        onClick={() => {
                          setAction("edit");
                        }}
                      >
                        Edit
                      </button>
                    )
                  )}
                </div>
              </div> */}
              <div className="row mt-5">
                <div className="d-flex justify-content-sm-end justify-content-center gap-2">
                  {vehicleRCdata?.status !== "Approved" &&
                  type === "pendingApplications" &&
                  action === "edit" ? (
                    <>
                      <Savebtn
                        submitFn={() => formik.setFieldValue("action", "save")}
                        loader={loading}
                        disabled={disabled}
                        btnClassName={`${
                          disabled
                            ? `disabled_color_bg white_color px-5`
                            : `primary_bg px-5`
                        }`}
                      />
                      <button
                        onClick={() =>
                          formik.setFieldValue("action", "Approve")
                        }
                        className="border_radius_5px white_color border_none fs_16 px-4 light_green_bg py-1 fs_14"
                        type="submit"
                      >
                        {loading ? <SpinnerLoading /> : <> Approve</>}
                      </button>
                    </>
                  ) : action === "edit" ? (
                    <>
                      {" "}
                      <CancelModalbtn
                        cancelModalFn={() => {
                          handleVehicleRegistrationClose();
                          formik?.resetForm();
                        }}
                      />
                      <Savebtn
                        submitFn={() => formik.setFieldValue("action", "save")}
                        disabled={disabled}
                        btnClassName={`${
                          disabled
                            ? `disabled_color_bg white_color px-5`
                            : `light_green_bg px-5`
                        }`}
                        loader={loading}
                      />
                    </>
                  ) : (
                    is_editable &&
                    type !== "deletedDrivers" && (
                      <button
                        type="button"
                        className="white_color border_none px-5 me-1 py-1 fs_16 primary_bg border_radius_5px"
                        onClick={() => {
                          setAction("edit");
                        }}
                      >
                        Edit
                      </button>
                    )
                  )}
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Changes made Successfully`}
      />
    </>
  );
};
export default VehicleRCModal;
