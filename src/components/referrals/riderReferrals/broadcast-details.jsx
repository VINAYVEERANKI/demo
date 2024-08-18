import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ReferralBroadcastStage1 from "./broadcast-stage1";
import CreateBroadcastBtn from "../../rider-referrals/utilities/create-broadcast-btn";
import ReferralBroadcastStage2 from "./broadcast-stage2";
import InnerLayout from "../../layout/innerLayout";
import ReferralBroadcastStage3 from "./broadcast-stage3";
import ReferralBroadcastStage4 from "./broadcast-stage4";
import { useDispatch } from "react-redux";
import { sendReviewReferralAction } from "../../../redux/actions/referrals/sendReviewReferralAction";
import {
  couponTypeName,
  removeUnderScoreInArray,
  urlRegex,
  useExpiryDate,
} from "../../helper";
import successToast from "../../utilits/successToast";
import errorToast from "../../utilits/errorToast";
import SuccessMessagemodal from "../../modals/successMessageModal";
import EditReferralBtn from "../../rider-referrals/utilities/edit-referral-btn";
import {
  reviewReqReferralBroadcastEditAction,
  reviewReqRefrralFindOneAction,
} from "../../../redux/actions/referrals/reviewRequiredAction";
import ReferralPasswordModal from "../passwordModal";
import moment from "moment";
import {
  activeReferralBroadcastEditAction,
  activeReferralFindOneAction,
} from "../../../redux/actions/referrals/approveReferralAction";
import { rejectedReferralFindOneAction } from "../../../redux/actions/referrals/rejectReferralAction";
import { deletedReferralFindOneAction } from "../../../redux/actions/referrals/deleteReferralAction";
import { expiredReferralFindOneAction } from "../../../redux/actions/referrals/expiredReferralAction";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import LeavePagemodal from "../../modals/leaveModal";
import { uploadImageCouponAction } from "../../../redux/actions/imageUploadAction";
import ReferralSideBar from "../referralSideBar";
import { clearRiderReferralAction } from "../../../redux/actions/referrals/clearReferralAction";
import { clearReducerRiderReferralAction } from "../../../redux/actions/referrals/createreferralAction";

const ReferralBroadcastDetails = ({ Data, location, type = "" }) => {
  const status = Data?.state?.status;
  const is_editable = Data?.state?.is_editable;

  const params = useParams();
  console.log(location);
  const referralData = location?.state?.data;
  console.log(referralData);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [referralBackendData, setreferralBackendData] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setReload(!reload);
    if (
      status === "Active" ||
      statusBtn === "SendReview" ||
      statusBtn === "CreateBroadcast"
    ) {
      navigate("/rider-referral");
    }
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const [leavePageShow, setLeavePageShow] = useState(false);
  const handleLeavePageClose = () => setLeavePageShow(false);
  const handleLeavePageShow = () => setLeavePageShow(true);

  const [statusBtn, setStatusBtn] = useState("");

  const riderReferralNotification =
    referralBackendData?.rider_referral_notification;

  const [changeUpdatePasswordshow, setReferralApproveShow] = useState(false);
  const handleChangeUpdatePasswordClose = () => {
    setReferralApproveShow(false);
    if (statusBtn === "Approve") {
      setReload(!reload);
    }
  };
  const handlChangesUpdateShow = () => setReferralApproveShow(true);
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

  useEffect(() => {
    {
      (status === "PendingReview" || status === "ReviewPendingUpdated") &&
        setFetchLoading(true);
      dispatch(
        reviewReqRefrralFindOneAction(
          {
            referral_id: params?.id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    }
    {
      status === "Active" && setFetchLoading(true);
      dispatch(
        activeReferralFindOneAction(
          {
            referral_id: params?.id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    }
    {
      status === "Rejected" && setFetchLoading(true);
      dispatch(
        rejectedReferralFindOneAction(
          {
            referral_id: params?.id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    }
    {
      status === "Deleted" && setFetchLoading(true);
      dispatch(
        deletedReferralFindOneAction(
          {
            referral_id: params?.id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    }
    {
      status === "Expired" && setFetchLoading(true);
      dispatch(
        expiredReferralFindOneAction(
          {
            referral_id: params?.id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    }
  }, [reload]);

  const onFetchSuccess = (data) => {
    setFetchLoading(false);
    console.log(data);
    setreferralBackendData(data?.data);
  };

  const onFetchError = (data) => {
    setFetchLoading(false);
    console.log(data);
  };

  function clearReferralFn() {
    if (type === "createRiderReferral") {
      dispatch(
        clearRiderReferralAction(
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

  // validation
  const requiredStage =
    referralData?.required_rides_completed_by_receiver != "0"
      ? Yup.boolean().when(["notificationStage3", "smsMessageStage3"], {
          is: (notificationStage3, smsMessageStage3) =>
            !notificationStage3 && !smsMessageStage3,
          then: Yup.boolean().required("Atleast one is required"),
          otherwise: Yup.boolean(),
        })
      : Yup.bool();
  const CurrentDataRequiredStage =
    referralBackendData?.required_rides_completed_by_receiver != "0"
      ? Yup.boolean().when(["notificationStage3", "smsMessageStage3"], {
          is: (notificationStage3, smsMessageStage3) =>
            !notificationStage3 && !smsMessageStage3,
          then: Yup.boolean().required("Atleast one is required"),
          otherwise: Yup.boolean(),
        })
      : Yup.bool();

  function requiredFn() {
    if (referralData?.required_rides_completed_by_receiver) {
      return requiredStage;
    } else if (referralBackendData?.required_rides_completed_by_receiver) {
      return CurrentDataRequiredStage;
    }
  }

  const required = requiredFn();

  const broadcastStageReq =
    referralData?.required_rides_completed_by_receiver != "0"
      ? Yup.string().required()
      : Yup.string();
  const CurrentDataBroadcastStageReq =
    referralBackendData?.required_rides_completed_by_receiver != "0"
      ? Yup.string().required()
      : Yup.string();

  function broadcastStage3ReqFn() {
    if (referralData?.required_rides_completed_by_receiver) {
      return broadcastStageReq;
    } else if (referralBackendData?.required_rides_completed_by_receiver) {
      return CurrentDataBroadcastStageReq;
    }
  }

  const broadcastStage3Req = broadcastStage3ReqFn();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      receiverDraftMessage:
        riderReferralNotification?.is_receiver_draft_message_stage1
          ? riderReferralNotification?.is_receiver_draft_message_stage1
          : false,
      draftMessageTitle: riderReferralNotification?.draft_message_title_stage1
        ? riderReferralNotification?.draft_message_title_stage1
        : "",
      draftMessageBody1: riderReferralNotification?.draft_message_body_stage1
        ? riderReferralNotification?.draft_message_body_stage1
        : "",
      draftMessageGooglePlayLinkStage1:
        riderReferralNotification?.draft_message_google_play_stage1
          ? riderReferralNotification?.draft_message_google_play_stage1
          : "",
      draftMessageAppStoreLinkStage1:
        riderReferralNotification?.draft_message_app_store_stage1
          ? riderReferralNotification?.draft_message_app_store_stage1
          : "",
      notification_image_stage2:
        riderReferralNotification?.notification_image_stage2 ?? "",
      notification_image_stage3:
        riderReferralNotification?.notification_image_stage3 ?? "",
      notification_image_stage4:
        riderReferralNotification?.notification_image_stage4 ?? "",
      notificationStage2:
        riderReferralNotification?.is_receiver_notification_stage2
          ? riderReferralNotification?.is_receiver_notification_stage2
          : false,
      smsMessageStage2:
        riderReferralNotification?.is_receiver_sms_message_stage2
          ? riderReferralNotification?.is_receiver_sms_message_stage2
          : false,
      altleastOneStage2: "",
      notificationTitleStage2:
        riderReferralNotification?.notification_title_stage2
          ? riderReferralNotification?.notification_title_stage2
          : "",
      notificationBodyStage2:
        riderReferralNotification?.notification_body_stage2
          ? riderReferralNotification?.notification_body_stage2
          : "",
      smsMessageTitleStage2: riderReferralNotification?.message_title_stage2
        ? riderReferralNotification?.message_title_stage2
        : "",
      smsMessageBodyStage2: riderReferralNotification?.message_body_stage2
        ? riderReferralNotification?.message_body_stage2
        : "",
      broadcastTypeStage2:
        riderReferralNotification?.message_broadcast_type_stage2
          ? riderReferralNotification?.message_broadcast_type_stage2
          : "",
      reminderTypeStage2:
        riderReferralNotification?.message_reminder_type_stage2
          ? riderReferralNotification?.message_reminder_type_stage2
          : "",
      reminderTimeStage2:
        riderReferralNotification?.message_reminder_time_stage2
          ? riderReferralNotification?.message_reminder_time_stage2
          : null,
      reminderCycleStage2:
        riderReferralNotification?.message_reminder_cycle_stage2
          ? riderReferralNotification?.message_reminder_cycle_stage2
          : null,
      reminderFrequencyStage2:
        riderReferralNotification?.message_reminder_frequency_stage2
          ? riderReferralNotification?.message_reminder_frequency_stage2
          : "",
      onlineReminderDaysStage2:
        riderReferralNotification?.message_reminder_days_stage2
          ? riderReferralNotification?.message_reminder_days_stage2
          : "",
      notificationStage3:
        riderReferralNotification?.is_sender_notification_stage3
          ? riderReferralNotification?.is_sender_notification_stage3
          : false,
      smsMessageStage3: riderReferralNotification?.is_sender_sms_message_stage3
        ? riderReferralNotification?.is_sender_sms_message_stage3
        : false,
      altleastOneStage3: "",
      notificationTitleStage3:
        riderReferralNotification?.notification_title_stage3
          ? riderReferralNotification?.notification_title_stage3
          : "",
      notificationBody1Stage3:
        riderReferralNotification?.notification_message_body_stage3
          ? riderReferralNotification?.notification_message_body_stage3
          : "",
      notificationBody2Stage3:
        riderReferralNotification?.notification_message_body2_stage3
          ? riderReferralNotification?.notification_message_body2_stage3
          : "",
      notificationBody3Stage3:
        riderReferralNotification?.notification_message_body3_stage3
          ? riderReferralNotification?.notification_message_body3_stage3
          : "",
      messageTitleStage3: riderReferralNotification?.sms_message_title_stage3
        ? riderReferralNotification?.sms_message_title_stage3
        : "",
      messageBody1Stage3: riderReferralNotification?.sms_message_body_stage3
        ? riderReferralNotification?.sms_message_body_stage3
        : "",
      messageBody2Stage3: riderReferralNotification?.sms_message_body2_stage3
        ? riderReferralNotification?.sms_message_body2_stage3
        : "",
      messageBody3Stage3: riderReferralNotification?.sms_message_body3_stage3
        ? riderReferralNotification?.sms_message_body3_stage3
        : "",
      broadcastTypeStage3: riderReferralNotification?.sms_broadcast_type_stage3
        ? riderReferralNotification?.sms_broadcast_type_stage3
        : "",
      reminderTypeStage3: riderReferralNotification?.sms_reminder_type_stage3
        ? riderReferralNotification?.sms_reminder_type_stage3
        : "",
      reminderTimeStage3: riderReferralNotification?.sms_reminder_time_stage3
        ? riderReferralNotification?.sms_reminder_time_stage3
        : null,
      reminderCycleStage3: riderReferralNotification?.sms_reminder_cycle_stage3
        ? riderReferralNotification?.sms_reminder_cycle_stage3
        : null,
      reminderFrequencyStage3:
        riderReferralNotification?.sms_reminder_frequency_stage3
          ? riderReferralNotification?.sms_reminder_frequency_stage3
          : "",
      onlineReminderDaysStage3:
        riderReferralNotification?.sms_reminder_days_stage3
          ? riderReferralNotification?.sms_reminder_days_stage3
          : "",
      notificationStage4:
        riderReferralNotification?.is_sender_notification_stage4
          ? riderReferralNotification?.is_sender_notification_stage4
          : false,
      smsMessageStage4: riderReferralNotification?.is_sender_sms_message_stage4
        ? riderReferralNotification?.is_sender_sms_message_stage4
        : false,
      altleastOneStage4: "",
      notificationTitleStage4:
        riderReferralNotification?.notification_title_stage4
          ? riderReferralNotification?.notification_title_stage4
          : "",
      notificationBodyStage4:
        riderReferralNotification?.notification_body_stage4
          ? riderReferralNotification?.notification_body_stage4
          : "",
      smsMessageTitleStage4: riderReferralNotification?.sms_message_title_stage4
        ? riderReferralNotification?.sms_message_title_stage4
        : "",
      smsMessageBodyStage4: riderReferralNotification?.sms_message_body_stage4
        ? riderReferralNotification?.sms_message_body_stage4
        : "",
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
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      onlineReminderDaysStage2: Yup.string().when(["broadcastTypeStage2"], {
        is: (broadcastTypeStage2) => broadcastTypeStage2 === "OnlineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      notificationStage3: Yup.bool(),
      smsMessageStage3: Yup.bool(),
      altleastOneStage3: required,
      notificationTitleStage3: Yup.string().when("notificationStage3", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      notificationBody1Stage3: Yup.string().when("notificationStage3", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      // notificationBody2Stage3: Yup.string().when("notificationStage3", {
      //   is: true,
      //   then: Yup.string().required("notificationBody is required."),
      // }),
      // notificationBody3Stage3: Yup.string().when("notificationStage3", {
      //   is: true,
      //   then: Yup.string().required("notificationBody is required."),
      // }),
      messageTitleStage3: Yup.string().when("smsMessageStage3", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      messageBody1Stage3: Yup.string().when("smsMessageStage3", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      // messageBody2Stage3: Yup.string().when("smsMessageStage3", {
      //   is: true,
      //   then: Yup.string().required("notificationBody is required."),
      // }),
      // messageBody3Stage3: Yup.string().when("smsMessageStage3", {
      //   is: true,
      //   then: Yup.string().required("notificationBody is required."),
      // }),

      broadcastTypeStage3: broadcastStage3Req,
      reminderTypeStage3: Yup.string().when(["broadcastTypeStage3"], {
        is: (broadcastTypeStage3) =>
          broadcastTypeStage3 === "OfflineMobileApp" ||
          broadcastTypeStage3 === "OnlineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
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
      reminderFrequencyStage3: Yup.string().when(["broadcastTypeStage3"], {
        is: (broadcastTypeStage3) =>
          broadcastTypeStage3 === "OfflineMobileApp" ||
          broadcastTypeStage3 === "OnlineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      onlineReminderDaysStage3: Yup.string().when(["broadcastTypeStage3"], {
        is: (broadcastTypeStage3) => broadcastTypeStage3 === "OnlineMobileApp",
        then: Yup.string().required("Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      notificationStage4: Yup.bool(),
      smsMessageStage4: Yup.bool(),
      altleastOneStage4: Yup.boolean().when(
        ["notificationStage4", "smsMessageStage4"],
        {
          is: (notificationStage4, smsMessageStage4) =>
            !notificationStage4 && !smsMessageStage4,
          then: Yup.boolean().required("Atleast one is required"),
          otherwise: Yup.boolean(),
        }
      ),
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
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const data = {
        referral_id: referralData?.id ?? referralBackendData?.id,
        is_receiver_draft_message_stage1: values?.receiverDraftMessage,
        draft_message_title_stage1: values?.draftMessageTitle,
        draft_message_body_stage1: values?.draftMessageBody1,
        // draft_message_google_play_stage1:
        //   values?.draftMessageGooglePlayLinkStage1,
        // draft_message_app_store_stage1: values?.draftMessageAppStoreLinkStage1,
        // is_receiver_notification_stage2: values?.notificationStage2,
        notification_title_stage2: values?.notificationTitleStage2,
        notification_body_stage2: values?.notificationBodyStage2,
        notification_image_stage2: notifyImgLinkStage2?.img ?? "",
        is_receiver_sms_message_stage2: values?.smsMessageStage2,
        message_title_stage2: values?.smsMessageTitleStage2,
        message_body_stage2: values?.smsMessageBodyStage2,
        message_broadcast_type_stage2: values?.broadcastTypeStage2,
        message_reminder_type_stage2: values?.reminderTypeStage2,
        message_reminder_frequency_stage2: values?.reminderFrequencyStage2
          ? values?.reminderFrequencyStage2
          : null,
        message_reminder_days_stage2: values?.onlineReminderDaysStage2
          ? values?.onlineReminderDaysStage2
          : null,
        message_reminder_time_stage2: values?.reminderTimeStage2
          ? values?.reminderTimeStage2
          : null,
        message_reminder_cycle_stage2: values?.reminderCycleStage2 ?? null,
        is_sender_notification_stage3: values?.notificationStage3,
        notification_title_stage3: values?.notificationTitleStage3,
        notification_message_body_stage3: values?.notificationBody1Stage3,
        // notification_message_body2_stage3: values?.notificationBody2Stage3,
        // notification_message_body3_stage3: values?.notificationBody3Stage3,
        notification_image_stage3: notifyImgLinkStage3?.img ?? "",
        is_sender_sms_message_stage3: values?.smsMessageStage3,
        sms_message_title_stage3: values?.messageTitleStage3,
        sms_message_body_stage3: values?.messageBody1Stage3,
        // sms_message_body2_stage3: values?.messageBody2Stage3,
        // sms_message_body3_stage3: values?.messageBody3Stage3,
        sms_broadcast_type_stage3: values?.broadcastTypeStage3,
        sms_reminder_type_stage3: values?.reminderTypeStage3,
        sms_reminder_frequency_stage3: values?.reminderFrequencyStage3
          ? values?.reminderFrequencyStage3
          : null,
        sms_reminder_days_stage3: values?.onlineReminderDaysStage3
          ? values?.onlineReminderDaysStage3
          : null,
        sms_reminder_time_stage3: values?.reminderTimeStage3
          ? values?.reminderTimeStage3
          : null,
        sms_reminder_cycle_stage3: values?.reminderCycleStage3
          ? values?.reminderCycleStage3
          : null,
        is_sender_notification_stage4: values?.notificationStage4,
        notification_title_stage4: values?.notificationTitleStage4,
        notification_body_stage4: values?.notificationBodyStage4,
        notification_image_stage4: notifyImgLinkStage4?.img ?? "",
        is_sender_sms_message_stage4: values?.smsMessageStage4,
        sms_message_title_stage4: values?.smsMessageTitleStage4,
        sms_message_body_stage4: values?.smsMessageBodyStage4,
      };

      if (statusBtn === "CreateBroadcast") {
        dispatch(sendReviewReferralAction(data, onSuccess, onError));
      }
      if (
        statusBtn === "Save Later" ||
        statusBtn === "Approve" ||
        statusBtn === "SendReview"
      ) {
        if (status === "PendingReview" || status === "ReviewPendingUpdated") {
          dispatch(
            reviewReqReferralBroadcastEditAction(
              data,
              onEditSuccess,
              onEditError
            )
          );
        } else if (status === "Active") {
          dispatch(
            activeReferralBroadcastEditAction(data, onEditSuccess, onEditError)
          );
        }
      }
      if (statusBtn === "Approve") {
        handlChangesUpdateShow();
      }
    },
  });

  const onSuccess = (data) => {
    setLoading(false);
    console.log(data);
    successToast(data?.data);
    dispatch(clearReducerRiderReferralAction());
    handleSuccessMessageShow();
  };

  const onError = (data) => {
    setLoading(false);
    console.log(data);
    errorToast(data?.data?.data);
  };

  const onEditSuccess = (data) => {
    setLoading(false);

    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      successToast(data?.message);
      if (
        status === "PendingReview" ||
        status === "ReviewPendingUpdated" ||
        status === "Active"
      ) {
        if (statusBtn === "Save Later" || statusBtn === "SendReview") {
          handleSuccessMessageShow();
        }
      }
    } else if (statusBtn === "SendReview") {
      handleSuccessMessageShow();
    }
    console.log(data);
  };

  const onEditError = (data) => {
    setLoading(false);
    setReload(!reload);
    errorToast(data?.data?.data);
    console.log(data);
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

  const bookingTypeListName = referralBackendData?.booking_type
    ? Object?.keys(referralBackendData?.booking_type).filter(
        (key) => referralBackendData?.booking_type[key]
      )
    : referralData?.booking_type
    ? Object?.keys(referralData?.booking_type).filter(
        (key) => referralData?.booking_type[key]
      )
    : "";

  const rideTypeListName = referralBackendData?.ride_type
    ? Object?.keys(referralBackendData?.ride_type).filter(
        (key) => referralBackendData?.ride_type[key]
      )
    : referralData?.ride_type
    ? Object?.keys(referralData?.ride_type).filter(
        (key) => referralData?.ride_type[key]
      )
    : "";

  console.log(referralBackendData);

  const sideBarData = [
    {
      label: "Referral ID",
      value:
        referralBackendData?.referral_id ?? referralData?.referral_id ?? "--",
      display: true,
    },
    {
      label: "User Type",
      value: referralData?.user_type ?? referralBackendData?.user_type ?? "--",
      display: true,
    },
    {
      label: "Referral Classification",
      value:
        referralData?.referral_classification ??
        referralBackendData?.referral_classification ??
        "--",
      display: true,
    },
    {
      label: "Sender Coupon Type",
      value: referralData?.sender_coupon_type
        ? couponTypeName(referralData?.sender_coupon_type)
        : couponTypeName(referralBackendData?.sender_coupon_type),
      display: true,
    },
    {
      label: "Receiver Coupon Type",
      value: referralData?.receiver_coupon_type
        ? couponTypeName(referralData?.receiver_coupon_type)
        : couponTypeName(referralBackendData?.receiver_coupon_type),
      display: true,
    },
    {
      label: "Referral Status",
      value:
        referralData?.referral_status ??
        referralBackendData?.referral_status ??
        "--",
      display: true,
    },

    {
      label: "Current Balance Deposit Amount",
      value:
        referralData?.sender_cb_deposite_amount ??
        referralBackendData?.sender_cb_deposite_amount ??
        "--",
      heading: "Sender Current Balance Deposit Details",
      display: true,
    },
    {
      label: "Current Balance Deposit Amount Life Span (Days)",
      value:
        referralData?.sender_cb_deposite_amount_life_span ??
        referralBackendData?.sender_cb_deposite_amount_life_span ??
        "--",
      display: true,
    },
    {
      label: "Required Rides(Completed By Receiver)*",
      value:
        referralData?.required_rides_completed_by_receiver ??
        referralBackendData?.required_rides_completed_by_receiver ??
        "--",
      display: true,
    },
    {
      label: "Coupon Code",
      value:
        referralData?.coupon_code ?? referralBackendData?.coupon_code ?? "--",
      heading: "Receiver Discount Details",
      display:
        referralBackendData?.receiver_coupon_type !== "CurrentBalanceDeposit" &&
        referralData?.receiver_coupon_type !== "CurrentBalanceDeposit"
          ? true
          : false,
    },
    {
      label: "Coupon Title",
      value:
        referralData?.coupon_title ?? referralBackendData?.coupon_title ?? "--",
      display:
        referralBackendData?.receiver_coupon_type !== "CurrentBalanceDeposit" &&
        referralData?.receiver_coupon_type !== "CurrentBalanceDeposit"
          ? true
          : false,
    },
    {
      label: "Coupon Description (for admins reference)",
      value:
        referralData?.coupon_description ??
        referralBackendData?.coupon_description ??
        "--",
      display:
        referralBackendData?.receiver_coupon_type !== "CurrentBalanceDeposit" &&
        referralData?.receiver_coupon_type !== "CurrentBalanceDeposit"
          ? true
          : false,
    },
    {
      label: "Usage Limit Per Account",
      value:
        referralData?.usage_limit_per_account ??
        referralBackendData?.usage_limit_per_account ??
        "--",
      display:
        referralBackendData?.receiver_coupon_type !== "CurrentBalanceDeposit" &&
        referralData?.receiver_coupon_type !== "CurrentBalanceDeposit"
          ? true
          : false,
    },
    {
      label: "Coupon Life Span(Days)*",
      value:
        referralData?.coupon_life_span ??
        referralBackendData?.coupon_life_span ??
        "--",
      display:
        referralBackendData?.receiver_coupon_type !== "CurrentBalanceDeposit" &&
        referralData?.receiver_coupon_type !== "CurrentBalanceDeposit"
          ? true
          : false,
    },
    {
      label: "% Discount",
      value: referralData?.discount ?? referralBackendData?.discount,
      display:
        referralData?.discount ?? referralBackendData?.discount ? true : false,
    },
    {
      label: "Max Discount In Rs",
      value:
        referralData?.max_amount_in_rs ?? referralBackendData?.max_amount_in_rs,
      display:
        referralData?.max_amount_in_rs ?? referralBackendData?.max_amount_in_rs
          ? true
          : false,
    },
    {
      label: "Cashback",
      value: referralData?.cashback ?? referralBackendData?.cashback,
      display:
        referralData?.cashback ?? referralBackendData?.cashback ? true : false,
    },
    {
      label: "Max CashBack In Rs",
      value:
        referralData?.max_cashback_in_rs ??
        referralBackendData?.max_cashback_in_rs,
      display:
        referralData?.max_cashback_in_rs ??
        referralBackendData?.max_cashback_in_rs
          ? true
          : false,
    },
    {
      label: "X Amount Off",
      value: referralData?.amountoff ?? referralBackendData?.amountoff,
      display:
        referralData?.amountoff ?? referralBackendData?.amountoff
          ? true
          : false,
    },
    {
      label: "Booking Type",
      value:
        referralBackendData?.booking_type || referralData?.booking_type
          ? removeUnderScoreInArray(bookingTypeListName).join(", ")
          : "--",
      display:
        referralBackendData?.receiver_coupon_type !== "CurrentBalanceDeposit" &&
        referralData?.receiver_coupon_type !== "CurrentBalanceDeposit"
          ? true
          : false,
    },
    {
      label: "Ride Type",
      value: referralBackendData?.ride_type
        ? referralBackendData?.ride_type.join(", ")
        : referralData?.ride_type
        ? referralData?.ride_type.join(", ")
        : "--",
      display:
        referralBackendData?.receiver_coupon_type !== "CurrentBalanceDeposit" &&
        referralData?.receiver_coupon_type !== "CurrentBalanceDeposit"
          ? true
          : false,
    },
    {
      label: "Current Balance Deposit Amount (₹)*",
      value:
        referralData?.receiver_cb_deposite_amount ??
        referralBackendData?.receiver_cb_deposite_amount ??
        "--",
      heading: "Receiver Current Balance Deposit Details",
      display:
        referralBackendData?.receiver_coupon_type === "CurrentBalanceDeposit" ||
        referralData?.receiver_coupon_type === "CurrentBalanceDeposit"
          ? true
          : false,
    },
    {
      label: "Current Balance Deposit Amount Life Span (Days)*",
      value:
        referralData?.receiver_cb_deposite_amount_life_span ??
        referralBackendData?.receiver_cb_deposite_amount_life_span ??
        "--",
      display:
        referralBackendData?.receiver_coupon_type === "CurrentBalanceDeposit" ||
        referralData?.receiver_coupon_type === "CurrentBalanceDeposit"
          ? true
          : false,
    },
    {
      label: "Activation At",
      value: referralData?.start_date
        ? moment(referralData?.start_date).format("DD-MM-YYYY") +
          ", " +
          referralData?.start_time
        : moment(referralBackendData?.start_date).format("DD-MM-YYYY") +
          ", " +
          referralBackendData?.start_time,
      heading: "Campaign Details",
      display: true,
    },
    {
      label: "Expiry At",
      value: referralData?.expiry_date
        ? moment(referralData?.expiry_date).format("DD-MM-YYYY") +
          ", " +
          referralData?.expiry_time
        : moment(referralBackendData?.expiry_date).format("DD-MM-YYYY") +
          ", " +
          referralBackendData?.expiry_time,
      display: true,
    },
  ];

  const activereferralData = [
    {
      label: "Accounts Availed",
      value: referralBackendData?.accounts_availed ?? "--",
      heading: "Receiver Coupon Usage Details*",
      display: true,
    },
    {
      label: "Total Coupons Used",
      value: referralBackendData?.total_coupon_used ?? "--",
      display: true,
    },
  ];

  if (referralBackendData?.referral_status === "Active") {
    sideBarData.push(...activereferralData);
  }

  const [uploaded, setUploaded] = useState(false);
  const [notifyImgStage2, setNotifyImgStage2] = useState();

  useEffect(() => {
    setNotifyImgLinkStage2({
      img: riderReferralNotification?.notification_image_stage2,
      error: false,
    });
  }, [referralBackendData]);

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
      img: riderReferralNotification?.notification_image_stage3,
      error: false,
    });
  }, [referralBackendData]);

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
      img: riderReferralNotification?.notification_image_stage4,
      error: false,
    });
  }, [referralBackendData]);

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

  console.log(formik.errors);

  const expiryDate = useExpiryDate(
    referralBackendData?.coupon_life_span,
    referralBackendData?.expiry_date,
    referralBackendData?.expiry_time
  );

  const firstErrorField = Object.keys(formik.errors).find(
    (fieldName) => formik.touched[fieldName] && formik.errors[fieldName]
  );

  console.log(referralBackendData, "referralBackendData");

  return (
    <div>
      <ReferralPasswordModal
        changeUpdatePasswordshow={changeUpdatePasswordshow}
        handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
        referralBackendData={referralBackendData}
        statusBtn={statusBtn}
        title={
          statusBtn === "Approve"
            ? "Are you sure you want to approve this referral?"
            : statusBtn === "Reject"
            ? "Are you sure you want to reject this coupon?"
            : "--"
        }
        type="riderReferrals"
      />
      <LeavePagemodal
        leavePageShow={leavePageShow}
        handleLeavePageClose={handleLeavePageClose}
        link={-1}
        subsection={true}
        okayFn={() => clearReferralFn()}
      />
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={() => {
          handleSuccessMessageClose();
          // navigateHome();
        }}
        // title={`Successfully sent for Review!`}
        title={
          statusBtn === "CreateBroadcast" || statusBtn === "SendReview"
            ? `Successfully Sent For Review`
            : `Changes made successfully!`
        }
      />

      <InnerLayout
        mainHeading={
          referralBackendData?.referral_id
            ? `Rider To Rider Referral - ${referralBackendData?.referral_id}`
            : `Create Account Specific Coupon`
        }
        navigateEnable={false}
        naviagteLeave={true}
        navigateFn={backBtn}
        expiryDateShow={true}
        expiryDate={
          fetchLoading
            ? ``
            : type === "createRiderReferral"
            ? ``
            : `Referral Coupon Code Exp : ${expiryDate}`
        }
      >
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
                  referralBackendData={referralBackendData}
                  type={type}
                  riderreferral={"riderreferral"}
                />
                <ReferralBroadcastStage2
                  formik={formik}
                  is_editable={is_editable}
                  uploaded={uploaded}
                  notifyImgStage2={notifyImgStage2}
                  handleNotifyImgStage2Change={handleNotifyImgStage2Change}
                />{" "}
                {referralData?.required_rides_completed_by_receiver == 0 ||
                referralBackendData?.required_rides_completed_by_receiver ==
                  0 ? (
                  <></>
                ) : (
                  <ReferralBroadcastStage3
                    formik={formik}
                    is_editable={is_editable}
                    uploadedStage3={uploadedStage3}
                    notifyImgStage3={notifyImgStage3}
                    handleNotifyImgStage3Change={handleNotifyImgStage3Change}
                  />
                )}
                <ReferralBroadcastStage4
                  stageNo={
                    referralData?.required_rides_completed_by_receiver == 0 ||
                    referralBackendData?.required_rides_completed_by_receiver ==
                      0
                      ? "Stage 3 :"
                      : "Stage 4 :"
                  }
                  formik={formik}
                  is_editable={is_editable}
                  uploadedStage4={uploadedStage4}
                  notifyImgStage4={notifyImgStage4}
                  handleNotifyImgStage4Change={handleNotifyImgStage4Change}
                />
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
                        saveLaterBtn={() => setStatusBtn("Save Later")}
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
    </div>
  );
};

export default ReferralBroadcastDetails;
