import { call, takeLatest } from "redux-saga/effects";
import {
  DELETE_DRIVER_INCENTIVE,
  DRIVER_INCENTIVE_DELETED,
  DRIVER_INCENTIVE_DELETED_LIST,
  DRI_INCENTIVE_DELETE_DRP_DWN,
} from "../../actions/types";
import * as incentiveDeletedApi from "../../apis/incentives/deletedIncentivesApi";

export function* driverIncentiveDeletedListWorker(action) {
  try {
    const res = yield call(
      incentiveDeletedApi?.driverIncentiveDeletedListApi,
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
export function* driverIncentiveDeletedWorker(action) {
  try {
    const res = yield call(
      incentiveDeletedApi?.driverIncentiveDeletedApi,
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

export function* deleteDriverIncentiveWorker(action) {
  try {
    const res = yield call(
      incentiveDeletedApi?.deleteDriverIncentiveApi,
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

export function* driIncentiveDeleteDrpdwnWorker(action) {
  try {
    const res = yield call(incentiveDeletedApi.driIncentiveDeleteDrpdwnApi);
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

export function* watchdriverIncentiveDeletedListWorker() {
  yield takeLatest(
    DRIVER_INCENTIVE_DELETED_LIST,
    driverIncentiveDeletedListWorker
  );
}

export function* watchdriverIncentiveDeletedWorker() {
  yield takeLatest(DRIVER_INCENTIVE_DELETED, driverIncentiveDeletedWorker);
}

export function* watchdeleteDriverIncentiveWorker() {
  yield takeLatest(DELETE_DRIVER_INCENTIVE, deleteDriverIncentiveWorker);
}

export function* watchDriIncentiveDeleteDrpdwnWorker() {
  yield takeLatest(DRI_INCENTIVE_DELETE_DRP_DWN, driIncentiveDeleteDrpdwnWorker);
}