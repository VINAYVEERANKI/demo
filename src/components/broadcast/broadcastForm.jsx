import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CouponInputField from "../form/couponInputField";
import {
  openInNewTab,
  useExpiryDate,
  createBooleanObj,
  PremiumType,
  rideType,
} from "../helper";
import CouponSelectField from "../form/CouponSelectField";
import { useDispatch } from "react-redux";
import { uploadImageCouponAction } from "../../redux/actions/imageUploadAction";
import { useNavigate } from "react-router";
import EditReferralBtn from "../rider-referrals/utilities/edit-referral-btn";
import LeavePagemodal from "../modals/leaveModal";
import SuccessMessagemodal from "../modals/successMessageModal";
import CreateBroadcastBtn from "../rider-referrals/utilities/create-broadcast-btn";
import CouponCheckboxField from "../form/couponCheckboxField";
import DraftMessageInput from "../form/draftMessageInput";
import NotificationImageUpload from "../form/notificationImageUpload";
import BroadCastCampaignInput from "./broadcastCampaignInput";
import {
  driverBroadCastCreateAction,
  reviewReqDriverBroadCastEditAction,
  reviewReqRiderBroadCastEditAction,
  riderBroadCastCreateAction,
} from "../../redux/actions/broadcast/pendandCreateBroadcastAction";
import successToast from "../utilits/successToast";
import errorToast from "../utilits/errorToast";
import moment from "moment";
import BroadcastPasswordModal from "./passwordModal";
import {
  activeDriverBroadCastEditAction,
  activeRiderBroadCastEditAction,
} from "../../redux/actions/broadcast/activeBroadcastAction";
import {
  createdriverIncentiveAction,
  driverIncentivePendingEditAction,
} from "../../redux/actions/incentives/pendingIncentivesAction";
import IncentivePasswordModal from "../incentives/driverIncentives/passwordModal";
import { driverIncentiveActiveEditAction } from "../../redux/actions/incentives/activeIncentivesAction";

const BroadcastForm = ({
  location,
  zone,
  type,
  reload,
  setReload,
  broadcastData,
  status,
  params,
  setInitialBackBtn,
  incentiveData,
  id,
  incentiveType,
}) => {
  console.log(type, "sdasdad");

  const currentPath = window?.location?.pathname;
  const mainPagePath = "/" + currentPath?.split("/")[1];
  const is_editable = location?.state?.edit;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [statusBtn, setStatusBtn] = useState("");

  const notificationData = [];

  const [leavePageShow, setLeavePageShow] = useState(false);
  const handleLeavePageClose = () => setLeavePageShow(false);
  const handleLeavePageShow = () => setLeavePageShow(true);

  const [passwordModalShow, setPasswordModalShow] = useState(false);
  const handlePasswordClose = () => setPasswordModalShow(false);
  const handlePasswordShow = () => setPasswordModalShow(true);

  const [broadcastPasswordShow, setBroadcastPasswordShow] = useState(false);
  const handleBroadcastPasswordClose = () => setBroadcastPasswordShow(false);
  const handleBroadcastPasswordShow = () => setBroadcastPasswordShow(true);

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    if (statusBtn === "SendReview") {
      navigate(`${mainPagePath}`);
    }
    setSuccessMessageShow(false);
    setReload(!reload);
  };
  console.log(mainPagePath);
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

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
  }, []);

  function handleNotificationImageChange(e) {
    if (e.target?.files?.length !== 0) {
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

  const campaign_period =
    location?.state?.campaign_period ?? incentiveData?.campaign_period;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: type ?? "",
      user_type: "Rider",
      broadcast_applicable_zone: zone ? zone?.join(",")?.split(",") : [],
      start_date: broadcastData?.start_date
        ? moment(broadcastData?.start_date).format("YYYY-MM-DD")
        : "",
      start_time: broadcastData?.start_time ? broadcastData?.start_time : "",
      expiry_date: broadcastData?.expiry_date
        ? moment(broadcastData?.expiry_date).format("YYYY-MM-DD")
        : "",
      expiry_time: broadcastData?.expiry_time ? broadcastData?.expiry_time : "",
      is_send_notification:
        incentiveData?.is_notification ??
        broadcastData?.is_send_notification ??
        false,
      notification_title:
        incentiveData?.notification_title ??
        broadcastData?.notification_title ??
        "",
      notification_body:
        incentiveData?.notification_body ??
        broadcastData?.notification_body ??
        "",
      notification_image:
        incentiveData?.notification_image ??
        broadcastData?.notification_image ??
        "",
      is_send_sms_message:
        incentiveData?.is_send_sms_message ??
        broadcastData?.is_send_sms_message ??
        false,
      message_header:
        incentiveData?.message_title ?? broadcastData?.message_title ?? "",
      message_body:
        incentiveData?.message_body ?? broadcastData?.message_body ?? "",
      message_broadcast_type:
        incentiveData?.message_broadcast_type ??
        broadcastData?.message_broadcast_type ??
        "",
      message_reminder_type:
        incentiveData?.message_reminder_type ??
        broadcastData?.message_reminder_type ??
        "",
      message_reminder_time:
        incentiveData?.message_reminder_time ??
        broadcastData?.message_reminder_time ??
        "",
      message_reminder_cycle:
        incentiveData?.message_reminder_cycle ??
        broadcastData?.message_reminder_cycle ??
        "",
      message_reminder_frequency:
        incentiveData?.message_reminder_frequency ??
        broadcastData?.message_reminder_frequency ??
        "",
      message_reminder_days:
        incentiveData?.message_reminder_days ??
        broadcastData?.message_reminder_days ??
        "",
      altleastOne: "",
    },

    validationSchema: Yup.object().shape({
      is_send_notification: Yup.bool(),
      notification_title: Yup.string().when("is_send_notification", {
        is: true,
        then: Yup.string().required(
          "notificationTitle is Please Complete All The Above Fields"
        ),
      }),
      notification_body: Yup.string().when("is_send_notification", {
        is: true,
        then: Yup.string().required(
          "notificationBody is Please Complete All The Above Fields"
        ),
      }),
      is_send_sms_message: Yup.bool(),
      message_header: Yup.string().when("is_send_sms_message", {
        is: true,
        then: Yup.string().required("Please Complete All The Above Fields"),
      }),
      message_body: Yup.string().when("is_send_sms_message", {
        is: true,
        then: Yup.string().required("Please Complete All The Above Fields"),
      }),
      message_broadcast_type: Yup.string().required(
        "Please Complete All The Above Fields"
      ),
      message_reminder_type: Yup.string().when(["message_broadcast_type"], {
        is: (message_broadcast_type) =>
          message_broadcast_type == "OfflineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      message_reminder_time: Yup.string().when(["message_broadcast_type"], {
        is: (message_broadcast_type) =>
          message_broadcast_type == "OfflineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      message_reminder_cycle: Yup.string().when(["message_broadcast_type"], {
        is: (message_broadcast_type) =>
          message_broadcast_type == "OfflineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      message_reminder_frequency: Yup.string().when(
        ["message_broadcast_type"],
        {
          is: (message_broadcast_type) =>
            message_broadcast_type == "OfflineMobileApp",
          then: Yup.string().required("Please Complete All The Above Fields"),
          otherwise: Yup.string(),
        }
      ),
      message_reminder_days: Yup.string().when(["message_broadcast_type"], {
        is: (message_broadcast_type) =>
          message_broadcast_type == "OnlineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      start_date: Yup.string().when("type", {
        is: (val) => val !== "driverIncentives",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string().notRequired(), // else it is not required
      }),
      start_time: Yup.string().when("type", {
        is: (val) => val !== "driverIncentives",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string().notRequired(),
      }),
      expiry_date: Yup.string().when("type", {
        is: (val) => val !== "driverIncentives",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string().notRequired(),
      }),
      // expiry_time: Yup.string().when("type", {
      //   is: (val) => val !== "driverIncentives",
      //   then: Yup.string().required("Please Complete All The Above Fields"),
      //   otherwise: Yup.string().notRequired(),
      // }),

      
      // expiry_time: Yup.string()
      //   .when(
      //     ["type", "start_date", "expiry_date"],
      //     (type, start_date, expiry_date, schema) => {
      //       const isDriverIncentives = type === "driverIncentives";
      //       const isSameDate =
      //         start_date && expiry_date && start_date === expiry_date;

      //       if (isDriverIncentives || !isSameDate) {
      //         return schema.notRequired();
      //       }
      //       return schema.test({
      //         name: "pp",
      //         message: "ww",
      //         test: function (value) {
      //           const startDate = this.resolve.Yup.ref("start_time");
      //           return value > startDate;
      //         },
      //       });
      //     }
      //   )
      //   .required("Please Complete All The Above Fields"),

      expiry_time: Yup.string()
        .when(
          ["type", "start_date", "expiry_date"],
          (type, start_date, expiry_date, schema) => {
            const isDriverIncentives = type === "driverIncentives";
            const isSameDate =
              start_date && expiry_date && start_date === expiry_date;

            if (isDriverIncentives || !isSameDate) {
              return schema.notRequired();
            }
            return schema.test({
              name: "greaterThanStartTime",
              message: "Expiry time should be greater than start time",
              test: function (value) {
                const startTime = this.resolve(Yup.ref("start_time"));
                return value > startTime;
              },
            });
          }
        )
        .when("type", {
          is: (val) => val !== "driverIncentives",
          then: Yup.string().required("Please Complete All The Above Fields"),
        })
        .required("Please Complete All The Above Fields"),

      altleastOne: Yup.boolean().when(
        ["is_send_notification", "is_send_sms_message"],
        {
          is: (is_send_notification, is_send_sms_message) =>
            !is_send_notification && !is_send_sms_message,
          then: Yup.boolean().required("Atleast one is required"),
          otherwise: Yup.boolean(),
        }
      ),
    }),

    onSubmit: (values) => {
      console.log(values, "values");
      const reviewReqData = {
        broadcast_id: params?.id,
        start_date: values?.start_date,
        start_time: values?.start_time,
        expiry_date: values?.expiry_date,
        expiry_time: values?.expiry_time,
        is_send_notification: values?.is_send_notification,
        notification_title: values?.notification_title,
        notification_body: values?.notification_body,
        notification_image: frontImageLink?.img,
        is_send_sms_message: values?.is_send_sms_message,
        message_header: values?.message_header,
        message_body: values?.message_body,
        message_broadcast_type: values?.message_broadcast_type,
        message_reminder_type: values?.message_reminder_type,
        message_reminder_time:
          values?.message_reminder_time === ""
            ? null
            : values?.message_reminder_time,
        message_reminder_cycle: values?.message_reminder_cycle,
        message_reminder_frequency:
          values?.message_reminder_frequency === ""
            ? null
            : values?.message_reminder_frequency,
        message_reminder_days:
          values?.message_reminder_days === ""
            ? null
            : values?.message_reminder_days,
      };

      if (type === "Rider") {
        if (status === "PendingReview" || status === "ReviewPendingUpdated") {
          setLoading(true);
          dispatch(
            reviewReqRiderBroadCastEditAction(reviewReqData, onSuccess, onError)
          );
        } else if (status === "Active") {
          setLoading(true);
          dispatch(
            activeRiderBroadCastEditAction(
              {
                broadcast_id: params?.id,
                expiry_date: values?.expiry_date,
                expiry_time: values?.expiry_time,
                is_send_notification: values?.is_send_notification,
                notification_title: values?.notification_title,
                notification_body: values?.notification_body,
                notification_image: frontImageLink?.img,
                is_send_sms_message: values?.is_send_sms_message,
                message_header: values?.message_header,
                message_body: values?.message_body,
                message_broadcast_type: values?.message_broadcast_type,
                message_reminder_type: values?.message_reminder_type,
                message_reminder_time: values?.message_reminder_time,
                message_reminder_cycle: values?.message_reminder_cycle,
                message_reminder_frequency:
                  values?.message_reminder_frequency === ""
                    ? null
                    : values?.message_reminder_frequency,
                message_reminder_days:
                  values?.message_reminder_days === ""
                    ? null
                    : values?.message_reminder_days,
              },
              onSuccess,
              onError
            )
          );
        } else {
          setLoading(true);
          dispatch(
            riderBroadCastCreateAction(
              {
                user_type: "Rider",
                broadcast_applicable_zone: values?.broadcast_applicable_zone,
                start_date: values?.start_date,
                start_time: values?.start_time,
                expiry_date: values?.expiry_date,
                expiry_time: values?.expiry_time,
                is_send_notification: values?.is_send_notification,
                notification_title: values?.notification_title,
                notification_body: values?.notification_body,
                notification_image: frontImageLink?.img,
                is_send_sms_message: values?.is_send_sms_message,
                message_header: values?.message_header,
                message_body: values?.message_body,
                message_broadcast_type: values?.message_broadcast_type,
                message_reminder_type: values?.message_reminder_type,
                message_reminder_time: values?.message_reminder_time,
                message_reminder_cycle: values?.message_reminder_cycle,
                message_reminder_frequency:
                  values?.message_reminder_frequency === ""
                    ? null
                    : values?.message_reminder_frequency,
                message_reminder_days:
                  values?.message_reminder_days === ""
                    ? null
                    : values?.message_reminder_days,
              },
              onSuccess,
              onError
            )
          );
        }
      } else if (type === "Driver") {
        if (status === "PendingReview" || status === "ReviewPendingUpdated") {
          setLoading(true);
          dispatch(
            reviewReqDriverBroadCastEditAction(
              reviewReqData,
              onSuccess,
              onError
            )
          );
        } else if (status === "Active") {
          setLoading(true);
          dispatch(
            activeDriverBroadCastEditAction(
              {
                broadcast_id: params?.id,
                expiry_date: values?.expiry_date,
                expiry_time: values?.expiry_time,
                is_send_notification: values?.is_send_notification,
                notification_title: values?.notification_title,
                notification_body: values?.notification_body,
                notification_image: frontImageLink?.img,
                is_send_sms_message: values?.is_send_sms_message,
                message_header: values?.message_header,
                message_body: values?.message_body,
                message_broadcast_type: values?.message_broadcast_type,
                message_reminder_type: values?.message_reminder_type,
                message_reminder_time: values?.message_reminder_time,
                message_reminder_cycle: values?.message_reminder_cycle,
                message_reminder_frequency:
                  values?.message_reminder_frequency === ""
                    ? null
                    : values?.message_reminder_frequency,
                message_reminder_days:
                  values?.message_reminder_days === ""
                    ? null
                    : values?.message_reminder_days,
              },
              onSuccess,
              onError
            )
          );
        } else {
          setLoading(true);
          dispatch(
            driverBroadCastCreateAction(
              {
                user_type: "Driver",
                driver_type: createBooleanObj(
                  PremiumType,
                  location?.state?.driver_type
                ),
                driver_default_ride_type:
                  //  createBooleanObj(
                  // rideType,
                  location.state?.driver_default_ride_type,
                // ),
                broadcast_applicable_zone: values?.broadcast_applicable_zone,
                start_date: values?.start_date,
                start_time: values?.start_time,
                expiry_date: values?.expiry_date,
                expiry_time: values?.expiry_time,
                is_send_notification: values?.is_send_notification,
                notification_title: values?.notification_title,
                notification_body: values?.notification_body,
                notification_image: frontImageLink?.img,
                is_send_sms_message: values?.is_send_sms_message,
                message_header: values?.message_header,
                message_body: values?.message_body,
                message_broadcast_type: values?.message_broadcast_type,
                message_reminder_type: values?.message_reminder_type,
                message_reminder_time: values?.message_reminder_time,
                message_reminder_cycle: values?.message_reminder_cycle,
                message_reminder_frequency:
                  values?.message_reminder_frequency === ""
                    ? null
                    : values?.message_reminder_frequency,
                message_reminder_days:
                  values?.message_reminder_days === ""
                    ? null
                    : values?.message_reminder_days,
              },
              onSuccess,
              onError
            )
          );
        }
      } else if (
        type === "driverIncentives" &&
        incentiveType === "createIncentive"
      ) {
        const driverIncentiveCreateForDaily = {
          user_type: location.state.user_type,
          incentive_classification: location.state.incentive_classification,
          incentive_applicable_zone: location.state.incentive_applicable_zone,
          driver_default_ride_type: location.state.driver_default_ride_type,
          driver_type: location.state.driver_type,
          incentive_coupon_type: location.state.incentive_coupon_type,
          booking_type: location.state.booking_type,
          campaign_period: location.state.campaign_period,
          incentive_time_slots1: [
            ...location.state?.incentive_time_slots1?.slots,
            {
              start_time: location.state?.incentive_time_slots1?.start_time,
              expiry_time: location.state?.incentive_time_slots1?.expiry_time,
            },
          ],
          incentive_time_slots2: location.state?.incentive_time_slots2
            ?.start_time
            ? [
                ...location.state?.incentive_time_slots2?.slots,
                {
                  start_time: location.state?.incentive_time_slots2?.start_time,
                  expiry_time:
                    location.state?.incentive_time_slots2?.expiry_time,
                },
              ]
            : [],
          incentive_time_slots3: location.state?.incentive_time_slots3
            ?.start_time
            ? [
                ...location.state?.incentive_time_slots3?.slots,
                {
                  start_time: location.state?.incentive_time_slots3?.start_time,
                  expiry_time:
                    location.state?.incentive_time_slots3?.expiry_time,
                },
              ]
            : [],
          campaign_day: location.state.campaign_day,
          campaign_dates: location.state.campaign_dates,
          is_notification: values?.is_send_notification,
          notification_title: values?.notification_title,
          notification_body: values?.notification_body,
          notification_image: frontImageLink.img,
          is_send_sms_message: values?.is_send_sms_message,
          message_title: values?.message_header,
          message_body: values?.message_body,
          message_broadcast_type: values?.message_broadcast_type,
          message_reminder_type: values?.message_reminder_type,
          message_reminder_frequency:
            values?.message_reminder_frequency === ""
              ? null
              : values?.message_reminder_frequency,
          message_reminder_days:
            values?.message_reminder_days === ""
              ? null
              : values?.message_reminder_days,
          message_reminder_time:
            values?.message_reminder_time === ""
              ? null
              : values?.message_reminder_time,
          message_reminder_cycle: values?.message_reminder_cycle,
        };
        const driverIncentiveCreateForWeekly = {
          user_type: location.state.user_type,
          incentive_classification: location.state.incentive_classification,
          incentive_applicable_zone: location.state.incentive_applicable_zone,
          driver_default_ride_type: location.state.driver_default_ride_type,
          driver_type: location.state.driver_type,
          incentive_coupon_type: location.state.incentive_coupon_type,
          booking_type: location.state.booking_type,
          campaign_period: location.state.campaign_period,
          incentive_time_slots1: [
            ...location.state?.incentive_time_slots1?.slots,
            {
              days_selected:
                location.state?.incentive_time_slots1?.days_selected,
              start_time: location.state?.incentive_time_slots1?.start_time,
              expiry_time: location.state?.incentive_time_slots1?.expiry_time,
            },
          ],
          incentive_time_slots2:
            location.state?.incentive_time_slots2?.days_selected?.length > 0
              ? [
                  ...location.state?.incentive_time_slots2?.slots,
                  {
                    days_selected:
                      location.state?.incentive_time_slots2?.days_selected,
                    start_time:
                      location.state?.incentive_time_slots2?.start_time,
                    expiry_time:
                      location.state?.incentive_time_slots2?.expiry_time,
                  },
                ]
              : [],
          incentive_time_slots3:
            location.state?.incentive_time_slots3?.days_selected?.length > 0
              ? [
                  ...location.state?.incentive_time_slots3?.slots,
                  {
                    days_selected:
                      location.state?.incentive_time_slots3?.days_selected,
                    start_time:
                      location.state?.incentive_time_slots3?.start_time,
                    expiry_time:
                      location.state?.incentive_time_slots3?.expiry_time,
                  },
                ]
              : [],
          campaign_dates: location.state.campaign_dates,
          is_notification: values?.is_send_notification,
          notification_title: values?.notification_title,
          notification_body: values?.notification_body,
          notification_image: frontImageLink.img,
          is_send_sms_message: values?.is_send_sms_message,
          message_title: values?.message_header,
          message_body: values?.message_body,
          message_broadcast_type: values?.message_broadcast_type,
          message_reminder_type: values?.message_reminder_type,
          message_reminder_frequency: values?.message_reminder_frequency,
          message_reminder_days:
            values?.message_reminder_days === ""
              ? null
              : values?.message_reminder_days,
          message_reminder_time:
            values?.message_reminder_time === ""
              ? null
              : values?.message_reminder_time,
          message_reminder_cycle: values?.message_reminder_cycle ?? null,
        };
        setLoading(true);
        dispatch(
          createdriverIncentiveAction(
            location.state.campaign_period === "Daily"
              ? driverIncentiveCreateForDaily
              : driverIncentiveCreateForWeekly,
            onSuccess,
            onError
          )
        );
      }
      if (incentiveType === "reviewRequired") {
        const driverIncentiveForDaily = {
          incentive_id: id,
          booking_type: location?.state?.booking_type,
          incentive_time_slots1: [
            ...location?.state?.incentive_time_slots1?.slots,
            {
              start_time: location?.state?.incentive_time_slots1?.start_time,
              expiry_time: location?.state?.incentive_time_slots1?.expiry_time,
            },
          ],
          incentive_time_slots2: location?.state?.incentive_time_slots2
            ?.start_time
            ? [
                ...location?.state?.incentive_time_slots2?.slots,
                {
                  start_time:
                    location?.state?.incentive_time_slots2?.start_time,
                  expiry_time:
                    location?.state?.incentive_time_slots2?.expiry_time,
                },
              ]
            : [],
          incentive_time_slots3: location.state?.incentive_time_slots3
            ?.start_time
            ? [
                ...location?.state?.incentive_time_slots3?.slots,
                {
                  start_time:
                    location?.state?.incentive_time_slots3?.start_time,
                  expiry_time:
                    location?.state?.incentive_time_slots3?.expiry_time,
                },
              ]
            : [],
          campaign_dates: location.state.campaign_dates,
          is_notification: values?.is_send_notification,
          notification_title: values?.notification_title,
          notification_body: values?.notification_body,
          notification_image: frontImageLink.img,
          is_send_sms_message: values?.is_send_sms_message,
          message_title: values?.message_header,
          message_body: values?.message_body,
          message_broadcast_type: values?.message_broadcast_type,
          message_reminder_type: values?.message_reminder_type,
          message_reminder_frequency: values?.message_reminder_frequency,
          message_reminder_days:
            values?.message_reminder_days === ""
              ? null
              : values?.message_reminder_days,
          message_reminder_time:
            values?.message_reminder_time === ""
              ? null
              : values?.message_reminder_time,
          message_reminder_cycle: values?.message_reminder_cycle ?? null,
        };
        const driverIncentiveForWeekly = {
          incentive_id: id,
          booking_type: location?.state?.booking_type,
          incentive_time_slots1: [
            ...location.state?.incentive_time_slots1?.slots,
            {
              days_selected:
                location.state?.incentive_time_slots1?.days_selected,
              start_time: location.state?.incentive_time_slots1?.start_time,
              expiry_time: location.state?.incentive_time_slots1?.expiry_time,
            },
          ],
          incentive_time_slots2:
            location.state?.incentive_time_slots2?.days_selected?.length > 0
              ? [
                  ...location.state?.incentive_time_slots2?.slots,
                  {
                    days_selected:
                      location.state?.incentive_time_slots2?.days_selected,
                    start_time:
                      location.state?.incentive_time_slots2?.start_time,
                    expiry_time:
                      location.state?.incentive_time_slots2?.expiry_time,
                  },
                ]
              : [],
          incentive_time_slots3:
            location.state?.incentive_time_slots3?.days_selected?.length > 0
              ? [
                  ...location.state?.incentive_time_slots3?.slots,
                  {
                    days_selected:
                      location.state?.incentive_time_slots3?.days_selected,
                    start_time:
                      location.state?.incentive_time_slots3?.start_time,
                    expiry_time:
                      location.state?.incentive_time_slots3?.expiry_time,
                  },
                ]
              : [],
          campaign_dates: location.state.campaign_dates,
          is_notification: values?.is_send_notification,
          notification_title: values?.notification_title,
          notification_body: values?.notification_body,
          notification_image: frontImageLink.img,
          is_send_sms_message: values?.is_send_sms_message,
          message_title: values?.message_header,
          message_body: values?.message_body,
          message_broadcast_type: values?.message_broadcast_type,
          message_reminder_type: values?.message_reminder_type,
          message_reminder_frequency: values?.message_reminder_frequency,
          message_reminder_days:
            values?.message_reminder_days === ""
              ? null
              : values?.message_reminder_days,
          message_reminder_time:
            values?.message_reminder_time === ""
              ? null
              : values?.message_reminder_time,
          message_reminder_cycle: values?.message_reminder_cycle ?? null,
        };
        dispatch(
          driverIncentivePendingEditAction(
            campaign_period === "Daily"
              ? driverIncentiveForDaily
              : driverIncentiveForWeekly,
            onEditSuccess,
            onEditError
          )
        );
      } else if (incentiveType === "Approved") {
        dispatch(
          driverIncentiveActiveEditAction(
            {
              incentive_id: id,
              campaign_dates: location.state.campaign_dates,
              is_notification: values?.is_send_notification,
              notification_title: values?.notification_title,
              notification_body: values?.notification_body,
              notification_image: frontImageLink.img,
              is_send_sms_message: values?.is_send_sms_message,
              message_title: values?.message_header,
              message_body: values?.message_body,
              message_broadcast_type: values?.message_broadcast_type,
              message_reminder_type: values?.message_reminder_type,
              message_reminder_frequency: values?.message_reminder_frequency,
              message_reminder_days:
                values?.message_reminder_days === ""
                  ? null
                  : values?.message_reminder_days,
              message_reminder_time:
                values?.message_reminder_time === ""
                  ? null
                  : values?.message_reminder_time,
              message_reminder_cycle: values?.message_reminder_cycle ?? null,
            },
            onEditSuccess,
            onEditError
          )
        );
      }
    },
  });

  const onSuccess = (data) => {
    setLoading(false);
    console.log(data?.message);

    if (statusBtn === "Approve") {
    } else {
      successToast(data?.message);
      handleSuccessMessageShow();
    }
  };

  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
  };

  const onEditSuccess = (data) => {
    console.log(data);
    if (statusBtn === "SaveLater") {
      if (status === "PendingReview" || status === "ReviewPendingUpdated") {
        if (
          JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
        ) {
          handleSuccessMessageShow();
        }
      }
    } else if (statusBtn === "SendReview") {
      handleSuccessMessageShow();
    }
  };
  const onEditError = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      setInitialBackBtn(true);
    } else {
      setInitialBackBtn(false);
    }
  }, [formik.values]);

  const backBtn = () => {
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      handleLeavePageShow();
    } else {
      navigate(-1);
    }
  };

  const broadcastType = [
    {
      value: "OfflineMobileApp",
      label: "Offline Mobile Application",
    },
    { value: "OnlineMobileApp", label: "Online Mobile Application" },
  ];

  const reminderType = [
    { value: "None", label: "None" },
    { value: "NotificationOnly", label: "Notification Only" },
    { value: "SMSOnly", label: "SMS Only" },
    { value: "Both", label: "Both" },
  ];

  const reminderCycle = [
    { value: "Daily", label: "Daily" },
    { value: "AlternateDays", label: "Alternate Days" },
  ];

  // const expiryDate = useExpiryDate(
  //   reviewBackendData?.coupon_life_span,
  //   reviewBackendData?.expiry_date,
  //   reviewBackendData?.expiry_time
  // );

  console.log(type, "asdasdada");
  console.log(status, "status");

  function openPasswordModalFn() {
    if (incentiveType) {
      handlePasswordShow();
    } else {
      handleBroadcastPasswordShow();
    }
  }

  const firstErrorField = Object.keys(formik.errors).find(
    (fieldName) => formik.touched[fieldName] && formik.errors[fieldName]
  );

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={
          statusBtn === "SendReview"
            ? "Successfully sent for Review!"
            : "Changes made Successfully"
        }
      />
      <IncentivePasswordModal
        passwordModalShow={passwordModalShow}
        handlePasswordClose={handlePasswordClose}
        id={id}
        status={statusBtn}
        title={
          statusBtn === "Approve"
            ? "Are you sure you want to Approve this Incentive?"
            : statusBtn === "Reject"
            ? "Are you sure you want to Reject this Incentive"
            : "Are you sure you want to Delete this Incentive?"
        }
        type={type}
      />

      <BroadcastPasswordModal
        passwordModalShow={broadcastPasswordShow}
        handlePasswordClose={handleBroadcastPasswordClose}
        id={params?.id}
        status={statusBtn}
        title={
          statusBtn === "Approve"
            ? "Are you sure you want to Approve this Broadcast?"
            : statusBtn === "Reject"
            ? "Are you sure you want to reject this Broadcast?"
            : "Are you sure you want to Delete this Broadcast?"
        }
        type={type}
      />
      <LeavePagemodal
        leavePageShow={leavePageShow}
        handleLeavePageClose={handleLeavePageClose}
        link={-1}
        subsection={true}
      />

      <form onSubmit={formik.handleSubmit}>
        <>
          {type !== "driverIncentives" && (
            <BroadCastCampaignInput
              broadcastData={broadcastData}
              formik={formik}
              campaignStatus={broadcastData?.campaign_status}
              is_editable={is_editable}
              status={status}
            />
          )}

          <div className="discount_detials_container p-3 pe-4 mt-2">
            <CouponCheckboxField
              formikError={formik.errors.altleastOne}
              formikTouched={formik.touched.altleastOne}
              itemName="is_send_notification"
              onChangeFn={formik.handleChange}
              labelName="Notifications"
              formikValue={formik.values.is_send_notification}
              formik={formik}
              labelColor={
                formik.values.is_send_notification === true ? true : false
              }
              disabled={is_editable === false}
            />
            <div className="ps-4 mt-1">
              <DraftMessageInput
                labelName={"Notification Title*"}
                itemName={"notification_title"}
                formik={formik}
                formikValue={formik.values.notification_title}
                formikError={formik.errors.notification_title}
                formikTouched={formik.touched.notification_title}
                onBlurFn={formik.handleBlur}
                disabled={
                  is_editable === false ||
                  formik?.values?.is_send_notification === false
                }
                is_input={true}
              />
              <div className="mt-1">
                <DraftMessageInput
                  labelName="Notification Body*"
                  itemName={"notification_body"}
                  formik={formik}
                  formikValue={formik.values.notification_body}
                  formikError={formik.errors.notification_body}
                  formikTouched={formik.touched.notification_body}
                  onBlurFn={formik.handleBlur}
                  disabled={
                    is_editable === false ||
                    formik?.values?.is_send_notification === false
                  }
                />
              </div>

              <NotificationImageUpload
                setFieldValue={formik?.setFieldValue}
                uploaded={uploaded}
                notificationImage={notificationImage}
                is_editable={is_editable}
                handleNotificationImageChange={handleNotificationImageChange}
                formikValue={formik?.values?.notification_image}
                itemName={"notification_image"}
              />
            </div>

            <div className="mt-3">
              <CouponCheckboxField
                formikError={formik.errors.altleastOne}
                formikTouched={formik.touched.altleastOne}
                itemName="is_send_sms_message"
                onChangeFn={formik.handleChange}
                labelName="SMS Message"
                formikValue={formik.values.is_send_sms_message}
                formik={formik}
                labelColor={
                  formik.values.is_send_sms_message === true ? true : false
                }
                disabled={is_editable === false}
              />
            </div>
            <div className="ps-4 mt-1">
              <DraftMessageInput
                labelName="Message Header*"
                itemName={"message_header"}
                formik={formik}
                formikValue={formik.values.message_header}
                formikError={formik.errors.message_header}
                formikTouched={formik.touched.message_header}
                onBlurFn={formik.handleBlur}
                disabled={
                  is_editable === false ||
                  formik?.values?.is_send_sms_message === false
                }
                is_input={true}
              />
              <div className="mt-1">
                <DraftMessageInput
                  labelName="Message Body*"
                  itemName={"message_body"}
                  formik={formik}
                  formikValue={formik.values.message_body}
                  formikError={formik.errors.message_body}
                  formikTouched={formik.touched.message_body}
                  onBlurFn={formik.handleBlur}
                  disabled={
                    is_editable === false ||
                    formik?.values?.is_send_sms_message === false
                  }
                />
              </div>
            </div>

            <div className="ps-4 mt-3">
              <CouponSelectField
                labelName="Broadcast Type*"
                placeholder="Select Broadcast Type"
                option={broadcastType}
                itemName="message_broadcast_type"
                formikValue={formik.values.message_broadcast_type}
                formik={formik}
                formikError={formik.errors.message_broadcast_type}
                formikTouched={formik.touched.message_broadcast_type}
                selectDisabled={is_editable === false ? true : false}
              />
              <div className="row mt-1">
                <div className=" col-md-3 col-sm-6">
                  <CouponSelectField
                    labelName="Reminder Type*"
                    placeholder="Select reminder type"
                    option={reminderType}
                    itemName="message_reminder_type"
                    formikValue={formik.values.message_reminder_type}
                    formik={formik}
                    formikError={formik.errors.message_reminder_type}
                    formikTouched={formik.touched.message_reminder_type}
                    selectDisabled={is_editable === false ? true : false}
                  />
                </div>
                {formik.values.message_broadcast_type ===
                  "OfflineMobileApp" && (
                  <>
                    <div className="col-md-3 col-sm-6 d-flex flex-column">
                      <label
                        className={
                          formik.errors.message_reminder_time &&
                          formik.touched.message_reminder_time
                            ? "fs_14 red_color"
                            : "primary_color fs_14"
                        }
                      >
                        Reminder Time*
                      </label>
                      <input
                        type="time"
                        className={
                          formik.errors.message_reminder_time &&
                          formik.touched.message_reminder_time
                            ? "w-100 border_radius_3px error_border outline_none p-1"
                            : `${
                                is_editable === false
                                  ? "disabled_border disabled_bg_color secondary_color"
                                  : "primary_border primary_color white_bg"
                              }w-100 border_radius_3px outline_none p-1`
                        }
                        name="message_reminder_time"
                        value={formik.values.message_reminder_time}
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
                        itemName="message_reminder_cycle"
                        formikValue={formik.values.message_reminder_cycle}
                        formik={formik}
                        formikError={formik.errors.message_reminder_cycle}
                        formikTouched={formik.touched.message_reminder_cycle}
                        selectDisabled={is_editable === false ? true : false}
                      />
                    </div>
                  </>
                )}
                <div className=" col-md-3 col-sm-6">
                  <CouponInputField
                    labelName="Reminder Frequency*"
                    itemName={"message_reminder_frequency"}
                    inputValue={formik.values.message_reminder_frequency}
                    onChangeFn={formik.handleChange}
                    onBlurFn={formik.handleBlur}
                    formikError={formik.errors.message_reminder_frequency}
                    formikTouched={formik.touched.message_reminder_frequency}
                    placeholder="Select reminder frequency"
                    inputDisabled={is_editable === false ? true : false}
                  />
                </div>
                {formik.values.message_broadcast_type === "OnlineMobileApp" && (
                  <div className=" col-md-4 col-sm-6">
                    <CouponInputField
                      labelName="Reminder Days*"
                      itemName={"message_reminder_days"}
                      inputValue={formik.values.message_reminder_days}
                      onChangeFn={formik.handleChange}
                      onBlurFn={formik.handleBlur}
                      formikError={formik.errors.message_reminder_days}
                      formikTouched={formik.touched.message_reminder_days}
                      placeholder="Enter reminder days"
                      inputDisabled={is_editable === false ? true : false}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>

        {/* {type === "Rider" || type === "Driver" ? (
          <>
          <CreateBroadcastBtn/>
          </>
        ) : ( */}

        {firstErrorField && (
          <div className="red_color fs_16 fw_500">
            {formik.errors[firstErrorField]}
          </div>
        )}
        <>
          {incentiveType !== "createIncentive" &&
          (is_editable === false || is_editable === true) ? (
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
                  }}
                  saveForLater={false}
                  saveViewBtn={() => setStatusBtn("SendReview")}
                  saveAndViewText="Send For Review"
                  viewBtnText="Go Back"
                  DeleteButton={true}
                  deleteBtnFn={() => {
                    setStatusBtn("Delete");
                    openPasswordModalFn();
                  }}
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
                  approveBtn={() => {
                    setStatusBtn("Approve");
                    openPasswordModalFn();
                  }}
                  resetBtn={() => {
                    formik.resetForm();
                    setUploaded(false);
                  }}
                  viewBtnText="Go Back"
                  rejectBtn={() => {
                    setStatusBtn("Reject");
                    openPasswordModalFn();
                  }}
                />
              )}
            </>
          ) : (
            <CreateBroadcastBtn
              navigateBtn={backBtn}
              backBtn={true}
              btnText="Send For Review"
              submitBtn={() => setStatusBtn("SendReview")}
            />
          )}
        </>
        {/* )} */}
      </form>
    </>
  );
};

export default BroadcastForm;
