import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../../../manageDriversComponents.css";
import ModalHeading from "../../../../../utilits/buttons/modal-header";
import CancelModalbtn from "../../../../../utilits/buttons/cancelModalbtn";
import Savebtn from "../../../../../utilits/buttons/savebtn";
import ModalInputField from "../../../../../form/modalInputField";
import ErrorField from "../../../../../form/errorField";
import SuccessMessagemodal from "../../../../../modals/successMessageModal";
import { useDispatch } from "react-redux";
import { driverbankdetailsAction } from "../../../../../../redux/actions/manageDriversAction";
import successToast from "../../../../../utilits/successToast";
import errorToast from "../../../../../utilits/errorToast";
import { pendApplicantbankdetailsAction } from "../../../../../../redux/actions/pendApplicantAction";
import { rejectApplicantbankdetailsAction } from "../../../../../../redux/actions/rejectedApplicantAction";
import { expireddocumentbankdetailsAction } from "../../../../../../redux/actions/expiredDocumentAction";
import { blockedDriversbankdetailsAction } from "../../../../../../redux/actions/manageDrivers/blockedApplicantAction";

const BankDetailsModal = ({
  bankdetailsModalShow,
  handleBankDetailsModalClose,
  bankDetailsdata,
  driverData,
  setDriverData,
  action,
  setAction,
  id,
  is_editable,
  type = "",
}) => {
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setDriverData(!driverData);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bankName: bankDetailsdata?.bank_name ? bankDetailsdata?.bank_name : "",
      branchName: bankDetailsdata?.branch_name
        ? bankDetailsdata?.branch_name
        : "",
      accountName: bankDetailsdata?.account_name
        ? bankDetailsdata?.account_name
        : "",
      accountNumber: bankDetailsdata?.account_number
        ? bankDetailsdata?.account_number
        : "",
      ifscCode: bankDetailsdata?.ifsc_code ? bankDetailsdata?.ifsc_code : "",
      action: "saveChanged",
    },
    validationSchema: Yup.object({
      bankName: Yup.string("")
        .trim()
        .required("Please fill this field to proceed"),
      branchName: Yup.string()
        .trim()
        .required("Please fill this field to proceed"),
      accountName: Yup.string("")
        .trim()
        .required("Please fill this field to proceed"),
      accountNumber: Yup.string("")
        .trim()
        .required("Please fill this field to proceed"),
      ifscCode: Yup.string("")
        .trim()
        .required("Please fill this field to proceed"),
    }),

    onSubmit: (values) => {
      const bankDetailsInputData = {
        driver_id: id,
        bank_name: values?.bankName,
        branch_name: values?.branchName,
        account_name: values?.accountName,
        account_number: values?.accountNumber,
        ifsc_code: values?.ifscCode,
      };
      if (type === "manageDrivers") {
        setLoading(true);
        dispatch(
          driverbankdetailsAction(bankDetailsInputData, onSuccess, onError)
        );
      } else if (type === "blockedDrivers") {
        setLoading(true);
        dispatch(
          blockedDriversbankdetailsAction(
            bankDetailsInputData,
            onSuccess,
            onError
          )
        );
      } else if (type === "pendingApplications") {
        dispatch(
          pendApplicantbankdetailsAction(
            bankDetailsInputData,
            onSuccess,
            onError
          )
        );
      } else if (type === "rejectedApplications") {
        setLoading(true);
        dispatch(
          rejectApplicantbankdetailsAction(
            bankDetailsInputData,
            onSuccess,
            onError
          )
        );
      } else if (type === "expiredDocuments") {
        setLoading(true);
        dispatch(
          expireddocumentbankdetailsAction(
            bankDetailsInputData,
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
    handleBankDetailsModalClose();
  };
  const onError = (data) => {
    setLoading(false);
    setDriverData(false);
    errorToast(data?.data?.data);
    setError(data?.data);
  };

  return (
    <>
      <Modal
        centered
        show={bankdetailsModalShow}
        onHide={handleBankDetailsModalClose}
        dialogClassName="bank_details_modal_container"
        contentClassName="border_radius_10px"
        backdropClassName="add_admin_modal_backdrop"
        backdrop={action === "view" ? true : "static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-2">
            <ModalHeading
              title="Bank Details"
              closeFn={() => {
                handleBankDetailsModalClose();
                formik?.resetForm();
              }}
              statusShow={false}
            />
            <form onSubmit={formik.handleSubmit}>
              <div className="row mt-4">
                <div className="col-sm-6">
                  <ModalInputField
                    title={" Bank name*"}
                    type={"text"}
                    placeholder={"Enter your Bank Name*"}
                    itemName={"bankName"}
                    inputValue={formik.values.bankName}
                    onChangeFn={formik.handleChange}
                    onBlurFn={formik.handleBlur}
                    formikError={formik.errors.bankName}
                    formikTouched={formik.touched.bankName}
                    disabled={action === "view"}
                  />
                  <ErrorField
                    formikError={formik.errors.bankName}
                    formikTouched={formik.touched.bankName}
                  />
                </div>
                <div className="col-sm-6">
                  <ModalInputField
                    title={"Branch name*"}
                    type={"text"}
                    placeholder={"Enter your Branch Name*"}
                    itemName={"branchName"}
                    inputValue={formik.values.branchName}
                    onChangeFn={formik.handleChange}
                    onBlurFn={formik.handleBlur}
                    formikError={formik.errors.branchName}
                    formikTouched={formik.touched.branchName}
                    disabled={action === "view"}
                  />
                  <ErrorField
                    formikError={formik.errors.branchName}
                    formikTouched={formik.touched.branchName}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-6">
                  <ModalInputField
                    title={" Account name*"}
                    type={"text"}
                    placeholder={"Enter your Account Name*"}
                    itemName={"accountName"}
                    inputValue={formik.values.accountName}
                    onChangeFn={formik.handleChange}
                    onBlurFn={formik.handleBlur}
                    formikError={formik.errors.accountName}
                    formikTouched={formik.touched.accountName}
                    disabled={action === "view"}
                  />
                  <ErrorField
                    formikError={formik.errors.accountName}
                    formikTouched={formik.touched.accountName}
                  />
                </div>
                <div className="col-sm-6">
                  <ModalInputField
                    title={"Account number*"}
                    type={"text"}
                    placeholder={"Enter your Account number*"}
                    itemName={"accountNumber"}
                    inputValue={formik.values.accountNumber}
                    onChangeFn={formik.handleChange}
                    onBlurFn={formik.handleBlur}
                    formikError={formik.errors.accountNumber}
                    formikTouched={formik.touched.accountNumber}
                    disabled={action === "view"}
                  />
                  <ErrorField
                    formikError={formik.errors.accountNumber}
                    formikTouched={formik.touched.accountNumber}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-6">
                  <ModalInputField
                    title={"IFSC code*"}
                    type={"text"}
                    placeholder={"Enter your IFSC code*"}
                    itemName={"ifscCode"}
                    inputValue={formik.values.ifscCode}
                    onChangeFn={formik.handleChange}
                    onBlurFn={formik.handleBlur}
                    formikError={formik.errors.ifscCode}
                    formikTouched={formik.touched.ifscCode}
                    disabled={action === "view"}
                  />
                  <ErrorField
                    formikError={formik.errors.ifscCode}
                    formikTouched={formik.touched.ifscCode}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="d-flex justify-content-sm-end justify-content-center gap-sm-2">
                  {action === "edit" ? (
                    <>
                      {" "}
                      <CancelModalbtn
                        cancelModalFn={() => {
                          handleBankDetailsModalClose();
                          formik?.resetForm();
                        }}
                      />
                      <Savebtn
                        submitFn={() =>
                          formik.setFieldValue("action", "saveChanged")
                        }
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

export default BankDetailsModal;
