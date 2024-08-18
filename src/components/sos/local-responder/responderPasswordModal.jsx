import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../complaints/rider-complaints-components.css"
import SuccessMessagemodal from "../../modals/successMessageModal";
import PasswordInputField from "../../form/passwordInputField";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import SpinnerLoading from "../../utilits/spinnerLoading";
import * as localResponderActions from "../../../redux/actions/sos/localResponderSosAction";
import { useDispatch } from "react-redux";
import errorToast from "../../utilits/errorToast";
import successToast from "../../utilits/successToast";

const LocalRespPasswordModal = ({
  responderpasswordShow,
  handleRespPasswordClose,
  handleLocalResponderClose,
  action,
  formik,
  id,
  actionType,
  responderTable,
  setResponderTable,
  title = "",
}) => {
  const dispatch = useDispatch();
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setResponderTable(!responderTable);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const formikUpdatePass = useFormik({
    initialValues: {
      ConfirmPassword: ``,
    },
    validationSchema: Yup.object({
      ConfirmPassword: Yup.string().trim(),
    }),
    onSubmit: (values) => {
      setLoading(true);
      if (action === "create") {
        dispatch(
          localResponderActions.addLocalResponderAction(
            {
              zone_id: formik?.values?.zone,
              agency: formik?.values?.agency,
              responder_first_name: formik?.values?.responderFirstName,
              responder_last_name: formik?.values?.responderLastName,
              phone_number_type: formik?.values?.phoneNumberType,
              country_code: formik?.values?.countryCode,
              responder_phone_number:
                formik?.values?.mobileNumber ?? formik?.values?.landlineNumber,
              password: values?.ConfirmPassword,
            },
            onSubmitSuccess,
            onSubmitError
          )
        );
      } else if (action === "edit" && actionType === null) {
        dispatch(
          localResponderActions.localResponderUpdateAction(
            {
              responder_id: id,
              zone_id: formik?.values?.zone,
              agency: formik?.values?.agency,
              responder_first_name: formik?.values?.responderFirstName,
              responder_last_name: formik?.values?.responderLastName,
              phone_number_type: formik?.values?.phoneNumberType,
              country_code: formik?.values?.countryCode,
              responder_phone_number:
                formik?.values?.mobileNumber ?? formik?.values?.landlineNumber,
              password: values?.ConfirmPassword,
            },
            onSubmitSuccess,
            onSubmitError
          )
        );
      } else if (action === "edit" && actionType === "delete") {
        dispatch(
          localResponderActions.localResponderDeleteAction(
            {
              responder_id: id,
              password: values?.ConfirmPassword,
            },
            onSubmitSuccess,
            onSubmitError
          )
        );
      }
    },
  });

  const onSubmitSuccess = (data) => {
    setLoading(false);
    setError(false);
    successToast(data?.message);
    handleRespPasswordClose();
    handleLocalResponderClose();
    handleSuccessMessageShow();
    formikUpdatePass?.resetForm();
  };

  const onSubmitError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(data?.data?.data);
  };
  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={
          action === "create"
            ? `Local Responder added successfully!`
            : action === "edit" && actionType === null
            ? `changes made successfully !`
            : action === "edit" && actionType === "delete"
            ? "Local Responder Deleted successfully!"
            : ""
        }
      />
      <Modal
        centered
        show={responderpasswordShow}
        onHide={handleRespPasswordClose}
        dialogClassName="change_update_password_container"
        contentClassName="border_radius_10px"
        backdropClassName="create_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formikUpdatePass.handleSubmit}>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <span className="fs_21 text-center primary_color fw_600">
                  {action === "edit" && actionType === null
                    ? "Are you sure you want to update changes ?"
                    : action === "edit" && actionType === "delete"
                    ? "Are you sure you want to delete ?"
                    : "Are you sure you want to add a Local Responder?"}
                </span>
              </div>
              <PasswordInputField
                itemName={"ConfirmPassword"}
                inputValue={formikUpdatePass.values.ConfirmPassword}
                onChangeFn={(e) => {
                  formikUpdatePass.handleChange(e);
                  setError(false);
                }}
                onBlurFn={formikUpdatePass.handleBlur}
                formikError={formikUpdatePass.errors.ConfirmPassword}
                formikTouched={formikUpdatePass.touched.ConfirmPassword}
                error={error}
              />
              <div className="red_color fw_500 ps-sm-5">{error}</div>
              <div className="d-flex justify-content-between mt-3 px-sm-5 mb-3">
                <Cancelbtn
                  cancelFn={() => {
                    handleRespPasswordClose();
                    setLoading(false);
                    setError(false);
                    formikUpdatePass?.resetForm();
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
    </>
  );
};
export default LocalRespPasswordModal;
