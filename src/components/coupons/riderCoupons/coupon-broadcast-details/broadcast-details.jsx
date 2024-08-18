import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../coupon-component.css";
import CouponInputField from "../../../form/couponInputField";
import { openInNewTab, useExpiryDate } from "../../../helper";
import CouponSelectField from "../../../form/CouponSelectField";
import CouponDetails from "../coupondetails";
import { useDispatch } from "react-redux";
import {
  activeCouponFindOneAction,
  bookingDestinatinCouponEditAction,
  bookingDistanceCouponEditAction,
  deletedCouponFindOneAction,
  expiredCouponFindOneAction,
  generalCouponEditAction,
  newAccountCouponEditAction,
  newAccountLifeSpanCouponEditAction,
  outstationPackageCouponEditAction,
  paymentMethodCouponEditAction,
  pendingCouponFindOneAction,
  pickUpDropOffCouponEditAction,
  rejectedCouponFindOneAction,
  rentalPackageCouponEditAction,
} from "../../../../redux/actions/riderCoupon/findOneAndEditAction";
import { uploadImageCouponAction } from "../../../../redux/actions/imageUploadAction";
import successToast from "../../../utilits/successToast";
import errorToast from "../../../utilits/errorToast";
import { useNavigate, useParams } from "react-router";
import RiderCouponPassword from "../modals/passWordModal";
import EditReferralBtn from "../../../rider-referrals/utilities/edit-referral-btn";
import LeavePagemodal from "../../../modals/leaveModal";
import InnerLayout from "../../../layout/innerLayout";
import LoadingSpinnerTable from "../../../utilits/loadingSpinnerTable";
import CouponBroadcastSidebar from "../broadcastSidebar";
import SpinnerLoading from "../../../utilits/spinnerLoading";
import {
  activeCouponSendReviewAction,
  sendReviewAction,
} from "../../../../redux/actions/riderCoupon/sendReviewAction";
import SuccessMessagemodal from "../../../modals/successMessageModal";
import CreateBroadcastBtn from "../../../rider-referrals/utilities/create-broadcast-btn";
import { clearReducerRiderCouponAction } from "../../../../redux/actions/riderCoupon/clearCouponAction";
import CouponCheckboxField from "../../../form/couponCheckboxField";
import moment from "moment";
import DraftMessageInput from "../../../form/draftMessageInput";

const CouponBroadcastDetails = ({ Location, broadcastData, type = "" }) => {
  console.log(Location);
  const params = useParams();
  const is_editable = Location?.state?.is_editable;
  const status = Location?.state?.status;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [reviewBackendData, setReviewBackendData] = useState([]);
  const [statusBtn, setStatusBtn] = useState("");
  const [reload, setReload] = useState(false);

  const notificationData = reviewBackendData?.rider_coupon_notification;

  const [leavePageShow, setLeavePageShow] = useState(false);
  const handleLeavePageClose = () => setLeavePageShow(false);
  const handleLeavePageShow = () => setLeavePageShow(true);

  const [couponPasswordShow, setCouponPasswordShow] = useState(false);
  const handleCouponPasswordClose = () => setCouponPasswordShow(false);
  const handleCouponPasswordShow = () => setCouponPasswordShow(true);

  const [changesMadeShow, setChangesMadeShow] = useState(false);
  const handleChangesMadeClose = () => {
    setChangesMadeShow(false);
    setReload(!reload);
    if (statusBtn === "SendReview") {
      navigate("/rider-coupons");
    }
  };
  const handleChangesMadeShow = () => setChangesMadeShow(true);

  useEffect(() => {
    const CouponID = {
      coupon_id: params?.id,
    };
    if (status === "PendingReview" || status === "ReviewPendingUpdated") {
      setFetchLoading(true);
      dispatch(
        pendingCouponFindOneAction(CouponID, onFetchSuccess, onFetchError)
      );
    } else if (status === "Active") {
      setFetchLoading(true);
      dispatch(
        activeCouponFindOneAction(CouponID, onFetchSuccess, onFetchError)
      );
    } else if (status === "Rejected") {
      setFetchLoading(true);
      dispatch(
        rejectedCouponFindOneAction(CouponID, onFetchSuccess, onFetchError)
      );
    } else if (status === "Deleted") {
      setFetchLoading(true);
      dispatch(
        deletedCouponFindOneAction(CouponID, onFetchSuccess, onFetchError)
      );
    } else if (status === "Expired") {
      setFetchLoading(true);
      dispatch(
        expiredCouponFindOneAction(CouponID, onFetchSuccess, onFetchError)
      );
    }
  }, [reload, params?.id]);

  const onFetchSuccess = (data) => {
    setFetchLoading(false);
    setReviewBackendData(data?.data);
    console.log(data);
  };
  const onFetchError = (data) => {
    setFetchLoading(false);
    console.log(data);
  };

  // image
  const [uploaded, setUploaded] = useState(false);
  const [notificationImage, setNotificationImage] = useState("");

  const [frontImageLink, setFrontImageLink] = useState({
    img: "",
    error: false,
  });

  useEffect(() => {
    setFrontImageLink({
      img: notificationData?.notification_image,
      error: false,
    });
  }, [reviewBackendData]);

  function handleNotificationImageChange(e) {
    if (e.target?.files.length !== 0) {
      setNotificationImage(URL.createObjectURL(e.target.files[0]));
      dispatch(
        uploadImageCouponAction(
          e.target.files[0],
          onUploadSuccess,
          onUploadError
        )
      );
    }
  }
  const onUploadSuccess = (data) => {
    console.log(data.data);
    setUploaded(true);
    setFrontImageLink({ img: data?.data?.data?.location, error: false });
  };
  const onUploadError = (data) => {
    console.log(data);
  };

  // image

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      notification: notificationData?.is_send_notification ?? false,
      notificationTitle: notificationData?.notification_title ?? "",
      notificationBody: notificationData?.notification_body
        ? notificationData?.notification_body
        : "",
      Upload: notificationData?.notification_image
        ? notificationData?.notification_image
        : "",
      sms: notificationData?.is_send_sms ?? false,
      messageHeader: notificationData?.sms_header
        ? notificationData?.sms_header
        : "",
      messageBody: notificationData?.sms_body ? notificationData?.sms_body : "",
      altleastOne: "",
      broadcastType: notificationData?.broadcast_type
        ? notificationData?.broadcast_type
        : "",
      reminderType: notificationData?.reminder_type
        ? notificationData?.reminder_type
        : "",
      reminderTime: notificationData?.reminder_time
        ? notificationData?.reminder_time
        : "",
      reminderCycle: notificationData?.reminder_cycle
        ? notificationData?.reminder_cycle
        : "",
      reminderFrequency: notificationData?.reminder_frequency
        ? notificationData?.reminder_frequency
        : "",

      onlineReminderDays: notificationData?.reminder_days
        ? notificationData?.reminder_days
        : "",
    },

    validationSchema: Yup.object().shape({
      notification: Yup.bool(),
      notificationTitle: Yup.string().when("notification", {
        is: true,
        then: Yup.string().required(
          "notificationTitle is Please Complete All The Above Fields"
        ),
      }),
      notificationBody: Yup.string().when("notification", {
        is: true,
        then: Yup.string().required(
          "notificationBody is Please Complete All The Above Fields"
        ),
      }),
      sms: Yup.bool(),
      messageHeader: Yup.string().when("sms", {
        is: true,
        then: Yup.string().required("Please Complete All The Above Fields"),
      }),
      messageBody: Yup.string().when("sms", {
        is: true,
        then: Yup.string().required("Please Complete All The Above Fields"),
      }),
      broadcastType: Yup.string().required(
        "Please Complete All The Above Fields"
      ),
      reminderType: Yup.string().when(["broadcastType"], {
        is: (broadcastType) => broadcastType == "OfflineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      reminderTime: Yup.string().when(["broadcastType"], {
        is: (broadcastType) => broadcastType == "OfflineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      reminderCycle: Yup.string().when(["broadcastType"], {
        is: (broadcastType) => broadcastType == "OfflineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      reminderFrequency: Yup.string().when(["broadcastType"], {
        is: (broadcastType) => broadcastType == "OfflineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      onlineReminderDays: Yup.string().when(["broadcastType"], {
        is: (broadcastType) => broadcastType == "OnlineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      altleastOne: Yup.boolean().when(["notification", "sms"], {
        is: (notification, sms) => !notification && !sms,
        then: Yup.boolean().required("Please Complete All The Above Fields"),
        otherwise: Yup.boolean(),
      }),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (type === "createRiderCoupon") {
        if (statusBtn === "CreateBroadcast") {
          dispatch(
            sendReviewAction(
              {
                coupon_id: broadcastData?.data?.id,
                is_send_notification: values?.notification,
                notification_title: values?.notificationTitle,
                notification_body: values?.notificationBody,
                is_send_sms: values?.sms,
                sms_header: values?.messageHeader,
                sms_body: values?.messageBody,
                broadcast_type: values?.broadcastType,
                reminder_type: values?.reminderType,
                reminder_time: values?.reminderTime,
                reminder_cycle: values?.reminderCycle,
                reminder_frequency: values?.reminderFrequency,
                reminder_days: values?.onlineReminderDays,
                notification_image: frontImageLink?.img,
              },
              onSuccess,
              onError
            )
          );
        }
      }

      const Data = {
        coupon_id: params?.id ? params?.id : "--",
        coupon_code: reviewBackendData?.coupon_code
          ? reviewBackendData?.coupon_code
          : "--",
        coupon_title: reviewBackendData?.coupon_title
          ? reviewBackendData?.coupon_title
          : "--",
        coupon_description: reviewBackendData?.coupon_description
          ? reviewBackendData?.coupon_description
          : "--",
        account_applicable_limit: reviewBackendData?.account_applicable_limit
          ? reviewBackendData?.account_applicable_limit
          : "--",
        usage_limit_per_account: reviewBackendData?.usage_limit_per_account
          ? reviewBackendData?.usage_limit_per_account
          : "--",
        discount: reviewBackendData?.discount
          ? reviewBackendData?.discount
          : "--",
        max_amount_in_rs: reviewBackendData?.max_amount_in_rs
          ? reviewBackendData?.max_amount_in_rs
          : "--",
        amountoff: reviewBackendData?.amountoff
          ? reviewBackendData?.amountoff
          : "--",
        cashback: reviewBackendData?.cashback
          ? reviewBackendData?.cashback
          : "--",
        max_cashback_in_rs: reviewBackendData?.max_cashback_in_rs
          ? reviewBackendData?.max_cashback_in_rs
          : "--",
        booking_type: reviewBackendData?.booking_type
          ? reviewBackendData?.booking_type
          : "--",

        ride_type: reviewBackendData?.ride_type ?? reviewBackendData?.ride_type,
        ride_type_id:
          reviewBackendData?.ride_type_id ?? reviewBackendData?.ride_type_id,
        // ride_type: {
        //   Bike: reviewBackendData?.ride_type?.Bike
        //     ? reviewBackendData?.ride_type?.Bike
        //     : false,
        //   Auto: reviewBackendData?.ride_type?.Auto
        //     ? reviewBackendData?.ride_type?.Auto
        //     : false,
        //   Mini: reviewBackendData?.ride_type?.Mini
        //     ? reviewBackendData?.ride_type?.Mini
        //     : false,
        //   Sedan: reviewBackendData?.ride_type?.Sedan
        //     ? reviewBackendData?.ride_type?.Sedan
        //     : false,
        //   Suv: reviewBackendData?.ride_type?.Suv
        //     ? reviewBackendData?.ride_type?.Suv
        //     : false,
        //   PremiumSedan: reviewBackendData?.ride_type?.PremiumSedan
        //     ? reviewBackendData?.ride_type?.PremiumSedan
        //     : false,
        //   Luxury: reviewBackendData?.ride_type?.Luxury
        //     ? reviewBackendData?.ride_type?.Luxury
        //     : false,
        //   KaaliPeeli: reviewBackendData?.ride_type?.KaaliPeeli
        //     ? reviewBackendData?.ride_type?.KaaliPeeli
        //     : false,
        //   altleastOne: "",
        // },
        start_date: reviewBackendData?.start_date
          ? reviewBackendData?.start_date
          : "--",
        start_time: reviewBackendData?.start_time
          ? reviewBackendData?.start_time
          : "--",
        expiry_date: reviewBackendData?.expiry_date
          ? reviewBackendData?.expiry_date
          : "--",
        expiry_time: reviewBackendData?.expiry_time
          ? reviewBackendData?.expiry_time
          : "--",
        is_send_notification: values?.notification,
        notification_title: values?.notificationTitle,
        notification_body: values?.notificationBody,
        is_send_sms: values?.sms,
        sms_header: values?.messageHeader,
        sms_body: values?.messageBody,
        broadcast_type: values?.broadcastType,
        reminder_type: values?.reminderType,
        reminder_time: values?.reminderTime,
        reminder_cycle: values?.reminderCycle,
        reminder_frequency: values?.reminderFrequency,
        reminder_days: values?.onlineReminderDays,
        notification_image: frontImageLink?.img,
      };
      if (status === "PendingReview" || status === "ReviewPendingUpdated") {
        if (reviewBackendData?.coupon_classification === "General") {
          dispatch(generalCouponEditAction(Data, onEditSuccess, onEditError));
        } else if (reviewBackendData?.coupon_classification === "NewAccount") {
          dispatch(
            newAccountCouponEditAction(Data, onEditSuccess, onEditError)
          );
        } else if (
          reviewBackendData?.coupon_classification === "NewAccountLifeSpan"
        ) {
          dispatch(
            newAccountLifeSpanCouponEditAction(
              {
                ...Data,
                coupon_life_span: reviewBackendData?.coupon_life_span
                  ? reviewBackendData?.coupon_life_span
                  : "--",
              },
              onEditSuccess,
              onEditError
            )
          );
        } else if (
          reviewBackendData?.coupon_classification === "PaymentMethod"
        ) {
          dispatch(
            paymentMethodCouponEditAction(
              {
                ...Data,
                payment_method: reviewBackendData?.payment_method
                  ? reviewBackendData?.payment_method
                  : "--",
              },
              onEditSuccess,
              onEditError
            )
          );
        } else if (
          reviewBackendData?.coupon_classification === "BookingDestination"
        ) {
          dispatch(
            bookingDestinatinCouponEditAction(
              {
                ...Data,
                booking_pickup_location:
                  reviewBackendData?.booking_pickup_location
                    ? reviewBackendData?.booking_pickup_location
                    : "--",
                booking_destination_type:
                  reviewBackendData?.booking_destination_type
                    ? reviewBackendData?.booking_destination_type
                    : "--",
                booking_destination: reviewBackendData?.booking_destination
                  ? reviewBackendData?.booking_destination
                  : "--",
              },
              onEditSuccess,
              onEditError
            )
          );
        } else if (
          reviewBackendData?.coupon_classification === "PickupToDropoff"
        ) {
          dispatch(
            pickUpDropOffCouponEditAction(
              {
                ...Data,
                pickup_location_type: reviewBackendData?.pickup_location_type
                  ? reviewBackendData?.pickup_location_type
                  : "--",
                pickup_location: reviewBackendData?.pickup_location
                  ? reviewBackendData?.pickup_location
                  : "--",
                dropoff_location: reviewBackendData?.dropoff_location
                  ? reviewBackendData?.dropoff_location
                  : "--",
                dropoff_location_type: reviewBackendData?.dropoff_location_type
                  ? reviewBackendData?.dropoff_location_type
                  : "--",
              },
              onEditSuccess,
              onEditError
            )
          );
        } else if (
          reviewBackendData?.coupon_classification === "BookingDistance"
        ) {
          dispatch(
            bookingDistanceCouponEditAction(
              {
                ...Data,
                booking_distance_milestone:
                  reviewBackendData?.booking_distance_milestone
                    ? reviewBackendData?.booking_distance_milestone
                    : "--",
                booking_distance_range_start:
                  reviewBackendData?.booking_distance_range_start
                    ? reviewBackendData?.booking_distance_range_start
                    : "--",
                booking_distance_range_end:
                  reviewBackendData?.booking_distance_range_end
                    ? reviewBackendData?.booking_distance_range_end
                    : "--",
              },
              onEditSuccess,
              onEditError
            )
          );
        } else if (
          reviewBackendData?.coupon_classification === "RentalPackage"
        ) {
          dispatch(
            rentalPackageCouponEditAction(
              {
                ...Data,
                rental_package_milestone:
                  reviewBackendData?.rental_package_milestone
                    ? reviewBackendData?.rental_package_milestone
                    : "--",
                rental_package_range_start:
                  reviewBackendData?.rental_package_range_start
                    ? reviewBackendData?.rental_package_range_start
                    : "--",
                rental_package_range_end:
                  reviewBackendData?.rental_package_range_end
                    ? reviewBackendData?.rental_package_range_end
                    : "--",
              },
              onEditSuccess,
              onEditError
            )
          );
        } else if (
          reviewBackendData?.coupon_classification ===
          "OutstationPackageDistance"
        ) {
          dispatch(
            outstationPackageCouponEditAction(
              {
                ...Data,
                outstation_package_range_start:
                  reviewBackendData?.outstation_package_range_start
                    ? reviewBackendData?.outstation_package_range_start
                    : "--",
                outstation_package_range_end:
                  reviewBackendData?.outstation_package_range_end
                    ? reviewBackendData?.outstation_package_range_end
                    : "--",
              },
              onEditSuccess,
              onEditError
            )
          );
        }
        if (statusBtn === "Approve") {
          handleCouponPasswordShow();
        }
      } else if (status === "Active") {
        dispatch(
          activeCouponSendReviewAction(
            {
              coupon_id: params?.id ?? "--",
              is_send_notification: values?.notification,
              notification_title: values?.notificationTitle,
              notification_body: values?.notificationBody,
              is_send_sms: values?.sms,
              sms_header: values?.messageHeader,
              sms_body: values?.messageBody,
              broadcast_type: values?.broadcastType,
              reminder_type: values?.reminderType,
              reminder_time: values?.reminderTime,
              reminder_cycle: values?.reminderCycle,
              reminder_frequency: values?.reminderFrequency,
              reminder_days: values?.onlineReminderDays,
              notification_image: frontImageLink?.img,
            },
            onEditSuccess,
            onEditError
          )
        );
      }
    },
  });

  const onSuccess = (data) => {
    successToast(data?.data);
    dispatch(clearReducerRiderCouponAction());
    setLoading(false);
    navigate("/rider-coupons");
  };

  const onError = (data) => {
    setLoading(false);
    // console.log(data);
    errorToast(data?.data?.data);
  };

  const onEditSuccess = (data) => {
    setLoading(false);
    if (formik.initialValues !== formik.values) {
      successToast(data?.message);
      handleChangesMadeShow();
    }
    if (statusBtn === "SendReview") {
      handleChangesMadeShow();
    }
    console.log(data);
  };

  const onEditError = (data) => {
    setReload(!reload);
    setLoading(false);
    errorToast(data?.data?.message);
    console.log(data);
  };

  const backBtn = () => {
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      handleLeavePageShow();
    } else {
      navigate(-1);
    }
  };

  const [couponDetails, setCouponDetails] = useState(false);

  const broadcastType = [
    {
      value: "OfflineMobileApp",
      label: "Offline Mobile Application",
    },
    { value: "OnlineMobileApp", label: "Online Mobile Application" },
  ];

  const reminderType = [
    { value: "None", label: "None" },
    {
      value: "NotificationOnly",
      label: "Notification Only",
      isDisabled: !formik?.values?.notification,
    },
    { value: "SMSOnly", label: "SMS Only", isDisabled: !formik?.values?.sms },
    {
      value: "Both",
      label: "Both",
      isDisabled: !formik?.values?.notification || !formik?.values?.sms,
    },
  ];
  const reminderCycle = [
    { value: "Daily", label: "Daily" },
    { value: "AlternateDays", label: "Alternate Days" },
  ];

  const onlineReminderType = [
    { value: "None", label: "None" },
    { value: "NotificationOnly", label: "Notification Only" },
    { value: "SMSOnly", label: "SMS Only" },
    { value: "Both", label: "Both" },
  ];

  console.log(broadcastData);

  const expiryDate = useExpiryDate(
    reviewBackendData?.coupon_life_span,
    reviewBackendData?.expiry_date,
    reviewBackendData?.expiry_time
  );

  const firstErrorField = Object.keys(formik.errors).find(
    (fieldName) => formik.touched[fieldName] && formik.errors[fieldName]
  );

  console.log(formik.values);

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={changesMadeShow}
        handleSuccessMessageClose={() => {
          handleChangesMadeClose();
        }}
        title={
          statusBtn === "SendReview"
            ? "Successfully sent for Review!"
            : "Changes made Successfully"
        }
      />
      <RiderCouponPassword
        couponPasswordShow={couponPasswordShow}
        handleCouponPasswordClose={handleCouponPasswordClose}
        id={params?.id}
        status={statusBtn}
        title={
          statusBtn === "Approve"
            ? "Are you sure you want to Approve this coupon?"
            : "Are you sure you want to Reject this coupon?"
        }
      />
      <LeavePagemodal
        leavePageShow={leavePageShow}
        handleLeavePageClose={handleLeavePageClose}
        link={-1}
        subsection={true}
      />
      <InnerLayout
        mainHeading={
          reviewBackendData?.coupon_title
            ? reviewBackendData?.coupon_title +
            " - " +
            reviewBackendData?.coupon_code
            : broadcastData?.data?.coupon_title
              ? broadcastData?.data?.coupon_title +
              " - " +
              broadcastData?.data?.coupon_code
              : "--"
        }
        navigateEnable={false}
        naviagteLeave={true}
        navigateFn={backBtn}
        expiryDateShow={true}
        expiryDate={
          fetchLoading
            ? ``
            : type === "createRiderCoupon"
              ? ``
              : `Coupon Exp : ${expiryDate}`
        }
      >
        {fetchLoading ? (
          <LoadingSpinnerTable />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="row  gx-0">
              <div className="col-lg-4">
                {fetchLoading ? (
                  <SpinnerLoading />
                ) : (
                  <CouponBroadcastSidebar
                    broadcastData={broadcastData?.data ?? reviewBackendData}
                  />
                )}
              </div>
              <div className="col-lg-8">
                <div className="discount_detials_container p-3 pe-4 position-relative">
                  {type !== "createRiderCoupon" ?
                    <>
                      <div
                        className="position-absolute top-0 end-0 mt-1 me-3 light_blue_color text_underline fs_14 fw_500 cursor_pointer"
                        onClick={() => setCouponDetails(!couponDetails)}
                      >
                        More Details
                      </div>
                      {couponDetails ? (
                        <>
                          <div className="coupon_details_block border white_bg border_radius">
                            <CouponDetails item={reviewBackendData} />
                          </div>
                        </>
                      ) : null}
                    </> : null}

                  <CouponCheckboxField
                    formikError={formik.errors.altleastOne}
                    formikTouched={formik.touched.altleastOne}
                    itemName="notification"
                    onChangeFn={(e) => {
                      formik.handleChange(e);
                      formik.setFieldValue("reminderType", "")
                    }}
                    labelName="Notifications"
                    formikValue={formik.values.notification}
                    formik={formik}
                    labelColor={
                      formik.values.notification === true ? true : false
                    }
                    inputDisabled={
                      formik?.values?.notification === false ? true : false
                    }
                  />
                  <div className="ps-4 mt-1">
                    {/* <CouponInputField
                      label_font_size="fs_16"
                      labelName="Notification Title*"
                      itemName={"notificationTitle"}
                      inputValue={formik.values.notificationTitle}
                      onChangeFn={formik.handleChange}
                      onBlurFn={formik.handleBlur}
                      formikError={formik.errors.notificationTitle}
                      formikTouched={formik.touched.notificationTitle}
                      placeholder="Enter coupon code"
                      inputDisabled={
                        is_editable === false ||
                        formik?.values?.notification === false
                          ? true
                          : false
                      }
                    /> */}
                    <DraftMessageInput
                      labelName={"Notification Title*"}
                      itemName={"notificationTitle"}
                      formik={formik}
                      formikValue={formik.values.notificationTitle}
                      formikError={formik.errors.notificationTitle}
                      formikTouched={formik.touched.notificationTitle}
                      onBlurFn={formik.handleBlur}
                      disabled={
                        is_editable === false ||
                        formik?.values?.notification === false
                      }
                      is_input={true}
                    />
                    <div className="mt-1">
                      {/* <CouponInputField
                        label_font_size="fs_16"
                        labelName="Notification Body1*"
                        itemName={"notificationBody"}
                        inputValue={formik.values.notificationBody}
                        onChangeFn={formik.handleChange}
                        onBlurFn={formik.handleBlur}
                        formikError={formik.errors.notificationBody}
                        formikTouched={formik.touched.notificationBody}
                        placeholder="Enter coupon description"
                        TextArea={true}
                        input={false}
                        inputDisabled={
                          is_editable === false ||
                          formik?.values?.notification === false
                            ? true
                            : false
                        }
                      /> */}

                      <DraftMessageInput
                        labelName="Notification Body*"
                        itemName={"notificationBody"}
                        formik={formik}
                        formikValue={formik.values.notificationBody}
                        formikError={formik.errors.notificationBody}
                        formikTouched={formik.touched.notificationBody}
                        onBlurFn={formik.handleBlur}
                        disabled={
                          is_editable === false ||
                          formik?.values?.notification === false
                        }
                      />
                    </div>

                    <div className="d-flex align-items-center gap-3 mt-1">
                      <span className={"fs_16 primary_color"}>
                        Notification Image{" "}
                        <span className="primary_color fs_14">(optional)</span>
                      </span>
                      {uploaded || formik.values.Upload.length >= 1 ? (
                        <>
                          <span className="green_color fs_14">
                            Image Uploaded
                          </span>
                          <button
                            className="primary_bg white_color border_radius_5px px-3 border_none"
                            onClick={() =>
                              openInNewTab(
                                uploaded
                                  ? notificationImage
                                  : formik.values.Upload
                              )
                            }
                            type="button"
                          >
                            View
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                      <div className="d-flex">
                        <label
                          className={
                            is_editable === false
                              ? "upload_btn px-2 white_color light_grey_bg border_radius_5px fs_14"
                              : " upload_btn px-2 white_color dark_blue_bg border_radius_5px fs_14"
                          }
                          htmlFor="files"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            id="files"
                            className="upload_document_input cursor_pointer"
                            name="Upload"
                            onChange={(e) => {
                              formik.setFieldValue("Upload", e.target.files[0]);
                              handleNotificationImageChange(e);
                            }}
                            disabled={is_editable === false ? true : false}
                          />
                          {uploaded || formik.values.Upload.length >= 1 ? (
                            <span> Re-upload</span>
                          ) : (
                            <span> Upload</span>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <CouponCheckboxField
                      formikError={formik.errors.altleastOne}
                      formikTouched={formik.touched.altleastOne}
                      itemName="sms"
                      onChangeFn={(e) => {
                        formik.handleChange(e);
                        formik.setFieldValue("reminderType", "")
                      }}
                      labelName="SMS Message"
                      formikValue={formik.values.sms}
                      formik={formik}
                      labelColor={formik.values.sms === true ? true : false}
                      inputDisabled={
                        formik?.values?.sms === false ? true : false
                      }
                    />
                  </div>
                  <div className="ps-4 mt-1">
                    {/* <CouponInputField
                      label_font_size="fs_16"
                      labelName="Message Header*"
                      itemName={"messageHeader"}
                      inputValue={formik.values.messageHeader}
                      onChangeFn={formik.handleChange}
                      onBlurFn={formik.handleBlur}
                      formikError={formik.errors.messageHeader}
                      formikTouched={formik.touched.messageHeader}
                      placeholder="Enter Message Header"
                      inputDisabled={
                        is_editable === false || formik?.values?.sms === false
                          ? true
                          : false
                      }
                    /> */}
                    <DraftMessageInput
                      labelName="Message Header*"
                      itemName={"messageHeader"}
                      formik={formik}
                      formikValue={formik.values.messageHeader}
                      formikError={formik.errors.messageHeader}
                      formikTouched={formik.touched.messageHeader}
                      onBlurFn={formik.handleBlur}
                      disabled={
                        is_editable === false || formik?.values?.sms === false
                      }
                      is_input={true}
                    />
                    <div className="mt-1">
                      {/* <CouponInputField
                        label_font_size="fs_16"
                        labelName="Message Body1*"
                        itemName={"messageBody"}
                        inputValue={formik.values.messageBody}
                        onChangeFn={formik.handleChange}
                        onBlurFn={formik.handleBlur}
                        formikError={formik.errors.messageBody}
                        formikTouched={formik.touched.messageBody}
                        placeholder="Enter Message "
                        TextArea={true}
                        input={false}
                        inputDisabled={
                          is_editable === false || formik?.values?.sms === false
                            ? true
                            : false
                        }
                      /> */}
                      <DraftMessageInput
                        labelName="Message Body*"
                        itemName={"messageBody"}
                        formik={formik}
                        formikValue={formik.values.messageBody}
                        formikError={formik.errors.messageBody}
                        formikTouched={formik.touched.messageBody}
                        onBlurFn={formik.handleBlur}
                        disabled={
                          is_editable === false || formik?.values?.sms === false
                        }
                      />
                    </div>
                  </div>

                  <div className="ps-4 mt-3">
                    <CouponSelectField
                      label_fontSize="fs_16 fw_500 mt-3"
                      labelName="Broadcast Type*"
                      placeholder="Select Broadcast Type"
                      option={broadcastType}
                      itemName="broadcastType"
                      formikValue={formik.values.broadcastType}
                      formik={formik}
                      formikError={formik.errors.broadcastType}
                      formikTouched={formik.touched.broadcastType}
                      selectDisabled={is_editable === false ? true : false}
                    />
                    <div className="row mt-1">
                      <div className=" col-md-3 col-sm-6">
                        <CouponSelectField
                          labelName="Reminder Type*"
                          placeholder="Select reminder type"
                          option={reminderType}
                          itemName="reminderType"
                          formikValue={formik.values.reminderType}
                          formik={formik}
                          formikError={formik.errors.reminderType}
                          formikTouched={formik.touched.reminderType}
                          selectDisabled={is_editable === false ? true : false}
                        />
                      </div>
                      {formik.values.broadcastType === "OfflineMobileApp" && (
                        <>
                          <div className=" col-md-3 col-sm-6">
                            <label
                              className={
                                formik.errors.reminderTime &&
                                  formik.touched.reminderTime
                                  ? "fs_14 red_color"
                                  : "primary_color fs_14"
                              }
                            >
                              Reminder Time*
                            </label>
                            <input
                              type="time"
                              className={
                                formik.errors.reminderTime &&
                                  formik.touched.reminderTime
                                  ? "w-100 border_radius_3px error_border outline_none p-1"
                                  : `${is_editable === false
                                    ? "disabled_border disabled_bg_color secondary_color"
                                    : "primary_border primary_color white_bg"
                                  }w-100 border_radius_3px outline_none p-1`
                              }
                              name="reminderTime"
                              value={formik.values.reminderTime}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              disabled={is_editable === false ? true : false}
                            />
                          </div>

                          <div className=" col-md-3 col-sm-6">
                            <CouponSelectField
                              labelName="Reminder Cycle*"
                              placeholder="Select reminder type"
                              option={reminderCycle}
                              itemName="reminderCycle"
                              formikValue={formik.values.reminderCycle}
                              formik={formik}
                              formikError={formik.errors.reminderCycle}
                              formikTouched={formik.touched.reminderCycle}
                              selectDisabled={
                                is_editable === false ? true : false
                              }
                            />
                          </div>
                        </>
                      )}
                      <div className=" col-md-3 col-sm-6">
                        <CouponInputField
                          labelName="Reminder Frequency*"
                          itemName={"reminderFrequency"}
                          inputValue={formik.values.reminderFrequency}
                          onChangeFn={formik.handleChange}
                          onBlurFn={formik.handleBlur}
                          formikError={formik.errors.reminderFrequency}
                          formikTouched={formik.touched.reminderFrequency}
                          placeholder="Select reminder frequency"
                          inputDisabled={is_editable === false ? true : false}
                        />
                      </div>
                      {formik.values.broadcastType === "OnlineMobileApp" && (
                        <div className=" col-md-4 col-sm-6">
                          <CouponInputField
                            labelName="Reminder Days*"
                            itemName={"onlineReminderDays"}
                            inputValue={formik.values.onlineReminderDays}
                            onChangeFn={formik.handleChange}
                            onBlurFn={formik.handleBlur}
                            formikError={formik.errors.onlineReminderDays}
                            formikTouched={formik.touched.onlineReminderDays}
                            placeholder="Enter reminder days"
                            inputDisabled={is_editable === false ? true : false}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {firstErrorField && (
                  <div className="red_color fs_16 fw_500 ps-3">
                    {formik.errors[firstErrorField]}
                  </div>
                )}
              </div>
            </div>
            {is_editable === false || is_editable === true ? (
              <>
                {status === "Active" ? (
                  <EditReferralBtn
                    is_editable={is_editable}
                    backButton={true}
                    viewBtn={() => {
                      navigate(-1);
                    }}
                    backBtn={backBtn}
                    resetBtn={() => {
                      formik.resetForm();
                      setUploaded(false);
                      // setUploadedStage3(false);
                      // setUploadedStage4(false);
                    }}
                    saveForLater={false}
                    saveViewBtn={() => setStatusBtn("SendReview")}
                    saveAndViewText="Send For Review"
                    viewBtnText="Go Back"
                  />
                ) : (
                  <EditReferralBtn
                    saveLaterBtn={() => setStatusBtn("SaveLater")}
                    is_editable={is_editable}
                    viewBtn={() => {
                      navigate(-1);
                    }}
                    saveAndView={false}
                    backButton={true}
                    backBtn={backBtn}
                    ApproveButton={true}
                    approveBtn={() => setStatusBtn("Approve")}
                    resetBtn={() => {
                      formik.resetForm();
                      setUploaded(false);
                      // setUploadedStage3(false);
                      // setUploadedStage4(false);
                    }}
                    viewBtnText="Go Back"
                    rejectBtn={() => {
                      setStatusBtn("Reject");
                      handleCouponPasswordShow();
                    }}
                  />
                )}
              </>
            ) : (
              <CreateBroadcastBtn
                navigateBtn={backBtn}
                backBtn={true}
                btnText="Send For Review"
                submitBtn={() => setStatusBtn("CreateBroadcast")}
              />
            )}
          </form>
        )}
      </InnerLayout>
    </>
  );
};

export default CouponBroadcastDetails;
