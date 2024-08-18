import { call, takeLatest } from "redux-saga/effects";
import {
  RIDER_RESOLVED_CLOSED_COMPLAINTS_LIST,
  DRIVER_RESOLVED_CLOSED_COMPLAINTS_LIST,
  RIDER_RES_COLSED_COMPLAINT,
  DRIVER_RES_COLSED_COMPLAINT,
  RIDER_COMPL_RESLOVED_DROPDOWN,
  DRIVER_COMPL_RESLOVED_DROPDOWN,
} from "../../actions/types";
import * as resolvedClosedComplaintsApi from "../../apis/complaints/reslovedAndClosedApi";

export function* riderResolvedClosedComplaintsListWorker(action) {
  try {
    const res = yield call(
      resolvedClosedComplaintsApi.riderResolvedClosedComplaintsListApi,
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
export function* driverResolvedClosedComplaintsListWorker(action) {
  try {
    const res = yield call(
      resolvedClosedComplaintsApi.driverResolvedClosedComplaintsListApi,
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

export function* riderResClosedComplaintWorker(action) {
  try {
    const res = yield call(
      resolvedClosedComplaintsApi?.riderResClosedComplaintApi,
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

export function* driverResClosedComplaintWorker(action) {
  try {
    const res = yield call(
      resolvedClosedComplaintsApi?.driverResClosedComplaintApi,
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
export function* riderComplReslovedDropDownWorker(action) {
  try {
    const res = yield call(resolvedClosedComplaintsApi?.riderComplReslovedDropDownApi, action);
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
export function* driverComplReslovedDropDownWorker(action) {
  try {
    const res = yield call(resolvedClosedComplaintsApi?.driverComplReslovedDropDownApi, action);
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

export function* watchRiderResolvedClosedComplaintsListWorker() {
  yield takeLatest(
    RIDER_RESOLVED_CLOSED_COMPLAINTS_LIST,
    riderResolvedClosedComplaintsListWorker
  );
}
export function* watchDriverResolvedClosedComplaintsListWorker() {
  yield takeLatest(
    DRIVER_RESOLVED_CLOSED_COMPLAINTS_LIST,
    driverResolvedClosedComplaintsListWorker
  );
}
export function* watchRiderResClosedComplaintWorker() {
  yield takeLatest(RIDER_RES_COLSED_COMPLAINT, riderResClosedComplaintWorker);
}
export function* watchDriverResClosedComplaintWorker() {
  yield takeLatest(DRIVER_RES_COLSED_COMPLAINT, driverResClosedComplaintWorker);
}
export function* watchriderComplReslovedDropDownWorker() {
  yield takeLatest(RIDER_COMPL_RESLOVED_DROPDOWN, riderComplReslovedDropDownWorker);
}
export function* watchdriverComplReslovedDropDownWorker() {
  yield takeLatest(DRIVER_COMPL_RESLOVED_DROPDOWN, driverComplReslovedDropDownWorker);
}