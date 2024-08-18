import React, { useMemo } from "react";
import CouponInputField from "../../form/couponInputField";
import { useFormik } from "formik";
import CheckboxInputField from "../../form/checkboxInputField";
import "../incentives.css";
import { useState } from "react";
import { useEffect } from "react";
import ErrorMessagemodal from "../../modals/errorMessageModal";
import Select, { components } from "react-select";
import {
  reactMultiSelectUsageLimit,
  reactMultiSelectUsageLimitError,
} from "../../mui-styles/react-styles";
import DropDownIcon from "../../../assets/icons/dropdown-icon";
import {
  areAllDaysSelected,
  areDatesInDescendingOrder,
  areSlotsInOrder,
  calculateTotalMinutes,
  checkTimeRangeOverlap,
  customDaysOptions,
  daysMapping,
  doesCampaignDayMatchDates,
  formatIsoString,
  getNested,
  getNextMondayAndSunday,
  isEveryStartDateAMonday,
  isExpiryTimeGreaterThanStartTime,
  isTimeExceeded,
} from "../../helper";
import { generateValidationSchema } from "../../utilits/validationSchema";
import WarningMessageModal from "../../modals/warningMessageModal";
import { useNavigate } from "react-router";
import EditReferralBtn from "../../rider-referrals/utilities/edit-referral-btn";
import { useDispatch, useSelector } from "react-redux";
import {
  driverIncentivePendingEditAction,
  incentiveDataAction,
} from "../../../redux/actions/incentives/pendingIncentivesAction";
import {
  driverIncentiveActiveCampaignEdit,
  driverIncentiveActiveEditAction,
} from "../../../redux/actions/incentives/activeIncentivesAction";
import errorToast from "../../utilits/errorToast";
import IncentivePasswordModal from "./passwordModal";
import LeavePagemodal from "../../modals/leaveModal";
import SuccessMessagemodal from "../../modals/successMessageModal";

const DriverIncentivesForm = ({
  location,
  incentiveData,
  is_editable,
  status,
  type,
  id,
  setNavigateBack,
  reloadtable,
  setReloadtable,
}) => {
  console.log(location, "adasdad");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropDownIcon fill={props} />
      </components.DropdownIndicator>
    );
  };
  const [statusBtn, setStatusBtn] = useState("");
  const [timeSlots, setTimeSlots] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    errorTitle: "",
    errorDescription: "",
  });

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setReloadtable(!reloadtable);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const [selectNewDay, setSelectNewDay] = useState("");
  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const handleErrorMessageClose = () => setErrorMessageShow(false);
  const handleErrorMessageShow = () => setErrorMessageShow(true);

  const [passwordModalShow, setPasswordModalShow] = useState(false);
  const handlePasswordClose = () => setPasswordModalShow(false);
  const handlePasswordShow = () => setPasswordModalShow(true);

  const [leavePageShow, setLeavePageShow] = useState(false);
  const handleLeavePageClose = () => setLeavePageShow(false);
  const handleLeavePageShow = () => setLeavePageShow(true);

  const incentive_classification =
    location?.state?.incentive_classification ??
    incentiveData?.incentive_classification ??
    "";
  // console.log(incentiveData);
  const incentiveClassification = useMemo(() => {
    if (
      incentive_classification === "CompletedBookings" ||
      incentive_classification === "OnlinePaymentBooking" ||
      incentive_classification === "ConsecutiveBookingWithoutDOrC"
    ) {
      return {
        label: "Number Of Bookings",
        value: "no_of_bookings",
      };
    } else if (incentive_classification === "OnlineDuration") {
      return {
        label: "Number Of Hours",
        value: "no_of_hours",
      };
    } else if (incentive_classification === "DistanceTravelled") {
      return {
        label: "Distance travelled in Km ",
        value: "distance_travelled_km",
      };
    } else if (incentive_classification === "ConsecutiveFiveStarRatings") {
      return {
        label: "Consecutive Five Star",
        value: "consecutive_five_star",
      };
    }
  }, [incentive_classification]);

  const createdIncentiveData = useSelector(
    (store) => store.incentiveCreateReducer?.data
  );

  useEffect(() => {
    console.log(createdIncentiveData?.booking_type, "akjsgdkjagdkja");
  }, []);

  console.log(timeSlots);
  console.log(incentiveData);
  const campaign_period =
    location?.state?.campaign_period ?? incentiveData?.campaign_period;

  console.log(location, "asdadadsa");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: type ?? "",
      user_type: "Driver",
      incentive_classification: incentive_classification ?? "",
      incentive_applicable_zone:
        location?.state?.incentive_applicable_zone ??
        incentiveData?.incentive_applicable_zone ??
        "",
      driver_default_ride_type:
        location?.state?.driver_default_ride_type ??
        incentiveData?.DefaultRideTypeName?.id ??
        "",
      driver_type:
        location?.state?.driver_type ?? incentiveData?.driver_type ?? "",
      incentive_coupon_type:
        location?.state?.incentive_coupon_type ??
        incentiveData?.incentive_coupon_type ??
        "",
      booking_type: createdIncentiveData?.booking_type ??
        incentiveData?.booking_type ?? {
          one_way_outstation: false,
          round_trip_outstation: false,
          local: false,
          rental: false,
        },
      campaign_period:
        incentiveData?.campaign_period ??
        location?.state?.campaign_period ??
        "",

      incentive_time_slots1: {
        slots:
          incentiveData?.incentive_time_slots1?.slice(
            0,
            (incentiveData?.incentive_time_slots1?.length || 0) - 1
          ) || [
            {
              [incentiveClassification?.value]: "",
              amount: "",
            },
          ] ||
          [],
        days_selected:
          incentiveData?.incentive_time_slots1?.[
            incentiveData?.incentive_time_slots1?.length - 1
          ]?.days_selected || [],
        start_time:
          incentiveData?.incentive_time_slots1?.[
            incentiveData?.incentive_time_slots1?.length - 1
          ]?.start_time || "",
        expiry_time:
          incentiveData?.incentive_time_slots1?.[
            incentiveData?.incentive_time_slots1?.length - 1
          ]?.expiry_time || "",
      },
      incentive_time_slots2: {
        slots:
          incentiveData?.incentive_time_slots2?.slice(
            0,
            (incentiveData?.incentive_time_slots2?.length || 0) - 1
          ) || [],
        days_selected:
          incentiveData?.incentive_time_slots2?.[
            incentiveData?.incentive_time_slots2?.length - 1
          ]?.days_selected || [],
        start_time:
          incentiveData?.incentive_time_slots2?.[
            incentiveData?.incentive_time_slots2?.length - 1
          ]?.start_time || "",
        expiry_time:
          incentiveData?.incentive_time_slots2?.[
            incentiveData?.incentive_time_slots2?.length - 1
          ]?.expiry_time || "",
      },
      incentive_time_slots3: {
        slots:
          incentiveData?.incentive_time_slots3?.slice(
            0,
            (incentiveData?.incentive_time_slots3?.length || 0) - 1
          ) || [],
        days_selected:
          incentiveData?.incentive_time_slots3?.[
            incentiveData?.incentive_time_slots3?.length - 1
          ]?.days_selected || [],
        start_time:
          incentiveData?.incentive_time_slots3?.[
            incentiveData?.incentive_time_slots3?.length - 1
          ]?.start_time || "",
        expiry_time:
          incentiveData?.incentive_time_slots3?.[
            incentiveData?.incentive_time_slots3?.length - 1
          ]?.expiry_time || "",
      },
      campaign_day: incentiveData?.campaign_day ?? "",
      campaign_dates: incentiveData?.campaign_dates ?? [
        {
          start_date: formatIsoString(getNextMondayAndSunday().nextMonday),
          start_time: "00:00",
          expiry_date: formatIsoString(getNextMondayAndSunday().nextSunday),
          expiry_time: "23:58",
        },
      ],
      campaign_status: incentiveData?.campaign_dates?.campaign_status ?? "",
    },
    // validationSchema: generateValidationSchema(
    //   campaign_period,
    //   incentiveClassification?.value
    // ),
    onSubmit: (values) => {
      console.log(values, "finalSubmission");
      if (
        values?.campaign_period === "Weekly" &&
        !areAllDaysSelected(values, timeSlots)
      ) {
        setErrorMessage({
          errorTitle: "Day selection error!",
          errorDescription:
            "Note: All days of the week must be selected across the slots.",
        });
        handleErrorMessageShow();
        return;
      } else if (
        values?.campaign_period === "Daily" &&
        isTimeExceeded(formik, timeSlots)
      ) {
        setErrorMessage({
          errorTitle: "Time Exceeded Error!",
          errorDescription:
            "Note: The total duration of all time slots cannot exceed 23 hours and 58 minutes.",
        });
        handleErrorMessageShow();
        return;
      } else if (
        values?.campaign_period === "Daily" &&
        !isExpiryTimeGreaterThanStartTime(values, timeSlots)
      ) {
        setErrorMessage({
          errorTitle: "Time Slot Error!",
          errorDescription:
            "Note: The expiry time must be greater than the start time in each slot.",
        });
        handleErrorMessageShow();
        return;
      } else if (
        values?.campaign_period === "Daily" &&
        !areSlotsInOrder(values, timeSlots)
      ) {
        setErrorMessage({
          errorTitle: "Time Slot Order Error!",
          errorDescription:
            "Note: The start and expiry times of time slots must be in ascending order.",
        });
        handleErrorMessageShow();
        return;
      } else if (
        // values?.campaign_period === "Daily" &&
        !areDatesInDescendingOrder(values.campaign_dates)
      ) {
        setErrorMessage({
          errorTitle: "Campaign Dates Order Error!",
          errorDescription:
            "Note: The campaign dates must be in descending order.",
        });
        handleErrorMessageShow();
        return;
      } else if (
        values?.campaign_period === "Daily" &&
        values?.campaign_day !== "Custom" &&
        !doesCampaignDayMatchDates(values.campaign_day, values.campaign_dates)
      ) {
        setErrorMessage({
          errorTitle: "Campaign Date Error!",
          errorDescription:
            "Note: All dates in the campaign details must match the campaign day.",
        });
        handleErrorMessageShow();
        return;
      } else if (
        values?.campaign_period === "Weekly" &&
        !isEveryStartDateAMonday(values.campaign_dates)
      ) {
        setErrorMessage({
          errorTitle: "Campaign Dates Error!",
          errorDescription:
            "Note: The start date of each campaign must be a Monday when campaign period is Weekly.",
        });
        handleErrorMessageShow();
        return;
      }
      if (type === "createIncentive") {
        dispatch(incentiveDataAction(values));
        navigate("/driver-incentives/broadcast/create", {
          state: values,
          status: location?.state?.status,
        });
      } else if (type === "reviewRequired") {
        const driverIncentiveCreateForDaily = {
          incentive_id: id,
          booking_type: values.booking_type,
          incentive_time_slots1: [
            ...values?.incentive_time_slots1?.slots,
            {
              start_time: values?.incentive_time_slots1?.start_time,
              expiry_time: values?.incentive_time_slots1?.expiry_time,
            },
          ],
          incentive_time_slots2: [
            ...values?.incentive_time_slots2?.slots,
            {
              start_time: values?.incentive_time_slots2?.start_time,
              expiry_time: values?.incentive_time_slots2?.expiry_time,
            },
          ],

          incentive_time_slots3: [
            ...values?.incentive_time_slots3?.slots,
            {
              start_time: values?.incentive_time_slots3?.start_time,
              expiry_time: values?.incentive_time_slots3?.expiry_time,
            },
          ],
          campaign_day: values.campaign_day,
          campaign_dates: values.campaign_dates,
          is_notification: incentiveData?.is_notification,
          notification_title: incentiveData?.notification_title,
          notification_body: incentiveData?.notification_body,
          notification_image: incentiveData?.notification_image,
          is_send_sms_message: incentiveData?.is_send_sms_message,
          message_title: incentiveData?.message_header,
          message_body: incentiveData?.message_body,
          message_broadcast_type: incentiveData?.message_broadcast_type,
          message_reminder_type: incentiveData?.message_reminder_type,
          message_reminder_frequency: incentiveData?.message_reminder_frequency,
          message_reminder_days: incentiveData?.message_reminder_days ?? null,
          message_reminder_time: incentiveData?.message_reminder_time ?? null,
          message_reminder_cycle: incentiveData?.message_reminder_cycle ?? null,
        };
        const driverIncentiveCreateForWeekly = {
          incentive_id: id,
          booking_type: values.booking_type,
          incentive_time_slots1: [
            ...values?.incentive_time_slots1?.slots,
            {
              days_selected: values?.incentive_time_slots1?.days_selected,
              start_time: values?.incentive_time_slots1?.start_time,
              expiry_time: values?.incentive_time_slots1?.expiry_time,
            },
          ],
          incentive_time_slots2: [
            ...values?.incentive_time_slots2?.slots,
            {
              days_selected: values?.incentive_time_slots2?.days_selected,
              start_time: values?.incentive_time_slots2?.start_time,
              expiry_time: values?.incentive_time_slots2?.expiry_time,
            },
          ],

          incentive_time_slots3: [
            ...values?.incentive_time_slots3?.slots,
            {
              days_selected: values?.incentive_time_slots3?.days_selected,
              start_time: values?.incentive_time_slots3?.start_time,
              expiry_time: values?.incentive_time_slots3?.expiry_time,
            },
          ],
          campaign_dates: values.campaign_dates,
          campaign_status: incentiveData.campaign_dates.campaign_status,
          is_notification: incentiveData?.is_notification,
          notification_title: incentiveData?.notification_title,
          notification_body: incentiveData?.notification_body,
          notification_image: incentiveData?.notification_image,
          is_send_sms_message: incentiveData?.is_send_sms_message,
          message_title: incentiveData?.message_header,
          message_body: incentiveData?.message_body,
          message_broadcast_type: incentiveData?.message_broadcast_type,
          message_reminder_type: incentiveData?.message_reminder_type,
          message_reminder_frequency:
            +incentiveData?.message_reminder_frequency,
          message_reminder_days: incentiveData?.message_reminder_days
            ? +incentiveData?.message_reminder_days
            : null,
          message_reminder_time: incentiveData?.message_reminder_time ?? null,
          message_reminder_cycle: incentiveData?.message_reminder_cycle ?? null,
        };
        dispatch(
          driverIncentivePendingEditAction(
            campaign_period === "Daily"
              ? driverIncentiveCreateForDaily
              : driverIncentiveCreateForWeekly,
            onEditSuccess,
            onEditError
          )
        );
      } else if (type === "Approved") {
        dispatch(
          driverIncentiveActiveCampaignEdit(
            {
              incentive_id: id,
              campaign_dates: values.campaign_dates,
            },
            onEditSuccess,
            onEditError
          )
        );
      }
    },
  });

  console.log(formik?.values, "lkjlkjlkklj");

  useEffect(() => {
    let timeSlotsCount = 0;

    if (formik?.values?.incentive_time_slots1.start_time !== "") {
      timeSlotsCount++;
    }

    if (formik?.values?.incentive_time_slots2.start_time !== "") {
      timeSlotsCount++;
    }

    if (formik?.values?.incentive_time_slots3.start_time !== "") {
      timeSlotsCount++;
    }

    setTimeSlots(timeSlotsCount);
  }, [formik?.values]);

  const onEditSuccess = (data) => {
    if (statusBtn === "Save&ViewBroadCast") {
      if (status === "PendingReview" || status === "ReviewPendingUpdated") {
        navigate(
          `/driver-incentives/review-required/broadcast/${is_editable}/${id}`,
          {
            state: {
              ...formik?.values,
              status: location?.state?.status,
              type: type,
              edit: is_editable,
            },
          }
        );
      } else if (status === "Active") {
        navigate(`/driver-incentives/active/broadcast/${is_editable}/${id}`, {
          state: {
            ...formik?.values,
            status: location?.state?.status,
            type: type,
            edit: is_editable,
          },
        });
      }
    } else if (statusBtn === "SaveLater") {
      if (status === "PendingReview" || status === "ReviewPendingUpdated") {
        if (
          JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
        ) {
          handleSuccessMessageShow();
        }
      }
    }

    console.log(data);
  };
  const onEditError = (data) => {
    console.log(data);
    errorToast(data?.data?.data);
  };
  console.log(formik.errors);
  const [warningModalShow, setWarningModalShow] = useState(false);
  const handleWarningMessageShow = (option) => {
    setSelectNewDay(option);
    setWarningModalShow(true);
  };
  const handleWarningMessageClose = () => {
    setWarningModalShow(false);
  };

  useEffect(() => {
    if (formik?.values?.campaign_period === "Daily") {
      if (formik?.values?.campaign_day !== "") {
        const start_time = formik?.values?.incentive_time_slots1?.start_time;
        const expiry_time =
          formik?.values?.incentive_time_slots3?.expiry_time ||
          formik?.values?.incentive_time_slots2?.expiry_time ||
          formik?.values?.incentive_time_slots1?.expiry_time;

        formik.setFieldValue(
          "campaign_dates",
          formik.values.campaign_dates.map((row) => ({
            ...row,
            start_time: start_time,
            expiry_time: expiry_time,
          }))
        );
      }
    }
  }, [
    formik?.values?.campaign_day,
    formik?.values?.incentive_time_slots1?.start_time,
    formik?.values?.incentive_time_slots3?.expiry_time,
    formik?.values?.incentive_time_slots2?.expiry_time,
    formik?.values?.incentive_time_slots1?.expiry_time,
    formik?.values?.campaign_period,
  ]);

  useEffect(() => {
    const allSelected = Object.values(formik.values.booking_type).every(
      Boolean
    );
    setSelectAll(allSelected);
  }, [formik.values.booking_type]);

  const toggleSelectAll = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);
    formik.setFieldValue("booking_type", {
      local: newValue,
      rental: newValue,
      one_way_outstation: newValue,
      round_trip_outstation: newValue,
    });
  };

  const updateIndividualCheckbox = (name, value) => {
    formik.setFieldValue("booking_type", {
      ...formik.values.booking_type,
      [name]: value,
    });
    const allSelected = Object.values(formik.values.booking_type).every(
      Boolean
    );
    setSelectAll(allSelected);
  };

  const selectHandleChange = (selectedOption) => {
    const campaignDatesLength = formik.values.campaign_dates.length;

    if (
      campaignDatesLength > 1 &&
      selectedOption !== formik.values.campaign_day
    ) {
      handleWarningMessageShow(selectedOption);
      return;
    }
    if (
      formik?.values?.incentive_time_slots1?.start_time !== "" &&
      (formik?.values?.incentive_time_slots3?.expiry_time !== "" ||
        formik?.values?.incentive_time_slots2?.expiry_time !== "" ||
        formik?.values?.incentive_time_slots1?.expiry_time !== "")
    ) {
      formik.setFieldValue("campaign_day", selectedOption);

      if (selectedOption === "Custom") {
        formik.setFieldValue(`campaign_dates[0].start_date`, "");
        formik.setFieldValue(
          `campaign_dates[0].start_time`,
          formik?.values?.incentive_time_slots1?.start_time
        );
        formik.setFieldValue(`campaign_dates[0].expiry_date`, "");
        formik.setFieldValue(
          `campaign_dates[0].expiry_time`,
          formik?.values?.incentive_time_slots3?.expiry_time ||
            formik?.values?.incentive_time_slots2?.expiry_time ||
            formik?.values?.incentive_time_slots1?.expiry_time
        );
      } else {
        if (daysMapping.hasOwnProperty(selectedOption)) {
          const targetDay = daysMapping[selectedOption];
          const currentDate = new Date();
          const currentDay = currentDate.getDay();
          const daysToTargetDay = (targetDay - currentDay + 7) % 7 || 7;
          currentDate.setDate(currentDate.getDate() + daysToTargetDay);
          const targetDate = formatIsoString(currentDate);
          formik.setFieldValue(`campaign_dates[0].start_date`, targetDate);
          formik.setFieldValue(
            `campaign_dates[0].start_time`,
            formik?.values?.incentive_time_slots1?.start_time
          );
          formik.setFieldValue(`campaign_dates[0].expiry_date`, targetDate);
          formik.setFieldValue(
            `campaign_dates[0].expiry_time`,
            formik?.values?.incentive_time_slots3?.expiry_time ||
              formik?.values?.incentive_time_slots2?.expiry_time ||
              formik?.values?.incentive_time_slots1?.expiry_time
          );
        }
      }
    } else {
      setErrorMessage({
        errorTitle: "Start Time and expiry Time is required!",
        errorDescription: "Note: Please fill the start time and expiry time",
      });

      handleErrorMessageShow();
    }
  };

  const handleselectedDayChange = () => {
    handleWarningMessageClose();
    formik.setFieldValue("campaign_day", selectNewDay);
    handleWarningMessageClose();
    if (selectNewDay === "Custom") {
      formik.setFieldValue("campaign_dates", [
        {
          start_date: "",
          start_time: "00:00",
          expiry_date: "",
          expiry_time: "23:58",
        },
      ]);
    } else if (daysMapping.hasOwnProperty(selectNewDay)) {
      const targetDay = daysMapping[selectNewDay];
      const currentDate = new Date();
      const currentDay = currentDate.getDay();
      const daysToTargetDay = (targetDay - currentDay + 7) % 7 || 7;
      currentDate.setDate(currentDate.getDate() + daysToTargetDay);
      const targetDate = currentDate.toISOString().split("T")[0];

      if (
        formik?.values?.incentive_time_slots1?.start_time !== "" &&
        (formik?.values?.incentive_time_slots3?.expiry_time !== "" ||
          formik?.values?.incentive_time_slots2?.expiry_time !== "" ||
          formik?.values?.incentive_time_slots1?.expiry_time !== "")
      ) {
        formik.setFieldValue("campaign_dates", [
          {
            start_date: targetDate,
            start_time: "00:00",
            expiry_date: targetDate,
            expiry_time: "23:58",
          },
        ]);
      } else {
        setErrorMessage({
          errorTitle: "Start Time and expiry Time is required!",
          errorDescription: "Note: Please fill the start time and expiry time",
        });

        handleErrorMessageShow();
      }
    }
  };

  const incentiveDaysOptions = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];

  const [selectedDaysInSlots, setSelectedDaysInSlots] = useState([]);

  const availableDaysOptions = useMemo(() => {
    const selectedDaysInPreviousSlots = Array.from({
      length: timeSlots,
    }).reduce((selectedDays, _, slotIndex) => {
      const daysSelected =
        formik.values[`incentive_time_slots${slotIndex + 1}`]?.days_selected ||
        [];
      return selectedDays.concat(daysSelected);
    }, []);

    return incentiveDaysOptions.filter((option) => {
      return (
        !selectedDaysInSlots.includes(option.value) &&
        !selectedDaysInPreviousSlots.includes(option.value)
      );
    });
  }, [selectedDaysInSlots, formik.values, timeSlots]);

  const handleAddTimeSlot = () => {
    try {
      const sortedTimeSlots = [...Array.from({ length: timeSlots })].sort(
        (a, b) => {
          return (
            formik.values[`incentive_time_slots${a + 1}`].start_time -
            formik.values[`incentive_time_slots${b + 1}`].start_time
          );
        }
      );
      sortedTimeSlots.forEach((_, slotIndex) => {
        const slotsArray =
          formik.values[`incentive_time_slots${slotIndex + 1}`].slots;
        const days_selected =
          formik.values[`incentive_time_slots${slotIndex + 1}`].days_selected;
        const startTime =
          formik.values[`incentive_time_slots${slotIndex + 1}`].start_time;
        const expiryTime =
          formik.values[`incentive_time_slots${slotIndex + 1}`].expiry_time;
        const campaignPeriod = formik.values.campaign_period;
        const allDaysSelected = incentiveDaysOptions.every((option) =>
          days_selected.includes(option.value)
        );
        const totalMinutes = calculateTotalMinutes(formik, timeSlots);
        console.log(totalMinutes, "totalMinutes");

        if (
          slotsArray.some(
            (slot) => !slot[incentiveClassification.value] || !slot.amount
          ) ||
          (campaignPeriod === "Weekly" &&
            (!days_selected.length || allDaysSelected)) ||
          !startTime ||
          !expiryTime
        ) {
          throw new Error("previousFieldsEmpty");
        } else if (
          campaignPeriod === "Daily" &&
          slotIndex > 0 &&
          formik.values[`incentive_time_slots${slotIndex + 1}`].start_time <
            formik.values[`incentive_time_slots${slotIndex}`].expiry_time
        ) {
          throw new Error("TimeSlotsNotInAscendingOrder");
        } else if (allDaysSelected === true) {
          throw new Error("AllDaysSelected");
        } else if (totalMinutes > 1437 && campaignPeriod === "Daily") {
          // 23 hours 58 minutes is 1438 minutes
          throw new Error("MaxTimeExceeded");
        } else if (startTime >= expiryTime) {
          throw new Error("InvalidTimeRange");
        } else if (
          campaignPeriod === "Daily" &&
          checkTimeRangeOverlap(startTime, expiryTime, slotIndex, formik)
        ) {
          throw new Error("TimeRangeOverlap");
        }
      });
      if (timeSlots >= 3) {
        throw new Error("MaxTimeSlotsExceeded");
      }
    } catch (error) {
      if (error.message === "AllDaysSelected") {
        setErrorMessage({
          errorTitle: "Cannot add new slot!",
          errorDescription:
            "Note: A new slot cannot be added because all days from Monday to Sunday are already selected in previous slots. Please modify the selections in the existing slots if you want to add a new slot.",
        });
      } else if (error.message === "previousFieldsEmpty") {
        setErrorMessage({
          errorTitle: "Cannot add new field!",
          errorDescription:
            "Note: A new field cannot be added. Enter values in the previous field to add a new field.",
        });
      } else if (error.message === "TimeSlotsNotInAscendingOrder") {
        setErrorMessage({
          errorTitle: "Time Slot Order Error!",
          errorDescription:
            "Note: The start and expiry times of time slots must be in ascending order.",
        });
      } else if (error.message === "MaxTimeExceeded") {
        setErrorMessage({
          errorTitle: "Cannot add a new time slot!",
          errorDescription:
            "Note: The total duration of all time slots cannot exceed 23 hours and 58 minutes.",
        });
      } else if (error.message === "InvalidTimeRange") {
        setErrorMessage({
          errorTitle: "Inconsistency Error!",
          errorDescription:
            "Note: The selected 'Expiry Time' is invalid. Please note, 'Expiry Time' has to be greater than the 'Start Time'.",
        });
      } else if (error.message === "TimeRangeOverlap") {
        setErrorMessage({
          errorTitle: "Overlapping Error!",
          errorDescription:
            "Note: The selected time slot is in conflict with an another time slot.",
        });
      } else if (error.message === "MaxTimeSlotsExceeded") {
        setErrorMessage({
          errorTitle: "Cannot add a new time slot!",
          errorDescription:
            "Note: Adding more than 3 time slots is not allowed.",
        });
      }

      handleErrorMessageShow();
      return;
    }
    const newSlot = {
      slots: [
        {
          [incentiveClassification.value]: "",
          amount: "",
        },
      ],
      days_selected: [],
      start_time: "",
      expiry_time: "",
    };
    formik.setValues({
      ...formik.values,
      [`incentive_time_slots${timeSlots + 1}`]: newSlot,
    });
    // setTimeSlots((prev) => prev + 1);
  };

  const handleDeleteTimeSlot = (timeSlotsKey) => {
    setTimeSlots(timeSlots > 1 ? (prev) => prev - 1 : timeSlots);
    const deletedSlotIndex = parseInt(
      timeSlotsKey.replace("incentive_time_slots", "")
    );
    setSelectedDaysInSlots((prevState) => {
      const newState = [...prevState];
      newState.splice(deletedSlotIndex - 1, 1);
      return newState;
    });
    formik.setFieldValue(timeSlotsKey, {
      slots: [],
      days_selected: [],
      start_time: "",
      expiry_time: "",
    });
  };

  const getDaysSelected = (index) =>
    formik.values[`incentive_time_slots${index}`]?.days_selected;

  const continuousOrderErrorMsg =
    "Days should be selected in a continuous order. Please correct your selection.";

  const handleSlotDaysForWeekly = (selectedOption, slotIndex) => {
    const selectedDays = selectedOption
      ? selectedOption.map((item) => item.value)
      : [];

    try {
      const lastSlotIndexWithSelectedDays = selectedDaysInSlots.reduce(
        (lastIndex, selectedDays, index) =>
          selectedDays.length > 0 ? index : lastIndex,
        -1
      );

      if (slotIndex < lastSlotIndexWithSelectedDays) {
        throw new Error(
          "Please delete the day from the last slot to modify or delete any day in a slot ."
        );
      }
      if (slotIndex === 0 && selectedDays[0] !== "Monday") {
        throw new Error(
          "The first day of the week must be Monday. Please select Monday as the starting day."
        );
      }

      if (slotIndex > 1) {
        const previousSlotDays = getDaysSelected(slotIndex - 1);
        const secondPreviousSlotDays = getDaysSelected(slotIndex - 2);

        if (
          previousSlotDays?.length &&
          secondPreviousSlotDays?.length &&
          selectedDays[0] !== previousSlotDays[previousSlotDays.length - 1]
        ) {
          throw new Error(continuousOrderErrorMsg);
        }
      }
      if (slotIndex > 0) {
        const previousSlotDays = getDaysSelected(slotIndex);

        if (previousSlotDays?.length) {
          const lastDayIndex = incentiveDaysOptions.findIndex(
            (option) =>
              option.value === previousSlotDays[previousSlotDays.length - 1]
          );
          const currentIndex = incentiveDaysOptions.findIndex(
            (option) => option.value === selectedDays[0]
          );

          if (currentIndex > lastDayIndex + 1) {
            const nextDayLabel =
              incentiveDaysOptions[lastDayIndex + 1]?.label || "";
            throw new Error(
              `Days should be selected in a continuous order across slots. Please select the next day (${nextDayLabel}) as the starting day
               for slot ${slotIndex + 1}.`
            );
          }
        }
      }

      const isValidOrder = selectedDays.every((day, index) => {
        if (index === 0) return true;

        const previousDayIndex = incentiveDaysOptions.findIndex(
          (option) => option.value === selectedDays[index - 1]
        );
        const currentDayIndex = incentiveDaysOptions.findIndex(
          (option) => option.value === day
        );

        return currentDayIndex === previousDayIndex + 1;
      });

      if (!isValidOrder) {
        throw new Error("Days should be selected or deleted in a order-wise.");
      }

      formik.setFieldValue(
        `incentive_time_slots${slotIndex + 1}.days_selected`,
        selectedDays
      );
      setSelectedDaysInSlots((prevState) => {
        const newState = [...prevState];
        newState[slotIndex] = selectedDays;
        return newState;
      });

      if (formik?.values?.campaign_period === "Weekly") {
        if (
          formik.values[`incentive_time_slots${slotIndex + 1}`]?.start_time ===
          ""
        ) {
          formik.setFieldValue(
            `incentive_time_slots${slotIndex + 1}.start_time`,
            "00:00"
          );
          formik.setFieldValue(
            `incentive_time_slots${slotIndex + 1}.expiry_time`,
            "23:58"
          );
        }
      }
    } catch (error) {
      setErrorMessage({
        errorTitle: "Invalid Day Selection!",
        errorDescription: error.message,
      });
      handleErrorMessageShow();
      return;
    }
  };

  const handleAddRow = (slotTypePath) => {
    const slotType = slotTypePath.split(".")[0];
    const slotsPath = `${slotType}.slots`;
    const slots = formik.values[slotType].slots;

    if (slots.length < 5) {
      const lastRow = slots[slots.length - 1];
      if (
        lastRow[incentiveClassification?.value] &&
        lastRow.amount &&
        slots.every((row) => row[incentiveClassification?.value] && row.amount)
      ) {
        formik.setFieldValue(slotsPath, [
          ...slots,
          { [incentiveClassification?.value]: "", amount: "" },
        ]);
      } else {
        setErrorMessage({
          errorTitle: "Cannot add new field!",
          errorDescription:
            "Note: A new field cannot be added. Enter values in the previous field to add a new field.",
        });
        handleErrorMessageShow();
      }
    } else {
      setErrorMessage({
        errorTitle: "Cannot add a new row!",
        errorDescription:
          "Note: Adding more than 5 rows is not allowed. Please delete a previous row before adding a new row.",
      });
      handleErrorMessageShow();
    }
  };

  const handleRemoveRow = (timeSlotsKey, index) => {
    const currentSlots = formik.values[timeSlotsKey].slots;
    const newSlots = currentSlots.filter((_, slotIndex) => slotIndex !== index);
    formik.setFieldValue(`${timeSlotsKey}.slots`, newSlots);
  };

  const handleCampaignAddRow = () => {
    const previousRowsFilled = formik.values.campaign_dates.every(
      (row) => row.start_date
    );

    if (previousRowsFilled) {
      const previousRowStartDate =
        formik?.values?.campaign_dates[0]?.start_date;
      const previousRowDate = new Date(previousRowStartDate);
      const isMonday = previousRowDate.getDay() === 1;
      const newStartDate = new Date(
        previousRowDate.setDate(previousRowDate.getDate() + 7)
      );
      const newStartDateMondayForWeekly = getNextMondayAndSunday(
        previousRowStartDate
      )
        .nextMonday.toISOString()
        .split("T")[0];
      const newStartDateSundayForWeekly = getNextMondayAndSunday(
        previousRowStartDate
      )
        .nextSunday.toISOString()
        .split("T")[0];
      const allDates = formik?.values?.campaign_dates.map(
        (row) => new Date(row.start_date)
      );
      const datesAreDescending = allDates.every((date, index) => {
        const nextDate = allDates[index + 1];
        return nextDate ? date > nextDate : true;
      });
      const newFormattedStartDate = newStartDate.toISOString().split("T")[0];
      if (!datesAreDescending && formik?.values?.campaign_dates?.length > 1) {
        setErrorMessage({
          errorTitle: "Cannot add new field!",
          errorDescription:
            "Note: A new field cannot be added. All dates must be unique and in descending order.",
        });
        handleErrorMessageShow();
        return;
      }

      const previousDayOfWeek = daysMapping[formik.values.campaign_day];
      const newDayOfWeek = newStartDate.getDay();

      if (formik?.values?.campaign_period === "Daily") {
        if (formik.values.campaign_day === "Custom") {
          formik.setValues({
            ...formik.values,
            campaign_dates: [
              {
                start_date: "",
                start_time: formik?.values?.incentive_time_slots1?.start_time,
                expiry_date: "",
                expiry_time:
                  formik?.values?.incentive_time_slots3?.expiry_time ||
                  formik?.values?.incentive_time_slots2?.expiry_time ||
                  formik?.values?.incentive_time_slots1?.expiry_time,
              },
              ...formik.values.campaign_dates,
            ],
          });
        } else {
          if (newDayOfWeek === previousDayOfWeek) {
            formik.setValues({
              ...formik.values,
              campaign_dates: [
                {
                  start_date: newFormattedStartDate,
                  start_time: formik?.values?.incentive_time_slots1?.start_time,
                  expiry_date: newFormattedStartDate,
                  expiry_time:
                    formik?.values?.incentive_time_slots3?.expiry_time ||
                    formik?.values?.incentive_time_slots2?.expiry_time ||
                    formik?.values?.incentive_time_slots1?.expiry_time,
                },
                ...formik.values.campaign_dates,
              ],
            });
          } else {
            setErrorMessage({
              errorTitle: "Cannot add new field!",
              errorDescription: `Note: A new field cannot be added.The previous date must be a ${formik?.values?.campaign_day}.`,
            });
            handleErrorMessageShow();
          }
        }
      } else if (formik?.values?.campaign_period === "Weekly") {
        if (!isMonday) {
          setErrorMessage({
            errorTitle: "Cannot add new field!",
            errorDescription:
              "Note: The start date of the previous week must be a Monday.",
          });
          handleErrorMessageShow();
        } else {
          formik.setValues({
            ...formik.values,
            campaign_dates: [
              {
                start_date: newStartDateMondayForWeekly,
                start_time: "00:00",
                expiry_date: newStartDateSundayForWeekly,
                expiry_time: "23:58",
              },
              ...formik.values.campaign_dates,
            ],
          });
        }
      }
    } else {
      setErrorMessage({
        errorTitle: "Cannot add new field!",
        errorDescription:
          "Note: A new field cannot be added. Enter values in the previous field to add a new field.",
      });
      handleErrorMessageShow();
    }
  };

  const handleRemoveCampaignRow = (index) => {
    const newCampaign = formik.values.campaign_dates.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue(`campaign_dates`, newCampaign);
  };

  const handleStartDateChange = (e, index) => {
    const { value } = e.target;
    const { campaign_day, campaign_dates } = formik.values;
    if (campaign_day === "Custom" && campaign_dates[index].start_date === "") {
      formik.setFieldValue(`campaign_dates[${index}].expiry_date`, "");
    } else if (campaign_day === "Custom") {
      formik.setFieldValue(`campaign_dates[${index}].expiry_date`, value);
    } else if (campaign_dates[index].start_date !== "") {
      if (formik?.values?.campaign_period === "Weekly") {
        const startDate = new Date(value);
        startDate.setDate(startDate.getDate() + 6);
        formik.setFieldValue(
          `campaign_dates[${index}].expiry_date`,
          startDate.toISOString().split("T")[0]
        );
      } else {
        formik.setFieldValue(`campaign_dates[${index}].expiry_date`, value);
      }
    }
  };
  const leavePageFn = () => {
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      handleLeavePageShow();
    } else {
      navigate(-1);
    }
  };
  useEffect(() => {
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      setNavigateBack(true);
    } else {
      setNavigateBack(false);
    }
  }, [formik.values]);

  console.log(status, "asdada");

  const viewFn = () => {
    if (status === "PendingReview" || status === "ReviewPendingUpdated") {
      navigate(
        `/driver-incentives/review-required/broadcast/${is_editable}/${id}`,
        {
          state: {
            ...formik?.values,
            status: location?.state?.status,
            type: type,
            edit: is_editable,
          },
        }
      );
    } else if (status === "Active") {
      navigate(`/driver-incentives/active/broadcast/${is_editable}/${id}`, {
        state: {
          ...formik?.values,
          status: location?.state?.status,
          type: type,
          edit: is_editable,
        },
      });
    } else if (status === "Rejected") {
      navigate(`/driver-incentives/rejected/broadcast/${is_editable}/${id}`, {
        state: {
          ...formik?.values,
          status: location?.state?.status,
          type: type,
          edit: is_editable,
        },
      });
    } else if (status === "Expired") {
      navigate(`/driver-incentives/expired/broadcast/${is_editable}/${id}`, {
        state: {
          ...formik?.values,
          status: location?.state?.status,
          type: type,
          edit: is_editable,
        },
      });
    } else if (status === "Deleted") {
      navigate(`/driver-incentives/deleted/broadcast/${is_editable}/${id}`, {
        state: {
          ...formik?.values,
          status: location?.state?.status,
          type: type,
          edit: is_editable,
        },
      });
    }
    //  else if (status === "Deleted") {
    //   setFetchLoading(true);
    //   dispatch(driverIncentiveDeletedAction(id, onFetchSuccess, onFetchError));
    // } else if (status === "Expired") {
    //   setFetchLoading(true);
    //   dispatch(driverIncentiveExpiredAction(id, onFetchSuccess, onFetchError));
    // }
  };

  //  value={customDaysOptions?.filter((option) => {
  //  return option.value === formik.values.campaign_day;
  //   })}

  // const firstErrorField = Object.keys(formik.errors).map(
  //   (fieldName) => formik.touched[fieldName] && formik.errors[fieldName]
  // );
  // console.log(firstErrorField,"Allfieldnames");

  const campaign_day = "campaign_day";

  const updatedErrors = { ...formik.errors };

  delete updatedErrors[campaign_day];

  // Generate the firstErrorField array without the removed field name
  const firstErrorField = Object.keys(updatedErrors).map(
    (fieldName) => formik.touched[fieldName] && updatedErrors[fieldName]
  );

  console.log(firstErrorField, "removedcampaignday");

  //   const campaign_day = "campaign_day";

  // const updatedErrors = { ...formik.errors };

  // delete updatedErrors[campaign_day];

  // const firstErrorField = Object.keys(updatedErrors).map((fieldName) =>
  //   fieldName === campaign_day ? formik.errors[fieldName] : formik.touched[fieldName] && updatedErrors[fieldName]
  // );

  //                 --------------- or --------------------

  // const firstErrorField = Object.keys(updatedErrors).map((fieldName) => {
  //   if (fieldName === campaign_day) {
  //     return formik.touched[fieldName] && updatedErrors[fieldName];
  //   }
  //   return formik.touched[fieldName] && formik.errors[fieldName];
  // });

  // console.log(firstErrorField,"bothremoved&allfieldnamescombined");

  // const campaign_day = "campaign_day";

  // const updatedErrors = { ...formik.errors };
  // delete updatedErrors[campaign_day];

  // const errorsArray = [
  //   // Array of errors
  //   { field: "field1", message: "Error 1" },
  //   { field: "field2", message: "Error 2" },
  // ];

  // const combinedErrors = {
  //   ...updatedErrors,
  //   ...Object.fromEntries(errorsArray.map((error) => [error.field, error.message])),
  // };

  // const firstErrorField = Object.keys(combinedErrors).map((fieldName) => {
  //   return formik.touched[fieldName] && combinedErrors[fieldName];
  // });

  // console.log(firstErrorField,"botharray&objectcombined");

  console.log(
    incentiveData?.campaign_dates?.campaign_status,
    "incentiveDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  );

  console.log(
    formik?.values?.campaign_dates?.campaign_status,
    "formikvaluessssssssssssssssssssssssssssssssssss"
  );

  console.log(incentiveData, "incentiveData");

  console.log(formik?.values, "formikvalues");

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Changes made successfully!`}
      />
      <LeavePagemodal
        leavePageShow={leavePageShow}
        handleLeavePageClose={handleLeavePageClose}
        link={-1}
        subsection={true}
      />
      <ErrorMessagemodal
        errorMessageShow={errorMessageShow}
        handleErrorMessageClose={handleErrorMessageClose}
        title={errorMessage?.errorTitle}
        is_description={true}
        description={errorMessage?.errorDescription}
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
      <WarningMessageModal
        leavePageShow={warningModalShow}
        handleLeavePageClose={handleWarningMessageClose}
        title={`Are you sure you want to proceed?`}
        title_color={"red_color"}
        subsection={true}
        description={`Changing the Campaign Day will reset the existing campaign dates.`}
        cancelFn={() => {
          handleWarningMessageClose();
        }}
        okayFn={() => {
          handleselectedDayChange();
        }}
      />
      <form onSubmit={formik.handleSubmit}>
        {" "}
        <div className="discount_detials_container mt-2 px-sm-3 p-2 pb-3">
          <p className="primary_color fs_18 fw_500 text_underline">
            Incentive Classification
          </p>
          <div className="row">
            <div className="col-sm-7 col-md-7 col-lg-6 col-xl-5">
              <CouponInputField
                label={true}
                labelName={"Driver Default Ride Type*"}
                label_font_size={"fs_16"}
                itemName={"driver_default_ride_type"}
                inputValue={
                  location?.state?.ride_type ??
                  incentiveData?.DefaultRideTypeName?.ride_type
                }
                placeholder=""
                inputDisabled={true}
              />
            </div>
            <div className="col-sm-7 col-md-7 col-lg-6 col-xl-5">
              <CouponInputField
                label={true}
                labelName={"Driver Type*"}
                label_font_size={"fs_16"}
                itemName={"driver_type"}
                inputValue={formik.values.driver_type}
                inputDisabled={true}
              />
            </div>
          </div>
          <div className="row mt-3">
            <span className=" primary_color">Booking Type*</span>
            <div className="col-sm-7 col-md-7 col-lg-6 col-xl-5 mt-1">
              <div
                className={`${
                  formik.errors.booking_type && formik.touched.booking_type
                    ? "error_border"
                    : "primary_border"
                } border_radius_3px p-2`}
              >
                <CheckboxInputField
                  name={"select_all"}
                  title="All"
                  checkedValue={selectAll}
                  onChangeFn={toggleSelectAll}
                  labelPosition="left"
                  disabled={
                    is_editable === false ||
                    status === "Active" ||
                    status === "ReviewPendingUpdated"
                  }
                />
                {checkboxOptions.map((option) => (
                  <CheckboxInputField
                    key={option.name}
                    name={option.name}
                    title={option.title}
                    checkedValue={formik.values.booking_type[option.name]}
                    onChangeFn={() =>
                      updateIndividualCheckbox(
                        option.name,
                        !formik.values.booking_type[option.name]
                      )
                    }
                    labelPosition="left"
                    disabled={
                      is_editable === false ||
                      status === "Active" ||
                      status === "ReviewPendingUpdated"
                    }
                  />
                ))}
              </div>
              {formik.errors.booking_type && formik.touched.booking_type && (
                <span className="text-danger mt-1 poppins_medium d-flex align-items-center fs_16 fw_600">
                  {formik.errors.booking_type}
                </span>
              )}
            </div>
          </div>

          <div className="row">
            <div className="d-sm-flex justify-content-between align-items-center mt-3">
              <p className="primary_color fs_18 fw_500 text_underline">
                Incentive Time Slots
              </p>
              {status === "Active" ||
              status === "ReviewPendingUpdated" ? null : (
                <>
                  {is_editable && (
                    <button
                      className="green_color_bg border_none border_radius_5px white_color fw_500 py-1"
                      onClick={() => {
                        handleAddTimeSlot();
                      }}
                      type="button"
                    >
                      Create new time slots
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {Array.from({ length: 3 }).map((_, slotIndex) => {
            return (
              formik.values[`incentive_time_slots${slotIndex + 1}`]?.slots
                .length > 0 && (
                <div key={slotIndex} className="mt-2 slots_container">
                  <div className="w-100 voilet_bg slot_heading p-1 ps-3 d-flex justify-content-between">
                    <span className="fw_500 primary_color">{`Slot-${
                      slotIndex + 1
                    }`}</span>
                    {slotIndex > 0 && (
                      <button
                        onClick={() => {
                          handleDeleteTimeSlot(
                            `incentive_time_slots${slotIndex + 1}`,
                            slotIndex
                          );
                        }}
                        type="button"
                        className="white_bg error_border_dark border_radius_5px red_color d-flex justify-content-center
                         gap-3 fw_500 "
                      >
                        <span>Delete Time Slot </span>
                        <i className="ri-delete-bin-7-line delete_icon  white_color red_bg"></i>
                      </button>
                    )}
                  </div>
                  <div className="d-sm-flex justify-content-center mt-3">
                    <div className="col-sm-6  day_time_input_container me-sm-4 mb-2">
                      {formik?.values?.campaign_period === "Weekly" && (
                        <div className="d-flex gap-3 mt-3">
                          <div className="col-3">
                            <span className="text-end">Days Selected*</span>
                          </div>
                          <div className="col-10">
                            <div className="w-75">
                              <Select
                                isMulti
                                instanceId={`incentive_time_slots${
                                  slotIndex + 1
                                }.days_selected`}
                                id={`incentive_time_slots${
                                  slotIndex + 1
                                }.days_selected`}
                                options={availableDaysOptions}
                                value={
                                  formik.values[
                                    `incentive_time_slots${slotIndex + 1}`
                                  ]?.days_selected?.map((day) => ({
                                    value: day,
                                    label: day,
                                  })) || []
                                }
                                onChange={(selectedOption) => {
                                  handleSlotDaysForWeekly(
                                    selectedOption,
                                    slotIndex
                                  );
                                }}
                                onBlur={formik.handleBlur}
                                components={{
                                  DropdownIndicator,
                                  IndicatorSeparator: () => null,
                                }}
                                styles={
                                  formik.errors[
                                    `incentive_time_slots${slotIndex + 1}`
                                  ]?.days_selected &&
                                  formik.touched[
                                    `incentive_time_slots${slotIndex + 1}`
                                  ]?.days_selected
                                    ? reactMultiSelectUsageLimitError
                                    : reactMultiSelectUsageLimit
                                }
                                isDisabled={is_editable === false}
                              />
                            </div>
                            {formik.errors[
                              `incentive_time_slots${slotIndex + 1}`
                            ]?.days_selected &&
                              formik.touched[
                                `incentive_time_slots${slotIndex + 1}`
                              ]?.days_selected && (
                                <span className="text-danger mt-1 poppins_medium d-flex align-items-center fs_14 w-75 fw_600">
                                  {
                                    formik.errors[
                                      `incentive_time_slots${slotIndex + 1}`
                                    ]?.days_selected
                                  }
                                </span>
                              )}
                          </div>
                        </div>
                      )}

                      <div className="d-flex gap-3 mt-3">
                        <div className="col-3">
                          <span className="text-end">Start Time*</span>
                        </div>
                        <div className="col-10">
                          <input
                            type="time"
                            name={`incentive_time_slots${
                              slotIndex + 1
                            }.start_time`}
                            value={
                              formik.values[
                                `incentive_time_slots${slotIndex + 1}`
                              ]?.start_time
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${
                              formik?.errors[
                                `incentive_time_slots${slotIndex + 1}`
                              ]?.start_time &&
                              formik?.touched[
                                `incentive_time_slots${slotIndex + 1}`
                              ]?.start_time
                                ? "error_border"
                                : "primary_border"
                            } w-75 border_radius_5px py-1`}
                            disabled={
                              formik?.values?.campaign_period === "Weekly" ||
                              is_editable === false ||
                              status === "Active" ||
                              status === "ReviewPendingUpdated"
                            }
                          />
                          {formik.errors[`incentive_time_slots${slotIndex + 1}`]
                            ?.start_time &&
                            formik.touched[
                              `incentive_time_slots${slotIndex + 1}`
                            ]?.start_time && (
                              <span className="text-danger mt-1 poppins_medium d-flex align-items-center fs_14 w-75 fw_600">
                                {
                                  formik.errors[
                                    `incentive_time_slots${slotIndex + 1}`
                                  ]?.start_time
                                }
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="d-flex gap-3 mt-3">
                        <div className="col-3">
                          <span className="text-end">Expiry Time*</span>
                        </div>
                        <div className="col-10">
                          <input
                            type="time"
                            name={`incentive_time_slots${
                              slotIndex + 1
                            }.expiry_time`}
                            value={
                              formik.values[
                                `incentive_time_slots${slotIndex + 1}`
                              ]?.expiry_time
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${
                              formik?.errors[
                                `incentive_time_slots${slotIndex + 1}`
                              ]?.expiry_time &&
                              formik?.touched[
                                `incentive_time_slots${slotIndex + 1}`
                              ]?.expiry_time
                                ? "error_border"
                                : "primary_border"
                            } w-75 border_radius_5px py-1`}
                            disabled={
                              formik?.values?.campaign_period === "Weekly" ||
                              is_editable === false ||
                              status === "Active" ||
                              status === "ReviewPendingUpdated"
                            }
                          />
                          {formik.errors[`incentive_time_slots${slotIndex + 1}`]
                            ?.expiry_time &&
                            formik.touched[
                              `incentive_time_slots${slotIndex + 1}`
                            ]?.expiry_time && (
                              <span className="text-danger mt-1 poppins_medium d-flex align-items-center fs_14 w-75 fw_600">
                                {
                                  formik.errors[
                                    `incentive_time_slots${slotIndex + 1}`
                                  ]?.expiry_time
                                }
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <table>
                        <thead>
                          <tr>
                            <th className="text-center">
                              {incentiveClassification?.label}
                            </th>
                            <th className="text-center">Amount (₹)</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {formik?.values[
                            `incentive_time_slots${slotIndex + 1}`
                          ]?.slots?.map((slot, index) => {
                            // Check if the slot and incentiveClassification are defined
                            if (!slot || !incentiveClassification) {
                              return <></>;
                            }

                            return (
                              <tr key={index}>
                                <td className="text-center">
                                  <input
                                    className={`w-75 ${
                                      getNested(
                                        formik.touched,
                                        `incentive_time_slots${slotIndex + 1}`,
                                        "slots",
                                        index,
                                        incentiveClassification.value
                                      ) &&
                                      getNested(
                                        formik.errors,
                                        `incentive_time_slots${slotIndex + 1}`,
                                        "slots",
                                        index,
                                        incentiveClassification.value
                                      )
                                        ? `error_border`
                                        : "primary_border"
                                    } border_radius_5px mt-1`}
                                    name={`incentive_time_slots${
                                      slotIndex + 1
                                    }.slots[${index}].${
                                      incentiveClassification.value
                                    }`}
                                    value={slot[incentiveClassification?.value]}
                                    onChange={formik.handleChange}
                                    disabled={
                                      is_editable === false ||
                                      status === "Active" ||
                                      status === "ReviewPendingUpdated"
                                    }
                                  />
                                  <span className="mt-1">
                                    {getNested(
                                      formik.touched,
                                      `incentive_time_slots${slotIndex + 1}`,
                                      "slots",
                                      index,
                                      incentiveClassification.value
                                    ) &&
                                      getNested(
                                        formik.errors,
                                        `incentive_time_slots${slotIndex + 1}`,
                                        "slots",
                                        index,
                                        incentiveClassification.value
                                      ) && (
                                        <span className="text-danger poppins_medium d-flex align-items-center fs_14 fw_600 ps-3">
                                          {getNested(
                                            formik.errors,
                                            `incentive_time_slots${
                                              slotIndex + 1
                                            }`,
                                            "slots",
                                            index,
                                            incentiveClassification.value
                                          )}
                                        </span>
                                      )}
                                  </span>
                                </td>

                                <td className="text-center">
                                  <input
                                    className={`w-75 ${
                                      getNested(
                                        formik.touched,
                                        `incentive_time_slots${slotIndex + 1}`,
                                        "slots",
                                        index,
                                        "amount"
                                      ) &&
                                      getNested(
                                        formik.errors,
                                        `incentive_time_slots${slotIndex + 1}`,
                                        "slots",
                                        index,
                                        "amount"
                                      )
                                        ? `error_border`
                                        : "primary_border"
                                    } border_radius_5px mt-2`}
                                    name={`incentive_time_slots${
                                      slotIndex + 1
                                    }.slots[${index}].amount`}
                                    value={slot.amount}
                                    onChange={formik.handleChange}
                                    disabled={
                                      is_editable === false ||
                                      status === "Active" ||
                                      status === "ReviewPendingUpdated"
                                    }
                                  />
                                  <span className="mt-1">
                                    {getNested(
                                      formik.touched,
                                      `incentive_time_slots${slotIndex + 1}`,
                                      "slots",
                                      index,
                                      "amount"
                                    ) &&
                                      getNested(
                                        formik.errors,
                                        `incentive_time_slots${slotIndex + 1}`,
                                        "slots",
                                        index,
                                        "amount"
                                      ) && (
                                        <span className="text-danger poppins_medium d-flex align-items-center fs_14 fw_600 ps-3">
                                          {getNested(
                                            formik.errors,
                                            `incentive_time_slots${
                                              slotIndex + 1
                                            }`,
                                            "slots",
                                            index,
                                            "amount"
                                          )}
                                        </span>
                                      )}
                                  </span>
                                </td>
                                {is_editable === false ? (
                                  <></>
                                ) : (
                                  <td>
                                    {index > 0 &&
                                      (status === "Active" ||
                                      status ===
                                        "ReviewPendingUpdated" ? null : (
                                        <>
                                          <button
                                            onClick={() => {
                                              handleRemoveRow(
                                                `incentive_time_slots${
                                                  slotIndex + 1
                                                }`,
                                                index
                                              );
                                            }}
                                            className="white_bg error_border_dark border_radius_5px red_color fw_500 mt-2"
                                          >
                                            Delete
                                          </button>
                                        </>
                                      ))}
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className="d-flex justify-content-center me-lg-5">
                        {status === "Active" ||
                        status === "ReviewPendingUpdated" ? null : (
                          <>
                            {is_editable && (
                              <button
                                type="button"
                                className="mt-3 border_radius_5px primary_bg white_color border_none px-4"
                                onClick={() =>
                                  handleAddRow(
                                    `incentive_time_slots${slotIndex + 1}.slots`
                                  )
                                }
                              >
                                + Add
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="discount_detials_container mt-2 px-3 p-2 pb-3">
          <p className="primary_color fs_18 fw_500 text_underline">
            Incentive Campaign Details
          </p>
          <div className="d-sm-flex justify-content-between">
            <>
              <div className="col-sm-4">
                <CouponInputField
                  label={true}
                  labelName={"Campaign Period"}
                  label_font_size={"fs_16"}
                  itemName={"campaign_period"}
                  inputValue={formik.values.campaign_period}
                  inputDisabled={true}
                />
              </div>
            </>
            {formik?.values?.campaign_period === "Daily" && (
              <div className="col-sm-4">
                <span>Campaign Day</span>

                <Select
                  options={customDaysOptions}
                  type="text"
                  styles={
                    formik.errors.campaign_day && formik.touched.campaign_day
                      ? reactMultiSelectUsageLimitError
                      : reactMultiSelectUsageLimit
                  }
                  name="campaign_day"
                  value={customDaysOptions?.filter((option) => {
                    return option.value === formik.values.campaign_day;
                  })}
                  onChange={(selectedOption) => {
                    let event = {
                      target: {
                        name: "eventName",
                        value: selectedOption.value,
                      },
                    };
                    formik.handleChange(event);
                    selectHandleChange(event.target.value);
                  }}
                  components={{
                    DropdownIndicator,
                    IndicatorSeparator: () => null,
                  }}
                  isDisabled={
                    is_editable === false ||
                    status === "Active" ||
                    status === "ReviewPendingUpdated"
                  }
                />
                {formik.errors.campaign_day && formik.touched.campaign_day && (
                  <span className="text-danger mt-1 poppins_medium d-flex align-items-center fs_16 fw_600">
                    {formik.errors.campaign_day}
                  </span>
                )}
              </div>
            )}
          </div>
          {(formik?.values?.campaign_day !== "" ||
            formik?.values?.campaign_period === "Weekly") && (
            <>
              <div className="d-flex justify-content-sm-end justify-content-center mt-3">
                {is_editable && (
                  <button
                    className="border_radius_7px px-2 primary_bg white_color border_none"
                    type="button"
                    onClick={handleCampaignAddRow}
                  >
                    +Add{" "}
                    {formik?.values?.campaign_period === "Daily"
                      ? "Days"
                      : "Weeks"}
                  </button>
                )}
              </div>
              <div className="mt-3 table_container_incentive">
                <table className="w-100 text-nowrap">
                  <thead className="">
                    <tr className="pale_blue_bg primary_color fw_500 fs_14">
                      <th
                        className={
                          "first_list ps-2 primary_color fs_16 fw_500 py-1"
                        }
                      >
                        Start Date*
                      </th>
                      <th className={"primary_color fs_16 fw_500 py-1"}>
                        Start Time*
                      </th>
                      <th className={"primary_color fs_16 fw_500 py-1"}>
                        Expiry Date*
                      </th>
                      <th className={"primary_color fs_16 fw_500 py-1"}>
                        Expiry Time*
                      </th>

                      {/* ${styles.last_list} */}

                      <th
                        className={`
                       transparent_bg`}
                      >
                        Campaign Status
                      </th>
                      <th className="ongoing_heading_last_list "></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formik?.values?.campaign_dates?.map((_, index, item) => (
                      <tr key={index} className="mt-2">
                        <td>
                          <input
                            type="date"
                            name={`campaign_dates[${index}].start_date`}
                            value={
                              formik?.values?.campaign_dates[index]?.start_date
                            }
                            onChange={(e) => {
                              formik.handleChange(e);
                              handleStartDateChange(e, index);
                            }}
                            onBlur={formik.handleBlur}
                            className={`mt-2 ${
                              getNested(
                                formik.touched,
                                "campaign_dates",
                                index,
                                "start_date"
                              ) &&
                              getNested(
                                formik.errors,
                                "campaign_dates",
                                index,
                                "start_date"
                              )
                                ? `error_border`
                                : "primary_border"
                            }`}
                            disabled={is_editable === false}
                          />
                          {getNested(
                            formik.touched,
                            "campaign_dates",
                            index,
                            "start_date"
                          ) &&
                            getNested(
                              formik.errors,
                              "campaign_dates",
                              index,
                              "start_date"
                            ) && (
                              <span className="text-danger poppins_medium d-flex align-items-center fs_14 fw_600">
                                {getNested(
                                  formik.errors,
                                  "campaign_dates",
                                  index,
                                  "start_date"
                                )}
                              </span>
                            )}
                        </td>
                        <td>
                          <input
                            type="time"
                            name={`campaign_dates[${index}].start_time`}
                            value={
                              formik.values.campaign_dates[index]?.start_time
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled
                            className="mt-2"
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            name={`campaign_dates[${index}].expiry_date`}
                            value={
                              formik?.values?.campaign_dates[index]?.expiry_date
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled
                            className="mt-2"
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            name={`campaign_dates[${index}].expiry_time`}
                            value={
                              formik?.values?.campaign_dates[index]?.expiry_time
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled
                            className="mt-2"
                          />
                        </td>
                        {incentiveData?.campaign_dates?.map((item) => (
                          <td>{item.campaign_status}</td>
                        ))}

                        {is_editable === false ? (
                          <></>
                        ) : (
                          <td>
                            {index ===
                            formik?.values?.campaign_dates?.length - 1 ? (
                              <></>
                            ) : (
                              <button
                                onClick={() => {
                                  handleRemoveCampaignRow(index);
                                }}
                                className="background_none border_radius_5px error_border red_color fs_14 mt-2"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className="d-flex justify-content-sm-end justify-content-center gap-sm-3 gap-2 mt-3">
            {type !== "createIncentive" ? (
              <>
                {status === "Active" ? (
                  <EditReferralBtn
                    backButton={true}
                    backBtn={leavePageFn}
                    resetBtn={() => {
                      formik?.resetForm();
                    }}
                    saveViewBtn={() => setStatusBtn("Save&ViewBroadCast")}
                    saveForLater={false}
                    DeleteButton={true}
                    deleteBtnFn={() => {
                      setStatusBtn("Delete");
                      handlePasswordShow();
                    }}
                    is_editable={is_editable}
                    viewBtn={viewFn}
                    viewBtnText="View Broadcast"
                  />
                ) : (
                  <EditReferralBtn
                    backButton={true}
                    backBtn={leavePageFn}
                    saveLaterBtn={() => setStatusBtn("SaveLater")}
                    saveViewBtn={() => setStatusBtn("Save&ViewBroadCast")}
                    is_editable={is_editable}
                    viewBtn={viewFn}
                    resetBtn={() => {
                      formik.resetForm();
                    }}
                    viewBtnText="View Broadcast"
                  />
                )}
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    setTimeSlots(1);
                  }}
                  className="px-sm-5 px-4 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 d-flex gap-2 align-item-center"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="border_none white_color primary_bg border_radius_5px px-sm-4 py-1 text-nowrap "
                >
                  Create Broadcast
                </button>
              </>
            )}

            {/* <>
              <button
                type="button"
                onClick={() => {
                  formik.resetForm();
                  setTimeSlots(1);
                }}
                className="px-5 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 d-flex gap-2 align-item-center"
              >
                Reset
              </button>
              <button
                type="submit"
                className="border_none white_color primary_bg border_radius_5px px-4 py-1"
              >
                Create Broadcast
              </button>
            </> */}

            {/* {is_editable ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    setTimeSlots(1);
                  }}
                  className="px-5 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 d-flex gap-2 align-item-center"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="border_none white_color primary_bg border_radius_5px px-4 py-1"
                >
                  Create Broadcast
                </button>
              </>
            ) : (
              <button>View Broadcast</button>
            )} */}
          </div>
        </div>
      </form>
      {firstErrorField && (
        <div className="red_color fs_16 fw_500">
          {formik.errors[firstErrorField]}
        </div>
      )}
    </>
  );
};

export default DriverIncentivesForm;

const checkboxOptions = [
  {
    name: "local",
    title: "Local Trip",
  },
  {
    name: "rental",
    title: "Rental Trip",
  },
  {
    name: "one_way_outstation",
    title: "Outstation One-Way Trip",
  },
  {
    name: "round_trip_outstation",
    title: "Outstation Round Trip",
  },
];
