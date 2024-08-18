import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../../../manageDriversComponents.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { DlRegex, formatDateTime, openInNewTab } from "../../../../../helper";
import ModalHeading from "../../../../../utilits/buttons/modal-header";
import ModalInputField from "../../../../../form/modalInputField";
import ErrorField from "../../../../../form/errorField";
import ImageInputField from "../../../../../form/imageInputField";
import CancelModalbtn from "../../../../../utilits/buttons/cancelModalbtn";
import Savebtn from "../../../../../utilits/buttons/savebtn";
import SuccessMessagemodal from "../../../../../modals/successMessageModal";
import { useDispatch } from "react-redux";
import { UploadDLAction } from "../../../../../../redux/actions/imageUploadAction";
import { driverDLAction } from "../../../../../../redux/actions/manageDriversAction";
import successToast from "../../../../../utilits/successToast";
import errorToast from "../../../../../utilits/errorToast";
import SpinnerLoading from "../../../../../utilits/spinnerLoading";
import {
  pendApplicantApproveAction,
  pendApplicantDLAction,
} from "../../../../../../redux/actions/pendApplicantAction";
import { rejectApplicantDLAction } from "../../../../../../redux/actions/rejectedApplicantAction";
import { useNavigate } from "react-router";
import { expireddocumentDLAction } from "../../../../../../redux/actions/expiredDocumentAction";
import { blockedDriversDLAction } from "../../../../../../redux/actions/manageDrivers/blockedApplicantAction";
import EyeIcon from "../../../../../../assets/icons/eye-icon";
import DownloadIcon from "../../../../../../assets/icons/download-icon";

const DrivingLicenseModal = ({
  licenseModalShow,
  handleLicenseModalClose,
  drivingLicensedata,
  driverData,
  setDriverData,
  action,
  setAction,
  id,
  is_editable,
  type,
}) => {
  const currentPath = window?.location?.pathname;
  const mainPagePath = "/" + currentPath?.split("/")[1];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
      img: drivingLicensedata?.front_photo,
      error: false,
    });
    setBackImageLink({
      img: drivingLicensedata?.back_photo,
      error: false,
    });
  }, [drivingLicensedata]);
  const [frontfile, setFrontFile] = useState("");

  const [backfile, setBackFile] = useState("");

  const [uploaded, setUploaded] = useState(false);

  const [backUploaded, setBackUploaded] = useState(false);

  const [successMessageShow, setSuccessMessageShow] = useState(false);

  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    const shouldNavigate =
      (type === "rejectedApplications" || type === "expiredDocuments") &&
      drivingLicensedata?.status !== "Approved";

    if (shouldNavigate) {
      navigate(`${mainPagePath}`);
    } else {
      setDriverData(!driverData);
    }
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  function handleFrontFileChange(e) {
    if (e.target?.files.length !== 0) {
      setFrontFile(URL.createObjectURL(e.target.files[0]));

      dispatch(
        UploadDLAction(e.target.files[0], onUploadSuccess, onUploadError)
      );
    }
  }
  const onUploadSuccess = (data) => {
    console.log(data.data);
    setUploaded(true);
    setFrontImageLink({ img: data.data.data.location, error: false });
  };
  const onUploadError = (data) => {
    console.log(data);
  };
  function handleBackFileChange(e) {
    if (e.target?.files.length !== 0) {
      setBackFile(URL.createObjectURL(e.target.files[0]));

      dispatch(
        UploadDLAction(
          e.target.files[0],
          onBackImageUploadSuccess,
          onBackImageUploadError
        )
      );
    }
  }
  const onBackImageUploadSuccess = (data) => {
    setBackUploaded(true);

    setBackImageLink({ img: data.data.data.location, error: false });
  };
  const onBackImageUploadError = (data) => {
    console.log(data);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      DrivinglicenseID: drivingLicensedata?.driving_license_id
        ? drivingLicensedata?.driving_license_id
        : "",
      validUntil: formatDateTime(
        drivingLicensedata?.expiry_date,
        "YYYY-MM-DD",
        ""
      ),
      upload: drivingLicensedata?.front_photo
        ? drivingLicensedata?.front_photo
        : "",

      backUpload: drivingLicensedata?.back_photo
        ? drivingLicensedata?.back_photo
        : "",
      action: "save",
    },
    validationSchema: Yup.object({
      DrivinglicenseID: Yup.string()
        .matches(DlRegex, "Invalid Value")
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
      const dlInputData = {
        driver_id: id,
        front_photo: frontImageLink?.img,
        back_photo: backImageLink?.img,
        driving_license_id: values?.DrivinglicenseID,
        expiry_date: values?.validUntil,
      };
      if (values.action === "save") {
        if (type === "manageDrivers") {
          setLoading(true);
          dispatch(driverDLAction(dlInputData, onSuccess, onError));
        } else if (type === "expiredDocuments") {
          setLoading(true);
          dispatch(expireddocumentDLAction(dlInputData, onSuccess, onError));
        } else if (type === "blockedDrivers") {
          setLoading(true);
          dispatch(blockedDriversDLAction(dlInputData, onSuccess, onError));
        } else if (type === "pendingApplications") {
          setLoading(true);
          dispatch(pendApplicantDLAction(dlInputData, onSuccess, onError));
        } else if (type === "rejectedApplications") {
          setLoading(true);
          dispatch(rejectApplicantDLAction(dlInputData, onSuccess, onError));
        }
      } else if (values?.action === "Approve") {
        setLoading(true);
        dispatch(pendApplicantApproveAction(dlInputData, onSuccess, onError));
      }
    },
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
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
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      handleSuccessMessageShow();
      successToast(data?.message);
    }
    handleLicenseModalClose();
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
        show={licenseModalShow}
        onHide={handleLicenseModalClose}
        dialogClassName="driver_license_modal_container"
        contentClassName="border_radius_10px"
        backdropClassName="add_admin_modal_backdrop"
        backdrop={action === "view" ? true : "static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-2">
            <ModalHeading
              title={"Driving License"}
              closeFn={() => {
                handleLicenseModalClose();
                formik?.resetForm();
              }}
              status={drivingLicensedata?.status ?? "Incomplete"}
            />

            <form onSubmit={formik.handleSubmit}>
              <div className="row mt-2">
                <div className="col-sm-6">
                  <ModalInputField
                    title={"Driving License ID*"}
                    type={"text"}
                    placeholder={"Enter the Driving License ID"}
                    itemName={"DrivinglicenseID"}
                    inputValue={formik.values.DrivinglicenseID}
                    onChangeFn={formik.handleChange}
                    onBlurFn={formik.handleBlur}
                    formikError={formik.errors.DrivinglicenseID}
                    formikTouched={formik.touched.DrivinglicenseID}
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
                <div className="text-center mt-3 d-flex flex-column fs_12 px-sm-5 mx-sm-5 fw_500 secondary_color">
                  <span className="">
                    Upload both front and back of your driving license. Make
                    sure:
                  </span>
                  <span>
                    1. The license number, license type, address, D.O.B,
                    Expiration date & Govt logo is clearly visible and is in
                    focus.
                  </span>
                  <span>
                    2. The license number in the image should match the license
                    number added in the text field.
                  </span>
                </div>
              )}

              <div className="row mx-1 mt-4">
                <span className="fs_16 fw_500 primary_color ps-1">
                  Front Photo*
                </span>
                <div className="d-sm-flex justify-content-between align-items-center document_upload_container py-2 border_radius">
                  {uploaded || drivingLicensedata?.front_photo ? (
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
                          uploaded || drivingLicensedata?.front_photo
                            ? "Re-upload"
                            : "upload"
                        }
                      />
                    )}
                    {uploaded || drivingLicensedata?.front_photo ? (
                      <>
                        <button
                          type="button"
                          className="primary_bg white_color border_radius_5px border_none"
                          onClick={() =>
                            openInNewTab(
                              uploaded ? frontfile : formik.values.upload
                            )
                          }
                        >
                          <EyeIcon fill="white" className={`mb-1`} />
                        </button>

                        <a
                          className=""
                          href={uploaded ? frontfile : formik.values.upload}
                          download={uploaded ? frontfile : formik.values.upload}
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

              <div className="row mx-1">
                <span className="fs_16 fw_500 primary_color ps-1">
                  Back Photo*
                </span>
                <div className="d-sm-flex justify-content-between align-items-center document_upload_container py-2 border_radius">
                  {backUploaded || drivingLicensedata?.back_photo ? (
                    <span className="green_color">document uploaded</span>
                  ) : (
                    <span className="light_red_color">
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
                        title={
                          backUploaded || drivingLicensedata?.back_photo
                            ? "Re-upload"
                            : "upload"
                        }
                      />
                    )}
                    {backUploaded || drivingLicensedata?.back_photo ? (
                      <>
                        <button
                          type="button"
                          className="primary_bg white_color border_radius_5px border_none"
                          onClick={() =>
                            openInNewTab(
                              backUploaded ? backfile : formik.values.backUpload
                            )
                          }
                        >
                          <EyeIcon fill="white" className={`mb-1`} />
                        </button>

                        <a
                          className=""
                          href={
                            backUploaded ? backfile : formik.values.backUpload
                          }
                          download={
                            backUploaded ? backfile : formik.values.backUpload
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
                      <CancelModalbtn cancelModalFn={handleLicenseModalClose} />

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
                <div className="d-flex justify-content-sm-end justify-content-center gap-sm-2 gap-1">
                  {drivingLicensedata?.status !== "Approved" &&
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
                          handleLicenseModalClose();
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
        title="Changes made Successfully"
      />
    </>
  );
};

export default DrivingLicenseModal;
