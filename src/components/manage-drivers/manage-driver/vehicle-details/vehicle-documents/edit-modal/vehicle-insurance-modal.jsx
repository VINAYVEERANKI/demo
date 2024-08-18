import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "../../../../manageDriversComponents.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { formatDateTime, openInNewTab } from "../../../../../helper";
import ModalHeading from "../../../../../utilits/buttons/modal-header";
import CancelModalbtn from "../../../../../utilits/buttons/cancelModalbtn";
import Savebtn from "../../../../../utilits/buttons/savebtn";
import { UploadInsuranceAction } from "../../../../../../redux/actions/imageUploadAction";
import errorToast from "../../../../../utilits/errorToast";
import successToast from "../../../../../utilits/successToast";
import { useDispatch } from "react-redux";
import SuccessMessagemodal from "../../../../../modals/successMessageModal";
import { driverVIAction } from "../../../../../../redux/actions/manageDriversAction";
import ImageInputField from "../../../../../form/imageInputField";
import ModalInputField from "../../../../../form/modalInputField";
import ErrorField from "../../../../../form/errorField";
import SpinnerLoading from "../../../../../utilits/spinnerLoading";
import {
  pendApplicantVIAction,
  pendApplicantVIApproveAction,
} from "../../../../../../redux/actions/pendApplicantAction";
import { useNavigate } from "react-router";
import { rejectApplicantVIAction } from "../../../../../../redux/actions/rejectedApplicantAction";
import { expireddocumentVIAction } from "../../../../../../redux/actions/expiredDocumentAction";
import { blockedDriversVIAction } from "../../../../../../redux/actions/manageDrivers/blockedApplicantAction";
import EyeIcon from "../../../../../../assets/icons/eye-icon";
import DownloadIcon from "../../../../../../assets/icons/download-icon";

const VehicleInsuranceModal = ({
  vehicleInsuranceshow,
  handleVehicleInsuranceClose,
  driverData,
  setDriverData,
  vehicleInsurancedata,
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
      img: vehicleInsurancedata?.front_photo,
      error: false,
    });
    setBackImageLink({
      img: vehicleInsurancedata?.back_photo,
      error: false,
    });
  }, [vehicleInsurancedata]);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    const shouldNavigate =
      (type === "rejectedApplications" || type === "expiredDocuments") &&
      vehicleInsurancedata?.status !== "Approved";

    if (shouldNavigate) {
      navigate(`${mainPagePath}`);
    } else {
      setDriverData(!driverData);
    }
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const [vehicleInsurancefrontfile, setVehicleInsuranceFrontFile] =
    useState("");

  const [vehicleInsurancebackfile, setVehicleInsuranceBackFile] = useState("");

  const [uploaded, setUploaded] = useState(false);

  const [backUploaded, setBackUploaded] = useState(false);
  function handleVIFrontFileChange(e) {
    if (e.target?.files.length !== 0) {
      setVehicleInsuranceFrontFile(URL.createObjectURL(e.target.files[0]));
      setUploadLoading(true);
      dispatch(
        UploadInsuranceAction(e.target.files[0], onUploadSuccess, onUploadError)
      );
    }
  }
  const onUploadSuccess = (data) => {
    setUploaded(true);
    setUploadLoading(false);
    setFrontImageLink({ img: data.data.data.location, error: false });
  };
  const onUploadError = (data) => {
    setUploadLoading(false);
  };
  function handleVIBackFileChange(e) {
    if (e.target?.files.length !== 0) {
      setVehicleInsuranceBackFile(URL.createObjectURL(e.target.files[0]));
      setBackUploadLoading(true);
      dispatch(
        UploadInsuranceAction(
          e.target.files[0],
          onBackImageUploadSuccess,
          onBackImageUploadError
        )
      );
    }
  }
  const onBackImageUploadSuccess = (data) => {
    setBackUploaded(true);
    setBackUploadLoading(false);
    setBackImageLink({ img: data.data.data.location, error: false });
  };
  const onBackImageUploadError = (data) => {
    setBackUploadLoading(false);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      VehicleInsurance: vehicleInsurancedata?.vehicle_insurance_id
        ? vehicleInsurancedata?.vehicle_insurance_id
        : "",
      validUntil: formatDateTime(
        vehicleInsurancedata?.expiry_date,
        "YYYY-MM-DD",
        ""
      ),
      upload: vehicleInsurancedata?.front_photo
        ? vehicleInsurancedata?.front_photo
        : "",
      backUpload: vehicleInsurancedata?.back_photo
        ? vehicleInsurancedata?.back_photo
        : "",
      action: "save",
    },
    validationSchema: Yup.object({
      VehicleInsurance: Yup.string("")
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
      backUpload: Yup.mixed(""),
    }),

    onSubmit: (values) => {
      const VIinputData = {
        driver_id: id,
        front_photo: frontImageLink?.img,
        back_photo: backImageLink?.img,
        vehicle_insurance_id: values?.VehicleInsurance,
        expiry_date: values?.validUntil,
      };

      if (values.action === "save") {
        if (type === "manageDrivers") {
          setLoading(true);
          dispatch(driverVIAction(VIinputData, onSuccess, onError));
        } else if (type === "blockedDrivers") {
          setLoading(true);
          dispatch(blockedDriversVIAction(VIinputData, onSuccess, onError));
        } else if (type === "pendingApplications") {
          setLoading(true);
          dispatch(pendApplicantVIAction(VIinputData, onSuccess, onError));
        } else if (type === "rejectedApplications") {
          setLoading(true);
          dispatch(rejectApplicantVIAction(VIinputData, onSuccess, onError));
        } else if (type === "expiredDocuments") {
          setLoading(true);
          dispatch(expireddocumentVIAction(VIinputData, onSuccess, onError));
        }
      } else if (values?.action === "Approve") {
        setLoading(true);
        dispatch(pendApplicantVIApproveAction(VIinputData, onSuccess, onError));
      }
    },
  });

  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (
      uploaded ||
      backUploaded ||
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
      uploaded ||
      backUploaded ||
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      handleSuccessMessageShow();
      successToast(data?.message);
    }
    handleVehicleInsuranceClose();
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
        show={vehicleInsuranceshow}
        onHide={handleVehicleInsuranceClose}
        dialogClassName="vehicle_Insurance_modal_container"
        contentClassName="border_radius_10px"
        backdropClassName="add_admin_modal_backdrop"
        backdrop={action === "view" ? true : "static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-2">
            <ModalHeading
              title={"Vehicle Insurance"}
              closeFn={() => {
                handleVehicleInsuranceClose();
                formik?.resetForm();
              }}
              status={vehicleInsurancedata?.status ?? "Incomplete"}
            />

            <form onSubmit={formik.handleSubmit}>
              <div className="row mt-2">
                <div className="col-sm-6">
                  <ModalInputField
                    title={"Vehicle Insurance ID*"}
                    type={"text"}
                    placeholder={"Enter the Vehicle Insurance ID"}
                    itemName={"VehicleInsurance"}
                    inputValue={formik.values.VehicleInsurance}
                    onChangeFn={formik.handleChange}
                    onBlurFn={formik.handleBlur}
                    formikError={formik.errors.VehicleInsurance}
                    formikTouched={formik.touched.VehicleInsurance}
                    disabled={action === "view"}
                  />
                  <ErrorField
                    formikError={formik.errors.DrivinglicenseID}
                    formikTouched={formik.touched.DrivinglicenseID}
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
              {action === "edit" && (
                <div className="text-center mt-3 d-flex flex-column fs_12 px-sm-5 fw_500 secondary_color">
                  <span className="">
                    Upload photos of driver's vehicle insurance. Make sure:
                  </span>
                  <span>
                    1. The Make and Model of the vehicle, Vehicle Number,
                    Chassis Number, Registration Name, Start Date, Expiry Date,
                    & Financier Name or Company Name are clearly visible and are
                    in focus.
                  </span>
                  <span>
                    2. Additional Photos of the insurance will have to be
                    submitted if your document has multiple pages or sides.
                  </span>
                </div>
              )}

              <div className="mt-4 ms-1 ">
                <span className="fs_16 fw_500 primary_color">Image 1*</span>
              </div>

              <div className="row mt-1 mx-sm-1">
                <div className="d-sm-flex justify-content-between align-items-center document_upload_container py-2 border_radius ">
                  {uploaded || vehicleInsurancedata?.front_photo ? (
                    <span className="green_color">document uploaded</span>
                  ) : (
                    <span className="light_red_color ">
                      {action === "view"
                        ? "document is yet to be uplaoded"
                        : "Please upload the document"}
                    </span>
                  )}

                  <div className="d-flex gap-3">
                    {action === "edit" && (
                      <ImageInputField
                        type="file"
                        name={"upload"}
                        onChangeFn={(e) => {
                          formik.setFieldValue("upload", e.target.files[0]);
                          handleVIFrontFileChange(e);
                        }}
                        title={
                          uploaded || vehicleInsurancedata?.front_photo
                            ? "Re-upload"
                            : "upload"
                        }
                        loader={uploadLoading}
                      />
                    )}
                    {uploaded || vehicleInsurancedata?.front_photo ? (
                      <>
                        <button
                          className="primary_bg white_color border_radius_5px border_none"
                          onClick={() =>
                            openInNewTab(
                              uploaded
                                ? vehicleInsurancefrontfile
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
                            uploaded
                              ? vehicleInsurancefrontfile
                              : formik.values.upload
                          }
                          download={
                            uploaded
                              ? vehicleInsurancefrontfile
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
                <span className="fs_16 fw_500 primary_color">Image 2</span>
              </div>

              <div className="row mt-1 mx-sm-1">
                <div className="d-sm-flex justify-content-between align-items-center document_upload_container py-2 border_radius ">
                  {backUploaded || vehicleInsurancedata?.back_photo ? (
                    <span className="green_color">document uploaded</span>
                  ) : (
                    <span className="light_red_color ">
                      {action === "view"
                        ? "document is yet to be uplaoded"
                        : "Please upload the document"}
                    </span>
                  )}

                  <div className="d-flex gap-3">
                    {action === "edit" && (
                      <ImageInputField
                        type="file"
                        name={"backUpload"}
                        onChangeFn={(e) => {
                          formik.setFieldValue("backUpload", e.target.files[0]);
                          handleVIBackFileChange(e);
                        }}
                        loader={backUploadLoading}
                        title={
                          backUploaded || vehicleInsurancedata?.back_photo
                            ? "Re-upload"
                            : "upload"
                        }
                      />
                    )}
                    {backUploaded || vehicleInsurancedata?.back_photo ? (
                      <>
                        <button
                          className="primary_bg white_color border_radius_5px border_none"
                          onClick={() =>
                            openInNewTab(
                              backUploaded
                                ? vehicleInsurancebackfile
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
                            backUploaded
                              ? vehicleInsurancebackfile
                              : formik.values.backUpload
                          }
                          download={
                            backUploaded
                              ? vehicleInsurancebackfile
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
                      <CancelModalbtn
                        cancelModalFn={handleVehicleInsuranceClose}
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
                  {vehicleInsurancedata?.status !== "Approved" &&
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
                          handleVehicleInsuranceClose();
                          formik?.resetForm();
                        }}
                      />
                      <Savebtn
                        submitFn={() => formik.setFieldValue("action", "save")}
                        disabled={disabled}
                        btnClassName={`${
                          disabled
                            ? `disabled_color_bg white_color px-sm-5 px-4`
                            : `light_green_bg px-sm-5 px-4`
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
export default VehicleInsuranceModal;
