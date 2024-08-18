import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import PasswordInputField from "../../form/passwordInputField";
import { useDispatch } from "react-redux";
import SpinnerLoading from "../../utilits/spinnerLoading";
import SuccessMessagemodal from "../../modals/successMessageModal";

import errorToast from "../../utilits/errorToast";
import { managePremiumSubscriptionEditAction } from "../../../redux/actions/premiumaction/defaultPremiumAction";

const SubscriptionPasswordModal = ({
  subscriptionPasswordModal,
  handleSubscriptionPWClose,
  title,
  reload,
  setReload,
  formik,
  params,
  plan_type,
  premiumtype,
  setIsEditing,
}) => {
  console.log(params, "akjsb");
  console.log(formik.values, "akjsb");
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    formikCreatePass.resetForm();
    setIsEditing(false);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  console.log(params,"formikvaluessasasasasas");

  const formikCreatePass = useFormik({
    initialValues: {
      password: ``,
    },
    validationSchema: Yup.object({
      password: Yup.string().trim(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatch(
        managePremiumSubscriptionEditAction(
          {
            ride_type_id: params?.ride_type_id,
            zone_id: params?.zoneId ?? params?.id,
            plan_type: plan_type,
            premium_type: premiumtype,
            plan_details: {
              planName: formik?.values?.planName,
              setupFee: formik?.values?.setupFeeAmount,
              validity:
                plan_type === "30DaysPlan"
                  ? 30
                  : plan_type === "90DaysPlan"
                  ? 90
                  : plan_type === "180DaysPlan"
                  ? 180
                  : "",
              planValue: formik?.values?.planValue,
              checkSetup:
                formik?.values?.setupFeeRadio === "Yes" ? true : false,
              planDescription: formik?.values?.inputFields ?? [],
            },
            plan_expiry_date_reminder: {
              enableAutoRenewal:
                formik?.values?.subExpiryRadio === "Yes" ? true : false,
              thirdReminderCall: formik?.values?.planExpiryThirdRemind,
              firstReminderMessage: formik?.values?.planExpiryFirstRemind,
              secondReminderMessage: formik?.values?.planExpirySecondRemind,
            },
            // plan_cancellation: {
            //   cancelledAfterRide1: "No Refund",
            //   driverPAfterCancel: "premium3",
            //   noOfConsecutiveCancelBeforeBlock: formik?.values?.subCancelThree,
            //   noRideLessThen1Day: formik?.values?.subNoridesOne,
            //   noRideLessThen2Day: formik?.values?.subNoridesTwo,
            //   noRideLessThen3Day: formik?.values?.subNoridesThree,
            //   noRideMoreThen3Day: formik?.values?.subNoridesFour,
            // },
            plan_cancellation: {
              giveRefundIfActivePlanCancel:
                formik?.values?.giveRefundIfActivePlanCancel === "Yes"
                  ? true
                  : false,
              driverPAfterCancel: "premium3",
              ActivePlanCancelAfter1Ride: formik?.values
                ?.ActivePlanCancelAfter1Ride
                ? +formik?.values?.ActivePlanCancelAfter1Ride
                : null,
              noRideAPCWithin24hrOfStartDate: formik?.values
                ?.noRideAPCWithin24hrOfStartDate
                ? +formik?.values?.noRideAPCWithin24hrOfStartDate
                : null,
              noRideAPCBetween24hrTo48hrOfStartDate: formik?.values
                ?.noRideAPCBetween24hrTo48hrOfStartDate
                ? +formik?.values?.noRideAPCBetween24hrTo48hrOfStartDate
                : null,
              noRideAPCBetween48hrTo72hrOfStartDate: formik?.values
                ?.noRideAPCBetween48hrTo72hrOfStartDate
                ? +formik?.values?.noRideAPCBetween48hrTo72hrOfStartDate
                : null,
              // noRideAPCAfter72hrOfStartDate: formik?.values?.noRideAPCAfter72hrOfStartDate,
              giveRefundIfSchedulePlanCancel:
                formik?.values?.giveRefundIfSchedulePlanCancel === "Yes"
                  ? true
                  : false,
              planScheduleCancelBeforeStartDate: formik?.values
                ?.planScheduleCancelBeforeStartDate
                ? +formik?.values?.planScheduleCancelBeforeStartDate
                : null,
              giveRefundIfAutoRenewalCancel:
                formik?.values?.giveRefundIfAutoRenewalCancel === "Yes"
                  ? true
                  : false,
              autoRenewalCancelBeforeStartDate: formik?.values
                ?.autoRenewalCancelBeforeStartDate
                ? +formik?.values?.autoRenewalCancelBeforeStartDate
                : null,
            },
            switch_plan_to_same_premium: {
              upgradeFee: formik?.values?.subSamePremiumAmount
                ? +formik?.values?.subSamePremiumAmount
                : null,
              upgradeStatus:
                formik?.values?.subSamePremium === "Yes" ? true : false,
              current_plan_active: formik?.values?.subSamePremiumCheckbox,
            },
            switch_plan_to_other_premium: {
              upgradeFee: formik?.values?.subOtherPremiumAmount
                ? +formik?.values?.subOtherPremiumAmount
                : null,
              upgradeStatus:
                formik?.values?.subOtherPremium === "Yes" ? true : false,
              current_plan_active: formik?.values?.subOtherPremiumCheckbox,
            },
            password: values?.password,
          },
          onEditSuccess,
          onEditError
        )
      );
    },
  });

  const onEditSuccess = (data) => {
    console.log(data, "sadad");
    formikCreatePass.resetForm();
    setLoading(false);
    setError(false);
    handleSubscriptionPWClose();
    handleSuccessMessageShow();
  };

  const onEditError = (data) => {
    console.log(data, "sadad");
    setLoading(false);
    errorToast(data?.data?.data ?? data?.data?.message);
    setError(data?.data?.data ?? data?.data?.message);
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
        show={subscriptionPasswordModal}
        onHide={handleSubscriptionPWClose}
        dialogClassName="status_change_container"
        contentClassName="border_radius_10px"
        backdropClassName="ridetype_second_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formikCreatePass.handleSubmit}>
              <div className="d-flex justify-content-center fs_22 fw_600 mt-0">
                <span className="primary_color">{title}</span>
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
                    handleSubscriptionPWClose();
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

export default SubscriptionPasswordModal;
