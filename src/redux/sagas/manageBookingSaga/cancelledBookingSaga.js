import { call, takeLatest } from "redux-saga/effects";
import {
  CANCELLED_BOOKING_CANCEL_DRIVER_FINE,
  CANCELLED_BOOKING_CANCEL_REFUND,
  CANCELLED_BOOKING_CREATE_REFUND,
  CANCELLED_BOOKING_INDIVIDUAL,
  CANCELLED_BOOKING_LIST,
  CANCELLED_UPDATE_BILLING_DETAILS,
  CANCELLED_UPDATE_FINAL_ODOMETER,
  CANCELLED_UPDATE_INITIAL_ODOMETER,
  CANCELLED_UPDATE_PaymentMethod,
  CANCELLED_BOOKINGS_DROPDOWN_LIST,
} from "../../actions/types";
import * as cancelledBookingApis from "../../apis/manageBookingApis/cancelledBookingApi";

export function* cancelledBookingListWorker(action) {
  try {
    const res = yield call(
      cancelledBookingApis.cancelledBookingListApi,
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
export function* cancelledBookingIndividualWorker(action) {
  try {
    const res = yield call(
      cancelledBookingApis.cancelledBookingIndividualApi,
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
export function* cancelledUpdateBillingDetailsWorker(action) {
  try {
    const res = yield call(
      cancelledBookingApis.cancelledUpdateBillingDetailsApi,
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
export function* cancelledUpdateInitialOdometerWorker(action) {
  try {
    const res = yield call(
      cancelledBookingApis.cancelledUpdateInitialOdometerApi,
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
export function* cancelledUpdateFinalOdometerWorker(action) {
  try {
    const res = yield call(
      cancelledBookingApis.cancelledUpdateFinalOdometerApi,
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
export function* cancelledUpdatePaymentMethodWorker(action) {
  try {
    const res = yield call(
      cancelledBookingApis.cancelledUpdatePaymentMethodApi,
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
export function* cancelledBookingCreateRefundWorker(action) {
  try {
    const res = yield call(
      cancelledBookingApis.cancelledBookingCreateRefundApi,
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
export function* cancelledBookingCancelRefundWorker(action) {
  try {
    const res = yield call(
      cancelledBookingApis.cancelledBookingCancelRefundApi,
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
export function* cancelledBookingCancelDriverFineWorker(action) {
  try {
    const res = yield call(
      cancelledBookingApis.cancelledBookingCancelDriverFineApi,
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

export function* cancelledBookingsDropDownListWorker(action) {
  try {
    const res = yield call(cancelledBookingApis.cancelledBookingsDropDownListApi);
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

export function* watchcancelledBookingListWorker() {
  yield takeLatest(CANCELLED_BOOKING_LIST, cancelledBookingListWorker);
}
export function* watchcancelledBookingIndividualWorker() {
  yield takeLatest(
    CANCELLED_BOOKING_INDIVIDUAL,
    cancelledBookingIndividualWorker
  );
}
export function* watchcancelledBookingUpdateBillingWorker() {
  yield takeLatest(
    CANCELLED_UPDATE_BILLING_DETAILS,
    cancelledUpdateBillingDetailsWorker
  );
}
export function* watchcancelledUpdateInitialOdometerWorker() {
  yield takeLatest(
    CANCELLED_UPDATE_INITIAL_ODOMETER,
    cancelledUpdateInitialOdometerWorker
  );
}
export function* watchcancelledUpdateFinalOdometerWorker() {
  yield takeLatest(
    CANCELLED_UPDATE_FINAL_ODOMETER,
    cancelledUpdateFinalOdometerWorker
  );
}
export function* watchcancelledUpdatePaymentMethodWorker() {
  yield takeLatest(
    CANCELLED_UPDATE_PaymentMethod,
    cancelledUpdatePaymentMethodWorker
  );
}
export function* watchcancelledBookingCreateRefundWorker() {
  yield takeLatest(
    CANCELLED_BOOKING_CREATE_REFUND,
    cancelledBookingCreateRefundWorker
  );
}
export function* watchcancelledBookingCancelRefundWorker() {
  yield takeLatest(
    CANCELLED_BOOKING_CANCEL_REFUND,
    cancelledBookingCancelRefundWorker
  );
}
export function* watchcancelledBookingCancelDriverFineWorker() {
  yield takeLatest(
    CANCELLED_BOOKING_CANCEL_DRIVER_FINE,
    cancelledBookingCancelDriverFineWorker
  );
}

export function* watchCancelledBookingsDropDownListWorker() {
  yield takeLatest(CANCELLED_BOOKINGS_DROPDOWN_LIST, cancelledBookingsDropDownListWorker);
}
