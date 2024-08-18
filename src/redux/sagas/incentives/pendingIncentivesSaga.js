import { call, takeLatest } from "redux-saga/effects";
import {
  CREATE_DRIVER_INCENTIVE,
  DRIVER_INCENTIVE_PENDING,
  DRIVER_INCENTIVE_PENDING_EDIT,
  DRIVER_INCENTIVE_PEND_LIST,
  DRI_INCENTIVE_REVREQ_DRP_DWN,
} from "../../actions/types";
import * as incentivePendingApi from "../../apis/incentives/pendingIncentivesApi";

// driver

// create
export function* createDriverIncentiveWorker(action) {
  try {
    const res = yield call(
      incentivePendingApi?.createDriverIncentiveApi,
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
export function* driverIncentivePendingListWorker(action) {
  try {
    const res = yield call(
      incentivePendingApi?.driverIncentivePendingListApi,
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
export function* driverIncentivePendingWorker(action) {
  try {
    const res = yield call(
      incentivePendingApi?.driverIncentivePendingApi,
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
export function* driverIncentivePendingEditWorker(action) {
  try {
    const res = yield call(
      incentivePendingApi?.driverIncentivePendingEditApi,
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

export function* driIncentiveRevreqDrpdwnWorker(action) {
  try {
    const res = yield call(incentivePendingApi.driIncentiveRevreqDrpdwnApi);
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

export function* watchcreateDriverIncentiveWorker() {
  yield takeLatest(CREATE_DRIVER_INCENTIVE, createDriverIncentiveWorker);
}
export function* watchdriverIncentivePendingListWorker() {
  yield takeLatest(
    DRIVER_INCENTIVE_PEND_LIST,
    driverIncentivePendingListWorker
  );
}

export function* watchdriverIncentivePendingWorker() {
  yield takeLatest(DRIVER_INCENTIVE_PENDING, driverIncentivePendingWorker);
}
export function* watchdriverIncentivePendingEditWorker() {
  yield takeLatest(
    DRIVER_INCENTIVE_PENDING_EDIT,
    driverIncentivePendingEditWorker
  );
}

export function* watchDriIncentiveRevreqDrpdwnWorker() {
  yield takeLatest(DRI_INCENTIVE_REVREQ_DRP_DWN, driIncentiveRevreqDrpdwnWorker);
}