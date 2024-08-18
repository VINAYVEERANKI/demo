import { call, takeLatest } from "redux-saga/effects";
import {
  ONGOING_REQUEST_INDIVIDUAL,
  ONGOING_REQUEST_LIST,
  UNSUCCESSFULL_REQUEST_INDIVIDUAL,
  UNSUCCESSFULL_REQUEST_LIST,
  ONGOING_DROPDOWN_LIST,
  UNSUCCESSFUL_DROPDOWN_LIST,
} from "../actions/types";
import * as bookingRequestApis from "../apis/bookingRequestApi";

export function* ongoingRequestListWorker(action) {
  try {
    const res = yield call(
      bookingRequestApis.ongoingRequestListApi,
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
export function* ongoingRequestIndividualWorker(action) {
  try {
    const res = yield call(
      bookingRequestApis.ongoingRequestIndividualApi,
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
export function* unSuccessfulRequestListWorker(action) {
  try {
    const res = yield call(
      bookingRequestApis.unSuccessfulRequestListApi,
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
export function* unSuccessfulRequestIndividualWorker(action) {
  try {
    const res = yield call(
      bookingRequestApis.unSuccessfulRequestIndividualApi,
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

export function* ongoingDropDownListWorker(action) {
  try {
    const res = yield call(bookingRequestApis.ongoingDropDownListApi);
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
export function* unsuccessfulDropDownListWorker(action) {
  try {
    const res = yield call(bookingRequestApis.unsuccessfulDropDownListApi);
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

export function* watchongoingRequestListWorker() {
  yield takeLatest(ONGOING_REQUEST_LIST, ongoingRequestListWorker);
}
export function* watchongoingRequestIndividualWorker() {
  yield takeLatest(ONGOING_REQUEST_INDIVIDUAL, ongoingRequestIndividualWorker);
}
export function* watchunSuccessfulRequestListWorker() {
  yield takeLatest(UNSUCCESSFULL_REQUEST_LIST, unSuccessfulRequestListWorker);
}
export function* watchunSuccessfulRequestIndividualWorker() {
  yield takeLatest(
    UNSUCCESSFULL_REQUEST_INDIVIDUAL,
    unSuccessfulRequestIndividualWorker
  );
}

export function* watchOngoingDropDownListWorker() {
  yield takeLatest(ONGOING_DROPDOWN_LIST, ongoingDropDownListWorker);
}

export function* watchUnsuccessfulDropDownListWorker() {
  yield takeLatest(UNSUCCESSFUL_DROPDOWN_LIST, unsuccessfulDropDownListWorker);
}
