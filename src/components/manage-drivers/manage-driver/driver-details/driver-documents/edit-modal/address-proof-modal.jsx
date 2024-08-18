import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../../../manageDriversComponents.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { openInNewTab } from "../../../../../helper";
import ModalInputField from "../../../../../form/modalInputField";
import ErrorField from "../../../../../form/errorField";
import CancelModalbtn from "../../../../../utilits/buttons/cancelModalbtn";
import Savebtn from "../../../../../utilits/buttons/savebtn";
import ModalHeading from "../../../../../utilits/buttons/modal-header";
import ImageInputField from "../../../../../form/imageInputField";
import SuccessMessagemodal from "../../../../../modals/successMessageModal";
import { useDispatch } from "react-redux";
import { UploadAdressAction } from "../../../../../../redux/actions/imageUploadAction";
import { driveradressproofAction } from "../../../../../../redux/actions/manageDriversAction";
import successToast from "../../../../../utilits/successToast";
import errorToast from "../../../../../utilits/errorToast";
import {
  pendApplicantadressproofAction,
  pendadressApproveAction,
} from "../../../../../../redux/actions/pendApplicantAction";
import SpinnerLoading from "../../../../../utilits/spinnerLoading";
import { rejectApplicantadressproofAction } from "../../../../../../redux/actions/rejectedApplicantAction";
import { useNavigate } from "react-router";
import { expireddocumentadressproofAction } from "../../../../../../redux/actions/expiredDocumentAction";
import { blockedDriversadressproofAction } from "../../../../../../redux/actions/manageDrivers/blockedApplicantAction";
import DownloadIcon from "../../../../../../assets/icons/download-icon";
import EyeIcon from "../../../../../../assets/icons/eye-icon";

const AddressProofModal = ({
  addressProofModalShow,
  handleAddressProofModalClose,
  addressProofdata,
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
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    if (
      type === "rejectedApplications" &&
      addressProofdata?.status !== "Approved"
    ) {
      navigate(`${mainPagePath}`);
    } else {
      setDriverData(!driverData);
    }
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

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
      img: addressProofdata?.front_photo,
      error: false,
    });
    setBackImageLink({
      img: addressProofdata?.back_photo,
      error: false,
    });
  }, [addressProofdata]);

  const [uploaded, setUploaded] = useState(false);
  const [backImageUploaded, setBackImageUploaded] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState("");
  const [backFile, setBackFile] = useState("");

  const postalCodeRegex = /^\d{6}$/;
  function handleFileChange(e) {
    if (e.target?.files.length !== 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
      setUploadLoading(true);
      dispatch(
        UploadAdressAction(e.target.files[0], onUploadSuccess, onUploadError)
      );
    }
  }
  const onUploadSuccess = (data) => {
    setUploadLoading(false);
    setUploaded(true);
    setFrontImageLink({ img: data?.data?.data?.location, error: false });
  };
  const onUploadError = (data) => {
    setUploadLoading(false);
  };

  function handleBackFileChange(e) {
    if (e.target?.files.length !== 0) {
      setBackFile(URL.createObjectURL(e.target.files[0]));
      setBackImageUploaded(true);
      setBackUploadLoading(true);
      dispatch(
        UploadAdressAction(
          e.target.files[0],
          onBackImageUploadSuccess,
          onBackImageUploadError
        )
      );
    }
  }
  const onBackImageUploadSuccess = (data) => {
    setBackImageUploaded(true);
    setBackUploadLoading(false);

    setBackImageLink({ img: data.data.data.location, error: false });
  };
  const onBackImageUploadError = (data) => {
    setBackUploadLoading(false);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Address1: addressProofdata?.address ? addressProofdata?.address : "",
      PostalCode: addressProofdata?.postal_code
        ? addressProofdata?.postal_code
        : "",
      CityTown: addressProofdata?.city ? addressProofdata?.city : "",
      State: addressProofdata?.state ? addressProofdata?.state : "",

      Upload: addressProofdata?.front_photo
        ? addressProofdata?.front_photo
        : "",
      BackImageUpload: addressProofdata?.back_photo
        ? addressProofdata?.back_photo
        : "",
      action: "save",
    },
    validationSchema: Yup.object({
      Address1: Yup.string("")
        .trim()
        .required("Please fill this field to proceed"),
      PostalCode: Yup.string()
        .matches(postalCodeRegex, "Invalid postal code")
        .trim()
        .required("Please fill this field to proceed"),
      CityTown: Yup.string("")
        .trim()
        .required("Please fill this field to proceed"),
      State: Yup.string("")
        .trim()
        .required("Please fill this field to proceed"),
      Upload: Yup.mixed("").required("Please fill this field to proceed"),
      BackImageUpload: Yup.mixed(""),
    }),

    onSubmit: (values) => {
      const adrressData = {
        driver_id: id,
        front_photo: frontImageLink?.img,
        back_photo: backImageLink?.img,
        address: values?.Address1,
        postal_code: values?.PostalCode,
        state: values?.State,
        city: values?.CityTown,
      };
      if (values.action === "save") {
        if (type === "manageDrivers") {
          setLoading(true);
          dispatch(driveradressproofAction(adrressData, onSuccess, onError));
        } else if (type === "blockedDrivers") {
          setLoading(true);
          dispatch(
            blockedDriversadressproofAction(adrressData, onSuccess, onError)
          );
        } else if (type === "pendingApplications") {
          setLoading(true);
          dispatch(
            pendApplicantadressproofAction(adrressData, onSuccess, onError)
          );
        } else if (type === "rejectedApplications") {
          setLoading(true);
          dispatch(
            rejectApplicantadressproofAction(adrressData, onSuccess, onError)
          );
        } else if (type === "expiredDocuments") {
          setLoading(true);
          dispatch(
            expireddocumentadressproofAction(adrressData, onSuccess, onError)
          );
        }
      } else if (values?.action === "Approve") {
        setLoading(true);
        dispatch(pendadressApproveAction(adrressData, onSuccess, onError));
      }
    },
  });

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
      uploaded ||
      backImageUploaded ||
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      handleSuccessMessageShow();
      successToast(data?.message);
    }
    handleAddressProofModalClose();
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
        show={addressProofModalShow}
        onHide={handleAddressProofModalClose}
        dialogClassName="driver_document_modal_container"
        contentClassName="border_radius_10px"
        backdropClassName="add_admin_modal_backdrop"
        backdrop={action === "view" ? true : "static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-2">
            <ModalHeading
              title={"Address proof (AADHAAR)"}
              closeFn={() => {
                handleAddressProofModalClose();
                formik?.resetForm();
              }}
              status={addressProofdata?.status ?? "Incomplete"}
            />
            <form onSubmit={formik.handleSubmit}>
              <div className="row mt-2">
                <div className="col-sm-6">
                  <label className="primary_color fw_600" htmlFor="address">
                    Address
                  </label>
                  <div className="d-flex flex-column">
                    <textarea
                      className={
                        formik.errors.Address1 && formik.touched.Address1
                          ? "w-100  border_radius_5px document_input_error address_input resize_none outline_none py-1 ps-2"
                          : "w-100  border_radius_5px document_input outline_none address_input resize_none py-1 ps-2"
                      }
                      id="address"
                      placeholder="Address line 1"
                      name="Address1"
                      value={formik.values.Address1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={action === "view"}
                    />
                    {formik.errors.Address1 && formik.touched.Address1 && (
                      <div className="dark_red_color fs_14">
                        {formik.errors.Address1}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex flex-column gap-2">
                    <div>
                      <ModalInputField
                        title={"Postal Code*"}
                        type={"text"}
                        placeholder={"Enter your postal code"}
                        itemName={"PostalCode"}
                        inputValue={formik.values.PostalCode}
                        onChangeFn={formik.handleChange}
                        onBlurFn={formik.handleBlur}
                        formikError={formik.errors.PostalCode}
                        formikTouched={formik.touched.PostalCode}
                        disabled={action === "view"}
                      />
                      <ErrorField
                        formikError={formik.errors.PostalCode}
                        formikTouched={formik.touched.PostalCode}
                      />
                    </div>
                    <div>
                      <ModalInputField
                        title={"State/Province*"}
                        type={"text"}
                        placeholder={"Enter your State/Province*"}
                        itemName={"State"}
                        inputValue={formik.values.State}
                        onChangeFn={formik.handleChange}
                        onBlurFn={formik.handleBlur}
                        formikError={formik.errors.State}
                        formikTouched={formik.touched.State}
                        disabled={action === "view"}
                      />
                      <ErrorField
                        formikError={formik.errors.State}
                        formikTouched={formik.touched.State}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-sm-6 ">
                  <ModalInputField
                    title={"City/Town*"}
                    type={"text"}
                    placeholder={"Enter your City/Town*"}
                    itemName={"CityTown"}
                    inputValue={formik.values.CityTown}
                    onChangeFn={formik.handleChange}
                    onBlurFn={formik.handleBlur}
                    formikError={formik.errors.CityTown}
                    formikTouched={formik.touched.CityTown}
                    disabled={action === "view"}
                  />
                  <ErrorField
                    formikError={formik.errors.CityTown}
                    formikTouched={formik.touched.CityTown}
                  />
                </div>
              </div>

              <div className="mt-4 ms-1 ">
                <span className="fs_16 fw_500 primary_color">Front Photo*</span>
              </div>

              <div className="row mt-1 mx-sm-1">
                <div className="d-sm-flex justify-content-between align-items-center document_upload_container py-2 border_radius">
                  {uploaded || addressProofdata?.front_photo ? (
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
                        name={"Upload"}
                        onChangeFn={(e) => {
                          formik.setFieldValue("Upload", e.target.files[0]);
                          handleFileChange(e);
                        }}
                        title={
                          uploaded || addressProofdata?.front_photo
                            ? "Re-upload"
                            : "upload"
                        }
                        loader={uploadLoading}
                      />
                    )}
                    {uploaded || addressProofdata?.front_photo ? (
                      <>
                        <button
                          className="primary_bg white_color border_radius_5px border_none"
                          onClick={() =>
                            openInNewTab(uploaded ? file : formik.values.Upload)
                          }
                          type="button"
                        >
                          <EyeIcon fill="white" className={`mb-1`} />
                        </button>

                        <a
                          className=""
                          href={uploaded ? file : formik.values.Upload}
                          download={uploaded ? file : formik.values.Upload}
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

              <div className="mt-3 ms-1 ">
                <span className="fs_16 fw_500 primary_color">Back Photo*</span>
              </div>

              <div className="row mt-1 mx-sm-1">
                <div className="d-sm-flex justify-content-between align-items-center document_upload_container py-2 border_radius ">
                  {backImageUploaded || addressProofdata?.back_photo ? (
                    <span className="green_color">document uploaded</span>
                  ) : (
                    <span className="light_red_color">
                      {action === "view"
                        ? "document is yet to be uplaoded"
                        : "Please upload the document"}
                    </span>
                  )}

                  <div className="d-flex gap-3">
                    {action === "edit" && (
                      <ImageInputField
                        type="file"
                        name={"BackImageUpload"}
                        onChangeFn={(e) => {
                          formik.setFieldValue(
                            "BackImageUpload",
                            e.target.files[0]
                          );
                          handleBackFileChange(e);
                        }}
                        loader={backUploadLoading}
                        title={
                          backImageUploaded || addressProofdata?.back_photo
                            ? "Re-upload"
                            : "upload"
                        }
                      />
                    )}
                    {backImageUploaded || addressProofdata?.back_photo ? (
                      <>
                        <button
                          className="primary_bg white_color border_radius_5px border_none"
                          onClick={() =>
                            openInNewTab(
                              backImageUploaded
                                ? backFile
                                : formik.values.BackImageUpload
                            )
                          }
                          type="button"
                        >
                          <EyeIcon fill="white" className={`mb-1`} />
                        </button>

                        <a
                          className=""
                          href={
                            backImageUploaded
                              ? backFile
                              : formik.values.BackImageUpload
                          }
                          download={
                            backImageUploaded
                              ? backFile
                              : formik.values.BackImageUpload
                          }
                        >
                          <button
                            className={` primary_bg white_color border_radius_5px border_none`}
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
              <div className="row mt-5">
                <div className="d-flex justify-content-sm-end justify-content-center gap-2">
                  {addressProofdata?.status !== "Approved" &&
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
                        cancelModalFn={handleAddressProofModalClose}
                      />
                      <Savebtn
                        submitFn={() => formik.setFieldValue("action", "save")}
                        disabled={disabled}
                        btnClassName={`${
                          disabled
                            ? `disabled_color_bg white_color px-sm-5 px-3`
                            : `light_green_bg px-sm-5 px-3`
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

                  {/* {action === "edit" ? (
                    <>
                      <CancelModalbtn
                        cancelModalFn={handleAddressProofModalClose}
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
                  )} */}
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

export default AddressProofModal;
