import { call, takeLatest } from "redux-saga/effects";
import * as broadCastRejectApi from "../../apis/broadcast/rejectBroadcastApi";
import {
  DRIVER_BROADCAST_REJECT_DRP_DWN,
  DRIVER_BROADCAST_REJECT_FIND_ONE,
  DRIVER_BROADCAST_REJECT_LIST,
  RIDER_BROADCAST_REJECT_DRP_DWN,
  RIDER_BROADCAST_REJECT_FIND_ONE,
  RIDER_BROADCAST_REJECT_LIST,
} from "../../actions/types";

export function* riderBroadCastRejectListWorker(action) {
  try {
    const res = yield call(
      broadCastRejectApi?.riderBroadCastRejectListApi,
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
export function* rejectRiderBroadCastFindOneWorker(action) {
  try {
    const res = yield call(
      broadCastRejectApi?.riderBroadCastRejectFindOneApi,
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
export function* driverBroadCastRejectListWorker(action) {
  try {
    const res = yield call(
      broadCastRejectApi?.driverBroadCastRejectListApi,
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
export function* rejectDriverBroadCastFindOneWorker(action) {
  try {
    const res = yield call(
      broadCastRejectApi?.driverBroadCastRejectFindOneApi,
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

export function* rideBroadcastRejectDrpdwnWorker(action) {
  try {
    const res = yield call(broadCastRejectApi.rideBroadcastRejectDrpdwnApi);
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

export function* driBroadcastRejectDrpdwnWorker(action) {
  try {
    const res = yield call(broadCastRejectApi.driBroadcastRejectDrpdwnApi);
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

export function* watchriderBroadCastRejectListWorker() {
  yield takeLatest(RIDER_BROADCAST_REJECT_LIST, riderBroadCastRejectListWorker);
}

export function* watchriderBroadCastRejectFindOneWorker() {
  yield takeLatest(
    RIDER_BROADCAST_REJECT_FIND_ONE,
    rejectRiderBroadCastFindOneWorker
  );
}
export function* watchdriverBroadCastRejectListWorker() {
  yield takeLatest(
    DRIVER_BROADCAST_REJECT_LIST,
    driverBroadCastRejectListWorker
  );
}
export function* watchdriverBroadCastRejectFindOneWorker() {
  yield takeLatest(
    DRIVER_BROADCAST_REJECT_FIND_ONE,
    rejectDriverBroadCastFindOneWorker
  );
}
export function* watchRideBroadcastRejectDrpdwnWorker() {
  yield takeLatest(RIDER_BROADCAST_REJECT_DRP_DWN, rideBroadcastRejectDrpdwnWorker);
}

export function* watchDriBroadcastRejectDrpdwnWorker() {
  yield takeLatest(DRIVER_BROADCAST_REJECT_DRP_DWN, driBroadcastRejectDrpdwnWorker);
}