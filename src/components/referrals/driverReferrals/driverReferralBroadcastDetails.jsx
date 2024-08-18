import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  insertSpaces,
  removeUnderScoreInArray,
  urlRegex,
  useExpiryDate,
} from "../../helper";
import InnerLayout from "../../layout/innerLayout";
import LeavePagemodal from "../../modals/leaveModal";
import { useNavigate } from "react-router";
import ReferralBroadcastStage1 from "../riderReferrals/broadcast-stage1";
import ReferralBroadcastStage2 from "../riderReferrals/broadcast-stage2";
import ReferralBroadcastStage3 from "../riderReferrals/broadcast-stage3";
import ReferralBroadcastStage4 from "../riderReferrals/broadcast-stage4";
import EditReferralBtn from "../../rider-referrals/utilities/edit-referral-btn";
import CreateBroadcastBtn from "../../rider-referrals/utilities/create-broadcast-btn";
import ReferralPasswordModal from "../passwordModal";
import ReferralBroadcastStage5 from "../riderReferrals/broadcast-details5";
import moment from "moment";
import ReferralSideBar from "../referralSideBar";
import { uploadImageCouponAction } from "../../../redux/actions/imageUploadAction";
import { useDispatch, useSelector } from "react-redux";
import { sendReviewDriverReferralAction } from "../../../redux/actions/referrals/sendReviewReferralAction";
import successToast from "../../utilits/successToast";
import errorToast from "../../utilits/errorToast";
import {
  reviewReqDriverRefBroadcastEditAction,
  reviewReqDriverRefFindOneAction,
} from "../../../redux/actions/referrals/reviewRequiredAction";
import {
  activeDriverRefFindOneAction,
  activeDriverRefBroadcastEditAction,
} from "../../../redux/actions/referrals/approveReferralAction";
import { rejectedDriverRefAction } from "../../../redux/actions/referrals/rejectReferralAction";
import { deletedDriverRefAction } from "../../../redux/actions/referrals/deleteReferralAction";
import { expiredDriverRefIdAction } from "../../../redux/actions/referrals/expiredReferralAction";
import SuccessMessagemodal from "../../modals/successMessageModal";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { clearDriverReferralAction } from "../../../redux/actions/referrals/clearReferralAction";
import { clearReducerDriverReferralAction } from "../../../redux/actions/referrals/createreferralAction";

const DriverReferralBroadcastDetails = ({ location, params, type = "" }) => {
  const couponTypeData = location?.state?.referralData;
  const status = location?.state?.status;
  const referralData = location?.state?.data;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetchLoading, setFetchLoading] = useState(false);

  const is_editable = location?.state?.edit;
  const [statusBtn, setStatusBtn] = useState("");

  const [reloadtable, setReloadtable] = useState(false);
  const [currentReferralData, setCurrentReferralData] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessageShow, setSuccessMessageShow] = useState(false);

  const [leavePageShow, setLeavePageShow] = useState(false);
  const handleLeavePageClose = () => setLeavePageShow(false);
  const handleLeavePageShow = () => setLeavePageShow(true);

  const [changeUpdatePasswordshow, setReferralApproveShow] = useState(false);
  const handleChangeUpdatePasswordClose = () => {
    setReferralApproveShow(false);
    if (statusBtn === "Approve") {
      setReloadtable(!reloadtable);
    }
  };
  const handlChangesUpdateShow = () => setReferralApproveShow(true);

  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setReloadtable(!reloadtable);
    if (
      status === "Active" ||
      statusBtn === "SendReview" ||
      statusBtn === "CreateBroadcast"
    ) {
      navigate("/driver-referral");
    }
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const driverReferralNotification =
    currentReferralData?.driver_referral_notification;
  useEffect(() => {
    if (status === "PendingReview" || status === "ReviewPendingUpdated") {
      setFetchLoading(true);
      dispatch(
        reviewReqDriverRefFindOneAction(
          {
            referral_id: params,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Active") {
      setFetchLoading(true);
      dispatch(
        activeDriverRefFindOneAction(
          {
            referral_id: params,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Rejected") {
      setFetchLoading(true);
      dispatch(
        rejectedDriverRefAction(
          {
            referral_id: params,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Deleted") {
      setFetchLoading(true);
      dispatch(
        deletedDriverRefAction(
          {
            referral_id: params,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Expired") {
      setFetchLoading(true);
      dispatch(
        expiredDriverRefIdAction(
          {
            referral_id: params,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    }
  }, [status, reloadtable]);
  const onFetchSuccess = (data) => {
    console.log(data);
    setFetchLoading(false);
    setCurrentReferralData(data?.data);
  };
  const onFetchError = (data) => {
    setFetchLoading(false);
    errorToast(data?.data?.data);
  };

  function clearReferralFn() {
    if (type === "createDriverReferral") {
      dispatch(
        clearDriverReferralAction(
          {
            referral_id: referralData?.id,
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

  const [notifyImgLinkStage2, setNotifyImgLinkStage2] = useState({
    img: "",
    error: false,
  });
  const [notifyImgLinkStage3, setNotifyImgLinkStage3] = useState({
    img: "",
    error: false,
  });
  const [notifyImgLinkStage4, setNotifyImgLinkStage4] = useState({
    img: "",
    error: false,
  });
  const [notifyImgLinkStage5, setNotifyImgLinkStage5] = useState({
    img: "",
    error: false,
  });

  // console.log(currentReferralData);

  // conditions
  const DriverToRider_CurrentBalance =
    (couponTypeData?.referralClassification === "DriverToRiderReferral" &&
      couponTypeData?.senderCoupon === "CurrentBalanceDeposit") ||
    (currentReferralData?.referral_classification === "DriverToRiderReferral" &&
      currentReferralData?.sender_coupon_type === "CurrentBalanceDeposit");

  const DriverToRider_5star =
    (couponTypeData?.referralClassification === "DriverToRiderReferral" &&
      couponTypeData?.senderCoupon === "FiveStarDriverRating") ||
    (currentReferralData?.referral_classification === "DriverToRiderReferral" &&
      currentReferralData?.sender_coupon_type === "FiveStarDriverRating");

  const DriverToDriver_5Star =
    (couponTypeData?.referralClassification === "DriverToDriverReferral" &&
      couponTypeData?.senderCoupon === "FiveStarDriverRating") ||
    (currentReferralData?.referral_classification ===
      "DriverToDriverReferral" &&
      currentReferralData?.sender_coupon_type === "FiveStarDriverRating");

  const DriverToDriver_CurrentBalance =
    (couponTypeData?.referralClassification === "DriverToDriverReferral" &&
      couponTypeData?.senderCoupon === "CurrentBalanceDeposit") ||
    (currentReferralData?.referral_classification ===
      "DriverToDriverReferral" &&
      currentReferralData?.sender_coupon_type === "CurrentBalanceDeposit");

  const senderRequiredRides =
    referralData?.required_rides_completed_by_receiver ??
    currentReferralData?.required_rides_completed_by_receiver;

  const receiverRequiredRides =
    referralData?.receiver_required_rides ??
    currentReferralData?.receiver_required_rides;

  // validation

  const stage2Req =
    receiverRequiredRides != "0"
      ? Yup.boolean().when(["notificationStage2", "smsMessageStage2"], {
          is: (notificationStage2, smsMessageStage2) =>
            !notificationStage2 && !smsMessageStage2,
          then: Yup.boolean().required("Atleast one is required"),
          otherwise: Yup.boolean(),
        })
      : Yup.boolean();

  const broadcast2Req =
    receiverRequiredRides != "0" ? Yup.mixed().required() : Yup.mixed();

  const stage3Req =
    !DriverToRider_5star && senderRequiredRides != "0"
      ? Yup.boolean().when(["notificationStage3", "smsMessageStage3"], {
          is: (notificationStage3, smsMessageStage3) =>
            !notificationStage3 && !smsMessageStage3,
          then: Yup.boolean().required("Atleast one is required"),
          otherwise: Yup.boolean(),
        })
      : Yup.boolean();

  function stage4RequiredFn() {
    if (DriverToDriver_CurrentBalance || DriverToRider_CurrentBalance) {
      return Yup.boolean().when(["notificationStage4", "smsMessageStage4"], {
        is: (notificationStage4, smsMessageStage4) =>
          !notificationStage4 && !smsMessageStage4,
        then: Yup.boolean().required("Atleast one is required"),
        otherwise: Yup.boolean(),
      });
    }
    if (DriverToRider_5star) {
      return Yup.boolean();
    }
  }
  const stage4Req = stage4RequiredFn();

  function broadcast3RequiredFn() {
    if (DriverToRider_5star || DriverToDriver_5Star) {
      return Yup.mixed();
    }
    if (
      (DriverToRider_CurrentBalance || DriverToDriver_CurrentBalance) &&
      senderRequiredRides != "0"
    ) {
      return Yup.mixed().required();
    }
  }

  const broadcast3Req = broadcast3RequiredFn();

  // stage 5 validation

  function stage5RequiredFn() {
    if (DriverToDriver_CurrentBalance) {
      return Yup.boolean().when(["notificationStage5", "smsMessageStage5"], {
        is: (notificationStage5, smsMessageStage5) =>
          !notificationStage5 && !smsMessageStage5,
        then: Yup.boolean().required("Atleast one is required"),
        otherwise: Yup.boolean(),
      });
    }
    if (DriverToRider_5star || DriverToRider_CurrentBalance) {
      return Yup.boolean();
    }
  }

  const stage5Req = stage5RequiredFn();

  const stage3NotificationBodyReq = !DriverToDriver_5Star
    ? Yup.mixed().when("notificationStage3", {
        is: true,
        then: Yup.mixed().required("notificationBody is required."),
      })
    : Yup.mixed();

  const stage3MessageBodyReq = !DriverToDriver_5Star
    ? Yup.mixed().when("smsMessageStage3", {
        is: true,
        then: Yup.mixed().required("notificationBody is required."),
      })
    : Yup.mixed();

  console.log(currentReferralData);
  console.log(status);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      receiverDraftMessage:
        driverReferralNotification?.is_receiver_draft_message_stage1 ?? false,
      draftMessageTitle:
        driverReferralNotification?.draft_message_title_stage1 ?? "",
      draftMessageBody1:
        driverReferralNotification?.draft_message_body_stage1 ?? "",
      // draftMessageGooglePlayLinkStage1:
      //   driverReferralNotification?.draft_message_google_play_stage1 ?? "",
      // draftMessageAppStoreLinkStage1:
      //   driverReferralNotification?.draft_message_app_store_stage1 ?? "",
      notification_image_stage2:
        driverReferralNotification?.notification_image_stage2 ?? "",
      notification_image_stage3:
        driverReferralNotification?.notification_image_stage3 ?? "",
      notification_image_stage4:
        driverReferralNotification?.notification_image_stage4 ?? "",
      notificationStage2:
        driverReferralNotification?.is_receiver_notification_stage2 ?? false,
      smsMessageStage2:
        driverReferralNotification?.is_receiver_sms_message_stage2 ?? false,
      altleastOneStage2: "",
      notificationTitleStage2:
        driverReferralNotification?.notification_title_stage2 ?? "",
      notificationBodyStage2:
        driverReferralNotification?.notification_body_stage2 ?? "",
      smsMessageTitleStage2:
        driverReferralNotification?.message_title_stage2 ?? "",
      smsMessageBodyStage2:
        driverReferralNotification?.message_body_stage2 ?? "",
      broadcastTypeStage2:
        driverReferralNotification?.message_broadcast_type_stage2 ?? null,
      reminderTypeStage2:
        driverReferralNotification?.message_reminder_type_stage2 ?? null,
      reminderTimeStage2:
        driverReferralNotification?.message_reminder_time_stage2 ?? null,
      reminderCycleStage2:
        driverReferralNotification?.message_reminder_cycle_stage2 ?? null,
      reminderFrequencyStage2:
        driverReferralNotification?.message_reminder_frequency_stage2 ?? null,
      onlineReminderDaysStage2:
        driverReferralNotification?.message_reminder_days_stage2 ?? null,
      notificationStage3:
        driverReferralNotification?.is_sender_notification_stage3 ?? false,
      smsMessageStage3:
        driverReferralNotification?.is_sender_sms_message_stage3 ?? false,
      altleastOneStage3: "",
      notificationTitleStage3:
        driverReferralNotification?.notification_title_stage3 ?? "",
      notificationBody1Stage3:
        driverReferralNotification?.notification_message_body_stage3 ?? "",
      // notificationBody2Stage3:
      //   driverReferralNotification?.notification_message_body2_stage3 ?? null,
      // notificationBody3Stage3:
      //   driverReferralNotification?.notification_message_body3_stage3 ?? null,
      messageTitleStage3:
        driverReferralNotification?.sms_message_title_stage3 ?? "",
      messageBody1Stage3:
        driverReferralNotification?.sms_message_body_stage3 ?? "",
      // messageBody2Stage3:
      //   driverReferralNotification?.sms_message_body2_stage3 ?? null,
      // messageBody3Stage3:
      //   driverReferralNotification?.sms_message_body3_stage3 ?? null,
      broadcastTypeStage3:
        driverReferralNotification?.sms_broadcast_type_stage3 ?? null,
      reminderTypeStage3:
        driverReferralNotification?.sms_reminder_type_stage3 ?? null,
      reminderTimeStage3:
        driverReferralNotification?.sms_reminder_time_stage3 ?? null,
      reminderCycleStage3:
        driverReferralNotification?.sms_reminder_cycle_stage3 ?? null,
      reminderFrequencyStage3:
        driverReferralNotification?.sms_reminder_frequency_stage3 ?? null,
      onlineReminderDaysStage3:
        driverReferralNotification?.sms_reminder_days_stage3 ?? null,
      notificationStage4:
        driverReferralNotification?.is_sender_notification_stage4 ?? false,
      smsMessageStage4:
        driverReferralNotification?.is_sender_sms_message_stage4 ?? false,
      altleastOneStage4: "",
      notificationTitleStage4:
        driverReferralNotification?.notification_title_stage4 ?? "",
      notificationBodyStage4:
        driverReferralNotification?.notification_body_stage4 ?? "",
      smsMessageTitleStage4:
        driverReferralNotification?.sms_message_title_stage4 ?? "",
      smsMessageBodyStage4:
        driverReferralNotification?.sms_message_body_stage4 ?? "",

      notificationStage5:
        driverReferralNotification?.is_sender_notification_stage5 ?? false,
      smsMessageStage5:
        driverReferralNotification?.is_sender_sms_message_stage5 ?? false,
      altleastOneStage5: "",
      notificationTitleStage5:
        driverReferralNotification?.notification_title_stage5 ?? "",
      notificationBodyStage5:
        driverReferralNotification?.notification_body_stage5 ?? "",
      smsMessageTitleStage5:
        driverReferralNotification?.sms_message_title_stage5 ?? "",
      smsMessageBodyStage5:
        driverReferralNotification?.sms_message_body_stage5 ?? "",
      notification_image_stage5:
        driverReferralNotification?.notification_image_stage5 ?? "",
    },

    validationSchema: Yup.object().shape({
      receiverDraftMessage: Yup.bool().oneOf(
        [true],
        "Please Complete All The Above Fields"
      ),
      draftMessageTitle: Yup.string().when("receiverDraftMessage", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      draftMessageBody1: Yup.string().when("receiverDraftMessage", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      // draftMessageGooglePlayLinkStage1: Yup.string().when(
      //   "receiverDraftMessage",
      //   {
      //     is: true,
      //     then: Yup.string()
      //       .matches(urlRegex, "invalid")
      //       .required("notificationBody is required."),
      //   }
      // ),
      // draftMessageAppStoreLinkStage1: Yup.string().when(
      //   "receiverDraftMessage",
      //   {
      //     is: true,
      //     then: Yup.string()
      //       .matches(urlRegex, "invalid")
      //       .required("notificationBody is required."),
      //   }
      // ),
      notificationStage2: Yup.bool(),
      smsMessageStage2: Yup.bool(),
      altleastOneStage2: stage2Req,
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
      broadcastTypeStage2: broadcast2Req,
      reminderTypeStage2: Yup.mixed().when(["broadcastTypeStage2"], {
        is: (broadcastTypeStage2) =>
          broadcastTypeStage2 === "OfflineMobileApp" ||
          broadcastTypeStage2 === "OnlineMobileApp",
        then: Yup.mixed().required("Please Complete All The Above Fields"),
        otherwise: Yup.mixed(),
      }),
      reminderTimeStage2: Yup.mixed().when(["broadcastTypeStage2"], {
        is: (broadcastTypeStage2) => broadcastTypeStage2 === "OfflineMobileApp",
        then: Yup.mixed().required("Please Complete All The Above Fields"),
        otherwise: Yup.mixed(),
      }),
      reminderCycleStage2: Yup.mixed().when(["broadcastTypeStage2"], {
        is: (broadcastTypeStage2) => broadcastTypeStage2 === "OfflineMobileApp",
        then: Yup.mixed().required("Please Complete All The Above Fields"),
        otherwise: Yup.mixed(),
      }),
      reminderFrequencyStage2: Yup.mixed().when(["broadcastTypeStage2"], {
        is: (broadcastTypeStage2) =>
          broadcastTypeStage2 === "OfflineMobileApp" ||
          broadcastTypeStage2 === "OnlineMobileApp",
        then: Yup.mixed().required("Please Complete All The Above Fields"),
        otherwise: Yup.mixed(),
      }),
      onlineReminderDaysStage2: Yup.mixed().when(["broadcastTypeStage2"], {
        is: (broadcastTypeStage2) => broadcastTypeStage2 === "OnlineMobileApp",
        then: Yup.mixed().required("Please Complete All The Above Fields"),
        otherwise: Yup.mixed(),
      }),

      notificationStage3: Yup.bool(),
      smsMessageStage3: Yup.bool(),
      altleastOneStage3: stage3Req,
      notificationTitleStage3: Yup.string().when("notificationStage3", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      notificationBody1Stage3: Yup.string().when("notificationStage3", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      // notificationBody2Stage3: stage3NotificationBodyReq,
      // notificationBody3Stage3: stage3NotificationBodyReq,
      messageTitleStage3: Yup.string().when("smsMessageStage3", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      messageBody1Stage3: Yup.string().when("smsMessageStage3", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      // messageBody2Stage3: stage3MessageBodyReq,
      // messageBody3Stage3: stage3MessageBodyReq,
      broadcastTypeStage3: broadcast3Req,
      reminderTypeStage3: Yup.mixed().when(["broadcastTypeStage3"], {
        is: (broadcastTypeStage3) =>
          broadcastTypeStage3 === "OfflineMobileApp" ||
          broadcastTypeStage3 === "OnlineMobileApp",
        then: Yup.mixed().required("Please Complete All The Above Fields"),
        otherwise: Yup.mixed(),
      }),
      reminderTimeStage3: Yup.mixed().when(["broadcastTypeStage3"], {
        is: (broadcastTypeStage3) => broadcastTypeStage3 === "OfflineMobileApp",
        then: Yup.mixed().required("Please Complete All The Above Fields"),
        otherwise: Yup.mixed(),
      }),
      reminderCycleStage3: Yup.mixed().when(["broadcastTypeStage3"], {
        is: (broadcastTypeStage3) => broadcastTypeStage3 === "OfflineMobileApp",
        then: Yup.mixed().required("Please Complete All The Above Fields"),
        otherwise: Yup.mixed(),
      }),
      reminderFrequencyStage3: Yup.mixed().when(["broadcastTypeStage3"], {
        is: (broadcastTypeStage3) =>
          broadcastTypeStage3 === "OfflineMobileApp" ||
          broadcastTypeStage3 === "OnlineMobileApp",
        then: Yup.mixed().required("Please Complete All The Above Fields"),
        otherwise: Yup.mixed(),
      }),
      onlineReminderDaysStage3: Yup.mixed().when(["broadcastTypeStage3"], {
        is: (broadcastTypeStage3) => broadcastTypeStage3 === "OnlineMobileApp",
        then: Yup.mixed().required("Please Complete All The Above Fields"),
        otherwise: Yup.mixed(),
      }),
      notificationStage4: Yup.bool(),
      smsMessageStage4: Yup.bool(),
      altleastOneStage4: stage4Req,
      notificationTitleStage4: Yup.string().when("notificationStage4", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      notificationBodyStage4: Yup.string().when("notificationStage4", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      smsMessageTitleStage4: Yup.string().when("smsMessageStage4", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      smsMessageBodyStage4: Yup.string().when("smsMessageStage4", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),

      notificationStage5: Yup.bool(),
      smsMessageStage5: Yup.bool(),
      altleastOneStage5: stage5Req,
      notificationTitleStage5: Yup.string().when("notificationStage5", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      notificationBodyStage5: Yup.string().when("notificationStage5", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      smsMessageTitleStage5: Yup.string().when("smsMessageStage5", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      smsMessageBodyStage5: Yup.string().when("smsMessageStage5", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
    }),
    onSubmit: (values, { resetForm }) => {
      // setLoading(true);
      const data = {
        referral_id: referralData?.id ?? currentReferralData?.id,
        is_receiver_draft_message_stage1: values?.receiverDraftMessage ?? null,
        draft_message_title_stage1: values?.draftMessageTitle ?? null,
        draft_message_body_stage1: values?.draftMessageBody1 ?? null,
        // draft_message_google_play_stage1:
        //   values?.draftMessageGooglePlayLinkStage1 ?? null,
        // draft_message_app_store_stage1:
        //   values?.draftMessageAppStoreLinkStage1 ?? null,
        draft_message_body4_stage1: "not required",
        is_receiver_notification_stage2: values?.notificationStage2 ?? null,
        notification_title_stage2: values?.notificationTitleStage2 ?? null,
        notification_body_stage2: values?.notificationBodyStage2 ?? null,
        notification_image_stage2: notifyImgLinkStage2?.img ?? "",
        is_receiver_sms_message_stage2: values?.smsMessageStage2 ?? null,
        message_title_stage2: values?.smsMessageTitleStage2 ?? null,
        message_body_stage2: values?.smsMessageBodyStage2 ?? null,

        message_broadcast_type_stage2: values?.broadcastTypeStage2 ?? null,
        message_reminder_type_stage2: values?.reminderTypeStage2 ?? null,
        message_reminder_frequency_stage2:
          values?.reminderFrequencyStage2 ?? null,
        message_reminder_days_stage2: values?.onlineReminderDaysStage2 ?? null,
        message_reminder_time_stage2: values?.reminderTimeStage2 ?? null,
        message_reminder_cycle_stage2: values?.reminderCycleStage2 ?? null,

        is_sender_notification_stage3: values?.notificationStage3 ?? null,
        notification_title_stage3: values?.notificationTitleStage3 ?? null,
        notification_message_body_stage3:
          values?.notificationBody1Stage3 ?? null,
        // notification_message_body2_stage3:
        //   values?.notificationBody2Stage3 ?? null,
        // notification_message_body3_stage3:
        //   values?.notificationBody3Stage3 ?? null,
        notification_image_stage3: notifyImgLinkStage3?.img ?? "",
        is_sender_sms_message_stage3: values?.smsMessageStage3 ?? null,
        sms_message_title_stage3: values?.messageTitleStage3 ?? null,
        sms_message_body_stage3: values?.messageBody1Stage3 ?? null,
        // sms_message_body2_stage3: values?.messageBody2Stage3 ?? null,
        // sms_message_body3_stage3: values?.messageBody3Stage3 ?? null,

        sms_broadcast_type_stage3: values?.broadcastTypeStage3 ?? null,
        sms_reminder_type_stage3: values?.reminderTypeStage3 ?? null,
        sms_reminder_frequency_stage3: values?.reminderFrequencyStage3 ?? null,
        sms_reminder_days_stage3: values?.onlineReminderDaysStage3 ?? null,
        sms_reminder_time_stage3: values?.reminderTimeStage3 ?? null,
        sms_reminder_cycle_stage3: values?.reminderCycleStage3 ?? null,

        is_sender_notification_stage4: values?.notificationStage4 ?? null,
        notification_title_stage4: values?.notificationTitleStage4 ?? null,
        notification_body_stage4: values?.notificationBodyStage4 ?? null,
        notification_image_stage4: notifyImgLinkStage4?.img ?? "",
        is_sender_sms_message_stage4: values?.smsMessageStage4 ?? null,
        sms_message_title_stage4: values?.smsMessageTitleStage4 ?? null,
        sms_message_body_stage4: values?.smsMessageBodyStage4 ?? null,
        is_sender_notification_stage5: values?.notificationStage5,
        notification_title_stage5: values?.notificationTitleStage5,
        notification_body_stage5: values?.notificationBodyStage5,
        notification_image_stage5: notifyImgLinkStage5?.img ?? "",
        is_sender_sms_message_stage5: values?.smsMessageStage5,
        sms_message_title_stage5: values?.smsMessageTitleStage5,
        sms_message_body_stage5: values?.smsMessageBodyStage5,
      };

      if (statusBtn === "CreateBroadcast") {
        dispatch(sendReviewDriverReferralAction(data, onSuccess, onError));
      }

      if (status === "PendingReview" || status === "ReviewPendingUpdated") {
        if (statusBtn === "SaveLater") {
          dispatch(
            reviewReqDriverRefBroadcastEditAction(
              data,
              onEditSuccess,
              onEditError
            )
          );
        } else if (statusBtn === "Approve") {
          dispatch(
            reviewReqDriverRefBroadcastEditAction(
              data,
              onEditSuccess,
              onEditError
            )
          );
        }
      }
      if (status === "Active" || statusBtn === "SendReview") {
        dispatch(
          activeDriverRefBroadcastEditAction(data, onEditSuccess, onEditError)
        );
      }
    },
  });

  console.log(status);
  const onEditSuccess = (data) => {
    setLoading(false);
    if (statusBtn === "Approve") {
      handlChangesUpdateShow();
    }
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      successToast(data?.data);

      if (
        status === "PendingReview" ||
        status === "ReviewPendingUpdated" ||
        status === "Active"
      ) {
        if (statusBtn === "SaveLater" || statusBtn === "SendReview") {
          handleSuccessMessageShow();
        }
      }
    } else if (statusBtn === "SendReview") {
      handleSuccessMessageShow();
    }
    console.log(data);
  };

  console.log(statusBtn);

  // const approveFn = () => {
  //   if (formik?.initialValues !== formik?.values) {
  //     setReloadtable(!reloadtable);
  //   }
  // };

  const onEditError = (data) => {
    setLoading(false);
    setReloadtable(!reloadtable);
    errorToast(data?.data?.data);
    console.log(data);
  };

  const onSuccess = (data) => {
    console.log(data);
    successToast(data?.data);
    dispatch(clearReducerDriverReferralAction());
    handleSuccessMessageShow();
    navigate("/driver-referral");
  };

  const onError = (data) => {
    console.log(data);
    errorToast(data?.message);
  };

  const backBtn = () => {
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      handleLeavePageShow();
    } else {
      clearReferralFn();
      navigate(-1);
    }
  };

  const bookingTypeListName = currentReferralData?.booking_type
    ? Object?.keys(currentReferralData?.booking_type).filter(
        (key) => currentReferralData?.booking_type[key]
      )
    : referralData?.booking_type
    ? Object?.keys(referralData?.booking_type).filter(
        (key) => referralData?.booking_type[key]
      )
    : "";

  const rideTypeListName = currentReferralData?.ride_type
    ? Object?.keys(currentReferralData?.ride_type).filter(
        (key) => currentReferralData?.ride_type[key]
      )
    : referralData?.ride_type
    ? Object?.keys(referralData?.ride_type).filter(
        (key) => referralData?.ride_type[key]
      )
    : "";

  const sideBarData = [
    {
      label: "Referral ID",
      value:
        currentReferralData?.referral_code ??
        referralData?.referral_code ??
        "--",
      display: true,
    },
    {
      label: "User Type",
      value: referralData?.user_type ?? currentReferralData?.user_type ?? "--",
      display: true,
    },
    {
      label: "Referral Classification",
      value:
        referralData?.referral_classification ??
        currentReferralData?.referral_classification ??
        "--",
      display: true,
    },
    {
      label: "Sender Coupon Type",
      value:
        referralData?.sender_coupon_type ||
        currentReferralData?.sender_coupon_type
          ? insertSpaces(
              referralData?.sender_coupon_type ||
                currentReferralData?.sender_coupon_type
            )
          : "--",
      display: true,
    },
    {
      label: "Receiver Coupon Type",
      value:
        referralData?.receiver_coupon_type ||
        currentReferralData?.receiver_coupon_type
          ? insertSpaces(
              referralData?.receiver_coupon_type ||
                currentReferralData?.receiver_coupon_type
            )
          : "--",
      display: true,
    },
    {
      label: "Referral Status",
      value:
        referralData?.referral_status ??
        currentReferralData?.referral_status ??
        "--",
      display: true,
    },

    {
      label: "Current Balance Deposit Amount",
      value:
        referralData?.sender_cb_deposite_amount ??
        currentReferralData?.sender_cb_deposite_amount ??
        "--",
      heading: "Sender Current Balance Deposit Details",
      display:
        DriverToDriver_CurrentBalance || DriverToRider_CurrentBalance
          ? true
          : false,
    },
    {
      label: "Required Rides(Completed By Receiver)*",
      value:
        referralData?.required_rides_completed_by_receiver ??
        currentReferralData?.required_rides_completed_by_receiver ??
        "--",
      display:
        DriverToDriver_CurrentBalance || DriverToRider_CurrentBalance
          ? true
          : false,
    },
    {
      label: "Driver Rating (1 Count)",
      value:
        referralData?.driver_rating ??
        currentReferralData?.driver_rating ??
        "--",
      heading: "Sender Current Balance Deposit Details",
      display: DriverToDriver_5Star || DriverToRider_5star ? true : false,
    },

    {
      label: "Current Balance Deposit Amount (₹)*",
      value:
        referralData?.receiver_cb_deposite_amount ??
        currentReferralData?.receiver_cb_deposite_amount ??
        "--",
      heading: "Receiver Current Balance Deposit Details",
      display:
        DriverToDriver_CurrentBalance || DriverToDriver_5Star ? true : false,
    },
    {
      label: "Current Balance Deposit Amount (₹)*",
      value:
        referralData?.receiver_required_rides ??
        currentReferralData?.receiver_required_rides ??
        "--",
      display:
        DriverToDriver_CurrentBalance || DriverToDriver_5Star ? true : false,
    },

    {
      label: "Coupon Code",
      value:
        referralData?.coupon_code ?? currentReferralData?.coupon_code ?? "--",
      heading: "Receiver Discount Details",
      display:
        DriverToDriver_CurrentBalance || DriverToDriver_5Star ? false : true,
    },
    {
      label: "Coupon Title",
      value:
        referralData?.coupon_title ?? currentReferralData?.coupon_title ?? "--",
      display:
        DriverToDriver_CurrentBalance || DriverToDriver_5Star ? false : true,
    },
    {
      label: "Coupon Description (for admins reference)",
      value:
        referralData?.coupon_description ??
        currentReferralData?.coupon_description ??
        "--",
      display:
        DriverToDriver_CurrentBalance || DriverToDriver_5Star ? false : true,
    },
    {
      label: "Usage Limit Per Account",
      value:
        referralData?.usage_limit_per_account ??
        currentReferralData?.usage_limit_per_account ??
        "--",
      display:
        DriverToDriver_CurrentBalance || DriverToDriver_5Star ? false : true,
    },
    {
      label: "Coupon Life Span(Days)*",
      value:
        referralData?.coupon_life_span ??
        currentReferralData?.coupon_life_span ??
        "--",
      display:
        DriverToDriver_CurrentBalance || DriverToDriver_5Star ? false : true,
    },
    {
      label: "% Discount",
      value: referralData?.discount ?? currentReferralData?.discount,
      display:
        referralData?.discount ?? currentReferralData?.discount ? true : false,
    },
    {
      label: "Max Discount In Rs",
      value:
        referralData?.max_amount_in_rs ?? currentReferralData?.max_amount_in_rs,
      display:
        referralData?.discount ?? currentReferralData?.discount ? true : false,
    },
    {
      label: "Cashback",
      value: referralData?.cashback ?? currentReferralData?.cashback,
      display:
        referralData?.cashback ?? currentReferralData?.cashback ? true : false,
    },
    {
      label: "Max CashBack In Rs",
      value:
        referralData?.max_cashback_in_rs ??
        currentReferralData?.max_cashback_in_rs,
      display:
        referralData?.max_cashback_in_rs ??
        currentReferralData?.max_cashback_in_rs
          ? true
          : false,
    },
    {
      label: "X Amount Off",
      value: referralData?.amountoff ?? currentReferralData?.amountoff,
      display:
        referralData?.amountoff ?? currentReferralData?.amountoff
          ? true
          : false,
    },
    {
      label: "Booking Type",
      value:
        currentReferralData?.booking_type || referralData?.booking_type
          ? removeUnderScoreInArray(bookingTypeListName).join(", ")
          : "--",
      display: true,
    },
    {
      label: "Ride Type",
      value: currentReferralData?.ride_type
        ? currentReferralData?.ride_type.join(", ")
        : referralData?.ride_type
        ? referralData?.ride_type.join(", ")
        : "--",
      display: true,
    },
    {
      label: "Activation At",
      value: referralData?.start_date
        ? moment(referralData?.start_date).format("DD-MM-YYYY") +
          ", " +
          referralData?.start_time
        : moment(currentReferralData?.start_date).format("DD-MM-YYYY") +
          ", " +
          currentReferralData?.start_time,
      heading: "Campaign Details",
      display: true,
    },
    {
      label: "Expiry At",
      value: referralData?.expiry_date
        ? moment(referralData?.expiry_date).format("DD-MM-YYYY") +
          ", " +
          referralData?.expiry_time
        : moment(currentReferralData?.expiry_date).format("DD-MM-YYYY") +
          ", " +
          currentReferralData?.expiry_time,
      display: true,
    },
    {
      label: "Accounts Availed",
      value: currentReferralData?.accounts_availed ?? "--",
      heading: "Receiver Coupon Usage Details*",
      display: currentReferralData?.referral_status === "Active" ? true : false,
    },
    {
      label: "Total Coupons Used",
      value: currentReferralData?.total_coupon_used ?? "--",
      display: currentReferralData?.referral_status === "Active" ? true : false,
    },
  ];

  // const activereferralData = [
  //   {
  //     label: "Accounts Availed",
  //     value: currentReferralData?.accounts_availed ?? "--",
  //     heading: "Receiver Coupon Usage Details*",
  //     display: true,
  //   },

  //   {
  //     label: "Total Coupons Used",
  //     value: currentReferralData?.total_coupon_used ?? "--",
  //     display: true,
  //   },
  // ];

  // if (currentReferralData?.referral_status === "Active") {
  //   sideBarData.push(...activereferralData);
  // }

  // image

  const [uploaded, setUploaded] = useState(false);
  const [notifyImgStage2, setNotifyImgStage2] = useState();

  useEffect(() => {
    setNotifyImgLinkStage2({
      img: driverReferralNotification?.notification_image_stage2,
      error: false,
    });
  }, [currentReferralData]);

  function handleNotifyImgStage2Change(e) {
    if (e.target?.files.length !== 0) {
      setNotifyImgStage2(URL.createObjectURL(e.target.files[0]));
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
    setNotifyImgLinkStage2({ img: data?.data?.data?.location, error: false });
  };
  const onUploadError = (data) => {
    console.log(data);
  };

  const [uploadedStage3, setUploadedStage3] = useState(false);
  const [notifyImgStage3, setNotifyImgStage3] = useState();

  useEffect(() => {
    setNotifyImgLinkStage3({
      img: driverReferralNotification?.notification_image_stage3,
      error: false,
    });
  }, [currentReferralData]);

  function handleNotifyImgStage3Change(e) {
    if (e.target?.files.length !== 0) {
      setNotifyImgStage3(URL.createObjectURL(e.target.files[0]));
      dispatch(
        uploadImageCouponAction(
          e.target.files[0],
          onUploadStage3Success,
          onUploadStage3Error
        )
      );
    }
  }
  const onUploadStage3Success = (data) => {
    console.log(data.data);
    setUploadedStage3(true);
    setNotifyImgLinkStage3({ img: data?.data?.data?.location, error: false });
  };
  const onUploadStage3Error = (data) => {
    console.log(data);
  };

  const [uploadedStage4, setUploadedStage4] = useState(false);
  const [notifyImgStage4, setNotifyImgStage4] = useState();

  useEffect(() => {
    setNotifyImgLinkStage4({
      img: driverReferralNotification?.notification_image_stage4,
      error: false,
    });
  }, [currentReferralData]);

  function handleNotifyImgStage4Change(e) {
    if (e.target?.files.length !== 0) {
      setNotifyImgStage4(URL.createObjectURL(e.target.files[0]));
      dispatch(
        uploadImageCouponAction(
          e.target.files[0],
          onUploadStage4Success,
          onUploadStage4Error
        )
      );
    }
  }
  const onUploadStage4Success = (data) => {
    console.log(data.data);
    setUploadedStage4(true);
    setNotifyImgLinkStage4({ img: data?.data?.data?.location, error: false });
  };
  const onUploadStage4Error = (data) => {
    console.log(data);
  };

  const [uploadedStage5, setUploadedStage5] = useState(false);
  const [notifyImgStage5, setNotifyImgStage5] = useState();

  useEffect(() => {
    setNotifyImgLinkStage5({
      img: driverReferralNotification?.notification_image_stage5,
      error: false,
    });
  }, [currentReferralData]);

  function handleNotifyImgStage5Change(e) {
    if (e.target?.files.length !== 0) {
      setNotifyImgStage5(URL.createObjectURL(e.target.files[0]));
      dispatch(
        uploadImageCouponAction(
          e.target.files[0],
          onUploadStage5Success,
          onUploadStage5Error
        )
      );
    }
  }
  const onUploadStage5Success = (data) => {
    console.log(data.data);
    setUploadedStage5(true);
    setNotifyImgLinkStage5({ img: data?.data?.data?.location, error: false });
  };
  const onUploadStage5Error = (data) => {
    console.log(data);
  };

  const expiryDate = useExpiryDate(
    currentReferralData?.coupon_life_span,
    currentReferralData?.expiry_date,
    currentReferralData?.expiry_time
  );

  const firstErrorField = Object.keys(formik.errors).find(
    (fieldName) => formik.touched[fieldName] && formik.errors[fieldName]
  );

  console.log(currentReferralData, "currentReferralData");

  return (
    <>
      <ReferralPasswordModal
        changeUpdatePasswordshow={changeUpdatePasswordshow}
        handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
        referralBackendData={currentReferralData}
        statusBtn={statusBtn}
        title={
          statusBtn === "Approve"
            ? "Are you sure you want to approve this referral?"
            : statusBtn === "Reject"
            ? "Are you sure you want to reject this coupon?"
            : "--"
        }
        type="driverReferrals"
      />
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={
          statusBtn === "CreateBroadcast" || statusBtn === "SendReview"
            ? `Successfully Sent For Review`
            : `Changes made successfully!`
        }
      />
      <LeavePagemodal
        leavePageShow={leavePageShow}
        handleLeavePageClose={handleLeavePageClose}
        link={-1}
        subsection={true}
        okayFn={() => clearReferralFn()}
      />
      <InnerLayout
        mainHeading={`Create Account Specific Coupon`}
        navigateEnable={false}
        naviagteLeave={true}
        navigateFn={backBtn}
        expiryDateShow={true}
        expiryDate={
          fetchLoading
            ? ``
            : type === "createDriverReferral"
            ? ``
            : `Referral Coupon Code Exp : ${expiryDate}`
        }
      >
        {" "}
        {fetchLoading ? (
          <LoadingSpinnerTable />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="row mt-3 gx-0">
              <div className="col-lg-4">
                <ReferralSideBar data={sideBarData} />
              </div>
              <div className="col-lg-8">
                <ReferralBroadcastStage1
                  formik={formik}
                  is_editable={is_editable}
                  currentReferralData={currentReferralData}
                  type={type}
                  driverreferral={"driverreferral"}
                />
                {receiverRequiredRides == 0 ? (
                  <></>
                ) : (
                  <ReferralBroadcastStage2
                    formik={formik}
                    is_editable={is_editable}
                    uploaded={uploaded}
                    notifyImgStage2={notifyImgStage2}
                    handleNotifyImgStage2Change={handleNotifyImgStage2Change}
                  />
                )}

                {DriverToRider_5star ? (
                  <></>
                ) : (
                  <>
                    {senderRequiredRides == 0 ? (
                      <></>
                    ) : (
                      <ReferralBroadcastStage3
                        stageNo={
                          receiverRequiredRides == 0 ? "Stage 2 :" : "Stage 3 :"
                        }
                        referralData={referralData}
                        DriverToDriver_5Star={DriverToDriver_5Star}
                        formik={formik}
                        is_editable={is_editable}
                        uploadedStage3={uploadedStage3}
                        notifyImgStage3={notifyImgStage3}
                        handleNotifyImgStage3Change={
                          handleNotifyImgStage3Change
                        }
                      />
                    )}

                    {DriverToDriver_5Star ? (
                      <></>
                    ) : (
                      <>
                        <ReferralBroadcastStage4
                          stageNo={
                            receiverRequiredRides == 0 &&
                            senderRequiredRides == 0
                              ? "Stage 2 :"
                              : receiverRequiredRides == 0 ||
                                senderRequiredRides == 0
                              ? "Stage 3 :"
                              : "Stage 4 :"
                          }
                          formik={formik}
                          is_editable={is_editable}
                          uploadedStage4={uploadedStage4}
                          notifyImgStage4={notifyImgStage4}
                          handleNotifyImgStage4Change={
                            handleNotifyImgStage4Change
                          }
                        />
                      </>
                    )}

                    {DriverToRider_CurrentBalance || DriverToDriver_5Star ? (
                      <></>
                    ) : (
                      <>
                        <ReferralBroadcastStage5
                          stageNo={
                            receiverRequiredRides == 0 &&
                            senderRequiredRides == 0
                              ? "Stage 3 :"
                              : receiverRequiredRides == 0 ||
                                senderRequiredRides == 0
                              ? "Stage 4 :"
                              : "Stage 5 :"
                          }
                          formik={formik}
                          is_editable={is_editable}
                          uploadedStage5={uploadedStage5}
                          notifyImgStage5={notifyImgStage5}
                          handleNotifyImgStage5Change={
                            handleNotifyImgStage5Change
                          }
                        />
                      </>
                    )}
                  </>
                )}
                {firstErrorField && (
                  <div className="red_color fs_16 fw_500 ps-3">
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
                        backBtn={backBtn}
                        resetBtn={() => {
                          formik.resetForm();
                          setUploaded(false);
                          setUploadedStage3(false);
                          setUploadedStage4(false);
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
                        approveBtn={() => {
                          // approveFn();
                          setStatusBtn("Approve");
                        }}
                        resetBtn={() => {
                          formik.resetForm();
                          setUploaded(false);
                          setUploadedStage3(false);
                          setUploadedStage4(false);
                        }}
                        viewBtnText="Go Back"
                        rejectBtn={() => {
                          setStatusBtn("Reject");
                          handlChangesUpdateShow();
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
              </div>
            </div>
          </form>
        )}
      </InnerLayout>
    </>
  );
};

export default DriverReferralBroadcastDetails;
