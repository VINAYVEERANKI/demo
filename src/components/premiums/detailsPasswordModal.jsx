import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cancelbtn from "../utilits/buttons/cancelbtn";
import PasswordInputField from "../form/passwordInputField";
import { useDispatch } from "react-redux";
import SpinnerLoading from "../utilits/spinnerLoading";
import SuccessMessagemodal from "../modals/successMessageModal";

import errorToast from "../utilits/errorToast";
import {
  defaultPremiumDuedepositEditAction,
  defaultPremiumPricingModuleEditAction,
  managePremiumPricingModuleEditAction,
  managePremiumDuedepositEditAction,
  managePremiumStatusUpdateAction,
} from "../../redux/actions/premiumaction/defaultPremiumAction";

const DetailsPremiumPasswordModal = ({
  detailsPremiumPasswordModal,
  handleDetailsPremiumPWClose,
  title,
  formik,
  params,
  premiumtype,
  bookingType,
  id,
  reload,
  setReload,
  moduleType,
  setIsEditing,
  type = "",
  cashOutRequest,
  managePremiumType,
  rideTypeId = "",
  zoneId = "",
  statusValue,
  setStatusValue,
}) => {
  console.log(statusValue, "ksjhkasdas");
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    formikCreatePass.resetForm();
    setReload(!reload)
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const formikCreatePass = useFormik({
    initialValues: {
      password: ``,
    },
    validationSchema: Yup.object({
      password: Yup.string().trim(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("kajhksjd");
      console.log(values);
      if (managePremiumType === "defaultPremium") {
        if (type === "PricingModule") {
          setLoading(true);
          dispatch(
            defaultPremiumPricingModuleEditAction(
              { ride_type_id: params?.ride_type_id },
              {
                premium_type: premiumtype,
                pricing_module: formik?.values?.premiummodule,
                ...(formik?.values?.premiummodule === "PriceModule1"
                  ? {
                    stage1_income: formik?.values?.Stage1income
                      ? +formik?.values?.Stage1income
                      : "",
                    stage2_income: formik?.values?.Stage2income
                      ? +formik?.values?.Stage2income
                      : "",
                    stage3_income: formik?.values?.Stage3income
                      ? +formik?.values?.Stage3income
                      : "",
                    password: values?.password,
                  }
                  : formik?.values?.premiummodule === "PriceModule2"
                    ? {
                      stage1_booking: formik?.values?.stage1bookings
                        ? +formik?.values?.stage1bookings
                        : "",
                      stage2_booking: formik?.values?.stage2bookings
                        ? +formik?.values?.stage2bookings
                        : "",
                      stage3_booking: formik?.values?.stage3bookings
                        ? +formik?.values?.stage3bookings
                        : "",
                      password: values?.password,
                    }
                    : null),
              },
              onEditSuccess,
              onEditError
            )
          );
        } else {
          setLoading(true);
          dispatch(
            defaultPremiumDuedepositEditAction(
              { ride_type_id: params?.ride_type_id },
              {
                premium_type: premiumtype,
                type: type,
                ...(type === "Dues"
                  ? {
                    due_details: {
                      CBDueAmount1: formik?.values?.CBamount1,
                      CBDueAmount1Threshold: formik?.values?.CBThreshold,
                      CBDueAmount2: formik?.values?.CBamount2,
                    },
                  }
                  : type === "Deposite"
                    ? {
                      deposite_details: {
                        CODriverRequest: cashOutRequest,
                        COCycle: formik?.values?.cashoutcycle,
                        CODay:
                          formik?.values?.cashoutcycle === "Weekly"
                            ? formik?.values?.cashoutday
                            : formik?.values?.cashoutcycle === "Monthly"
                              ? formik?.values?.defaultcashout
                              : "",
                        COTime:
                          formik?.values?.cashoutcycle === "OneTimeDaily"
                            ? formik?.values?.cashouttime
                            : formik?.values?.cashoutcycle === "TwoTimesDaily"
                              ? formik?.values?.cashouttime1
                              : formik?.values?.cashoutcycle === "Weekly"
                                ? formik?.values?.cashoutdaytimes
                                : formik?.values?.cashoutcycle === "Monthly"
                                  ? formik?.values?.cashoutdefaulttimes
                                  : "",
                        COTime2:
                          formik?.values?.cashoutcycle === "TwoTimesDaily"
                            ? formik?.values?.cashouttime2
                            : "",
                      },
                    }
                    : null),
                password: values?.password,
              },
              onEditSuccess,
              onEditError
            )
          );
        }
      } else if (managePremiumType === "managePremium") {
        if (type === "statusChange") {
          console.log("lasjdas");
          setLoading(true);
          dispatch(
            managePremiumStatusUpdateAction(
              {
                zone_id: zoneId,
                premium_type: premiumtype,
                ride_type_id: rideTypeId,
                status: statusValue === false ? "Active" : "Inactive",
                password: values?.password,
              },
              onStatusSuccess,
              onStatusError
            )
          );
        } else if (type === "PricingModule") {
          setLoading(true);
          dispatch(
            managePremiumPricingModuleEditAction(
              { ride_type_id: params?.ride_type_id },
              {
                premium_type: premiumtype,
                pricing_module: formik?.values?.premiummodule,
                ...(formik?.values?.premiummodule === "PriceModule1"
                  ? {
                    stage1_income: formik?.values?.Stage1income
                      ? +formik?.values?.Stage1income
                      : "",
                    stage2_income: formik?.values?.Stage2income
                      ? +formik?.values?.Stage2income
                      : "",
                    stage3_income: formik?.values?.Stage3income
                      ? +formik?.values?.Stage3income
                      : "",
                    password: values?.password,
                  }
                  : formik?.values?.premiummodule === "PriceModule2"
                    ? {
                      stage1_booking: formik?.values?.stage1bookings
                        ? +formik?.values?.stage1bookings
                        : "",
                      stage2_booking: formik?.values?.stage2bookings
                        ? +formik?.values?.stage2bookings
                        : "",
                      stage3_booking: formik?.values?.stage3bookings
                        ? +formik?.values?.stage3bookings
                        : "",
                      password: values?.password,
                    }
                    : null),
              },
              onEditSuccess,
              onEditError
            )
          );
        } else {
          setLoading(true);
          dispatch(
            managePremiumDuedepositEditAction(
              { ride_type_id: params?.ride_type_id },
              {
                premium_type: premiumtype,
                type: type,
                ...(type === "Dues"
                  ? {
                    due_details: {
                      CBDueAmount1: formik?.values?.CBamount1,
                      CBDueAmount1Threshold: formik?.values?.CBThreshold,
                      CBDueAmount2: formik?.values?.CBamount2,
                    },
                  }
                  : type === "Deposite"
                    ? {
                      deposite_details: {
                        CODriverRequest: cashOutRequest,
                        COCycle: formik?.values?.cashoutcycle,
                        CODay:
                          formik?.values?.cashoutcycle === "Weekly"
                            ? formik?.values?.cashoutday
                            : formik?.values?.cashoutcycle === "Monthly"
                              ? formik?.values?.defaultcashout
                              : "",
                        COTime:
                          formik?.values?.cashoutcycle === "OneTimeDaily"
                            ? formik?.values?.cashouttime
                            : formik?.values?.cashoutcycle === "TwoTimesDaily"
                              ? formik?.values?.cashouttime1
                              : formik?.values?.cashoutcycle === "Weekly"
                                ? formik?.values?.cashoutdaytimes
                                : formik?.values?.cashoutcycle === "Monthly"
                                  ? formik?.values?.cashoutdefaulttimes
                                  : "",
                        COTime2:
                          formik?.values?.cashoutcycle === "TwoTimesDaily"
                            ? formik?.values?.cashouttime2
                            : "",
                      },
                    }
                    : null),
                password: values?.password,
              },
              onEditSuccess,
              onEditError
            )
          );
        }
      }
    },
  });

  const onEditSuccess = (data) => {
    formikCreatePass.resetForm();
    setLoading(false);
    handleDetailsPremiumPWClose();
    handleSuccessMessageShow();
    setReload(!reload);
    setIsEditing(false);
    console.log(data, "askjjdbakjsdata");
    setError(false);
  };

  const onEditError = (data) => {
    setLoading(false);
    console.log(data, "askjjdbakjsd");
    errorToast(data?.data?.data ?? data?.data?.message);
    setError(data?.data?.data ?? data?.data?.message);
  };

  const onStatusSuccess = (data) => {
    formikCreatePass.resetForm();
    setLoading(false);
    handleDetailsPremiumPWClose();
    handleSuccessMessageShow();
    // setReload(!reload);
    setError(false);
    setStatusValue(!statusValue);
  };
  const onStatusError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data ?? data?.data?.message);
    setError(data?.data?.data ?? data?.data?.message);
  };

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={type === "statusChange" ? `${premiumtype === "Premium5" ? `${statusValue ? "Premium-5 enabled successfully!" : "Premium-5 disabled successfully!"}` : `${statusValue ? "Premium-4 enabled successfully!" : "Premium-4 disabled successfully!"}`}` : "Changes made Successfully"}
      />
      <Modal
        centered
        show={detailsPremiumPasswordModal}
        onHide={handleDetailsPremiumPWClose}
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
                    handleDetailsPremiumPWClose();
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

export default DetailsPremiumPasswordModal;
