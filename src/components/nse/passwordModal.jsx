import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../rideType-vehicleType/rideType-vehicleTypeComponents.css";
import { useDispatch } from "react-redux";
import SuccessMessagemodal from "../modals/successMessageModal";
import PasswordInputField from "../form/passwordInputField";
import Cancelbtn from "../utilits/buttons/cancelbtn";

import SpinnerLoading from "../utilits/spinnerLoading";
import {
  nse_R_EditAction,
  nse_D_EditAction,
} from "../../redux/actions/nse/riderNseAction";
import { useNavigate } from "react-router";

const NsePasswordModal = ({
  passwordModalShow,
  handlePasswordModalClose,
  formik,
  id,
  type,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    navigate(`/drive-notification-sms-email`);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(formik?.values, "adada");

  const confirmFormik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().trim(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (type === "Rider") {
        setLoading(true);
        dispatch(
          nse_R_EditAction(
            {
              nse_id: id,
              is_app_notification: formik?.values?.is_send_notification,
              notification_title: formik?.values?.notification_title,
              notification_body: formik?.values?.notification_body,
              notification_image: formik?.values?.notification_image,
              is_sms: formik?.values?.is_send_sms_message,
              sms_title: formik?.values?.message_header,
              sms_body: formik?.values?.message_body,
              password: values?.password,
              status: formik?.values?.status,
            },
            onSucces,
            onError
          )
        );
      } else if (type === "Driver") {
        setLoading(true);
        dispatch(
          nse_D_EditAction(
            {
              nse_id: id,
              is_app_notification: formik?.values?.is_send_notification,
              notification_title: formik?.values?.notification_title,
              notification_body: formik?.values?.notification_body,
              notification_image: formik?.values?.notification_image,
              is_sms: formik?.values?.is_send_sms_message,
              sms_title: formik?.values?.message_header,
              sms_body: formik?.values?.message_body,
              password: values?.password,
              status: formik?.values?.status,
            },
            onSucces,
            onError
          )
        );
      }
    },
  });

  const onSucces = (data) => {
    console.log(data, "adasdadada");
    setLoading(false);
    setError(false);
    confirmFormik?.resetForm();
    handlePasswordModalClose();
    handleSuccessMessageShow();
  };
  const onError = (data) => {
    setLoading(false);
    console.log(data, "adasdadada");
    setError(data?.data?.data);
  };

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title="Changes made Successfully!"
      />
      <Modal
        centered
        show={passwordModalShow}
        onHide={handlePasswordModalClose}
        dialogClassName="status_change_container"
        contentClassName="border_radius_10px"
        backdropClassName="ridetype_second_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={confirmFormik.handleSubmit}>
              <div className="d-flex justify-content-center fs_22 fw_600 mt-3">
                <span className="primary_color">
                  Are you sure you want to update changes?
                </span>
              </div>

              <PasswordInputField
                inputContainer={"px-5"}
                reason={false}
                itemName={"password"}
                inputValue={confirmFormik.values.password}
                onChangeFn={(e) => {
                  confirmFormik.handleChange(e);
                }}
                onBlurFn={confirmFormik.handleBlur}
                formikError={confirmFormik.errors.password}
                formikTouched={confirmFormik.touched.password}
                error={error}
              />
              <div className="red_color fw_500 ms-5">{error ?? null}</div>
              <div className="d-flex justify-content-between mt-4 px-5 mb-3 mx-3">
                <Cancelbtn
                  cancelFn={() => {
                    confirmFormik?.resetForm();
                    setError(false);
                    handlePasswordModalClose();
                  }}
                />
                <button
                  type="submit"
                  className=" primary_bg border_radius_5px px-4 py-1 border_none"
                >
                  <span className=" fs_18 white_color px-3">
                    {loading ? <SpinnerLoading /> : `Confirm`}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NsePasswordModal;
