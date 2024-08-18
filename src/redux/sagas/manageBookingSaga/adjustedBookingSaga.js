import { call, takeLatest } from "redux-saga/effects";
import { ADJUSTED_BOOKINGS_DROPDOWN_LIST, ADJUSTED_BOOKING_INDIVIDUAL, ADJUSTED_BOOKING_LIST } from "../../actions/types";
import * as adjustedBookingApis from "../../apis/manageBookingApis/adjustedBookingApi";

export function* adjustedBookingListWorker(action) {
  try {
    const res = yield call(
      adjustedBookingApis.adjustedBookingListApi,
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

export function* adjustedBookingIndividualWorker(action) {
  try {
    const res = yield call(
      adjustedBookingApis.adjustedBookingIndividualApi,
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

export function* adjustedBookingsDropDownListWorker(action) {
  try {
    const res = yield call(adjustedBookingApis.adjustedBookingsDropDownListApi);
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

export function* watchadjustedBookingListWorker() {
  yield takeLatest(ADJUSTED_BOOKING_LIST, adjustedBookingListWorker);}

  export function* watchadjustedBookingIndividualWorker() {
    yield takeLatest(ADJUSTED_BOOKING_INDIVIDUAL, adjustedBookingIndividualWorker);
  }

  export function* watchadjustedBookingsDropDownListWorker() {
    yield takeLatest(ADJUSTED_BOOKINGS_DROPDOWN_LIST, adjustedBookingsDropDownListWorker);
  }