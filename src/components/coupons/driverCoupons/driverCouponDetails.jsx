import { useFormik } from "formik";
import React, { useState, useEffect, useRef } from "react";
import CouponInputField from "../../form/couponInputField";
import CampaignDetailsInput from "../../rider-coupons/utilities/campaign-details-input";
import * as Yup from "yup";
import {
  insertSpaceUnderScore,
  insertSpaces,
  intNumRegex,
  numRegex,
  useExpiryDate,
} from "../../helper";
import useScreenSizeDetector from "../../useScreenSizeDetector";
import * as driverCouponAction from "../../../redux/actions/driverCouponAction";
import { useDispatch, useSelector } from "react-redux";
import successToast from "../../utilits/successToast";
import errorToast from "../../utilits/errorToast";
import { useNavigate } from "react-router";
import DriverCouponSidebar from "./driverCouponSidebar";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import moment from "moment";
import EditReferralBtn from "../../rider-referrals/utilities/edit-referral-btn";
import CreateBroadcastBtn from "../../rider-referrals/utilities/create-broadcast-btn";
import DriverCouponPasswordModal from "./passwordModal";
import SuccessMessagemodal from "../../modals/successMessageModal";
import InnerLayout from "../../layout/innerLayout";
import LeavePagemodal from "../../modals/leaveModal";
import {
  clearDriverCouponAction,
  clearReducerDriverCouponAction,
} from "../../../redux/actions/riderCoupon/clearCouponAction";
import ErrorMessagemodal from "../../modals/errorMessageModal";
import CouponDetails from "../riderCoupons/coupondetails";
import useDisplayToggle from "../../useDisplayToggle";

const DriverCouponDetails = ({ params, location, type = "" }) => {
  const [driverCouponDetails, setDriverCouponDetails] = useState(false);
  const width = useScreenSizeDetector();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reloadtable, setReloadtable] = useState(false);
  const dispatch = useDispatch();
  const status = location?.state?.status;
  const is_editable = location?.state?.edit;
  const [currentCouponData, setCurrentCouponData] = useState({});
  const [statusBtn, setStatusBtn] = useState("");
  const caneclBtn = () => {
    navigate("/driver-coupons");
    localStorage.removeItem("DriverCouponTab");
  };
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setReloadtable(!reloadtable);
  };

  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const [changeUpdatePasswordshow, setchangeUpdatePasswordshow] =
    useState(false);
  const handlChangesUpdateShow = () => setchangeUpdatePasswordshow(true);
  const handleChangeUpdatePasswordClose = () =>
    setchangeUpdatePasswordshow(false);

  const [leavePageShow, setLeavePageShow] = useState(false);
  const handleLeavePageClose = () => setLeavePageShow(false);
  const handleLeavePageShow = () => setLeavePageShow(true);

  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const handleErrorMessageClose = () => setErrorMessageShow(false);
  const handleErrorMessageShow = () => setErrorMessageShow(true);
  const [validationErrorMes, setvalidationErrorMes] = useState("");

  const driverCouponCreatedData = useSelector(
    (store) => store.createDriverCouponReducer
  );

  const createdData = driverCouponCreatedData?.data?.data;

  console.log(location?.pathname);

  useEffect(() => {
    if (type === "createDriverCoupon") {
      if (location?.pathname === "/driver-coupons/create") {
        dispatch(
          clearDriverCouponAction(
            {
              coupon_id: createdData?.id,
            },
            onClearSuccess,
            onClearError
          )
        );
      }
    }
  }, [params]);

  const onClearSuccess = (data) => {
    console.log(data);
  };
  const onClearError = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (status === "reviewRequired") {
      setFetchLoading(true);
      dispatch(
        driverCouponAction?.reviewReqDriverCouponAction(
          {
            coupon_id: params,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Active") {
      setFetchLoading(true);
      dispatch(
        driverCouponAction?.activeDriverCouponAction(
          {
            coupon_id: params,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Rejected") {
      setFetchLoading(true);
      dispatch(
        driverCouponAction?.rejectedDriverCouponAction(
          {
            coupon_id: params,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Deleted") {
      setFetchLoading(true);
      dispatch(
        driverCouponAction?.deletedDriverCouponAction(
          {
            coupon_id: params,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Expired") {
      setFetchLoading(true);
      dispatch(
        driverCouponAction?.expiredDriverCouponAction(
          {
            coupon_id: params,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    }
  }, [status, reloadtable]);

  const onFetchSuccess = (data) => {
    setFetchLoading(false);
    setCurrentCouponData(data?.data);
  };
  const onFetchError = (data) => {
    setFetchLoading(false);
    errorToast(data?.data?.data);
  };

  const viewFn = () => {
    const data = {
      edit: false,
      coupon_id: currentCouponData?.coupon_code,
      status: status,
    };
    if (status === "reviewRequired") {
      navigate(`/driver-coupons/review-required/broadcast/view/${params}`, {
        state: data,
      });
    } else if (status === "Active") {
      navigate(`/driver-coupons/active/broadcast/view/${params}`, {
        state: data,
      });
    } else if (status === "Rejected") {
      navigate(`/driver-coupons/rejected/broadcast/view/${params}`, {
        state: data,
      });
    } else if (status === "Deleted") {
      navigate(`/driver-coupons/deleted/broadcast/view/${params}`, {
        state: data,
      });
    } else if (status === "Expired") {
      navigate(`/driver-coupons/expired/broadcast/view/${params}`, {
        state: data,
      });
    }
  };

  console.log(currentCouponData?.required_rides_completed_by_receiver);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      depositAmount:
        currentCouponData?.cb_deposite_amount ??
        createdData?.cb_deposite_amount ??
        "",
      requiredRides:
        currentCouponData?.required_rides_completed_by_receiver !== undefined ||
        createdData?.required_rides_completed_by_receiver !== undefined
          ? currentCouponData?.required_rides_completed_by_receiver ??
            createdData?.required_rides_completed_by_receiver
          : "",
      startDate: currentCouponData?.start_date
        ? moment(currentCouponData?.start_date).format("YYYY-MM-DD")
        : createdData?.start_date
        ? moment(createdData?.start_date).format("YYYY-MM-DD")
        : "",
      startTime: currentCouponData?.start_time ?? createdData?.start_time ?? "",
      expiryDate: currentCouponData?.expiry_date
        ? moment(currentCouponData?.expiry_date).format("YYYY-MM-DD")
        : createdData?.expiry_date
        ? moment(createdData?.expiry_date).format("YYYY-MM-DD")
        : "",
      expiryTime:
        currentCouponData?.expiry_time ?? createdData?.expiry_time ?? "",
    },
    validationSchema: Yup.object({
      depositAmount: Yup.string()
        .matches(numRegex, "Invalid value")
        .trim()
        .required("Please Complete All The Above Fields"),
      requiredRides: Yup.string()
        .matches(intNumRegex, "Invalid value")
        .trim()
        .required("Please Complete All The Above Fields"),
      startDate: Yup.string().required("Please Complete All The Above Fields"),
      startTime: Yup.string().required("Please Complete All The Above Fields"),

      expiryDate: Yup.string().required("Please Complete All The Above Fields"),
      // expiryTime: Yup.string().required("Please Complete All The Above Fields"),
      expiryTime: Yup.string()
        .when(["startDate", "expiryDate"], (startDate, expiryDate, schema) => {
          if (startDate && expiryDate && startDate === expiryDate) {
            return schema.test({
              name: "greaterThanStartTime",
              message: "Expiry time should be greater than start time",
              test: function (value) {
                const startTime = this.resolve(Yup.ref("startTime"));
                return value > startTime;
              },
            });
          }
          return schema;
        })
        .required("Please Complete All The Above Fields"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      if (status === "reviewRequired") {
        dispatch(
          driverCouponAction.reviewReqDriverCouponEditAction(
            {
              coupon_id: params,
              cb_deposite_amount: values?.depositAmount,
              required_rides_completed_by_receiver: values?.requiredRides,
              start_date: values?.startDate,
              start_time: values?.startTime,
              expiry_date: values?.expiryDate,
              expiry_time: values?.expiryTime,
              is_notification_stage1:
                currentCouponData?.driver_coupon_notification
                  ?.is_notification_stage1,
              notification_title_stage1:
                currentCouponData?.driver_coupon_notification
                  ?.notification_title_stage1,
              notification_body_stage1:
                currentCouponData?.driver_coupon_notification
                  ?.notification_body_stage1,
              notification_image_stage1:
                currentCouponData?.driver_coupon_notification
                  ?.notification_image_stage1,
              is_sms_stage1:
                currentCouponData?.driver_coupon_notification?.is_sms_stage1,
              sms_title_stage1:
                currentCouponData?.driver_coupon_notification?.sms_title_stage1,
              sms_body_stage1:
                currentCouponData?.driver_coupon_notification?.sms_body_stage1,
              is_notification_stage2:
                currentCouponData?.driver_coupon_notification
                  ?.is_notification_stage2,
              notification_title_stage2:
                currentCouponData?.driver_coupon_notification
                  ?.notification_title_stage2,
              notification_body_stage2:
                currentCouponData?.driver_coupon_notification
                  ?.notification_body_stage2,
              notification_image_stage2:
                currentCouponData?.driver_coupon_notification
                  ?.notification_image_stage2,
              is_sms_stage2:
                currentCouponData?.driver_coupon_notification?.is_sms_stage2,
              sms_title_stage2:
                currentCouponData?.driver_coupon_notification?.sms_title_stage2,
              sms_body_stage2:
                currentCouponData?.driver_coupon_notification?.sms_body_stage2,
              broadcast_type_stage2:
                currentCouponData?.driver_coupon_notification
                  ?.broadcast_type_stage2,
              reminder_type_stage2:
                currentCouponData?.driver_coupon_notification
                  ?.reminder_type_stage2,
              reminder_frequency_stage2:
                currentCouponData?.driver_coupon_notification
                  ?.reminder_frequency_stage2,
              reminder_days_stage2:
                currentCouponData?.driver_coupon_notification
                  ?.reminder_days_stage2,
              reminder_time_stage2:
                currentCouponData?.driver_coupon_notification
                  ?.reminder_time_stage2,
              reminder_cycle_stage2:
                currentCouponData?.driver_coupon_notification
                  ?.reminder_cycle_stage2,
            },
            onSubmitSuccess,
            onSubmitError
          )
        );
      } else if (status === "Active") {
        dispatch(
          driverCouponAction.activeDriverCouponEditAction(
            {
              coupon_id: params,
              expiry_date: values?.expiryDate,
              expiry_time: values?.expiryTime,
            },
            onSubmitSuccess,
            onSubmitError
          )
        );
      } else {
        dispatch(
          driverCouponAction.createDriverCouponAction(
            {
              user_type: "Driver",
              coupon_classification: "NewAccount",
              coupon_type: "CurrentBalanceDeposit",
              cb_deposite_amount: values?.depositAmount,
              required_rides_completed_by_receiver: values?.requiredRides,
              start_date: values?.startDate,
              start_time: values?.startTime,
              expiry_date: values?.expiryDate,
              expiry_time: values?.expiryTime,
            },
            onSubmitSuccess,
            onSubmitError
          )
        );
        dispatch(clearReducerDriverCouponAction());
      }
    },
  });

  console.log(formik.values);

  const onSubmitSuccess = (data) => {
    setLoading(false);
    if (
      JSON.stringify(formik?.initialValues) !== JSON.stringify(formik?.values)
    ) {
      successToast(data?.message ?? data?.data);
      if (status === "reviewRequired") {
        if (statusBtn === "SaveLater") {
          handleSuccessMessageShow();
        }
      } else {
      }
    }

    const Data = {
      edit: is_editable,
      coupon_id: currentCouponData?.coupon_code,
      status: status,
    };

    if (status === "reviewRequired") {
      if (statusBtn === "Save&ViewBroadCast") {
        navigate(`/driver-coupons/review-required/broadcast/edit/${params}`, {
          state: Data,
        });
      }
    } else if (status === "Active") {
      if (statusBtn === "Save&ViewBroadCast") {
        navigate(`/driver-coupons/active/broadcast/edit/${params}`, {
          state: Data,
        });
      }
    } else {
      navigate(`/driver-coupon-broadcast/create/${data?.data?.id}`, {
        state: { data },
      });
    }
  };
  const onSubmitError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setvalidationErrorMes(insertSpaceUnderScore(data?.data?.data));
    handleErrorMessageShow();
    setError(data?.data?.data);
  };

  const driverCouponData = [
    { label: "Coupon ID", value: currentCouponData?.coupon_code ?? "--" },
    { label: "User Type", value: "Driver" },
    { label: `Coupon Classification `, value: "New Account" },
    { label: "Coupon Type", value: "Current balance deposit" },
    {
      label: "Coupon status",
      value: currentCouponData?.coupon_status
        ? insertSpaces(currentCouponData?.coupon_status)
        : "--",
    },
  ];

  const leavePageFn = () => {
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      handleLeavePageShow();
    } else {
      navigate(-1);
    }
  };

  console.log(type);
  const expiryDate = useExpiryDate(
    currentCouponData?.coupon_life_span,
    currentCouponData?.expiry_date,
    currentCouponData?.expiry_time
  );

  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setDriverCouponDetails,
  });

  return (
    <>
      <ErrorMessagemodal
        errorMessageShow={errorMessageShow}
        handleErrorMessageClose={handleErrorMessageClose}
        title={validationErrorMes}
      />
      <LeavePagemodal
        leavePageShow={leavePageShow}
        handleLeavePageClose={handleLeavePageClose}
        link={-1}
        subsection={true}
      />
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Changes made successfully!`}
      />
      <DriverCouponPasswordModal
        changeUpdatePasswordshow={changeUpdatePasswordshow}
        handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
        params={params}
        title={"Are you sure you want to delete this coupon?"}
        statusBtn={statusBtn}
      />
      <InnerLayout
        mainHeading={
          location?.state?.coupon_id
            ? `New Account - ${location?.state?.coupon_id}`
            : "Create New Coupon"
        }
        navigateEnable={false}
        naviagteLeave={true}
        navigateFn={leavePageFn}
        expiryDateShow={true}
        expiryDate={
          fetchLoading
            ? ``
            : type === "createDriverCoupon"
            ? ``
            : `Coupon Exp : ${expiryDate}`
        }
      >
        {fetchLoading ? (
          <LoadingSpinnerTable />
        ) : (
          <div className="d-lg-flex justify-content-center">
            <div className="col-lg-4 col-12">
              <DriverCouponSidebar couponDetails={driverCouponData} />
            </div>
            <div className=" col-lg-8 col-12 pe-lg-5">
              <form onSubmit={formik.handleSubmit}>
                <div className="discount_detials_container mt-2 px-3 p-2 pb-3">
                  <div className=" d-flex justify-content-between position-relative">
                    <div className=" primary_color fs_18 fw_500 text_underline">
                      Current Balance Deposit Details
                    </div>
                    {type !== "createDriverCoupon" ? (
                      <>
                        <div
                          className="position-absolute top-0 end-0 mt-1 me-3 light_blue_color text_underline fs_14 fw_500 cursor_pointer"
                          onClick={() =>
                            setDriverCouponDetails(!driverCouponDetails)
                          }
                          ref={onClickRef}
                        >
                          More Details
                        </div>
                        {driverCouponDetails ? (
                          <>
                            <div
                              className="coupon_details_block border white_bg border_radius"
                              ref={insideClickRef}
                            >
                              <CouponDetails item={currentCouponData} />
                            </div>
                          </>
                        ) : null}
                      </>
                    ) : null}
                  </div>

                  <div className="row mt-3">
                    <div className="col-sm-7 col-md-7 col-lg-5 col-xl-4">
                      <span
                        className={`${
                          formik.errors.depositAmount &&
                          formik.touched.depositAmount
                            ? "red_color"
                            : "primary_color"
                        } fs_16  fw_500`}
                      >
                        Current Balance Deposit Amount (₹)*
                      </span>
                    </div>
                    <div className="col-sm-4 col-12">
                      <CouponInputField
                        label={false}
                        itemName={"depositAmount"}
                        inputValue={formik.values.depositAmount}
                        onChangeFn={formik.handleChange}
                        onBlurFn={formik.handleBlur}
                        formikError={formik.errors.depositAmount}
                        formikTouched={formik.touched.depositAmount}
                        placeholder=""
                        inputDisabled={
                          is_editable === false || status === "Active"
                        }
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-sm-7 col-md-7 col-lg-5 col-xl-4">
                      <span
                        className={`${
                          formik.errors.requiredRides &&
                          formik.touched.requiredRides
                            ? "red_color"
                            : "primary_color"
                        } fs_16  fw_500`}
                      >
                        Required Rides(Completed)*
                      </span>
                    </div>
                    <div className="col-sm-4 col-12">
                      <CouponInputField
                        label={false}
                        itemName={"requiredRides"}
                        inputValue={formik.values.requiredRides}
                        onChangeFn={formik.handleChange}
                        onBlurFn={formik.handleBlur}
                        formikError={formik.errors.requiredRides}
                        formikTouched={formik.touched.requiredRides}
                        placeholder=""
                        inputDisabled={
                          is_editable === false || status === "Active"
                        }
                      />
                    </div>
                  </div>
                </div>
                <CampaignDetailsInput
                  formik={formik}
                  campaignStatus={currentCouponData?.campaign_status ?? "--"}
                  is_editable={is_editable}
                  status={currentCouponData?.coupon_status}
                />

                <div
                  className={`d-flex justify-content-end gap-4 ${
                    width?.width < 992 ? "mt-4" : "coupon_btn_container"
                  } `}
                >
                  {Object.keys(formik.errors).some(
                    (fieldName) => formik.touched[fieldName]
                  ) && (
                    <div className="dark_red_color fs_14 fw_500 pt-4">
                      {
                        Object.keys(formik.errors).map((fieldName) => {
                          if (
                            formik.touched[fieldName] &&
                            formik.errors[fieldName]
                          ) {
                            return formik.errors[fieldName];
                          }
                          return null;
                        })[0]
                      }
                    </div>
                  )}

                  {is_editable === false || is_editable === true ? (
                    <>
                      {status === "Active" ? (
                        <EditReferralBtn
                          resetBtn={() => {
                            formik?.resetForm();
                          }}
                          saveViewBtn={() => setStatusBtn("Save&ViewBroadCast")}
                          saveForLater={false}
                          DeleteButton={true}
                          deleteBtnFn={() => {
                            setStatusBtn("Delete");
                            handlChangesUpdateShow();
                          }}
                          is_editable={is_editable}
                          viewBtn={viewFn}
                          viewBtnText="View Broadcast"
                          loading={loading}
                        />
                      ) : (
                        <EditReferralBtn
                          saveLaterBtn={() => setStatusBtn("SaveLater")}
                          saveViewBtn={() => setStatusBtn("Save&ViewBroadCast")}
                          is_editable={is_editable}
                          viewBtn={viewFn}
                          resetBtn={() => {
                            formik.resetForm();
                          }}
                          backButton={true}
                          backBtn={leavePageFn}
                          viewBtnText="View Broadcast"
                          loading={loading}
                        />
                      )}
                    </>
                  ) : (
                    <CreateBroadcastBtn
                      formik={formik}
                      navigateBtn={caneclBtn}
                      loading={loading}
                      cancelBtn={true}
                      btnText="Create Broadcast"
                      submitBtn={() => setStatusBtn("CreateDriverCoupon")}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </InnerLayout>
    </>
  );
};

export default DriverCouponDetails;
