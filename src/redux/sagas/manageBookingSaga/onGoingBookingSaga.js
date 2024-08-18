import { call, takeLatest } from "redux-saga/effects";
import {
  ONGOING_ACCIDENT_REPORTED,
  ONGOING_BOOKING_INDIVIDUAL,
  ONGOING_BOOKING_LIST,
  ONGOING_DRIVER_REQ_CANCEL,
  ONGOING_END_TRIP,
  ONGOING_RIDER_REQ_CANCEL,
  ONGOING_UPDATE_BILLING_DETAILS,
  ONGOING_UPDATE_FINAL_ODOMETER,
  ONGOING_UPDATE_INITIAL_ODOMETER,
  ONGOING_UPDATE_PaymentMethod,
  ONGOING_BOOKINGS_DROPDOWN_LIST,
} from "../../actions/types";
import * as ongoingBookingApis from "../../apis/manageBookingApis/onGoingBookingApi";

export function* ongoingBookingListWorker(action) {
  try {
    const res = yield call(
      ongoingBookingApis.ongoingBookingListApi,
      action.current_page,
      action.data
    );
    console.log(res);
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
export function* ongoingBookingIndividualWorker(action) {
  try {
    const res = yield call(
      ongoingBookingApis.ongoingBookingIndividualApi,
      action.data
    );
    console.log(res);
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
export function* ongoingDriverReqCancelWorker(action) {
  try {
    const res = yield call(
      ongoingBookingApis.ongoingDriverReqCancelApi,
      action.data
    );
    console.log(res);
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
export function* ongoingRiderReqCancelWorker(action) {
  try {
    const res = yield call(
      ongoingBookingApis.ongoingRiderReqCancelApi,
      action.data
    );
    console.log(res);
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
export function* ongoingAccidentReportWorker(action) {
  try {
    const res = yield call(
      ongoingBookingApis.ongoingAccidentReportApi,
      action.data
    );
    console.log(res);
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
export function* ongoingEndTripWorker(action) {
  try {
    const res = yield call(ongoingBookingApis.ongoingEndTripApi, action.data);
    console.log(res);
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
export function* ongoingUpdatePaymentMethodWorker(action) {
  try {
    const res = yield call(
      ongoingBookingApis.ongoingUpdatePaymentMethodApi,
      action.data
    );
    console.log(res);
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
export function* ongoingUpdateBillingDetailsWorker(action) {
  try {
    const res = yield call(
      ongoingBookingApis.ongoingUpdateBillingDetailsApi,
      action.data
    );
    console.log(res);
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
export function* ongoingUpdateInitialOdometerWorker(action) {
  try {
    const res = yield call(
      ongoingBookingApis.ongoingUpdateInitialOdometerApi,
      action.data
    );
    console.log(res);
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
export function* ongoingUpdateFinalOdometerWorker(action) {
  try {
    const res = yield call(
      ongoingBookingApis.ongoingUpdateFinalOdometerApi,
      action.data
    );
    console.log(res);
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

export function* ongoingBookingsDropDownListWorker(action) {
  try {
    const res = yield call(ongoingBookingApis.ongoingBookingsDropDownListApi);
    console.log(res, "dropdownList");
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

export function* watchongoingBookingListWorker() {
  yield takeLatest(ONGOING_BOOKING_LIST, ongoingBookingListWorker);
}
export function* watchongoingBookingIndividualWorker() {
  yield takeLatest(ONGOING_BOOKING_INDIVIDUAL, ongoingBookingIndividualWorker);
}
export function* watchongoingDriverReqCancelWorker() {
  yield takeLatest(ONGOING_DRIVER_REQ_CANCEL, ongoingDriverReqCancelWorker);
}
export function* watchongoingRiderReqCancelWorker() {
  yield takeLatest(ONGOING_RIDER_REQ_CANCEL, ongoingRiderReqCancelWorker);
}
export function* watchongoingAccidentReportWorker() {
  yield takeLatest(ONGOING_ACCIDENT_REPORTED, ongoingAccidentReportWorker);
}
export function* watchongoingEndTripWorker() {
  yield takeLatest(ONGOING_END_TRIP, ongoingEndTripWorker);
}
export function* watchongoingUpdatePaymentMethodWorker() {
  yield takeLatest(
    ONGOING_UPDATE_PaymentMethod,
    ongoingUpdatePaymentMethodWorker
  );
}
export function* watchongoingUpdateBillingDetailsWorker() {
  yield takeLatest(
    ONGOING_UPDATE_BILLING_DETAILS,
    ongoingUpdateBillingDetailsWorker
  );
}
export function* watchongoingUpdateInitialOdometerWorker() {
  yield takeLatest(
    ONGOING_UPDATE_INITIAL_ODOMETER,
    ongoingUpdateInitialOdometerWorker
  );
}
export function* watchongoingUpdateFinalOdometerWorker() {
  yield takeLatest(
    ONGOING_UPDATE_FINAL_ODOMETER,
    ongoingUpdateFinalOdometerWorker
  );
}

export function* watchOngoingBookingsDropDownListWorker() {
  yield takeLatest(ONGOING_BOOKINGS_DROPDOWN_LIST, ongoingBookingsDropDownListWorker);
}