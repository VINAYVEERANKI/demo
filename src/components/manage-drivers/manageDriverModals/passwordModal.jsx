import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import PasswordInputField from "../../form/passwordInputField";
import SuccessMessagemodal from "../../modals/successMessageModal";
import { useDispatch } from "react-redux";
import errorToast from "../../utilits/errorToast";
import successToast from "../../utilits/successToast";
import SpinnerLoading from "../../utilits/spinnerLoading";
import { useNavigate } from "react-router";
import * as driverAction from "../../../redux/actions/manageDriversAction";
import { UnBlockDriverAction } from "../../../redux/actions/manageDrivers/blockedApplicantAction";
import {
  permDeleteDriverAction,
  restoreDriverAction,
} from "../../../redux/actions/manageDrivers/deletedDriverAction";

function DriverPasswordModal({
  passwordShow,
  handlePasswordClose,
  passwordObject = {},
  reload,
  setReload,
  driverDetails,
  mainType,
  rejectReason,
  id,
}) {
  const currentPath = window?.location?.pathname;
  const mainPagePath = "/" + currentPath?.split("/")[1];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessageShow, setSuccessMessageShow] = useState(false);

  console.log(mainType, passwordObject, "mainType");

  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setReload(!reload);
    if (passwordObject?.is_navigate) {
      navigate(`${mainPagePath}`);
    }
  };

  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const formikPass = useFormik({
    enableReinitialize: true,
    initialValues: {
      ConfirmPassword: ``,
      reason: ``,
      is_reason: passwordObject?.reason ? true : false,
    },
    validationSchema: Yup.object({
      ConfirmPassword: Yup.string().trim().required(),
      // reason: Yup.string().required("Please fill this field to Proceed"),
      // Yup.string().when("is_reason", {
      //   is: true,
      //   then: Yup.string().required("Please fill this field to Proceed"),
      //   otherwise: Yup.string(),
      // }),
    }),

    onSubmit: (values) => {
      if (mainType === "manageDrivers" || mainType === "pendingApplications") {
        if (passwordObject?.type === "approve_account") {
          setLoading(true);
          dispatch(
            driverAction.ApproveDriverAction(
              {
                driver_id: driverDetails?.id,
                password: values?.ConfirmPassword,
              },
              onSuccess,
              onError
            )
          );
        } else if (passwordObject?.type === "ban_account") {
          setLoading(true);
          dispatch(
            driverAction.banDriverAction(
              driverDetails?.id,
              {
                password: values.ConfirmPassword,
                banned_reason: values.reason,
              },
              onSuccess,
              onError
            )
          );
        } else if (passwordObject?.type === "block_account") {
          setLoading(true);
          dispatch(
            driverAction.blockDriverAction(
              driverDetails?.id,
              {
                password: values.ConfirmPassword,
                blocked_reason: values.reason,
              },
              onSuccess,
              onError
            )
          );
        } else if (passwordObject?.type === "delete_account") {
          setLoading(true);
          dispatch(
            driverAction.deleteDriverAction(
              driverDetails?.id,
              {
                password: values.ConfirmPassword,
                deleted_reason: values.reason,
              },
              onSuccess,
              onError
            )
          );
        } else if (passwordObject?.type === "reject_account") {
          if (passwordObject?.reason_for_unapproved_fields === true) {
            setLoading(true);
            dispatch(
              driverAction.RejectDriverAction(
                {
                  driver_id: driverDetails?.id,
                  password: values.ConfirmPassword,
                  addressproof_rejected_reason:
                    rejectReason?.addressproof_rejected_reason
                      ? rejectReason?.addressTextArea
                      : "",
                  vehiclerc_rejected_reason:
                    rejectReason?.vehiclerc_rejected_reason
                      ? rejectReason?.vehiclerc_rejected_reason
                      : "",
                  vehicleinsurance_rejected_reason:
                    rejectReason?.vehicleinsurance_rejected_reason
                      ? rejectReason?.vehicleinsurance_rejected_reason
                      : "",
                  drivinglicense_rejected_reason:
                    rejectReason.drivinglicense_rejected_reason
                      ? rejectReason.drivinglicense_rejected_reason
                      : "",
                  profilepic_rejected_reason:
                    rejectReason.profilepic_rejected_reason
                      ? rejectReason.profilepic_rejected_reason
                      : "",
                  vehiclephotos_rejected_reason:
                    rejectReason.vehiclephotos_rejected_reason
                      ? rejectReason.vehiclephotos_rejected_reason
                      : "",
                  background_verification_rejected_reason:
                    rejectReason.background_verification_rejected_reason
                      ? rejectReason.background_verification_rejected_reason
                      : "",
                  physical_verification_rejected_reason:
                    rejectReason.physical_verification_rejected_reason
                      ? rejectReason.physical_verification_rejected_reason
                      : "",
                },
                onSuccess,
                onError
              )
            );
          } else if (passwordObject?.reason_for_unapproved_fields === false) {
            setLoading(true);
            dispatch(
              driverAction.RejectDriverAction(
                {
                  driver_id: driverDetails?.id,
                  password: values.ConfirmPassword,
                  rejected_reason: values?.reason,
                },
                onSuccess,
                onError
              )
            );
          }
        }
      } else if (mainType === "deletedDriverRideHistory") {
        if (passwordObject?.type === "unblock_driver") {
          setLoading(true);
          dispatch(
            UnBlockDriverAction(
              {
                driver_id: driverDetails?.id,
                password: values?.ConfirmPassword,
              },
              onSuccess,
              onError
            )
          );
        } else if (passwordObject?.type === "restore_account") {
          setLoading(true);
          console.log(values, "clicked");
          dispatch(
            restoreDriverAction(
              driverDetails?.id,
              {
                password: values.ConfirmPassword,
              },

              onSuccess,
              onError
            )
          );
        } else if (passwordObject?.type === "perm_del_driver") {
          setLoading(true);
          console.log(values, "clicked");
          dispatch(
            permDeleteDriverAction(
              driverDetails?.id,
              {
                password: values.ConfirmPassword,
              },

              onSuccess,
              onError
            )
          );
        }
      }
    },
  });

  const onSuccess = (data) => {
    successToast(data?.data);
    setLoading(false);
    handlePasswordClose();
    handleSuccessMessageShow();
  };
  const onError = (data) => {
    setLoading(false);
    if (passwordObject?.type === "unblock_driver") {
      errorToast(data?.data?.message);
      setErrorMessage(data?.data?.data);
    } else {
      errorToast(data?.data);
      setErrorMessage(data?.data);
    }
    setReload(false);
  };

  return (
    <>
      <Modal
        centered
        backdrop={"static"}
        keyboard={false}
        show={passwordShow}
        onHide={handlePasswordClose}
        dialogClassName="admin_block_container"
        contentClassName="change_update_password_card"
        backdropClassName="create_password_modal_backdrop"
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formikPass.handleSubmit}>
              <div className="d-flex justify-content-center text-center fs_20 red_color fw_600 mt-1 mb-4">
                {passwordObject?.modalTitle}
              </div>
              <div className="d-flex justify-content-center mb-3">
                <div className="d-flex flex-column">
                  <span className="primary_color fw_600">
                    Driver ID:
                    <span className="ps-5 ms-3 secondary_color fw_600">
                      {driverDetails?.driver_id2
                        ? driverDetails?.driver_id2
                        : "--"}
                    </span>
                  </span>
                  <span className="primary_color fw_600 ">
                    Driver First Name:
                    <span className="secondary_color fw_600 ps-1">
                      {driverDetails?.first_name
                        ? driverDetails?.first_name
                        : "--"}
                    </span>
                  </span>
                </div>
              </div>
              <PasswordInputField
                reason={passwordObject?.reason}
                reasonTitle={"Enter the Reason"}
                reasonItemName={"reason"}
                onReasonChangeFn={formikPass.handleChange}
                onReasonBlurFn={formikPass.handleBlur}
                reasonItemValue={formikPass.values.reason}
                formikReasonError={formikPass.errors.reason}
                formikReasonTouched={formikPass.touched.reason}
                itemName={"ConfirmPassword"}
                inputValue={formikPass.values.ConfirmPassword}
                onChangeFn={(e) => {
                  formikPass.handleChange(e);
                  setErrorMessage(false);
                }}
                onBlurFn={formikPass.handleBlur}
                formikError={formikPass.errors.ConfirmPassword}
                formikTouched={formikPass.touched.ConfirmPassword}
                error={errorMessage}
              />
              <span className="red_color fw_500 ps-sm-5">{errorMessage}</span>
              <div className="d-flex justify-content-between mt-3 px-lg-5 px-md-5 mb-3 ">
                <Cancelbtn
                  cancelFn={() => {
                    handlePasswordClose();
                    formikPass.resetForm();
                    setErrorMessage(false);
                  }}
                />
                <button
                  className=" primary_bg border_radius_5px px-4 py-1 text-center border_none fs_18 white_color"
                  type="sumbit"
                >
                  {loading ? <SpinnerLoading /> : "Proceed"}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={passwordObject?.successMessage}
      />
    </>
  );
}

export default DriverPasswordModal;
