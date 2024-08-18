import { call, takeLatest } from "redux-saga/effects";
import * as nseRiderApi from "../../apis/nse/rdierNswApi";
import * as nseDriverApi from "../../apis/nse/driverNseApi";
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
  NSE_D_EDIT,
} from "../../actions/types";

// acount
export function* nse_R_NewAccountListWorker(action) {
  try {
    const res = yield call(nseRiderApi?.nse_R_NewAccountListApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_GeneralAccountListWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_GeneralAccountListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_PolicyUpdateListWorker(action) {
  try {
    const res = yield call(nseRiderApi?.nse_R_PolicyUpdateListApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_SecurityListWorker(action) {
  try {
    const res = yield call(nseRiderApi?.nse_R_SecurityListApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

// booking
// local

export function* nse_R_BookingLocal_No_RidesWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingLocal_No_RidesApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingLocal_OngoingWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingLocal_OngoingApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingLocal_CancelledWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingLocal_CancelledApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingLocal_AccidentWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingLocal_AccidentApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingLocal_ReviewWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingLocal_ReviewApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

// rental
export function* nse_R_BookingRental_No_RidesWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingRental_No_RidesApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingRental_OngoingWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingRental_OngoingApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingRental_CancelledWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingRental_CancelledApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingRental_AccidentWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingRental_AccidentApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingRental_ReviewWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingRental_ReviewApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

//   oneway

export function* nse_R_BookingOneway_No_RidesWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingOneway_No_RidesApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingOneway_OngoingWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingOneway_OngoingApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingOneway_CancelledWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingOneway_CancelledApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingOneway_AccidentWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingOneway_AccidentApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingOneway_ReviewWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingOneway_ReviewApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingOneway_RideScheduledWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingOneway_RideScheduledApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingOneway_OdometerWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingOneway_OdometerApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
// round

export function* nse_R_BookingRound_No_RidesWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingRound_No_RidesApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingRound_OngoingWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingRound_OngoingApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingRound_CancelledWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingRound_CancelledApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingRound_AccidentWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingRound_AccidentApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingRound_ReviewWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingRound_ReviewApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingRound_RideScheduledWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingRound_RideScheduledApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_BookingRound_OdometerWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_BookingRound_OdometerApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

//   payment
export function* nse_R_PaymentPendingWorker(action) {
  try {
    const res = yield call(nseRiderApi?.nse_R_PaymentPendingApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_PaymentSuccessWorker(action) {
  try {
    const res = yield call(nseRiderApi?.nse_R_PaymentSuccessApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_PaymentRiderCBWorker(action) {
  try {
    const res = yield call(nseRiderApi?.nse_R_PaymentRiderCBApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_PaymentWalletWorker(action) {
  try {
    const res = yield call(nseRiderApi?.nse_R_PaymentWalletApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

//   emergency Sos
export function* nse_R_EmerSOS_DuringTripWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_EmerSOS_DuringTripApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_EmerSOS_NoTripWorker(action) {
  try {
    const res = yield call(nseRiderApi?.nse_R_EmerSOS_NoTripApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_EmerSOS_MessagingWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_EmerSOS_MessagingApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

// in app messaging

export function* nse_R_INAPPMESS_PendingWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_INAPPMESS_PendingApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_INAPPMESS_ComplaintWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_INAPPMESS_ComplaintApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_INAPPMESS_RESCLOSEDWorker(action) {
  try {
    const res = yield call(
      nseRiderApi?.nse_R_INAPPMESS_RESCLOSEDApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
// findone
export function* nse_R_FindOneWorker(action) {
  try {
    const res = yield call(nseRiderApi?.nse_R_FindOneApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_R_EditWorker(action) {
  try {
    const res = yield call(nseRiderApi?.nse_R_EditApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

// DriverNse
// account

export function* nse_D_NewAccountListWorker(action) {
  try {
    const res = yield call(nseDriverApi?.nse_D_NewAccountListApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_NewDriverApplicationListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_NewDriverApplicationListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_ExisDriverApplicationListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_ExisDriverApplicationListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_GeneralAccountListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_GeneralAccountListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_AccountActivityListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_AccountActivityListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_PolicyUpdateListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_PolicyUpdateListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_DriverPerformanceListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_DriverPerformanceListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_SecurityListWorker(action) {
  try {
    const res = yield call(nseDriverApi?.nse_D_SecurityListApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

// booking
// local

export function* nse_D_BookingLocal_OngoingListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingLocal_OngoingListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingLocal_StopAddedListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingLocal_StopAddedListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingLocal_DropOffUpdateListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingLocal_DropOffUpdateListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingLocal_PaymentListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingLocal_PaymentListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingLocal_CancelledListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingLocal_CancelledListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingLocal_AccidentListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingLocal_AccidentListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingLocal_ReviewListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingLocal_ReviewListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

// rental

export function* nse_D_BookingRental_OngoingListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRental_OngoingListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingRental_DailyLimitReachedListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRental_DailyLimitReachedListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingRental_DropOffUpdatedWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRental_DropOffUpdatedApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingRental_PaymentListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRental_PaymentListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingRental_CancelledListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRental_CancelledListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingRental_AccidentListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRental_AccidentListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingRental_ReviewListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRental_ReviewListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

//   oneway

export function* nse_D_BookingOneway_OngoingListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingOneway_OngoingListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingOneway_OdometerListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingOneway_OdometerListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingOneway_DropOffUpdatedWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingOneway_DropOffUpdatedApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingOneway_PaymentListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingOneway_PaymentListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingOneway_CancelledListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingOneway_CancelledListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingOneway_AccidentListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingOneway_AccidentListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingOneway_ReviewListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingOneway_ReviewListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingOneway_MaxLimitReachedListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingOneway_MaxLimitReachedListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

// round

export function* nse_D_BookingRound_OngoingListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRound_OngoingListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingRound_OdometerListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRound_OdometerListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingRound_DropOffUpdateListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRound_DropOffUpdateListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

export function* nse_D_BookingRound_PaymentListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRound_PaymentListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingRound_CancelledListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRound_CancelledListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingRound_AccidentListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRound_AccidentListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingRound_ReviewListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRound_ReviewListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingRound_MaxLimitReachedListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRound_MaxLimitReachedListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_BookingRound_ReturnTripListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_BookingRound_ReturnTripListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

//   payment

export function* nse_D_PaymentFineWorker(action) {
  try {
    const res = yield call(nseDriverApi?.nse_D_PaymentFineApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_PaymentReceivedWorker(action) {
  try {
    const res = yield call(nseDriverApi?.nse_D_PaymentReceivedApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_PaymentDueWorker(action) {
  try {
    const res = yield call(nseDriverApi?.nse_D_PaymentDueApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_PaymentDriverCBListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_PaymentDriverCBListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_CashoutListWorker(action) {
  try {
    const res = yield call(nseDriverApi?.nse_D_CashoutListApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

//   emergency Sos

export function* nse_D_EmerSOS_DuringTripWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_EmerSOS_DuringTripApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_EmerSOS_NoTripWorker(action) {
  try {
    const res = yield call(nseDriverApi?.nse_D_EmerSOS_NoTripApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_EmerSOS_MessagingWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_EmerSOS_MessagingApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

// in app messaging

export function* nse_D_INAPPMESS_DuringTripListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_INAPPMESS_DuringTripListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_INAPPMESS_ComplaintWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_INAPPMESS_ComplaintApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_INAPPMESS_RESCLOSEDWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_INAPPMESS_RESCLOSEDApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

// incentives

export function* nse_D_INAPPMESS_SlotStartTimeListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_INAPPMESS_SlotStartTimeListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_INAPPMESS_InprogressListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_INAPPMESS_InprogressListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_INAPPMESS_SlotRemainingTimeListWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_INAPPMESS_SlotRemainingTimeListApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_INAPPMESS_CompletedSuccessWorker(action) {
  try {
    const res = yield call(
      nseDriverApi?.nse_D_INAPPMESS_CompletedSuccessApi,
      action.data
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

// findone
export function* nse_D_FindOneWorker(action) {
  try {
    const res = yield call(nseDriverApi?.nse_D_FindOneApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* nse_D_EditWorker(action) {
  try {
    const res = yield call(nseDriverApi?.nse_D_EditApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

// acoount
export function* WatchNse_R_NewAccountListWorker() {
  yield takeLatest(NSE_R_NEWACCOUNT_LIST, nse_R_NewAccountListWorker);
}
export function* WatchNse_R_GeneralAccountListWorker() {
  yield takeLatest(NSE_R_GENERAL_ACC_LIST, nse_R_GeneralAccountListWorker);
}
export function* WatchNse_R_PolicyUpdateListWorker() {
  yield takeLatest(NSE_R_POLICY_UPDATE_LIST, nse_R_PolicyUpdateListWorker);
}
export function* WatchNse_R_SecurityListWorker() {
  yield takeLatest(NSE_R_SECURITY_LIST, nse_R_SecurityListWorker);
}

// booking
// local
export function* WatchNse_R_BookingLocal_No_RidesWorker() {
  yield takeLatest(
    NSE_R_BOOKINGLOCAL_NO_RIDES_LIST,
    nse_R_BookingLocal_No_RidesWorker
  );
}
export function* WatchNse_R_BookingLocal_OngoingWorker() {
  yield takeLatest(
    NSE_R_BOOKINGLOCAL_ONGOING_LIST,
    nse_R_BookingLocal_OngoingWorker
  );
}
export function* WatchNse_R_BookingLocal_CancelledWorker() {
  yield takeLatest(
    NSE_R_BOOKINGLOCAL_CANCELLED_LIST,
    nse_R_BookingLocal_CancelledWorker
  );
}
export function* WatchNse_R_BookingLocal_AccidentWorker() {
  yield takeLatest(
    NSE_R_BOOKINGLOCAL_ACCIDENT_LIST,
    nse_R_BookingLocal_AccidentWorker
  );
}
export function* WatchNse_R_BookingLocal_ReviewWorker() {
  yield takeLatest(
    NSE_R_BOOKINGLOCAL_REVIEW_LIST,
    nse_R_BookingLocal_ReviewWorker
  );
}
// rental
export function* WatchNse_R_BookingRental_No_RidesWorker() {
  yield takeLatest(
    NSE_R_BOOKINGRENTAL_NO_RIDES_LIST,
    nse_R_BookingRental_No_RidesWorker
  );
}
export function* WatchNse_R_BookingRental_OngoingWorker() {
  yield takeLatest(
    NSE_R_BOOKINGRENTAL_ONGOING_LIST,
    nse_R_BookingRental_OngoingWorker
  );
}
export function* WatchNse_R_BookingRental_CancelledWorker() {
  yield takeLatest(
    NSE_R_BOOKINGRENTAL_CANCELLED_LIST,
    nse_R_BookingRental_CancelledWorker
  );
}
export function* WatchNse_R_BookingRental_AccidentWorker() {
  yield takeLatest(
    NSE_R_BOOKINGRENTAL_ACCIDENT_LIST,
    nse_R_BookingRental_AccidentWorker
  );
}
export function* WatchNse_R_BookingRental_ReviewWorker() {
  yield takeLatest(
    NSE_R_BOOKINGRENTAL_REVIEW_LIST,
    nse_R_BookingRental_ReviewWorker
  );
}
//   oneway

export function* WatchNse_R_BookingOneway_No_RidesWorker() {
  yield takeLatest(
    NSE_R_BOOKINGONEWAY_NO_RIDES_LIST,
    nse_R_BookingOneway_No_RidesWorker
  );
}
export function* WatchNse_R_BookingOneway_OngoingWorker() {
  yield takeLatest(
    NSE_R_BOOKINGONEWAY_ONGOING_LIST,
    nse_R_BookingOneway_OngoingWorker
  );
}
export function* WatchNse_R_BookingOneway_CancelledWorker() {
  yield takeLatest(
    NSE_R_BOOKINGONEWAY_CANCELLED_LIST,
    nse_R_BookingOneway_CancelledWorker
  );
}
export function* WatchNse_R_BookingOneway_AccidentWorker() {
  yield takeLatest(
    NSE_R_BOOKINGONEWAY_ACCIDENT_LIST,
    nse_R_BookingOneway_AccidentWorker
  );
}
export function* WatchNse_R_BookingOneway_ReviewWorker() {
  yield takeLatest(
    NSE_R_BOOKINGONEWAY_REVIEW_LIST,
    nse_R_BookingOneway_ReviewWorker
  );
}
export function* WatchNse_R_BookingOneway_RideScheduledWorker() {
  yield takeLatest(
    NSE_R_BOOKINGONEWAY_RIDESCHEDULED_LIST,
    nse_R_BookingOneway_RideScheduledWorker
  );
}
export function* WatchNse_R_BookingOneway_OdometerWorker() {
  yield takeLatest(
    NSE_R_BOOKINGONEWAY_ODOMETER_LIST,
    nse_R_BookingOneway_OdometerWorker
  );
}

// round

export function* WatchNse_R_BookingRound_No_RidesWorker() {
  yield takeLatest(
    NSE_R_BOOKINGROUND_NO_RIDES_LIST,
    nse_R_BookingRound_No_RidesWorker
  );
}
export function* WatchNse_R_BookingRound_OngoingWorker() {
  yield takeLatest(
    NSE_R_BOOKINGROUND_ONGOING_LIST,
    nse_R_BookingRound_OngoingWorker
  );
}
export function* WatchNse_R_BookingRound_CancelledWorker() {
  yield takeLatest(
    NSE_R_BOOKINGROUND_CANCELLED_LIST,
    nse_R_BookingRound_CancelledWorker
  );
}
export function* WatchNse_R_BookingRound_AccidentWorker() {
  yield takeLatest(
    NSE_R_BOOKINGROUND_ACCIDENT_LIST,
    nse_R_BookingRound_AccidentWorker
  );
}
export function* WatchNse_R_BookingRound_ReviewWorker() {
  yield takeLatest(
    NSE_R_BOOKINGROUND_REVIEW_LIST,
    nse_R_BookingRound_ReviewWorker
  );
}
export function* WatchNse_R_BookingRound_RideScheduledWorker() {
  yield takeLatest(
    NSE_R_BOOKINGROUND_RIDESCHEDULED_LIST,
    nse_R_BookingRound_RideScheduledWorker
  );
}
export function* WatchNse_R_BookingRound_OdometerWorker() {
  yield takeLatest(
    NSE_R_BOOKINGROUND_ODOMETER_LIST,
    nse_R_BookingRound_OdometerWorker
  );
}

// payment
export function* WatchNse_R_PaymentPendingWorker() {
  yield takeLatest(NSE_R_PAYMENT_PENDING_LIST, nse_R_PaymentPendingWorker);
}
export function* WatchNse_R_PaymentSuccessWorker() {
  yield takeLatest(NSE_R_PAYMENT_SUCCESS_LIST, nse_R_PaymentSuccessWorker);
}
export function* WatchNse_R_PaymentRiderCBWorker() {
  yield takeLatest(
    NSE_R_PAYMENT_RIDER_CURRENTBALANCE_LIST,
    nse_R_PaymentRiderCBWorker
  );
}
export function* WatchNse_R_PaymentWalletWorker() {
  yield takeLatest(NSE_R_PAYMENT_WALLET_LIST, nse_R_PaymentWalletWorker);
}

//   emergency sos
export function* WatchNse_R_EmerSOS_DuringTripWorker() {
  yield takeLatest(
    NSE_R_EMERSOS_DURINGTRIP_LIST,
    nse_R_EmerSOS_DuringTripWorker
  );
}
export function* WatchNse_R_EmerSOS_NoTripWorker() {
  yield takeLatest(NSE_R_EMERSOS_NOTRIP_LIST, nse_R_EmerSOS_NoTripWorker);
}
export function* WatchNse_R_EmerSOS_MessagingWorker() {
  yield takeLatest(NSE_R_EMERSOS_MESSAGING_LIST, nse_R_EmerSOS_MessagingWorker);
}

//   in app messaging
export function* WatchNse_R_INAPPMESS_PendingWorker() {
  yield takeLatest(
    NSE_R_IN_APP_MESS_PENDING_LIST,
    nse_R_INAPPMESS_PendingWorker
  );
}
export function* WatchNse_R_INAPPMESS_ComplaintWorker() {
  yield takeLatest(
    NSE_R_IN_APP_MESS_COMPLAINT_LIST,
    nse_R_INAPPMESS_ComplaintWorker
  );
}
export function* WatchNse_R_INAPPMESS_RESCLOSEDWorker() {
  yield takeLatest(
    NSE_R_IN_APP_MESS_RESCLOSED_LIST,
    nse_R_INAPPMESS_RESCLOSEDWorker
  );
}

//   findone
export function* WatchNse_R_FindOneWorker() {
  yield takeLatest(NSE_R_FINDONE, nse_R_FindOneWorker);
}
export function* WatchNse_R_EditWorker() {
  yield takeLatest(NSE_R_EDIT, nse_R_EditWorker);
}

// DriverNse
// acoount

export function* WatchNse_D_NewAccountListWorker() {
  yield takeLatest(NSE_D_NEWACCOUNT_LIST, nse_D_NewAccountListWorker);
}
export function* WatchNse_D_NewDriverApplicationListWorker() {
  yield takeLatest(
    NSE_D_NEW_DRIVER_APPL_LIST,
    nse_D_NewDriverApplicationListWorker
  );
}
export function* WatchNse_D_ExisDriverApplicationListWorker() {
  yield takeLatest(
    NSE_D_EXIS_DRIVER_APPL_LIST,
    nse_D_ExisDriverApplicationListWorker
  );
}
export function* WatchNse_D_GeneralAccountListWorker() {
  yield takeLatest(NSE_D_GENERAL_ACC_LIST, nse_D_GeneralAccountListWorker);
}
export function* WatchNse_D_AccountActivityListWorker() {
  yield takeLatest(
    NSE_D_ACCOUNT_ACTIVITY_LIST,
    nse_D_AccountActivityListWorker
  );
}
export function* WatchNse_D_PolicyUpdateListWorker() {
  yield takeLatest(NSE_D_POLICY_UPDATE_LIST, nse_D_PolicyUpdateListWorker);
}
export function* WatchNse_D_DriverPerformanceListWorker() {
  yield takeLatest(
    NSE_D_DRIVER_PERFORMANCE_LIST,
    nse_D_DriverPerformanceListWorker
  );
}
export function* WatchNse_D_SecurityListWorker() {
  yield takeLatest(NSE_D_SECURITY_LIST, nse_D_SecurityListWorker);
}

// booking
// local

export function* WatchNse_D_BookingLocal_OngoingListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGLOCAL_ONGOING_LIST,
    nse_D_BookingLocal_OngoingListWorker
  );
}
export function* WatchNse_D_BookingLocal_StopAddedListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGLOCAL_STOPADDED_LIST,
    nse_D_BookingLocal_StopAddedListWorker
  );
}
export function* WatchNse_D_BookingLocal_DropOffUpdateListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGLOCAL_DROPOFFUPDATED_LIST,
    nse_D_BookingLocal_DropOffUpdateListWorker
  );
}
export function* WatchNse_D_BookingLocal_PaymentListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGLOCAL_PAYMENT_LIST,
    nse_D_BookingLocal_PaymentListWorker
  );
}
export function* WatchNse_D_BookingLocal_CancelledListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGLOCAL_CANCELLED_LIST,
    nse_D_BookingLocal_CancelledListWorker
  );
}
export function* WatchNse_D_BookingLocal_AccidentListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGLOCAL_ACCIDENT_LIST,
    nse_D_BookingLocal_AccidentListWorker
  );
}
export function* WatchNse_D_BookingLocal_ReviewListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGLOCAL_REVIEW_LIST,
    nse_D_BookingLocal_ReviewListWorker
  );
}

// rental

export function* WatchNse_D_BookingRental_OngoingListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGRENTAL_ONGOING_LIST,
    nse_D_BookingRental_OngoingListWorker
  );
}
export function* WatchNse_D_BookingRental_DailyLimitReachedListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGRENTAL_DAILYLIMIT_REACHED_LIST,
    nse_D_BookingRental_DailyLimitReachedListWorker
  );
}
export function* WatchNse_D_BookingRental_DropOffUpdatedWorker() {
  yield takeLatest(
    NSE_D_BOOKINGRENTAL_DROPOFFUPDATED_LIST,
    nse_D_BookingRental_DropOffUpdatedWorker
  );
}
export function* WatchNse_D_BookingRental_PaymentListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGRENTAL_PAYMENT_LIST,
    nse_D_BookingRental_PaymentListWorker
  );
}
export function* WatchNse_D_BookingRental_CancelledListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGRENTAL_CANCELLED_LIST,
    nse_D_BookingRental_CancelledListWorker
  );
}
export function* WatchNse_D_BookingRental_AccidentListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGRENTAL_ACCIDENT_LIST,
    nse_D_BookingRental_AccidentListWorker
  );
}
export function* WatchNse_D_BookingRental_ReviewListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGRENTAL_REVIEW_LIST,
    nse_D_BookingRental_ReviewListWorker
  );
}

//   oneway

export function* WatchNse_D_BookingOneway_OngoingListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGONEWAY_ONGOING_LIST,
    nse_D_BookingOneway_OngoingListWorker
  );
}
export function* WatchNse_D_BookingOneway_OdometerListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGONEWAY_ODOMETER_LIST,
    nse_D_BookingOneway_OdometerListWorker
  );
}
export function* WatchNse_D_BookingOneway_DropOffUpdatedWorker() {
  yield takeLatest(
    NSE_D_BOOKINGONEWAY_DROPOFFUPDATED_LIST,
    nse_D_BookingOneway_DropOffUpdatedWorker
  );
}
export function* WatchNse_D_BookingOneway_PaymentListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGONEWAY_PAYMENT_LIST,
    nse_D_BookingOneway_PaymentListWorker
  );
}
export function* WatchNse_D_BookingOneway_CancelledListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGONEWAY_CANCELLED_LIST,
    nse_D_BookingOneway_CancelledListWorker
  );
}
export function* WatchNse_D_BookingOneway_AccidentListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGONEWAY_ACCIDENT_LIST,
    nse_D_BookingOneway_AccidentListWorker
  );
}
export function* WatchNse_D_BookingOneway_ReviewListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGONEWAY_REVIEW_LIST,
    nse_D_BookingOneway_ReviewListWorker
  );
}
export function* WatchNse_D_BookingOneway_MaxLimitReachedListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGONEWAY_MAXLIMITREACHED_LIST,
    nse_D_BookingOneway_MaxLimitReachedListWorker
  );
}

// round

export function* WatchNse_D_BookingRound_OngoingListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGROUND_ONGOING_LIST,
    nse_D_BookingRound_OngoingListWorker
  );
}
export function* WatchNse_D_BookingRound_OdometerListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGROUND_ODOMETER_LIST,
    nse_D_BookingRound_OdometerListWorker
  );
}
export function* WatchNse_D_BookingRound_DropOffUpdateListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGROUND_DROPOFFUPDATED_LIST,
    nse_D_BookingRound_DropOffUpdateListWorker
  );
}
export function* WatchNse_D_BookingRound_PaymentListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGROUND_PAYMENT_LIST,
    nse_D_BookingRound_PaymentListWorker
  );
}
export function* WatchNse_D_BookingRound_CancelledListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGROUND_CANCELLED_LIST,
    nse_D_BookingRound_CancelledListWorker
  );
}
export function* WatchNse_D_BookingRound_AccidentListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGROUND_ACCIDENT_LIST,
    nse_D_BookingRound_AccidentListWorker
  );
}
export function* WatchNse_D_BookingRound_ReviewListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGROUND_REVIEW_LIST,
    nse_D_BookingRound_ReviewListWorker
  );
}
export function* WatchNse_D_BookingRound_MaxLimitReachedListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGROUND_MAXLIMITREACHED_LIST,
    nse_D_BookingRound_MaxLimitReachedListWorker
  );
}
export function* WatchNse_D_BookingRound_ReturnTripListWorker() {
  yield takeLatest(
    NSE_D_BOOKINGROUND_RETURNTRIP_LIST,
    nse_D_BookingRound_ReturnTripListWorker
  );
}

// payment

export function* WatchNse_D_PaymentFineWorker() {
  yield takeLatest(NSE_D_PAYMENT_FINE_LIST, nse_D_PaymentFineWorker);
}
export function* WatchNse_D_PaymentReceivedWorker() {
  yield takeLatest(NSE_D_PAYMENT_RECEIVED_LIST, nse_D_PaymentReceivedWorker);
}
export function* WatchNse_D_PaymentDueWorker() {
  yield takeLatest(NSE_D_PAYMENT_DUE_LIST, nse_D_PaymentDueWorker);
}
export function* WatchNse_D_PaymentDriverCBListWorker() {
  yield takeLatest(
    NSE_D_PAYMENT_DRIVER_CURRENTBALANCE_LIST,
    nse_D_PaymentDriverCBListWorker
  );
}
export function* WatchNse_D_CashoutListWorker() {
  yield takeLatest(NSE_D_CASHOUT_LIST, nse_D_CashoutListWorker);
}

//   emergency sos

export function* WatchNse_D_EmerSOS_DuringTripWorker() {
  yield takeLatest(
    NSE_D_EMERSOS_DURINGTRIP_LIST,
    nse_D_EmerSOS_DuringTripWorker
  );
}
export function* WatchNse_D_EmerSOS_NoTripWorker() {
  yield takeLatest(NSE_D_EMERSOS_NOTRIP_LIST, nse_D_EmerSOS_NoTripWorker);
}
export function* WatchNse_D_EmerSOS_MessagingWorker() {
  yield takeLatest(NSE_D_EMERSOS_MESSAGING_LIST, nse_D_EmerSOS_MessagingWorker);
}

//   in app messaging

export function* WatchNse_D_INAPPMESS_DuringTripListWorker() {
  yield takeLatest(
    NSE_D_IN_APP_MESS_DURINGTRIP_LIST,
    nse_D_INAPPMESS_DuringTripListWorker
  );
}
export function* WatchNse_D_INAPPMESS_ComplaintWorker() {
  yield takeLatest(
    NSE_D_IN_APP_MESS_COMPLAINT_LIST,
    nse_D_INAPPMESS_ComplaintWorker
  );
}
export function* WatchNse_D_INAPPMESS_RESCLOSEDWorker() {
  yield takeLatest(
    NSE_D_IN_APP_MESS_RESCLOSED_LIST,
    nse_D_INAPPMESS_RESCLOSEDWorker
  );
}

// incentives

export function* WatchNse_D_INAPPMESS_SlotStartTimeListWorker() {
  yield takeLatest(
    NSE_D_INCENTIVE_SLOTSTARTTIME_LIST,
    nse_D_INAPPMESS_SlotStartTimeListWorker
  );
}
export function* WatchNse_D_INAPPMESS_InprogressListWorker() {
  yield takeLatest(
    NSE_D_INCENTIVE_INPROGRESS_LIST,
    nse_D_INAPPMESS_InprogressListWorker
  );
}
export function* WatchNse_D_INAPPMESS_SlotRemainingTimeListWorker() {
  yield takeLatest(
    NSE_D_INCENTIVE_SLOTREMAININGTIME_LIST,
    nse_D_INAPPMESS_SlotRemainingTimeListWorker
  );
}
export function* WatchNse_D_INAPPMESS_CompletedSuccessWorker() {
  yield takeLatest(
    NSE_D_INCENTIVE_COMPLETEDSUCCCESS_LIST,
    nse_D_INAPPMESS_CompletedSuccessWorker
  );
}

//   findone
export function* WatchNse_D_FindOneWorker() {
  yield takeLatest(NSE_D_FINDONE, nse_D_FindOneWorker);
}
export function* WatchNse_D_EditWorker() {
  yield takeLatest(NSE_D_EDIT, nse_D_EditWorker);
}