import { call, takeLatest } from "redux-saga/effects";
import {
  RIDER_RESOLVED_CLOSED_SOS_LIST,
  DRIVER_RESOLVED_CLOSED_SOS_LIST,
  RIDER_RES_COLSED_SOS,
  DRIVER_RES_COLSED_SOS,
} from "../../actions/types";
import * as resolvedClosedSOSApi from "../../apis/sos/reslovedAndClosedSosApi";

export function* riderResolvedClosedSOSListWorker(action) {
  try {
    const res = yield call(
      resolvedClosedSOSApi.riderResolvedClosedSOSListApi,
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
export function* driverResolvedClosedSOSListWorker(action) {
  try {
    const res = yield call(
      resolvedClosedSOSApi.driverResolvedClosedSOSListApi,
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

export function* riderResClosedSOSWorker(action) {
  try {
    const res = yield call(
      resolvedClosedSOSApi?.riderResClosedSOSApi,
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

export function* driverResClosedSOSWorker(action) {
  try {
    const res = yield call(
      resolvedClosedSOSApi?.driverResClosedSOSApi,
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

export function* watchRiderResolvedClosedSOSListWorker() {
  yield takeLatest(
    RIDER_RESOLVED_CLOSED_SOS_LIST,
    riderResolvedClosedSOSListWorker
  );
}
export function* watchDriverResolvedClosedSOSListWorker() {
  yield takeLatest(
    DRIVER_RESOLVED_CLOSED_SOS_LIST,
    driverResolvedClosedSOSListWorker
  );
}
export function* watchRiderResClosedSOSWorker() {
  yield takeLatest(RIDER_RES_COLSED_SOS, riderResClosedSOSWorker);
}
export function* watchDriverResClosedSOSWorker() {
  yield takeLatest(DRIVER_RES_COLSED_SOS, driverResClosedSOSWorker);
}
