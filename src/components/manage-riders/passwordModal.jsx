import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cancelbtn from "../utilits/buttons/cancelbtn";
import PasswordInputField from "../form/passwordInputField";
import SuccessMessagemodal from "../modals/successMessageModal";
import { useDispatch } from "react-redux";
import errorToast from "../utilits/errorToast";
import successToast from "../utilits/successToast";
import SpinnerLoading from "../utilits/spinnerLoading";
import * as riderAction from "../../redux/actions/manageRidersAction";
import { useNavigate } from "react-router";

function RiderPasswordModal({
  passwordShow,
  handlePasswordClose,
  id,
  riderTable,
  setRiderTable,
  passwordObject,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessageShow, setSuccessMessageShow] = useState(false);

  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setRiderTable(!riderTable);
    if (
      passwordObject?.type === "delete_account" ||
      passwordObject?.type === "block_rider"
    ) {
      navigate("/manage-riders");
    } else if (passwordObject?.type === "unblock_rider") {
      navigate("/blocked-riders");
    } else if (
      passwordObject?.type === "restore_account" ||
      passwordObject?.type === "delete_account_permanently"
    ) {
      navigate("/deleted-riders");
    }
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  console.log(passwordObject?.type, "jhhkjhk");

  const formikPass = useFormik({
    enableReinitialize: true,
    initialValues: {
      ConfirmPassword: ``,
      reason: ``,
      is_reason: passwordObject?.reason ? true : false,
    },
    validationSchema: Yup.object({
      ConfirmPassword: Yup.string().trim(),
      reason: Yup.string().when("is_reason", {
        is: true,
        then: Yup.string().required("Please fill this field to Proceed"),
        otherwise: Yup.string(),
      }),
    }),

    onSubmit: (values) => {
      const passwordData = {
        password: values.ConfirmPassword,
      };
      if (passwordObject?.type === "reset_rating") {
        setLoading(true);
        dispatch(
          riderAction.resetRiderRatingAction(
            id,
            {
              password: values.ConfirmPassword,
              rating: 5.0,
            },
            onSuccess,
            onError
          )
        );
      } else if (passwordObject?.type === "reset_profile_picture") {
        setLoading(true);
        dispatch(
          riderAction.resetRiderPictureAction(
            id,
            {
              profile_pic: null,
              password: values?.ConfirmPassword,
            },

            onSuccess,
            onError
          )
        );
      } else if (passwordObject?.type === "activate_account") {
        setLoading(true);
        dispatch(
          riderAction.activateRiderAction(id, passwordData, onSuccess, onError)
        );
      } else if (passwordObject?.type === "delete_account") {
        setLoading(true);
        dispatch(
          riderAction.deleteRiderAction(
            id,
            {
              reason: values?.reason,
              password: values?.ConfirmPassword,
            },
            onSuccess,
            onError
          )
        );
      } else if (passwordObject?.type === "block_rider") {
        setLoading(true);
        dispatch(
          riderAction.blockRiderAction(
            id,
            {
              password: values?.ConfirmPassword,
              reason: values?.reason,
            },
            onSuccess,
            onError
          )
        );
      } else if (passwordObject?.type === "unblock_rider") {
        setLoading(true);
        dispatch(
          riderAction.unblockRiderAction(id, passwordData, onSuccess, onError)
        );
      } else if (passwordObject?.type === "restore_account") {
        setLoading(true);
        dispatch(
          riderAction.restoreRiderAction(id, passwordData, onSuccess, onError)
        );
      } else if (passwordObject?.type === "delete_account_permanently") {
        setLoading(true);
        dispatch(
          riderAction.permanentlyDeleteRiderAction(
            id,
            passwordData,
            onSuccess,
            onError
          )
        );
      }
    },
  });
console.log(passwordObject?.type);
  const onSuccess = (data) => {
    setLoading(false);
    if (
      passwordObject?.type === "reset_rating" ||
      passwordObject?.type === "reset_profile_picture"
    ) {
      successToast(data?.message);
    } else {
      successToast(data?.data?.data);
    }
    handleSuccessMessageShow();
    formikPass.resetForm();
    handlePasswordClose();
  };

  const onError = (data) => {
    // if (
    //   passwordObject?.type === "reset_profile_picture"
    // ) {
    //   errorToast(data?.data);
    //   setErrorMessage(data?.data);
    // } else {
      errorToast(data?.data?.data);
      setErrorMessage(data?.data?.data);
    // }
    setRiderTable(false);
    setLoading(false);
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
              <div className="d-flex justify-content-center text-center fs_18 primary_color fw_600  mt-1 mb-4">
                {passwordObject?.modalTitle}
              </div>

              <PasswordInputField
                inputContainer={"px-sm-4 "}
                reason={passwordObject?.reason}
                reasonTitle={"Enter the Reason "}
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
              <span className="red_color fw_500 ps-4">{errorMessage}</span>
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

export default RiderPasswordModal;
