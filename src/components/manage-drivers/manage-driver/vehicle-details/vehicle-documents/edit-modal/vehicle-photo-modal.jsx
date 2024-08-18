import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../../../manageDriversComponents.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { openInNewTab } from "../../../../../helper";
import SuccessMessagemodal from "../../../../../modals/successMessageModal";
import errorToast from "../../../../../utilits/errorToast";
import successToast from "../../../../../utilits/successToast";
import { useDispatch } from "react-redux";
import { UploadVehiclePicAction } from "../../../../../../redux/actions/imageUploadAction";
import { driverVehiclePicAction } from "../../../../../../redux/actions/manageDriversAction";
import Savebtn from "../../../../../utilits/buttons/savebtn";
import ImageInputField from "../../../../../form/imageInputField";
import CancelModalbtn from "../../../../../utilits/buttons/cancelModalbtn";
import {
  pendApplicantVehiclePicAction,
  pendApplicantVehiclePicApproveAction,
} from "../../../../../../redux/actions/pendApplicantAction";
import ModalHeading from "../../../../../utilits/buttons/modal-header";
import SpinnerLoading from "../../../../../utilits/spinnerLoading";
import { rejectApplicantVehiclePicAction } from "../../../../../../redux/actions/rejectedApplicantAction";
import { useNavigate } from "react-router";
import { expireddocumentVehiclePicAction } from "../../../../../../redux/actions/expiredDocumentAction";
import { blockedDriversVehiclePicAction } from "../../../../../../redux/actions/manageDrivers/blockedApplicantAction";
import EyeIcon from "../../../../../../assets/icons/eye-icon";
import DownloadIcon from "../../../../../../assets/icons/download-icon";

const VehiclePhotoModal = ({
  vehiclePhotoshow,
  handleVehiclePhotoClose,
  driverData,
  setDriverData,
  vehiclePhotosdata,
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
  const [error, setError] = useState(false);
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
      img: vehiclePhotosdata?.front_photo,
      error: false,
    });
    setBackImageLink({
      img: vehiclePhotosdata?.back_photo,
      error: false,
    });
  }, [vehiclePhotosdata]);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    if (
      type === "rejectedApplications" &&
      vehiclePhotosdata?.status !== "Approved"
    ) {
      navigate(`${mainPagePath}`);
    } else {
      setDriverData(!driverData);
    }
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const [vehiclePhotofrontfile, setVehicleIPhotoFrontFile] = useState("");

  const [vehiclePhotobackfile, setVehiclePhotoBackFile] = useState("");

  const [uploaded, setUploaded] = useState(false);

  const [backUploaded, setBackUploaded] = useState(false);
  function handleVehicleFrontPhotoChange(e) {
    if (e.target?.files.length !== 0) {
      setVehicleIPhotoFrontFile(URL.createObjectURL(e.target.files[0]));
      setUploadLoading(true);
      dispatch(
        UploadVehiclePicAction(
          e.target.files[0],
          onUploadSuccess,
          onUploadError
        )
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
  function handleVehiclePhotoBackFileChange(e) {
    if (e.target?.files.length !== 0) {
      setVehiclePhotoBackFile(URL.createObjectURL(e.target.files[0]));
      setBackUploadLoading(true);
      dispatch(
        UploadVehiclePicAction(
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
      upload: vehiclePhotosdata?.front_photo
        ? vehiclePhotosdata?.front_photo
        : "",
      backUpload: vehiclePhotosdata?.back_photo
        ? vehiclePhotosdata?.back_photo
        : "",
      action: "save",
    },
    validationSchema: Yup.object({
      upload: Yup.mixed("").required("Please fill this field to proceed"),
      backUpload: Yup.mixed("").required("Please fill this field to proceed"),
    }),

    onSubmit: (values) => {
      const vehiclePhotoData = {
        driver_id: id,
        front_photo: frontImageLink?.img,
        back_photo: backImageLink?.img,
      };
      if (values.action === "save") {
        if (type === "manageDrivers") {
          setLoading(true);
          dispatch(
            driverVehiclePicAction(vehiclePhotoData, onSuccess, onError)
          );
        } else if (type === "blockedDrivers") {
          setLoading(true);
          dispatch(
            blockedDriversVehiclePicAction(vehiclePhotoData, onSuccess, onError)
          );
        } else if (type === "pendingApplications") {
          setLoading(true);
          dispatch(
            pendApplicantVehiclePicAction(vehiclePhotoData, onSuccess, onError)
          );
        } else if (type == "rejectedApplications") {
          setLoading(true);
          dispatch(
            rejectApplicantVehiclePicAction(
              vehiclePhotoData,
              onSuccess,
              onError
            )
          );
        } else if (type === "expiredDocuments") {
          setLoading(true);
          dispatch(
            expireddocumentVehiclePicAction(
              vehiclePhotoData,
              onSuccess,
              onError
            )
          );
        }
      } else if (values?.action === "Approve") {
        setLoading(true);
        dispatch(
          pendApplicantVehiclePicApproveAction(
            vehiclePhotoData,
            onSuccess,
            onError
          )
        );
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

    handleVehiclePhotoClose();
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
        show={vehiclePhotoshow}
        onHide={handleVehiclePhotoClose}
        dialogClassName="vehicle_Insurance_modal_container"
        contentClassName="border_radius_10px"
        backdropClassName="add_admin_modal_backdrop"
        backdrop={action === "view" ? true : "static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="[px-2">
            <ModalHeading
              title={"Vehicle Photos"}
              closeFn={() => {
                handleVehiclePhotoClose();
                formik?.resetForm();
              }}
              status={vehiclePhotosdata?.status ?? "Incomplete"}
            />

            <form onSubmit={formik.handleSubmit}>
              <div className="mt-4 ms-1 ">
                <span className="fs_16 fw_500 primary_color">
                  Photo 1* (Front View)
                </span>
              </div>

              <div className="row mt-1 mx-1">
                <div className="d-sm-flex justify-content-between align-items-center document_upload_container py-2 border_radius ">
                  {uploaded || vehiclePhotosdata?.front_photo ? (
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
                          handleVehicleFrontPhotoChange(e);
                        }}
                        title={
                          uploaded || vehiclePhotosdata?.front_photo
                            ? "Re-upload"
                            : "upload"
                        }
                        loader={uploadLoading}
                      />
                    )}

                    {uploaded || vehiclePhotosdata?.front_photo ? (
                      <>
                        <button
                          className="primary_bg white_color border_radius_5px border_none"
                          onClick={() =>
                            openInNewTab(
                              uploaded
                                ? vehiclePhotofrontfile
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
                              ? vehiclePhotofrontfile
                              : formik.values.upload
                          }
                          download={
                            uploaded
                              ? vehiclePhotofrontfile
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
                <span className="fs_16 fw_500 primary_color">
                  Photo 2* (Back View)
                </span>
              </div>

              <div className="row mt-1 mx-1">
                <div className="d-sm-flex justify-content-between align-items-center document_upload_container py-2 border_radius ">
                  {backUploaded || vehiclePhotosdata?.back_photo ? (
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
                          handleVehiclePhotoBackFileChange(e);
                        }}
                        loader={backUploadLoading}
                        title={
                          backUploaded || vehiclePhotosdata?.back_photo
                            ? "Re-upload"
                            : "upload"
                        }
                      />
                    )}

                    {backUploaded || vehiclePhotosdata?.back_photo ? (
                      <>
                        <button
                          className="primary_bg white_color border_radius_5px border_none"
                          onClick={() =>
                            openInNewTab(
                              backUploaded
                                ? vehiclePhotobackfile
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
                              ? vehiclePhotobackfile
                              : formik.values.backUpload
                          }
                          download={
                            backUploaded
                              ? vehiclePhotobackfile
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
                <div className="d-flex justify-content-end gap-3">
                  {action === "edit" ? (
                    <>
                      {" "}
                      <CancelModalbtn cancelModalFn={handleVehiclePhotoClose} />
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
                <div className="d-flex justify-content-sm-end justify-content-center gap-sm-2">
                  {vehiclePhotosdata?.status !== "Approved" &&
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
                          handleVehiclePhotoClose();
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
export default VehiclePhotoModal;
