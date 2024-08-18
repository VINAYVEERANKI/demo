import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import PasswordInputField from "../../form/passwordInputField";
import { useDispatch } from "react-redux";
import SpinnerLoading from "../../utilits/spinnerLoading";
import SuccessMessagemodal from "../../modals/successMessageModal";
import {
  premiumPlanCancelActiveAction,
  premiumPlanCancelScheduleAction,
} from "../../../redux/actions/driverFinanceAction/createCashTransaction";
import {
  AutoReneActiveInactivePremiumAction,
  cancelActiveAutoRenewalPremiumAction,
  cancelActiveScheduledPremiumAction,
  cancelAutoRenewalPremiumAction,
} from "../../../redux/actions/premiumaction/defaultPremiumAction";

const PremiumHistoryPWModal = ({
  premiumHistoryPWModal,
  handlePremHisPWClose,
  title,
  type,
  driver_id,
  premiumData,
  reload,
  setReload,
}) => {
  console.log(type, "aksjdhakjds");

  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setReload(!reload);
    formikCreatePass.resetForm();
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const formikCreatePass = useFormik({
    initialValues: {
      password: ``,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .trim()
        .required("Please fill this field to proceed"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("kajhksjd");
      if (type === "CancelSchedule") {
        setLoading(true);
        dispatch(
          premiumPlanCancelScheduleAction(
            {
              driver_id: driver_id,
            },
            onSuccess,
            onError
          )
        );
      } else if (type === "Cancel") {
        setLoading(true);
        dispatch(
          premiumPlanCancelActiveAction(
            {
              driver_id: driver_id,
            },
            onSuccess,
            onError
          )
        );
      } else if (type === "StopAutoRenewal" || type === "ActivateAutoRenewal") {
        setLoading(true);
        dispatch(
          AutoReneActiveInactivePremiumAction(
            {
              driver_id: premiumData?.driver_id,
              auto_renewal: !premiumData?.auto_renewal,
              plan_type: premiumData?.plan_type,
              premium_type: premiumData?.premium_type,
            },
            onSuccess,
            onError
          )
        );
      } else if (type === "CancelAutoRenewal") {
        setLoading(true);
        dispatch(
          cancelAutoRenewalPremiumAction(
            {
              driver_id: driver_id,
            },
            onSuccess,
            onError
          )
        );
      } else if (type === "CancelActiveAutoRenewal") {
        setLoading(true);
        dispatch(
          cancelActiveAutoRenewalPremiumAction(
            {
              driver_id: driver_id,
            },
            onSuccess,
            onError
          )
        );
      } else if (type === "CancelActiveScheduled") {
        setLoading(true);
        dispatch(
          cancelActiveScheduledPremiumAction(
            {
              driver_id: driver_id,
            },
            onSuccess,
            onError
          )
        );
      }
    },
  });

  const onSuccess = (data) => {
    setLoading(false);
    handlePremHisPWClose();
    handleSuccessMessageShow();
    console.log(data);
  };
  const onError = (data) => {
    setLoading(false);
    console.log(data);
  };

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={
          type === "CancelSchedule"
            ? "Schedule cancelled successfully!"
            : type === "Cancel"
            ? "Premium cancelled successfully!"
            : type === "ActivateAutoRenewal"
            ? "Auto Renewal Activated Successfully!"
            : type === "StopAutoRenewal"
            ? "Auto Renewal InActivated Successfully!"
            : type === "CancelAutoRenewal"
            ? "Auto Renewal Cancelled Successfully!"
            : ""
        }
      />
      <Modal
        centered
        show={premiumHistoryPWModal}
        onHide={handlePremHisPWClose}
        dialogClassName="status_change_container"
        contentClassName="border_radius_10px"
        backdropClassName="ridetype_second_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formikCreatePass.handleSubmit}>
              <div className="d-flex justify-content-center fs_21 fw_600 mt-0">
                <span className="primary_color text-center">{title}</span>
              </div>
              <div className="mt-3">
                <PasswordInputField
                  itemName={"password"}
                  inputValue={formikCreatePass.values.password}
                  onChangeFn={(e) => {
                    formikCreatePass.handleChange(e);
                  }}
                  onBlurFn={formikCreatePass.handleBlur}
                  formikError={formikCreatePass.errors.password}
                  formikTouched={formikCreatePass.touched.password}
                  error={error}
                />
                <div className="red_color fw_500 ms-5">{error ?? null}</div>
              </div>
              <div className="d-flex justify-content-between mt-4 px-lg-5 px-md-5 mb-3">
                <Cancelbtn
                  cancelFn={() => {
                    setError(false);
                    handlePremHisPWClose();
                    formikCreatePass.resetForm();
                  }}
                />

                <button
                  type="submit"
                  className=" primary_bg border_radius_5px px-2 py-1 border_none"
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

export default PremiumHistoryPWModal;
