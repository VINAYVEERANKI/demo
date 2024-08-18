import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import CreateBroadcastBtn from "../../rider-referrals/utilities/create-broadcast-btn";
import DriverBroadCastStage1 from "./driverBroadCastStage1";
import DriverBroadCastStage2 from "./driverBroadCastStage2";
import * as driverCouponAction from "../../../redux/actions/driverCouponAction";
import { useDispatch, useSelector } from "react-redux";
import successToast from "../../utilits/successToast";
import errorToast from "../../utilits/errorToast";
import DriverCouponSidebar from "./driverCouponSidebar";
import moment from "moment";
import EditReferralBtn from "../../rider-referrals/utilities/edit-referral-btn";
import SuccessMessagemodal from "../../modals/successMessageModal";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import DriverCouponPasswordModal from "./passwordModal";
import { uploadImageCouponAction } from "../../../redux/actions/imageUploadAction";
import { insertSpaces, useExpiryDate } from "../../helper";
import InnerLayout from "../../layout/innerLayout";
import LeavePagemodal from "../../modals/leaveModal";
import {
  clearDriverCouponAction,
  clearReducerDriverCouponAction,
} from "../../../redux/actions/riderCoupon/clearCouponAction";

const DriverCouponBroadcastDetails = ({
  couponData,
  params,
  location,
  type = "",
}) => {
  console.log(couponData);
  const status = location?.state?.status;
  const is_editable = location?.state?.edit;

  const [couponTable, setCouponTable] = useState(false);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setCouponTable(!couponTable);
  };

  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const [changeUpdatePasswordshow, setchangeUpdatePasswordshow] =
    useState(false);
  const handlChangesUpdateShow = () => setchangeUpdatePasswordshow(true);
  const handleChangeUpdatePasswordClose = () =>
    setchangeUpdatePasswordshow(false);
  const navigate = useNavigate();

  const [leavePageShow, setLeavePageShow] = useState(false);
  const handleLeavePageClose = () => setLeavePageShow(false);
  const handleLeavePageShow = () => setLeavePageShow(true);
  const [loading, setLoading] = useState(false);
  const [statusBtn, setStatusBtn] = useState("");
  const [fetchLoading, setFetchLoading] = useState(false);
  const [currentCouponData, setCurrentCouponData] = useState({});
  const [notifyImgLinkStage1, setNotifyImgLinkStage1] = useState({
    img: "",
    error: false,
  });
  const [notifyImgLinkStage2, setNotifyImgLinkStage2] = useState({
    img: "",
    error: false,
  });

  const dispatch = useDispatch();

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
  }, [status, couponTable]);

  const onFetchSuccess = (data) => {
    setFetchLoading(false);
    setCurrentCouponData(data?.data);
  };
  const onFetchError = (data) => {
    setFetchLoading(false);
    errorToast(data?.data?.data);
  };

  function clearCouponFn() {
    if (type === "createDriverCoupon") {
      dispatch(
        clearDriverCouponAction(
          {
            coupon_id: params,
          },
          onClearSuccess,
          onClearError
        )
      );
    }
  }

  const onClearSuccess = (data) => {
    console.log(data);
  };
  const onClearError = (data) => {
    console.log(data);
  };

  const requiredStage =
    couponData?.required_rides_completed_by_receiver != "0"
      ? Yup.boolean().when(["notificationStage1", "smsMessageStage1"], {
          is: (notificationStage1, smsMessageStage1) =>
            !notificationStage1 && !smsMessageStage1,
          then: Yup.boolean().required("Atleast one is required"),
          otherwise: Yup.boolean(),
        })
      : Yup.bool();
  const CurrentDataRequiredStage =
    currentCouponData?.required_rides_completed_by_receiver != "0"
      ? Yup.boolean().when(["notificationStage1", "smsMessageStage1"], {
          is: (notificationStage1, smsMessageStage1) =>
            !notificationStage1 && !smsMessageStage1,
          then: Yup.boolean().required("Atleast one is required"),
          otherwise: Yup.boolean(),
        })
      : Yup.bool();

  function requiredFn() {
    if (couponData?.required_rides_completed_by_receiver) {
      return requiredStage;
    } else if (currentCouponData?.required_rides_completed_by_receiver) {
      return CurrentDataRequiredStage;
    }
  }

  const required = requiredFn();

  console.log(couponData?.required_rides_completed_by_receiver);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      notificationStage1:
        currentCouponData?.driver_coupon_notification?.is_notification_stage1 ??
        false,
      smsMessageStage1:
        currentCouponData?.driver_coupon_notification?.is_sms_stage1 ?? false,
      altleastOneStage1: "",
      notificationTitleStage1:
        currentCouponData?.driver_coupon_notification
          ?.notification_title_stage1 ?? "",
      notificationBodyStage1:
        currentCouponData?.driver_coupon_notification
          ?.notification_body_stage1 ?? "",
      smsMessageTitleStage1:
        currentCouponData?.driver_coupon_notification?.sms_title_stage1 ?? "",
      smsMessageBodyStage1:
        currentCouponData?.driver_coupon_notification?.sms_body_stage1 ?? "",
      notification_image_stage1:
        currentCouponData?.driver_coupon_notification
          ?.notification_image_stage1 ?? "",
      notificationStage2:
        currentCouponData?.driver_coupon_notification?.is_notification_stage2 ??
        false,
      smsMessageStage2:
        currentCouponData?.driver_coupon_notification?.is_sms_stage2 ?? false,
      altleastOneStage2: "",
      notificationTitleStage2:
        currentCouponData?.driver_coupon_notification
          ?.notification_title_stage2 ?? "",
      notificationBodyStage2:
        currentCouponData?.driver_coupon_notification
          ?.notification_body_stage2 ?? "",
      smsMessageTitleStage2:
        currentCouponData?.driver_coupon_notification?.sms_title_stage2 ?? "",
      smsMessageBodyStage2:
        currentCouponData?.driver_coupon_notification?.sms_body_stage2 ?? "",
      broadcastTypeStage2:
        currentCouponData?.driver_coupon_notification?.broadcast_type_stage2 ??
        "",
      reminderTypeStage2:
        currentCouponData?.driver_coupon_notification?.reminder_type_stage2 ??
        "",
      reminderTimeStage2:
        currentCouponData?.driver_coupon_notification?.reminder_time_stage2 ??
        "",
      reminderCycleStage2:
        currentCouponData?.driver_coupon_notification?.reminder_cycle_stage2 ??
        "",
      reminderFrequencyStage2:
        currentCouponData?.driver_coupon_notification
          ?.reminder_frequency_stage2 ?? "",
      onlineReminderDaysStage2:
        currentCouponData?.driver_coupon_notification?.reminder_days_stage2 ??
        "",
      notification_image_stage2:
        currentCouponData?.driver_coupon_notification
          ?.notification_image_stage2 ?? "",
    },

    validationSchema: Yup.object().shape({
      notificationStage1: Yup.bool(),
      smsMessageStage1: Yup.bool(),
      altleastOneStage1: required,
      notificationTitleStage1: Yup.string().when("notificationStage1", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      notificationBodyStage1: Yup.string().when("notificationStage1", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      smsMessageTitleStage1: Yup.string().when("smsMessageStage1", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      smsMessageBodyStage1: Yup.string().when("smsMessageStage1", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      notificationStage2: Yup.bool(),
      smsMessageStage2: Yup.bool(),
      altleastOneStage2: Yup.boolean().when(
        ["notificationStage2", "smsMessageStage2"],
        {
          is: (notificationStage2, smsMessageStage2) =>
            !notificationStage2 && !smsMessageStage2,
          then: Yup.boolean().required("Atleast one is required"),
          otherwise: Yup.boolean(),
        }
      ),
      notificationTitleStage2: Yup.string().when("notificationStage2", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      notificationBodyStage2: Yup.string().when("notificationStage2", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      smsMessageTitleStage2: Yup.string().when("smsMessageStage2", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      smsMessageBodyStage2: Yup.string().when("smsMessageStage2", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      broadcastTypeStage2: Yup.string().required(),
      reminderTypeStage2: Yup.string().when(["broadcastTypeStage2"], {
        is: (broadcastTypeStage2) =>
          broadcastTypeStage2 === "OfflineMobileApp" ||
          broadcastTypeStage2 === "OnlineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      reminderTimeStage2: Yup.string().when(["broadcastTypeStage2"], {
        is: (broadcastTypeStage2) => broadcastTypeStage2 === "OfflineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      reminderCycleStage2: Yup.string().when(["broadcastTypeStage2"], {
        is: (broadcastTypeStage2) => broadcastTypeStage2 === "OfflineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      reminderFrequencyStage2: Yup.string().when(["broadcastTypeStage2"], {
        is: (broadcastTypeStage2) =>
          broadcastTypeStage2 === "OfflineMobileApp" ||
          broadcastTypeStage2 === "OnlineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      onlineReminderDaysStage2: Yup.string().when(["broadcastTypeStage2"], {
        is: (broadcastTypeStage2) => broadcastTypeStage2 === "OnlineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
    }),
    onSubmit: (values) => {
      const data = {
        coupon_id: params,
        cb_deposite_amount: currentCouponData?.cb_deposite_amount,
        required_rides_completed_by_receiver:
          currentCouponData?.required_rides_completed_by_receiver,
        start_date: currentCouponData?.start_date,
        start_time: currentCouponData?.start_time,
        expiry_date: currentCouponData?.expiry_date,
        expiry_time: currentCouponData?.expiry_time,
        is_notification_stage1: values?.notificationStage1,
        notification_title_stage1: values?.notificationTitleStage1,
        notification_body_stage1: values?.notificationBodyStage1,
        notification_image_stage1: notifyImgLinkStage1?.img,
        is_sms_stage1: values?.smsMessageStage1,
        sms_title_stage1: values?.smsMessageTitleStage1,
        sms_body_stage1: values?.smsMessageBodyStage1,
        is_notification_stage2: values?.notificationStage2,
        notification_title_stage2: values?.notificationTitleStage2,
        notification_body_stage2: values?.notificationBodyStage2,
        notification_image_stage2: notifyImgLinkStage2?.img,
        is_sms_stage2: values?.smsMessageStage2,
        sms_title_stage2: values?.smsMessageTitleStage2,
        sms_body_stage2: values?.smsMessageBodyStage2,
        broadcast_type_stage2: values?.broadcastTypeStage2,
        reminder_type_stage2: values?.reminderTypeStage2,
        reminder_frequency_stage2: values?.reminderFrequencyStage2,
        reminder_days_stage2: values?.onlineReminderDaysStage2,
        reminder_time_stage2: values?.reminderTimeStage2,
        reminder_cycle_stage2: values?.reminderCycleStage2,
      };
      if (status === "reviewRequired") {
        if (statusBtn === "SaveLater") {
          setLoading(true);
          dispatch(
            driverCouponAction?.reviewReqDriverCouponEditAction(
              data,
              onSubmitSuccess,
              onSumitError
            )
          );
        } else if (statusBtn === "Approve") {
          dispatch(
            driverCouponAction?.reviewReqDriverCouponEditAction(
              data,
              onSubmitSuccess,
              onSumitError
            )
          );
          handlChangesUpdateShow();
        }
      } else if (status === "Active") {
        if (statusBtn === "SendForReview") {
          setLoading(true);
          dispatch(
            driverCouponAction?.activeDriverCouponBroadCastEditAction(
              data,

              onSubmitSuccess,
              onSumitError
            )
          );
        }
      } else {
        setLoading(true);
        dispatch(
          driverCouponAction?.createDriverCouponBroadCastAction(
            data,
            onSubmitSuccess,
            onSumitError
          )
        );
        dispatch(clearReducerDriverCouponAction());
      }
    },
  });

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
        navigate("/driver-coupons");
      }
    }
  };

  const onSumitError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
  };

  const backBtn = () => {
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      handleLeavePageShow();
    } else {
      clearCouponFn();
      navigate(-1);
    }
  };

  const couponBroadCastData = [
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
    { subheading: "Current Balance Deposit Details" },
    {
      label: "Current Balance Deposit Amount (₹)*",
      value:
        currentCouponData?.cb_deposite_amount ??
        couponData?.cb_deposite_amount ??
        "--",
    },
    {
      label: "Required Rides (Completed)*",
      value:
        couponData?.required_rides_completed_by_receiver ??
        currentCouponData?.required_rides_completed_by_receiver ??
        "--",
    },
    { subheading: "Campaign Details*" },
    {
      label: "Activation At",
      value:
        couponData?.start_date ?? currentCouponData?.start_date
          ? moment(
              couponData?.start_date ?? currentCouponData?.start_date
            ).format("DD-MM-YYYY HH:mm:ss")
          : "--",
    },
    {
      label: "Expiry At",
      value:
        couponData?.expiry_date ?? currentCouponData?.expiry_date
          ? moment(
              couponData?.expiry_date ?? currentCouponData?.expiry_date
            ).format("DD-MM-YYYY HH:mm:ss")
          : "--",
    },
  ];

  // image
  const [uploadedStage1, setUploadedStage1] = useState(false);
  const [notifyImgStage1, setNotifyImgStage1] = useState();

  useEffect(() => {
    setNotifyImgLinkStage1({
      img: currentCouponData?.driver_coupon_notification
        ?.notification_image_stage1,
      error: false,
    });
  }, [currentCouponData]);

  function handleNotifyImgStage1Change(e) {
    if (e.target?.files.length !== 0) {
      setNotifyImgStage1(URL.createObjectURL(e.target.files[0]));
      dispatch(
        uploadImageCouponAction(
          e.target.files[0],
          onUploadStage1Success,
          onUploadStage1Error
        )
      );
    }
  }
  const onUploadStage1Success = (data) => {
    console.log(data.data);
    setUploadedStage1(true);
    setNotifyImgLinkStage1({ img: data?.data?.data?.location, error: false });
  };
  const onUploadStage1Error = (data) => {
    console.log(data);
  };

  const [uploadedStage2, setUploadedStage2] = useState(false);
  const [notifyImgStage2, setNotifyImgStage2] = useState();

  useEffect(() => {
    setNotifyImgLinkStage2({
      img: currentCouponData?.driver_coupon_notification
        ?.notification_image_stage2,
      error: false,
    });
  }, [currentCouponData]);

  function handleNotifyImgStage2Change(e) {
    if (e.target?.files.length !== 0) {
      setNotifyImgStage2(URL.createObjectURL(e.target.files[0]));
      dispatch(
        uploadImageCouponAction(
          e.target.files[0],
          onUploadStage2Success,
          onUploadStage2Error
        )
      );
    }
  }
  const onUploadStage2Success = (data) => {
    console.log(data.data);
    setUploadedStage2(true);
    setNotifyImgLinkStage2({ img: data?.data?.data?.location, error: false });
  };
  const onUploadStage2Error = (data) => {
    console.log(data);
  };

  const approveFn = () => {
    setStatusBtn("Approve");
    if (formik?.initialValues !== formik?.values) {
      setCouponTable(!couponTable);
    }
  };

  console.log(formik.errors);

  const expiryDate = useExpiryDate(
    currentCouponData?.coupon_life_span,
    currentCouponData?.expiry_date,
    currentCouponData?.expiry_time
  );

  const firstErrorField = Object.keys(formik.errors).find(
    (fieldName) => formik.touched[fieldName] && formik.errors[fieldName]
  );

  return (
    <>
      <LeavePagemodal
        leavePageShow={leavePageShow}
        handleLeavePageClose={handleLeavePageClose}
        link={-1}
        subsection={true}
        okayFn={() => clearCouponFn()}
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
        title={
          statusBtn === "Approve"
            ? "Are you sure you want to approve this coupon?"
            : "Are you sure you want to reject this coupon?"
        }
        statusBtn={statusBtn}
      />
      <InnerLayout
        navigateEnable={false}
        naviagteLeave={true}
        mainHeading={
          location?.state?.coupon_id
            ? `New Account - ${location?.state?.coupon_id}`
            : "Create New Coupon"
        }
        navigateFn={backBtn}
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
          <div className="row ">
            <div className="col-lg-4 col-12 mt-2">
              <DriverCouponSidebar couponDetails={couponBroadCastData} />
            </div>
            <div className=" col-lg-8 col-12 pe-lg-5">
              <form onSubmit={formik.handleSubmit}>
                {couponData?.required_rides_completed_by_receiver == 0 ||
                currentCouponData?.required_rides_completed_by_receiver == 0 ? (
                  <></>
                ) : (
                  <DriverBroadCastStage1
                    // required_ride={
                    //   couponData?.required_rides_completed_by_receiver ??
                    //   currentCouponData?.required_rides_completed_by_receiver
                    // }
                    formik={formik}
                    is_editable={is_editable}
                    uploadedStage1={uploadedStage1}
                    notifyImgStage1={notifyImgStage1}
                    handleNotifyImgStage1Change={handleNotifyImgStage1Change}
                    type={type}
                    currentCouponData={currentCouponData}
                  />
                )}

                <DriverBroadCastStage2
                  required_ride={
                    couponData?.required_rides_completed_by_receiver ??
                    currentCouponData?.required_rides_completed_by_receiver
                  }
                  formik={formik}
                  is_editable={is_editable}
                  uploadedStage2={uploadedStage2}
                  notifyImgStage2={notifyImgStage2}
                  handleNotifyImgStage2Change={handleNotifyImgStage2Change}
                />

                {firstErrorField && (
                  <div className="red_color fs_16 fw_500">
                    {formik.errors[firstErrorField]}
                  </div>
                )}

                {is_editable === false || is_editable === true ? (
                  <>
                    {status === "Active" ? (
                      <EditReferralBtn
                        is_editable={is_editable}
                        backButton={true}
                        viewBtn={() => {
                          navigate(-1);
                        }}
                        resetBtn={() => {
                          formik?.resetForm();
                          setUploadedStage1(false);
                          setUploadedStage2(false);
                        }}
                        backBtn={backBtn}
                        saveForLater={false}
                        saveViewBtn={() => setStatusBtn("SendForReview")}
                        saveAndViewText="Send For Review"
                        viewBtnText="Go Back"
                      />
                    ) : (
                      <EditReferralBtn
                        saveLaterBtn={() => setStatusBtn("SaveLater")}
                        is_editable={is_editable}
                        saveAndView={false}
                        backButton={true}
                        backBtn={backBtn}
                        loading={loading}
                        ApproveButton={true}
                        approveBtn={() => {
                          approveFn();
                        }}
                        resetBtn={() => {
                          formik.resetForm();
                          setUploadedStage1(false);
                          setUploadedStage2(false);
                        }}
                        viewBtnText="Go Back"
                        rejectBtn={() => {
                          setStatusBtn("Reject");
                          handlChangesUpdateShow();
                        }}
                        viewBtn={() => {
                          navigate(-1);
                        }}
                      />
                    )}
                  </>
                ) : (
                  <CreateBroadcastBtn
                    navigateBtn={backBtn}
                    backBtn={true}
                    loading={loading}
                    btnText="Send For Review"
                    submitBtn={() => setStatusBtn("CreateBroadcast")}
                  />
                )}
              </form>
            </div>
          </div>
        )}
      </InnerLayout>
    </>
  );
};

export default DriverCouponBroadcastDetails;
