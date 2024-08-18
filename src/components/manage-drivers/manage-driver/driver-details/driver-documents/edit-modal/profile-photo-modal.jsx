import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../../../manageDriversComponents.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { openInNewTab } from "../../../../../helper";
import ModalHeading from "../../../../../utilits/buttons/modal-header";
import ImageInputField from "../../../../../form/imageInputField";
import CancelModalbtn from "../../../../../utilits/buttons/cancelModalbtn";
import Savebtn from "../../../../../utilits/buttons/savebtn";
import SuccessMessagemodal from "../../../../../modals/successMessageModal";
import { useDispatch } from "react-redux";
import { UploadProfilePicAction } from "../../../../../../redux/actions/imageUploadAction";
import { driverProfilePicAction } from "../../../../../../redux/actions/manageDriversAction";
import successToast from "../../../../../utilits/successToast";
import errorToast from "../../../../../utilits/errorToast";
import SpinnerLoading from "../../../../../utilits/spinnerLoading";
import {
  pendApplicantProfilePicAction,
  pendApplicantProfilePicApproveAction,
} from "../../../../../../redux/actions/pendApplicantAction";
import { rejectApplicantProfilePicAction } from "../../../../../../redux/actions/rejectedApplicantAction";
import { useNavigate } from "react-router";
import { expireddocumentProfilePicAction } from "../../../../../../redux/actions/expiredDocumentAction";
import { blockedDriversProfilePicAction } from "../../../../../../redux/actions/manageDrivers/blockedApplicantAction";
import DownloadIcon from "../../../../../../assets/icons/download-icon";
import EyeIcon from "../../../../../../assets/icons/eye-icon";

const ProfilePhotoModal = ({
  profilePhotoShow,
  handleProfilePhotoClose,
  profilePictureData,
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
  const [uploadLoading, setUploadLoading] = useState(false);
  const [error, setError] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [profilePhotoFile, setProfilePhotoFile] = useState("");
  const dispatch = useDispatch();
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    if (
      type === "rejectedApplications" &&
      profilePictureData?.status !== "Approved"
    ) {
      navigate(`${mainPagePath}`);
    } else {
      setDriverData(!driverData);
    }
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const [frontImageLink, setFrontImageLink] = useState({
    img: "",
    error: false,
  });

  useEffect(() => {
    setFrontImageLink({
      img: profilePictureData?.photo,
      error: false,
    });
  }, [profilePictureData]);

  function handleProfilePhotoFileChange(e) {
    if (e.target?.files.length !== 0) {
      setProfilePhotoFile(URL.createObjectURL(e.target.files[0]));
      setUploadLoading(true);
      dispatch(
        UploadProfilePicAction(
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
    setFrontImageLink({ img: data.data.data.location, error: false });
  };
  const onUploadError = (data) => {
    console.log(data);
    setUploadLoading(false);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Upload: profilePictureData?.photo ? profilePictureData?.photo : "",
      action: "save",
    },
    validationSchema: Yup.object({
      Upload: Yup.mixed("").required("Please fill this field to proceed"),
    }),

    onSubmit: (values) => {
      const profilePictureInputData = {
        driver_id: id,
        profile_photo: frontImageLink?.img,
      };
      if (values.action === "save") {
        if (type === "manageDrivers") {
          setLoading(true);
          dispatch(
            driverProfilePicAction(profilePictureInputData, onSuccess, onError)
          );
        } else if (type === "blockedDrivers") {
          setLoading(true);
          dispatch(
            blockedDriversProfilePicAction(
              profilePictureInputData,
              onSuccess,
              onError
            )
          );
        } else if (type === "pendingApplications") {
          setLoading(true);
          dispatch(
            pendApplicantProfilePicAction(
              profilePictureInputData,
              onSuccess,
              onError
            )
          );
        } else if (type === "rejectedApplications") {
          setLoading(true);
          dispatch(
            rejectApplicantProfilePicAction(
              profilePictureInputData,
              onSuccess,
              onError
            )
          );
        } else if (type === "expiredDocuments") {
          setLoading(true);
          dispatch(
            expireddocumentProfilePicAction(
              profilePictureInputData,
              onSuccess,
              onError
            )
          );
        }
      } else if (values.action === "Approve") {
        setLoading(true);
        dispatch(
          pendApplicantProfilePicApproveAction(
            profilePictureInputData,
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
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      handleSuccessMessageShow();
      successToast(data?.message);
    }

    handleProfilePhotoClose();
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
        show={profilePhotoShow}
        onHide={handleProfilePhotoClose}
        dialogClassName="driver_document_modal_container"
        contentClassName="border_radius_10px"
        backdropClassName="add_admin_modal_backdrop"
        backdrop={action === "view" ? true : "static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="ps-2 pe-2">
            <ModalHeading
              title={"Profile Picture"}
              closeFn={handleProfilePhotoClose}
              status={profilePictureData?.status ?? "Incomplete"}
            />

            <form onSubmit={formik.handleSubmit}>
              <div className="row mt-4 mx-1">
                <div className="d-sm-flex justify-content-between align-items-center document_upload_container py-2 border_radius ">
                  {uploaded || profilePictureData?.photo ? (
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
                        name={"Upload"}
                        onChangeFn={(e) => {
                          formik.setFieldValue("Upload", e.target.files[0]);
                          handleProfilePhotoFileChange(e);
                        }}
                        title={
                          uploaded || profilePictureData?.photo
                            ? "Re-upload"
                            : "upload"
                        }
                        loader={uploadLoading}
                      />
                    )}
                    {uploaded || profilePictureData?.photo ? (
                      <>
                        <button
                          className="primary_bg white_color border_radius_5px border_none"
                          onClick={() =>
                            openInNewTab(
                              uploaded ? profilePhotoFile : formik.values.Upload
                            )
                          }
                          type="button"
                        >
                          <EyeIcon fill="white" className={`mb-1`} />
                        </button>

                        <a
                          className=""
                          href={
                            uploaded ? profilePhotoFile : formik.values.Upload
                          }
                          download={
                            uploaded ? profilePhotoFile : formik.values.Upload
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
                      <CancelModalbtn cancelModalFn={handleProfilePhotoClose} />

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
                  {profilePictureData?.status !== "Approved" &&
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
                      <CancelModalbtn cancelModalFn={handleProfilePhotoClose} />
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

export default ProfilePhotoModal;
