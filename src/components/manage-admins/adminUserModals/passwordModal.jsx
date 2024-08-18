import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../adminModals.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import PasswordInputField from "../../form/passwordInputField";
import SuccessMessagemodal from "../../modals/successMessageModal";
import * as adminAction from "../../../redux/actions/manageAdminsAction";
import { useDispatch } from "react-redux";
import errorToast from "../../utilits/errorToast";
import successToast from "../../utilits/successToast";
import SpinnerLoading from "../../utilits/spinnerLoading";

function AdminPasswordModal({
  passwordShow,
  handlePasswordClose,
  handleEditAdminClose,
  user,
  adminTable,
  setAdminTable,
  passwordObject,
  formik,
  setError,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setAdminTable(!adminTable);
    setError(false);
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
      ConfirmPassword: Yup.string().trim(),
      reason: Yup.string().when("is_reason", {
        is: (val) => val === true,
        then: Yup.string().required("Please fill this field to Proceed"),
        otherwise: Yup.string(),
      }),
    }),
    onSubmit: (values) => {
      const editAdminData = {
        first_name: formik?.values?.firstName,
        last_name: formik.values.lastName,
        user_name: formik.values.userName,
        email: formik.values?.emailAdress,
        phone: formik.values?.phoneNumber,
        team: formik.values?.team,
        location: formik.values?.officeLocation,
        job_title: formik.values?.jobTitle,
        job_title_description: formik.values?.jobTitleSummary,
        admin_password: values.ConfirmPassword,
        password: formik.values?.password,
        confirm_password: formik.values?.password,
        user_permission: {
          ...formik?.values?.user_permission?.dashboard,
          ...formik?.values?.user_permission?.analysis_dashboard,
          ...formik?.values?.user_permission?.manage_admin,
          ...formik?.values?.user_permission?.riders,
          ...formik?.values?.user_permission?.drivers,
          ...formik?.values?.user_permission?.deleted_users,
          ...formik?.values?.user_permission?.manage_bookings,
          ...formik?.values?.user_permission?.manage_booking_requests,
          ...formik?.values?.user_permission?.booking_invoices,
          ...formik?.values?.user_permission?.refund,
          ...formik?.values?.user_permission?.driver_metrics,
          ...formik?.values?.user_permission?.driver_finances,
          ...formik?.values?.user_permission?.ride_type_Vehicle_type,
          ...formik?.values?.user_permission?.zones,
          ...formik?.values?.user_permission?.fares,
          ...formik?.values?.user_permission?.rider_complaints,
          ...formik?.values?.user_permission?.driver_complaints,
          ...formik?.values?.user_permission?.sos,
          ...formik?.values?.user_permission?.coupons,
          ...formik?.values?.user_permission?.referrals,
          ...formik?.values?.user_permission?.incentives,
          ...formik?.values?.user_permission?.broadcast,
          ...formik?.values?.user_permission?.notification_and_sms,
          ...formik?.values?.user_permission?.tracking,
          ...formik?.values?.user_permission?.rider_finances,
          ...formik?.values?.user_permission?.faq,
        },
      };
      const editAdminDataWithoutResetingPassword = {
        first_name: formik?.values?.firstName,
        last_name: formik.values.lastName,
        user_name: formik.values.userName,
        email: formik.values?.emailAdress,
        phone: formik.values?.phoneNumber,
        team: formik.values?.team,
        location: formik.values?.officeLocation,
        job_title: formik.values?.jobTitle,
        job_title_description: formik.values?.jobTitleSummary,
        admin_password: values.ConfirmPassword,
        user_permission: {
          ...formik?.values?.user_permission?.dashboard,
          ...formik?.values?.user_permission?.analysis_dashboard,
          ...formik?.values?.user_permission?.manage_admin,
          ...formik?.values?.user_permission?.riders,
          ...formik?.values?.user_permission?.drivers,
          ...formik?.values?.user_permission?.deleted_users,
          ...formik?.values?.user_permission?.manage_bookings,
          ...formik?.values?.user_permission?.manage_booking_requests,
          ...formik?.values?.user_permission?.booking_invoices,
          ...formik?.values?.user_permission?.refund,
          ...formik?.values?.user_permission?.driver_metrics,
          ...formik?.values?.user_permission?.driver_finances,
          ...formik?.values?.user_permission?.ride_type_Vehicle_type,
          ...formik?.values?.user_permission?.zones,
          ...formik?.values?.user_permission?.fares,
          ...formik?.values?.user_permission?.rider_complaints,
          ...formik?.values?.user_permission?.driver_complaints,
          ...formik?.values?.user_permission?.sos,
          ...formik?.values?.user_permission?.coupons,
          ...formik?.values?.user_permission?.referrals,
          ...formik?.values?.user_permission?.incentives,
          ...formik?.values?.user_permission?.broadcast,
          ...formik?.values?.user_permission?.notification_and_sms,
          ...formik?.values?.user_permission?.tracking,
          ...formik?.values?.user_permission?.rider_finances,
          ...formik?.values?.user_permission?.faq,
        },
      };
      const adminData =
        formik?.values?.password === ""
          ? editAdminDataWithoutResetingPassword
          : editAdminData;
      if (passwordObject?.type === "block_admin") {
        setLoading(true);
        dispatch(
          adminAction.blockAdmin(
            user?.id,
            {
              password: values.ConfirmPassword,
              reason: values.reason,
            },
            onSuccess,
            onError
          )
        );
      } else if (passwordObject?.type === "delete_admin") {
        setLoading(true);
        dispatch(
          adminAction.deleteAdmin(
            user?.id,
            {
              password: values.ConfirmPassword,
              reason: values.reason,
            },
            onSuccess,
            onError
          )
        );
      } else if (passwordObject?.type === "edit_admin") {
        setLoading(true);
        dispatch(
          adminAction.editAdmin(user?.id, adminData, onSuccess, onError)
        );
      } else if (passwordObject?.type === "edit_blocked_admin") {
        setLoading(true);
        dispatch(
          adminAction.blockedAdminEdit(user?.id, adminData, onSuccess, onError)
        );
      } else if (passwordObject?.type === "unblock_admin") {
        setLoading(true);
        dispatch(
          adminAction.unblockAdmin(
            user?.id,
            {
              password: values.ConfirmPassword,
            },
            onSuccess,
            onError
          )
        );
      }
    },
  });

  const onSuccess = (data) => {
    if (passwordObject?.type === "edit_admin") {
      setTimeout(() => {
        localStorage.removeItem("editedAdminId");
        localStorage.removeItem("editedPermissions");
      }, 2000);
    }
    successToast(data?.message);
    setLoading(false);
    formikPass.resetForm();
    handlePasswordClose();
    handleSuccessMessageShow();
    handleEditAdminClose();
  };
  const onError = (data) => {
    errorToast(data?.data);
    setErrorMessage(data?.data);
    setAdminTable(false);
    setLoading(false);
  };
  console.log(formik.values?.password);
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
              <div className="d-flex justify-content-center fs_18 primary_color fw_600  mt-1 mb-4">
                {passwordObject?.modalTitle}
              </div>

              <PasswordInputField
                inputContainer={"px-sm-4"}
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
              <span className="red_color fw_500 ps-4">{errorMessage}</span>
              <div className="d-flex justify-content-between mt-4 px-lg-5 px-md-5 mb-3 ">
                <Cancelbtn
                  cancelFn={() => {
                    handlePasswordClose();
                    formikPass.resetForm();
                    setErrorMessage(false);
                  }}
                />
                <button
                  className=" primary_bg border_radius_5px px-4 py-1 border_none"
                  type="sumbit"
                >
                  {loading ? (
                    <SpinnerLoading />
                  ) : (
                    <span className=" fs_18 white_color ps-2">Proceed</span>
                  )}
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

export default AdminPasswordModal;
