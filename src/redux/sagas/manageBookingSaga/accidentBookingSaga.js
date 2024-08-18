import { call, takeLatest } from "redux-saga/effects";
import {
  ACCIDENT_BOOKING_CANCEL_DRIVER_FINE,
  ACCIDENT_BOOKING_CANCEL_REFUND,
  ACCIDENT_BOOKING_CREATE_REFUND,
  ACCIDENT_BOOKING_INDIVIDUAL,
  ACCIDENT_BOOKING_LIST,
  ACCIDENT_UPDATE_BILLING_DETAILS,
  ACCIDENT_UPDATE_FINAL_ODOMETER,
  ACCIDENT_UPDATE_INITIAL_ODOMETER,
  ACCIDENT_UPDATE_PaymentMethod,
  ACCIDENT_BOOKINGS_DROPDOWN_LIST,
} from "../../actions/types";
import * as accidentBookingApis from "../../apis/manageBookingApis/accidentBookingApi";

export function* accidentBookingListWorker(action) {
  try {
    const res = yield call(
      accidentBookingApis.accidentBookingListApi,
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
export function* accidentBookingIndividualWorker(action) {
  try {
    const res = yield call(
      accidentBookingApis.accidentBookingIndividualApi,
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
export function* accidentBookingUpdateBillingWorker(action) {
  try {
    const res = yield call(
      accidentBookingApis.accidentBookingUpdateBillingDetailsApi,
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
export function* accidentUpdatePaymentMethodWorker(action) {
  try {
    const res = yield call(
      accidentBookingApis.accidentUpdatePaymentMethodApi,
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
export function* accidentUpdateInitialOdometerWorker(action) {
  try {
    const res = yield call(
      accidentBookingApis.accidentUpdateInitialOdometerApi,
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
export function* accidentUpdateFinalOdometerWorker(action) {
  try {
    const res = yield call(
      accidentBookingApis.accidentUpdateFinalOdometerApi,
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
export function* accidentBookingCreateRefundWorker(action) {
  try {
    const res = yield call(
      accidentBookingApis.accidentBookingCreateRefundApi,
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
export function* accidentBookingCancelRefundWorker(action) {
  try {
    const res = yield call(
      accidentBookingApis.accidentBookingCancelRefundApi,
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
export function* accidentBookingCancelDriverFineWorker(action) {
  try {
    const res = yield call(
      accidentBookingApis.accidentBookingCancelDriverFineApi,
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

export function* accidentBookingsDropDownListWorker(action) {
  try {
    const res = yield call(accidentBookingApis.accidentBookingsDropDownListApi);
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

export function* watchaccidentBookingUpdateBillingsWorker() {
  yield takeLatest(
    ACCIDENT_UPDATE_BILLING_DETAILS,
    accidentBookingUpdateBillingWorker
  );
}
export function* watchaccidentBookingListWorker() {
  yield takeLatest(ACCIDENT_BOOKING_LIST, accidentBookingListWorker);
}
export function* watchaccidentBookingIndividualWorker() {
  yield takeLatest(
    ACCIDENT_BOOKING_INDIVIDUAL,
    accidentBookingIndividualWorker
  );
}
export function* watchaccidentUpdatePaymentMethodWorker() {
  yield takeLatest(
    ACCIDENT_UPDATE_PaymentMethod,
    accidentUpdatePaymentMethodWorker
  );
}
export function* watchaccidentUpdateInitialOdometerWorker() {
  yield takeLatest(
    ACCIDENT_UPDATE_INITIAL_ODOMETER,
    accidentUpdateInitialOdometerWorker
  );
}
export function* watchaccidentUpdateFinalOdometerWorker() {
  yield takeLatest(
    ACCIDENT_UPDATE_FINAL_ODOMETER,
    accidentUpdateFinalOdometerWorker
  );
}
export function* watchaccidentBookingCreateRefundWorker() {
  yield takeLatest(
    ACCIDENT_BOOKING_CREATE_REFUND,
    accidentBookingCreateRefundWorker
  );
}
export function* watchaccidentBookingCancelRefundWorker() {
  yield takeLatest(
    ACCIDENT_BOOKING_CANCEL_REFUND,
    accidentBookingCancelRefundWorker
  );
}
export function* watchaccidentBookingCancelDriverFineWorker() {
  yield takeLatest(
    ACCIDENT_BOOKING_CANCEL_DRIVER_FINE,
    accidentBookingCancelDriverFineWorker
  );
}

export function* watchAccidentBookingsDropDownListWorker() {
  yield takeLatest(ACCIDENT_BOOKINGS_DROPDOWN_LIST, accidentBookingsDropDownListWorker);
}