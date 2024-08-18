import {
  NSE_R_BOOKINGLOCAL_ACCIDENT_LIST,
  NSE_R_BOOKINGLOCAL_CANCELLED_LIST,
  NSE_R_BOOKINGLOCAL_NO_RIDES_LIST,
  NSE_R_BOOKINGLOCAL_ONGOING_LIST,
  NSE_R_BOOKINGLOCAL_REVIEW_LIST,
  NSE_R_BOOKINGONEWAY_ACCIDENT_LIST,
  NSE_R_BOOKINGONEWAY_CANCELLED_LIST,
  NSE_R_BOOKINGONEWAY_NO_RIDES_LIST,
  NSE_R_BOOKINGONEWAY_ODOMETER_LIST,
  NSE_R_BOOKINGONEWAY_ONGOING_LIST,
  NSE_R_BOOKINGONEWAY_REVIEW_LIST,
  NSE_R_BOOKINGONEWAY_RIDESCHEDULED_LIST,
  NSE_R_BOOKINGRENTAL_ACCIDENT_LIST,
  NSE_R_BOOKINGRENTAL_CANCELLED_LIST,
  NSE_R_BOOKINGRENTAL_NO_RIDES_LIST,
  NSE_R_BOOKINGRENTAL_ONGOING_LIST,
  NSE_R_BOOKINGRENTAL_REVIEW_LIST,
  NSE_R_BOOKINGROUND_ACCIDENT_LIST,
  NSE_R_BOOKINGROUND_CANCELLED_LIST,
  NSE_R_BOOKINGROUND_NO_RIDES_LIST,
  NSE_R_BOOKINGROUND_ODOMETER_LIST,
  NSE_R_BOOKINGROUND_ONGOING_LIST,
  NSE_R_BOOKINGROUND_REVIEW_LIST,
  NSE_R_BOOKINGROUND_RIDESCHEDULED_LIST,
  NSE_R_EDIT,
  NSE_R_EMERSOS_DURINGTRIP_LIST,
  NSE_R_EMERSOS_MESSAGING_LIST,
  NSE_R_EMERSOS_NOTRIP_LIST,
  NSE_R_FINDONE,
  NSE_R_GENERAL_ACC_LIST,
  NSE_R_IN_APP_MESS_COMPLAINT_LIST,
  NSE_R_IN_APP_MESS_PENDING_LIST,
  NSE_R_IN_APP_MESS_RESCLOSED_LIST,
  NSE_R_NEWACCOUNT_LIST,
  NSE_R_PAYMENT_PENDING_LIST,
  NSE_R_PAYMENT_RIDER_CURRENTBALANCE_LIST,
  NSE_R_PAYMENT_SUCCESS_LIST,
  NSE_R_PAYMENT_WALLET_LIST,
  NSE_R_POLICY_UPDATE_LIST,
  NSE_R_SECURITY_LIST,
  NSE_D_NEWACCOUNT_LIST,
  NSE_D_NEW_DRIVER_APPL_LIST,
  NSE_D_EXIS_DRIVER_APPL_LIST,
  NSE_D_GENERAL_ACC_LIST,
  NSE_D_ACCOUNT_ACTIVITY_LIST,
  NSE_D_POLICY_UPDATE_LIST,
  NSE_D_DRIVER_PERFORMANCE_LIST,
  NSE_D_SECURITY_LIST,
  NSE_D_BOOKINGLOCAL_ONGOING_LIST,
  NSE_D_BOOKINGLOCAL_STOPADDED_LIST,
  NSE_D_BOOKINGLOCAL_DROPOFFUPDATED_LIST,
  NSE_D_BOOKINGLOCAL_PAYMENT_LIST,
  NSE_D_BOOKINGLOCAL_CANCELLED_LIST,
  NSE_D_BOOKINGLOCAL_ACCIDENT_LIST,
  NSE_D_BOOKINGLOCAL_REVIEW_LIST,
  NSE_D_BOOKINGRENTAL_ONGOING_LIST,
  NSE_D_BOOKINGRENTAL_DAILYLIMIT_REACHED_LIST,
  NSE_D_BOOKINGRENTAL_DROPOFFUPDATED_LIST,
  NSE_D_BOOKINGRENTAL_PAYMENT_LIST,
  NSE_D_BOOKINGRENTAL_CANCELLED_LIST,
  NSE_D_BOOKINGRENTAL_ACCIDENT_LIST,
  NSE_D_BOOKINGRENTAL_REVIEW_LIST,
  NSE_D_BOOKINGONEWAY_ONGOING_LIST,
  NSE_D_BOOKINGONEWAY_ODOMETER_LIST,
  NSE_D_BOOKINGONEWAY_DROPOFFUPDATED_LIST,
  NSE_D_BOOKINGONEWAY_PAYMENT_LIST,
  NSE_D_BOOKINGONEWAY_CANCELLED_LIST,
  NSE_D_BOOKINGONEWAY_ACCIDENT_LIST,
  NSE_D_BOOKINGONEWAY_REVIEW_LIST,
  NSE_D_BOOKINGONEWAY_MAXLIMITREACHED_LIST,
  NSE_D_BOOKINGROUND_ONGOING_LIST,
  NSE_D_BOOKINGROUND_ODOMETER_LIST,
  NSE_D_BOOKINGROUND_DROPOFFUPDATED_LIST,
  NSE_D_BOOKINGROUND_PAYMENT_LIST,
  NSE_D_BOOKINGROUND_CANCELLED_LIST,
  NSE_D_BOOKINGROUND_ACCIDENT_LIST,
  NSE_D_BOOKINGROUND_REVIEW_LIST,
  NSE_D_BOOKINGROUND_MAXLIMITREACHED_LIST,
  NSE_D_BOOKINGROUND_RETURNTRIP_LIST,
  NSE_D_PAYMENT_FINE_LIST,
  NSE_D_PAYMENT_RECEIVED_LIST,
  NSE_D_PAYMENT_DUE_LIST,
  NSE_D_PAYMENT_DRIVER_CURRENTBALANCE_LIST,
  NSE_D_CASHOUT_LIST,
  NSE_D_EMERSOS_DURINGTRIP_LIST,
  NSE_D_EMERSOS_NOTRIP_LIST,
  NSE_D_EMERSOS_MESSAGING_LIST,
  NSE_D_IN_APP_MESS_DURINGTRIP_LIST,
  NSE_D_IN_APP_MESS_COMPLAINT_LIST,
  NSE_D_IN_APP_MESS_RESCLOSED_LIST,
  NSE_D_INCENTIVE_SLOTSTARTTIME_LIST,
  NSE_D_INCENTIVE_INPROGRESS_LIST,
  NSE_D_INCENTIVE_SLOTREMAININGTIME_LIST,
  NSE_D_INCENTIVE_COMPLETEDSUCCCESS_LIST,
  NSE_D_FINDONE,
  NSE_D_EDIT
} from "../types";

// account
export const nse_R_NewAccountListAction = (data, onSuccess, onError) => {
  return {
    type: NSE_R_NEWACCOUNT_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_GeneralAccountListAction = (data, onSuccess, onError) => {
  return {
    type: NSE_R_GENERAL_ACC_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_PolicyUpdateListAction = (data, onSuccess, onError) => {
  return {
    type: NSE_R_POLICY_UPDATE_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_SecurityListAction = (data, onSuccess, onError) => {
  return {
    type: NSE_R_SECURITY_LIST,
    data,
    onSuccess,
    onError,
  };
};

// booking
// local

export const nse_R_BookingLocal_No_Rides = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGLOCAL_NO_RIDES_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingLocal_Ongoing = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGLOCAL_ONGOING_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingLocal_Cancelled = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGLOCAL_CANCELLED_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingLocal_Accident = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGLOCAL_ACCIDENT_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingLocal_Review = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGLOCAL_REVIEW_LIST,
    data,
    onSuccess,
    onError,
  };
};

// Rental

export const nse_R_BookingRental_No_Rides = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGRENTAL_NO_RIDES_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingRental_Ongoing = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGRENTAL_ONGOING_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingRental_Cancelled = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGRENTAL_CANCELLED_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingRental_Accident = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGRENTAL_ACCIDENT_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingRental_Review = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGRENTAL_REVIEW_LIST,
    data,
    onSuccess,
    onError,
  };
};

//   oneway

export const nse_R_BookingOneway_No_Rides = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGONEWAY_NO_RIDES_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingOneway_Ongoing = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGONEWAY_ONGOING_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingOneway_Cancelled = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGONEWAY_CANCELLED_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingOneway_Accident = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGONEWAY_ACCIDENT_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingOneway_Review = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGONEWAY_REVIEW_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingOneway_RideScheduled = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGONEWAY_RIDESCHEDULED_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingOneway_Odometer = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGONEWAY_ODOMETER_LIST,
    data,
    onSuccess,
    onError,
  };
};

// round
export const nse_R_BookingRound_No_Rides = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGROUND_NO_RIDES_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingRound_Ongoing = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGROUND_ONGOING_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingRound_Cancelled = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGROUND_CANCELLED_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingRound_Accident = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGROUND_ACCIDENT_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingRound_Review = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGROUND_REVIEW_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingRound_RideScheduled = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGROUND_RIDESCHEDULED_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_BookingRound_Odometer = (data, onSuccess, onError) => {
  return {
    type: NSE_R_BOOKINGROUND_ODOMETER_LIST,
    data,
    onSuccess,
    onError,
  };
};

// payment
export const nse_R_PaymentPendingList = (data, onSuccess, onError) => {
  return {
    type: NSE_R_PAYMENT_PENDING_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_PaymentSuccessList = (data, onSuccess, onError) => {
  return {
    type: NSE_R_PAYMENT_SUCCESS_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_PaymentRiderCBList = (data, onSuccess, onError) => {
  return {
    type: NSE_R_PAYMENT_RIDER_CURRENTBALANCE_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_PaymentWalletList = (data, onSuccess, onError) => {
  return {
    type: NSE_R_PAYMENT_WALLET_LIST,
    data,
    onSuccess,
    onError,
  };
};

// emergencySOS

export const nse_R_EmerSOS_DuringTripList = (data, onSuccess, onError) => {
  return {
    type: NSE_R_EMERSOS_DURINGTRIP_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_EmerSOS_NoTripList = (data, onSuccess, onError) => {
  return {
    type: NSE_R_EMERSOS_NOTRIP_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_EmerSOS_MessagingList = (data, onSuccess, onError) => {
  return {
    type: NSE_R_EMERSOS_MESSAGING_LIST,
    data,
    onSuccess,
    onError,
  };
};

// inAppmessaging
export const nse_R_INAPPMESS_PendingList = (data, onSuccess, onError) => {
  return {
    type: NSE_R_IN_APP_MESS_PENDING_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_INAPPMESS_ComplaintList = (data, onSuccess, onError) => {
  return {
    type: NSE_R_IN_APP_MESS_COMPLAINT_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_INAPPMESS_RESCLOSEDList = (data, onSuccess, onError) => {
  return {
    type: NSE_R_IN_APP_MESS_RESCLOSED_LIST,
    data,
    onSuccess,
    onError,
  };
};

//   findone
export const nse_R_FindOneAction = (data, onSuccess, onError) => {
  return {
    type: NSE_R_FINDONE,
    data,
    onSuccess,
    onError,
  };
};
export const nse_R_EditAction = (data, onSuccess, onError) => {
  return {
    type: NSE_R_EDIT,
    data,
    onSuccess,
    onError,
  };
};


// Driver NSE 

// account

export const nse_D_NewAccountListAction = (data, onSuccess, onError) => {
  return {
    type: NSE_D_NEWACCOUNT_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_newDriverApplicationListAction = (data, onSuccess, onError) => {
  return {
    type: NSE_D_NEW_DRIVER_APPL_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_existingDriverApplicationListAction = (data, onSuccess, onError) => {
  return {
    type: NSE_D_EXIS_DRIVER_APPL_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const nse_D_GeneralAccountListAction = (data, onSuccess, onError) => {
  return {
    type: NSE_D_GENERAL_ACC_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_accountActivityListAction = (data, onSuccess, onError) => {
  return {
    type: NSE_D_ACCOUNT_ACTIVITY_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const nse_D_PolicyUpdateListAction = (data, onSuccess, onError) => {
  return {
    type: NSE_D_POLICY_UPDATE_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const nse_D_driverPerformanceListAction = (data, onSuccess, onError) => {
  return {
    type: NSE_D_DRIVER_PERFORMANCE_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const nse_D_SecurityListAction = (data, onSuccess, onError) => {
  return {
    type: NSE_D_SECURITY_LIST,
    data,
    onSuccess,
    onError,
  };
};

// bookings
// local

export const nse_D_BookingLocal_Ongoing = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGLOCAL_ONGOING_LIST,
    data,
    onSuccess,
    onError,  
  };
};
export const nse_D_BookingLocal_StopAdded = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGLOCAL_STOPADDED_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingLocal_DropOffUpdated = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGLOCAL_DROPOFFUPDATED_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingLocal_Payment = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGLOCAL_PAYMENT_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingLocal_Cancelled = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGLOCAL_CANCELLED_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const nse_D_BookingLocal_Accident = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGLOCAL_ACCIDENT_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingLocal_Review = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGLOCAL_REVIEW_LIST,
    data,
    onSuccess,
    onError,
  };
};

// rental

export const nse_D_BookingRental_Ongoing = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGRENTAL_ONGOING_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingRental_DailyLimit_Reached = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGRENTAL_DAILYLIMIT_REACHED_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingRental_DropOffUpdated = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGRENTAL_DROPOFFUPDATED_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const nse_D_BookingRental_Payment = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGRENTAL_PAYMENT_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const nse_D_BookingRental_Cancelled = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGRENTAL_CANCELLED_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const nse_D_BookingRental_Accident = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGRENTAL_ACCIDENT_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingRental_Review = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGRENTAL_REVIEW_LIST,
    data,
    onSuccess,
    onError,
  };
};

// oneway

export const nse_D_BookingOneway_Ongoing = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGONEWAY_ONGOING_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingOneway_Odometer = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGONEWAY_ODOMETER_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingOneway_DropOffUpdated = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGONEWAY_DROPOFFUPDATED_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const nse_D_BookingOneway_Payment = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGONEWAY_PAYMENT_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingOneway_Cancelled = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGONEWAY_CANCELLED_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingOneway_Accident = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGONEWAY_ACCIDENT_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingOneway_Review = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGONEWAY_REVIEW_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingOneway_MaxLimitReached = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGONEWAY_MAXLIMITREACHED_LIST,
    data,
    onSuccess,
    onError,
  };
};

// round

export const nse_D_BookingRound_Ongoing = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGROUND_ONGOING_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingRound_Odometer = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGROUND_ODOMETER_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const nse_D_BookingRound_DropOffUpdated = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGROUND_DROPOFFUPDATED_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const nse_D_BookingRound_Payment = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGROUND_PAYMENT_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingRound_Cancelled = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGROUND_CANCELLED_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingRound_Accident = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGROUND_ACCIDENT_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const nse_D_BookingRound_Review = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGROUND_REVIEW_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingRound_MaxLimitReached = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGROUND_MAXLIMITREACHED_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_BookingRound_ReturnTrip = (data, onSuccess, onError) => {
  return {
    type: NSE_D_BOOKINGROUND_RETURNTRIP_LIST,
    data,
    onSuccess,
    onError,
  };
};

// payment

export const nse_D_PaymentFineList = (data, onSuccess, onError) => {
  return {
    type: NSE_D_PAYMENT_FINE_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_PaymentReceivedList = (data, onSuccess, onError) => {
  return {
    type: NSE_D_PAYMENT_RECEIVED_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const nse_D_PaymentDueList = (data, onSuccess, onError) => {
  return {
    type: NSE_D_PAYMENT_DUE_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const nse_D_PaymentDriverCBList = (data, onSuccess, onError) => {
  return {
    type: NSE_D_PAYMENT_DRIVER_CURRENTBALANCE_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_Cashout_List = (data, onSuccess, onError) => {
  return {
    type: NSE_D_CASHOUT_LIST,
    data,
    onSuccess,
    onError,
  };
};

// emergencySOS

export const nse_D_EmerSOS_DuringTripList = (data, onSuccess, onError) => {
  return {
    type: NSE_D_EMERSOS_DURINGTRIP_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_EmerSOS_NoTripList = (data, onSuccess, onError) => {
  return {
    type: NSE_D_EMERSOS_NOTRIP_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_EmerSOS_MessagingList = (data, onSuccess, onError) => {
  return {
    type: NSE_D_EMERSOS_MESSAGING_LIST,
    data,
    onSuccess,
    onError,
  };
};

// inAppmessaging

export const nse_D_INAPPMESS_DuringTripList = (data, onSuccess, onError) => {
  return {
    type: NSE_D_IN_APP_MESS_DURINGTRIP_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_INAPPMESS_ComplaintList = (data, onSuccess, onError) => {
  return {
    type: NSE_D_IN_APP_MESS_COMPLAINT_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_INAPPMESS_RESCLOSEDList = (data, onSuccess, onError) => {
  return {
    type: NSE_D_IN_APP_MESS_RESCLOSED_LIST,
    data,
    onSuccess,
    onError,
  };
};

// incentive

export const nse_D_Incentive_SlotStartTimeList = (data, onSuccess, onError) => {
  return {
    type: NSE_D_INCENTIVE_SLOTSTARTTIME_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_Incentive_InprogressList = (data, onSuccess, onError) => {
  return {
    type: NSE_D_INCENTIVE_INPROGRESS_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_Incentive_SlotRemainingTimeList = (data, onSuccess, onError) => {
  return {
    type: NSE_D_INCENTIVE_SLOTREMAININGTIME_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_Incentive_CompletedSuccessList = (data, onSuccess, onError) => {
  return {
    type: NSE_D_INCENTIVE_COMPLETEDSUCCCESS_LIST,
    data,
    onSuccess,
    onError,
  };
};

//   findone

export const nse_D_FindOneAction = (data, onSuccess, onError) => {
  return {
    type: NSE_D_FINDONE,
    data,
    onSuccess,
    onError,
  };
};
export const nse_D_EditAction = (data, onSuccess, onError) => {
  return {
    type: NSE_D_EDIT,
    data,
    onSuccess,
    onError,
  };
};