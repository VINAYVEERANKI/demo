import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import "../components/helper.css";

export const statusColor = (colorStatus) => {
  if (colorStatus === "Approved" || colorStatus === "Complete") {
    return "green_color";
  } else if (colorStatus === "Waiting for approval") {
    return "orange_color";
  } else if (colorStatus === "Incomplete") {
    return "red_color";
  } else if (colorStatus === "Re_approval" || colorStatus === "Re approval") {
    return "purple_color";
  } else if (
    colorStatus === "Pending Review" ||
    colorStatus === "PendingReview"
  ) {
    return "dark_orange_color";
  } else if (
    colorStatus === "ReviewPendingUpdated" ||
    colorStatus === "Review Pending Updated"
  ) {
    return "violet_color";
  } else if (colorStatus === "Active" || colorStatus === "Resolved") {
    return "green_color";
  } else if (colorStatus === "Scheduled") {
    return "dark_orange_color";
  } else if (
    colorStatus === "Assigned" ||
    colorStatus === "Initiated" ||
    colorStatus === "Closed"
  ) {
    return "ash_color";
  } else if (colorStatus === "Blocked") {
    return "primary_color";
  } else if (colorStatus === "Reassigned") {
    return "charcoal_color";
  } else if (colorStatus === "New_application") {
    return "orange_color";
  } else if (colorStatus === "--") {
    return "secondary_color";
  } else if (colorStatus < 0) {
    return "red_color";
  } else if (colorStatus > 0) {
    return "green_color";
  } else if (colorStatus === 0) {
    return "primary_color";
  } else {
    return "red_color";
  }
};

export const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const numRegex = /^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$/;
export const wholeNumRegex = /^0$|^[1-9]\d*(\.\d+)?$/;
export const phoneRegex = /^\d{10}$/;
export const vehicleRCRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
export const intNumRegex = /^[0-9]+$/;

export const alphaNumeric = /^[a-zA-Z0-9]*$/;
export const DlRegex =
  /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/;
export const IfscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
export const VIIDregex =
  /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;

export const urlRegex =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

export const maxLengthRegex = /^.{1,160}$/;

export const CharacterHidder = (value, type = "mobile") => {
  if (type === "email") {
    let sliced = value.split("@");
    return sliced[0].substring(0, 2) + "****" + "@" + sliced[1];
  } else {
    return value.substring(0, 2) + "*******" + value.substring(7, 9);
  }
};

export const BalanceStatus = (values) => {
  if (values > 0) {
    return "fs_14 text-nowrap fw_600 green_color";
  } else if (values === 0) {
    return "fs_14 text-nowrap fw_600 primary_color";
  } else if (values < 0) {
    return "fs_14 text-nowrap fw_600 red_color";
  } else {
    return "fs_14 text-nowrap fw_600 primary_color";
  }
};

export const removeUnderScore = (str) => {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.replace(/_/g, " ");
};

export const couponClassifyName = (value) => {
  if (value === "General") {
    return "General";
  }
  if (value === "NewAccount") {
    return "New Account";
  }
  if (value === "NewAccountLifeSpan") {
    return "New Account (Life Span)";
  }
  if (value === "PaymentMethod") {
    return "Payment Method";
  }
  if (value === "BookingDestination") {
    return "Booking Destination";
  }
  if (value === "PickupToDropoff") {
    return "Pickup location to Drop-off location";
  }
  if (value === "BookingDistance") {
    return "Booking Distance";
  }
  if (value === "RentalPackage") {
    return "Rental Package";
  }
  if (value === "OutstationPackageDistance") {
    return "Outstation Package Distance";
  }
};

export const couponTypeName = (value) => {
  if (value === "X%DiscountUpToY") {
    return "X % Discount Up To Y";
  }
  if (value === "XAmountOff") {
    return "X Amount Off";
  }
  if (value === "X%CashbackUpToY") {
    return "X % Cashback Up To Y";
  }
  if (value === "CurrentBalanceDeposit") {
    return "Current Balance Deposit";
  } else return "--";
};

export const BookingTypeName = ([value]) => {
  if (value === "one_way_outstation") {
    return "One Way Outstation";
  }
  if (value === "round_trip_outstation") {
    return "Round Trip Outstation";
  }
  if (value === "local") {
    return "Local";
  }
  if (value === "rental") {
    return "Rental";
  } else return "--";
};

// export const useSortableData = (items = [], config = null) => {
//   const [sortConfig, setSortConfig] = useState(config);

//   const sortedItems = useMemo(() => {
//     let sortableItems = [...items];
//     if (sortConfig !== null) {
//       sortableItems.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "ascending" ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "ascending" ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [items, sortConfig]);

//   const requestSort = (key, type = "string") => {
//     let direction = "ascending";
//     if (
//       sortConfig &&
//       sortConfig.key === key &&
//       sortConfig.direction === "ascending"
//     ) {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction, type });
//   };

//   return { items: sortedItems, requestSort, sortConfig };
// };

export const useSortableData = (items = [], config = null) => {
  console.log(items);
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aProp = getNestedProp(a, sortConfig.key);
        const bProp = getNestedProp(b, sortConfig.key);

        if (
          sortConfig.key === "sos_created_at" ||
          sortConfig.key === "complented_at" ||
          sortConfig.key === "generated_at"
        ) {
          const aDate = new Date(aProp);
          const bDate = new Date(bProp);
          if (isNaN(aDate.getTime()) || isNaN(bDate.getTime())) {
            // one of the dates is invalid, fallback to using the sortConfig.key
            return aProp < bProp ? -1 : aProp > bProp ? 1 : 0;
          }
          return aDate < bDate
            ? sortConfig.direction === "ascending"
              ? -1
              : 1
            : aDate > bDate
            ? sortConfig.direction === "ascending"
              ? 1
              : -1
            : 0;
        } else if (sortConfig.key === "resolvedOrClosedByName") {
          const aName = getResolvedOrClosedByName(a);
          const bName = getResolvedOrClosedByName(b);
          if (aName < bName) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (aName > bName) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        } else {
          if (aProp === null) {
            return 1;
          }
          if (bProp === null) {
            return -1;
          }
          if (aProp < bProp) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (aProp > bProp) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        }
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key, type = "string") => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction, type });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

// export const useSortableData = (items = [], config = null) => {
//   const [sortConfig, setSortConfig] = useState(config);

//   const sortedItems = useMemo(() => {
//     let sortableItems = [...items];
//     if (sortConfig !== null) {
//       sortableItems.sort((a, b) => {
//         const aProp = getNestedProp(a, sortConfig.key);
//         const bProp = getNestedProp(b, sortConfig.key);

//         if (
//           sortConfig.key === "sos_created_at" ||
//           sortConfig.key === "complented_at" ||
//           sortConfig.key === "generated_at"
//         ) {
//           // Date comparison logic remains the same
//           const aDate = new Date(aProp);
//           const bDate = new Date(bProp);
//           if (isNaN(aDate.getTime()) || isNaN(bDate.getTime())) {
//             // one of the dates is invalid, fallback to using the sortConfig.key
//             return aProp < bProp ? -1 : aProp > bProp ? 1 : 0;
//           }
//           return aDate < bDate
//             ? sortConfig.direction === "ascending"
//               ? -1
//               : 1
//             : aDate > bDate
//             ? sortConfig.direction === "ascending"
//               ? 1
//               : -1
//             : 0;
//         } else if (
//           sortConfig.key === "ReslovedBy.user_name" ||
//           sortConfig.key === "ClosedBy.user_name"
//         ) {
//           // Extract user_name from ReslovedBy or ClosedBy object
//           const aName =
//             getNestedProp(a, sortConfig.key + ".user_name") ?? "zzz";
//           const bName =
//             getNestedProp(b, sortConfig.key + ".user_name") ?? "zzz";
//           // Sort null/undefined values at the end
//           if (aName === "zzz" || bName === "zzz") {
//             return aName === bName ? 0 : aName === "zzz" ? 1 : -1;
//           }
//           return aName < bName
//             ? sortConfig.direction === "ascending"
//               ? -1
//               : 1
//             : aName > bName
//             ? sortConfig.direction === "ascending"
//               ? 1
//               : -1
//             : 0;
//         } else {
//           // Default string comparison logic
//           if (aProp === null) {
//             return 1;
//           }
//           if (bProp === null) {
//             return -1;
//           }
//           if (aProp < bProp) {
//             return sortConfig.direction === "ascending" ? -1 : 1;
//           }
//           if (aProp > bProp) {
//             return sortConfig.direction === "ascending" ? 1 : -1;
//           }
//           return 0;
//         }
//       });
//     }
//     return sortableItems;
//   }, [items, sortConfig]);

//   const requestSort = (key, type = "string") => {
//     let direction = "ascending";
//     if (
//       sortConfig &&
//       sortConfig.key === key &&
//       sortConfig.direction === "ascending"
//     ) {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction, type });
//   };

//   return { items: sortedItems, requestSort, sortConfig };
// };

function getNestedProp(obj, path) {
  const keys = path.split(".");
  let value = obj;
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) {
      break;
    }
  }
  return value;
}
function getResolvedOrClosedByName(item) {
  const resolvedByName = getNestedProp(item, "ReslovedBy.user_name");
  const closedByName = getNestedProp(item, "ClosedBy.user_name");
  return `${resolvedByName || ""}${closedByName || ""}`;
}

export function capitalizeFirstLetter(values) {
  const capitalizedWord = values.charAt(0).toUpperCase() + values.slice(1);
  return capitalizedWord;
}
export function insertSpaces(str = "") {
  const capitalzed = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalzed.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function insertSpaceUnderScore(str = "") {
  if (str) {
    const capitalzed =
      str?.charAt(0).toUpperCase() + str?.slice(1)?.replace(/_/g, " ");
    return capitalzed.replace(/([a-z])([A-Z])/g, "$1 $2");
  } else {
    return "--";
  }
}

export function removeUnderScoreInArray(strArr) {
  // return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.replace(/_/g, " ");
  return strArr?.map((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, " ");
  });
}

export function applicationAge(value) {
  const now = moment();
  const then = moment(value).utcOffset("+05:30");
  const diff = moment.duration(now.diff(then));
  const days = Math.floor(diff.asDays());
  const hours = diff.hours();
  const minutes = diff.minutes();
  if (days > 0) {
    return `${days} day ${hours} hrs`;
  } else if (hours > 0) {
    return `${hours} hrs ${minutes} min`;
  } else {
    return `${minutes} min`;
  }
}

export function formattedAddressFn(str, maxLength) {
  return str.slice(0, maxLength) + (str.length > maxLength ? "..." : "");
}

export const navigationFn = (bookingClassification, id) => {
  console.log(bookingClassification, id, "aldjasld");
  if (bookingClassification === "ongoing_booking") {
    return `/ongoing-bookings-details/${id}`;
  } else if (bookingClassification === "completed_booking") {
    return `/completed-bookings-details/${id}`;
  } else if (bookingClassification === "cancelled_booking") {
    return `/cancelled-bookings-details/${id}`;
  } else if (bookingClassification === "accident_booking") {
    return `/accident-bookings-details/${id}`;
  }
  return "/";
};

export const driverNavigateFn = (driver, id) => {
  console.log(driver, id, "askjdakjd");
  if (driver?.is_approved === true) {
    return `/manage-drivers/driver-rideHistory/${id}`;
  } else if (driver?.is_blocked === true) {
    return `/blocked-drivers/driver-rideHistory/${id}`;
  } else if (driver?.is_rejected === true) {
    return `/rejected-applications/driver-rideHistory/${id}`;
  } else if (driver?.is_banned === true) {
    return `/banned-application/driver-rideHistory/${id}`;
  } else if (driver?.expired_documents > 0) {
    return `/expired-documents/driver-rideHistory/${id}`;
  } else {
    return `/pending-applications/driver-rideHistory/${id}`;
  }
  return "/";
};

export const riderNavigateFn = (rider, id) => {
  console.log(rider, id, "askjdakjd");
  if (rider?.is_blocked === true) {
    return `/blocked-riders/rider-history/${id}`;
  } else if (rider?.is_deleted === true) {
    return `/deleted-riders/rider-history/${id}`;
  } else if (rider?.is_permanently_deleted > 0) {
    return `/permanently-deleted-riders/rider-history/${id}`;
  } else {
    return `/manage-riders/rider-history/${id}`;
  }
  return "/";
};

export const ComplaintsNavigationFn = (raised_by, status, currentOwner) => {
  const userName = localStorage.getItem("user_name");

  if (raised_by === "Driver") {
    if (
      (status === "Initiated" ||
        status === "Assigned" ||
        status === "Reassigned") &&
      currentOwner === userName
    ) {
      console.log("assdfsfa");
      return `/driver-mobile-app`;
    } else {
      if (status === "Pending") {
        return `/driver-complaints/pending-complaints`;
      } else if (
        status === "Initiated" ||
        status === "Assigned" ||
        status === "Reassigned"
      ) {
        return `/driver-complaints/inprogress-complaints`;
      } else if (status === "Closed" || status === "Resolved") {
        return `/driver-complaints/resolved-closed-complaints`;
      }
    }
  } else if (raised_by === "Rider") {
    if (
      (status === "Initiated" ||
        status === "Assigned" ||
        status === "Reassigned") &&
      currentOwner === userName
    ) {
      return `/rider-mobile-app`;
    } else {
      if (status === "Pending") {
        return `/rider-complaints/pending-complaints`;
      } else if (
        status === "Initiated" ||
        status === "Assigned" ||
        status === "Reassigned"
      ) {
        return `/rider-complaints/inprogress-complaints`;
      } else if (status === "Closed" || status === "Resolved") {
        return `/rider-complaints/resolved-closed-complaints`;
      }
    }
  }
  return `/`;
};

export const useExpiryDate = (life_span, expiry_date, expiry_time) => {
  const [expiryDate, setExpiryDate] = useState(null);
  const [expiryTime, setExpiryTime] = useState(null);

  useEffect(() => {
    if (life_span) {
      const newDate = new Date(expiry_date);
      newDate.setDate(newDate.getDate() + parseInt(life_span));
      setExpiryDate(newDate);
      setExpiryTime(expiry_time);
    } else if (!life_span) {
      setExpiryDate(expiry_date);
      setExpiryTime(expiry_time);
    }
  }, [life_span, expiry_date, expiry_time]);

  const formattedDate = moment(expiryDate).format("DD/MM/YYYY");
  return [formattedDate, expiryTime];
};

export function createBooleanObj(arr, values) {
  return arr.reduce((acc, curr) => {
    acc[curr.value] = values?.includes(curr.value);
    return acc;
  }, {});
}

export const PremiumType = [
  { value: "Premium1", label: "Premium 1" },
  { value: "Premium2", label: "Premium 2" },
  { value: "Premium3", label: "Premium 3" },
  { value: "Premium4", label: "Premium 4" , isDisabled:true },
  { value: "Premium5", label: "Premium 5", isDisabled:true },
];
export const rideType = [
  { value: "Bike", label: "Bike" },
  { value: "Auto", label: "Auto" },
  { value: "Mini", label: "Mini" },
  { value: "Sedan", label: "Sedan" },
  { value: "Suv", label: "Suv" },
  { value: "PremiumSedan", label: "PremiumSedan" },
  { value: "KaaliPeeli", label: "KaaliPeeli" },
  { value: "Luxury", label: "Luxury" },
];

export const customDaysOptions = [
  { label: "Custom", value: "Custom" },
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

export const daysMapping = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};
// export const getNextMondayAndSunday = (fromDate) => {
//   const date = fromDate ? new Date(fromDate) : new Date();
//   const diff = (date.getDay() < 1 ? 7 : 7 - date.getDay()) + 1;

//   const nextMonday = new Date(date);
//   nextMonday.setDate(nextMonday.getDate() + diff);

//   const nextSunday = new Date(nextMonday);
//   nextSunday.setDate(nextSunday.getDate() + 6);

//   return { nextMonday, nextSunday };
// };

export const getNextMondayAndSunday = (fromDate) => {
  const date = fromDate ? new Date(fromDate) : new Date();
  const diff = (8 - date.getDay()) % 7 || 7; // Changed 7 to 8

  const nextMonday = new Date(date.getTime() + diff * 24 * 60 * 60 * 1000);

  const nextSunday = new Date(nextMonday.getTime() + 6 * 24 * 60 * 60 * 1000);

  return { nextMonday, nextSunday };
};
export const formatIsoString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed in JavaScript
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
export const checkTimeRangeOverlap = (
  startTime,
  expiryTime,
  currentIndex,
  formik
) => {
  const timeSlotsKeys = Object.keys(formik.values).filter((key) =>
    key.startsWith("incentive_time_slots")
  );

  for (let i = 0; i < timeSlotsKeys.length; i++) {
    if (i !== currentIndex) {
      const slot = formik.values[timeSlotsKeys[i]];
      const slotStartTime = slot.start_time;
      const slotExpiryTime = slot.expiry_time;

      if (
        isTimeRangeOverlap(startTime, expiryTime, slotStartTime, slotExpiryTime)
      ) {
        return true;
      }
    }
  }

  return false;
};

const isTimeRangeOverlap = (
  startTime1,
  expiryTime1,
  startTime2,
  expiryTime2
) => {
  const start1 = parseTime(startTime1);
  const end1 = parseTime(expiryTime1);
  const start2 = parseTime(startTime2);
  const end2 = parseTime(expiryTime2);

  return (
    (start1 < end1 && start2 < end2 && start1 < end2 && end1 > start2) ||
    (start1 > end2 && end1 < start2)
  );
};

const parseTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
};

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":");
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

// Function to calculate total minutes of all time slots
export const calculateTotalMinutes = (formik, timeSlots) => {
  let totalMinutes = 0;

  Array.from({ length: timeSlots }).forEach((_, slotIndex) => {
    const startTime =
      formik.values[`incentive_time_slots${slotIndex + 1}`].start_time;
    const expiryTime =
      formik.values[`incentive_time_slots${slotIndex + 1}`].expiry_time;

    if (startTime && expiryTime) {
      totalMinutes += timeToMinutes(expiryTime) - timeToMinutes(startTime);
    }
  });

  return totalMinutes;
};
export const areAllDaysSelected = (values, timeSlots) => {
  const allDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let selectedDays = [];
  for (let i = 1; i <= timeSlots; i++) {
    selectedDays = [
      ...selectedDays,
      ...values[`incentive_time_slots${i}`].days_selected,
    ];
    selectedDays = [...new Set(selectedDays)];
  }
  console.log(selectedDays);
  return allDays.every((day) => selectedDays.includes(day));
};

export const isTimeExceeded = (formik, timeSlots) => {
  const totalMinutes = calculateTotalMinutes(formik, timeSlots);
  return totalMinutes > 1437;
};

export const areSlotsInOrder = (values, timeSlots) => {
  for (let slotIndex = 1; slotIndex < timeSlots; slotIndex++) {
    if (
      values[`incentive_time_slots${slotIndex + 1}`].start_time <
      values[`incentive_time_slots${slotIndex}`].expiry_time
    ) {
      return false;
    }
  }
  return true;
};
export const isExpiryTimeGreaterThanStartTime = (values, timeSlots) => {
  console.log(values);
  for (let i = 1; i <= timeSlots; i++) {
    const startTime = values[`incentive_time_slots${i}`].start_time;
    const expiryTime = values[`incentive_time_slots${i}`].expiry_time;
    console.log(timeToMinutes(expiryTime));
    console.log(timeToMinutes(startTime));
    console.log(timeToMinutes(expiryTime) <= timeToMinutes(startTime));
    if (timeToMinutes(expiryTime) <= timeToMinutes(startTime)) {
      return false;
    }
  }
  return true;
};

// export const doTimeSlotsOverlap = (values, timeSlots) => {
//   let overlap = false;

//   for (let i = 1; i <= timeSlots; i++) {
//     const slot1StartTime = timeToMinutes(values[`incentive_time_slots${i}`]?.start_time);
//     const slot1ExpiryTime = timeToMinutes(values[`incentive_time_slots${i}`]?.expiry_time);

//     for (let j = i+1; j <= timeSlots; j++) {
//       const slot2StartTime = timeToMinutes(values[`incentive_time_slots${j}`]?.start_time);
//       const slot2ExpiryTime = timeToMinutes(values[`incentive_time_slots${j}`]?.expiry_time);

//       if (slot1StartTime < slot2ExpiryTime && slot2StartTime < slot1ExpiryTime) {
//         overlap = true;
//         break;
//       }
//     }
//     if (overlap) break;
//   }

//   return overlap;
// };

const dayToNumber = (day) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days.indexOf(day);
};

export const doesCampaignDayMatchDates = (campaignDay, campaignDates) => {
  const campaignDayNumber = dayToNumber(campaignDay);
  return campaignDates.every((dateObj) => {
    const date = new Date(dateObj.start_date);
    return date.getDay() === campaignDayNumber;
  });
};

export const areDatesInDescendingOrder = (dates) => {
  for (let i = 0; i < dates.length - 1; i++) {
    if (Date.parse(dates[i].start_date) < Date.parse(dates[i + 1].start_date)) {
      return false;
    }
  }
  return true;
};

export const isEveryStartDateAMonday = (dates) => {
  return dates.every((date) => {
    const day = new Date(date.start_date).getDay();
    // In JavaScript, getDay() returns 0 for Sunday, 1 for Monday, ..., and 6 for Saturday.
    return day === 1; // Check if the day is Monday.
  });
};

export const getNested = (obj, ...args) => {
  return args.reduce((obj, level) => obj && obj[level], obj);
};

export function formatAmount(value, emptyValue = "--") {
  if (value !== null && value !== undefined) {
    return parseFloat(value).toFixed(2);
  }

  return emptyValue;
}

export function formatDateTime(
  dateTime,
  format = "DD-MM-YYYY,HH:mm",
  value = "--"
) {
  if (dateTime) {
    return moment(dateTime).format(format);
  }

  return value;
}

export function getNewPath(currentPath) {
  return currentPath.substring(0, currentPath.lastIndexOf("/") + 1);
}
// starRating

export const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  console.log(rating);
  console.log(filledStars);
  const decimalPercentage = (rating % 1) * 100;

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < filledStars) {
      stars.push(<span key={i} className="star filled"></span>);
    } else if (i === filledStars) {
      const style = { width: `${decimalPercentage}%` };
      stars.push(
        <span key={i} className="star decimal-filled">
          <span className="decimal-fill" style={style}></span>
        </span>
      );
    } else {
      stars.push(<span key={i} className="star"></span>);
    }
  }

  return <div className="star-rating">{stars}</div>;
};

export const isEmptyArray = (arr) => {
  return arr?.length === 0;
};

export const isEmptyObject = (obj) => {
  return Object?.keys(obj).length === 0;
};

export const formatPremiumType = (premiumtype) => {
  const premiumNumb = premiumtype.match(/\d+/);
  if (premiumNumb) {
    return `Premium-${premiumNumb[0]}`;
  }
  return premiumtype;
};

// export const LastMessageData = (allMessages, id) => {
//   let lastMessage = null;
//   useEffect(() => {
//     for (let i = allMessages?.length - 1; i >= 0; i--) {
//       if (allMessages[i]?.complaintId === id) {
//         lastMessage = allMessages[i]?.createdAt;
//         break;
//       }
//     }
//   }, []);

//   // for (let i = allMessages?.length - 1; i >= 0; i--) {
//   //   if (allMessages[i]?.complaintId === id) {
//   //     lastMessage = allMessages[i]?.createdAt;
//   //     break;
//   //   }
//   // }
//   if (lastMessage) {
//     return moment(lastMessage).format(" hh:mm A");
//   }
//   // return lastMessage
// };

// export const UseLastMessageDate = (id, allMessages) => {
//   const [lastMessage, setLastMessage] = useState(null);
//   const filterDriverMessage = allMessages?.filter(
//     (item) => item?.complaintId === id
//   );
//   const sortedFilterDriverMessage = filterDriverMessage.slice().sort((a, b) => {
//     return new Date(a.createdAt) - new Date(b.createdAt);
//   });

//   useEffect(() => {
//     let foundRoomId = null;

//     for (let i = sortedFilterDriverMessage?.length - 1; i >= 0; i--) {
//       if (sortedFilterDriverMessage?.[i].complaintId === id) {
//         foundRoomId = sortedFilterDriverMessage?.[i].createdAt;
//         break;
//       }
//     }

//     setLastMessage(foundRoomId);
//   }, [allMessages, id]);

//   return lastMessage;
// };
