import { call, takeLatest } from "redux-saga/effects";
import {
  COMPLETED_BOOKING_CANCEL_DRIVER_FINE,
  COMPLETED_BOOKING_CANCEL_REFUND,
  COMPLETED_BOOKING_CREATE_REFUND,
  COMPLETED_BOOKING_INDIVIDUAL,
  COMPLETED_BOOKING_LIST,
  COMPLETED_UPDATE_BILLING_DETAILS,
  COMPLETED_UPDATE_FINAL_ODOMETER,
  COMPLETED_UPDATE_INITIAL_ODOMETER,
  COMPLETED_UPDATE_PaymentMethod,
  COMPLETED_BOOKINGS_DROPDOWN_LIST,
} from "../../actions/types";
import * as completedBookingApis from "../../apis/manageBookingApis/completedBookingApi";

export function* completedBookingListWorker(action) {
  try {
    const res = yield call(
      completedBookingApis.completedBookingListApi,
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

export function* completedBookingIndividualWorker(action) {
  try {
    const res = yield call(
      completedBookingApis.completedBookingIndividualApi,
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
export function* completedUpdatePaymentMethodWorker(action) {
  try {
    const res = yield call(
      completedBookingApis.completedUpdatePaymentMethodApi,
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
export function* completedUpdateBillingDetailsWorker(action) {
  try {
    const res = yield call(
      completedBookingApis.completedUpdateBillingDetailsApi,
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
export function* completedUpdateInitialOdometerWorker(action) {
  try {
    const res = yield call(
      completedBookingApis.completedUpdateInitialOdometerApi,
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
export function* completedUpdateFinalOdometerWorker(action) {
  try {
    const res = yield call(
      completedBookingApis.completedUpdateFinalOdometerApi,
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
export function* completedBookingCreateRefundWorker(action) {
  try {
    const res = yield call(
      completedBookingApis.completedBookingCreateRefundApi,
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
export function* completedBookingCancelRefundWorker(action) {
  try {
    const res = yield call(
      completedBookingApis.completedBookingCancelRefundApi,
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
export function* completedBookingCancelDriverFineWorker(action) {
  try {
    const res = yield call(
      completedBookingApis.completedBookingCancelDriverFineApi,
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

export function* completedBookingsDropDownListWorker(action) {
  try {
    const res = yield call(completedBookingApis.completedBookingsDropDownListApi);
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


export function* watchcompletedBookingListWorker() {
  yield takeLatest(COMPLETED_BOOKING_LIST, completedBookingListWorker);
}
export function* watchcompletedBookingIndividualWorker() {
  yield takeLatest(
    COMPLETED_BOOKING_INDIVIDUAL,
    completedBookingIndividualWorker
  );
}
export function* watchcompletedUpdatePaymentMethodWorker() {
  yield takeLatest(
    COMPLETED_UPDATE_PaymentMethod,
    completedUpdatePaymentMethodWorker
  );
}
export function* watchcompletedUpdateBillingDetailsWorker() {
  yield takeLatest(
    COMPLETED_UPDATE_BILLING_DETAILS,
    completedUpdateBillingDetailsWorker
  );
}
export function* watchcompletedUpdateInitialOdometerWorker() {
  yield takeLatest(
    COMPLETED_UPDATE_INITIAL_ODOMETER,
    completedUpdateInitialOdometerWorker
  );
}
export function* watchcompletedUpdateFinalOdometerWorker() {
  yield takeLatest(
    COMPLETED_UPDATE_FINAL_ODOMETER,
    completedUpdateFinalOdometerWorker
  );
}
export function* watchcompletedBookingCreateRefundWorker() {
  yield takeLatest(
    COMPLETED_BOOKING_CREATE_REFUND,
    completedBookingCreateRefundWorker
  );
}
export function* watchcompletedBookingCancelRefundWorker() {
  yield takeLatest(
    COMPLETED_BOOKING_CANCEL_REFUND,
    completedBookingCancelRefundWorker
  );
}
export function* watchcompletedBookingCancelDriverFineWorker() {
  yield takeLatest(
    COMPLETED_BOOKING_CANCEL_DRIVER_FINE,
    completedBookingCancelDriverFineWorker
  );
}

export function* watchCompletedBookingsDropDownListWorker() {
  yield takeLatest(COMPLETED_BOOKINGS_DROPDOWN_LIST, completedBookingsDropDownListWorker);
}
