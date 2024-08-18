import { call, takeLatest } from "redux-saga/effects";
import {
  DRIVER_INCENTIVE_EXPIRED,
  DRIVER_INCENTIVE_EXPIRED_LIST,
  DRI_INCENTIVE_EXPIRE_DRP_DWN,
} from "../../actions/types";
import * as incentiveExpiredApi from "../../apis/incentives/expiredIncentivesApi";

export function* driverIncentiveExpiredListWorker(action) {
  try {
    const res = yield call(
      incentiveExpiredApi?.driverIncentiveExpiredListApi,
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
export function* driverIncentiveExpiredWorker(action) {
  try {
    const res = yield call(
      incentiveExpiredApi?.driverIncentiveExpiredApi,
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

export function* driIncentiveExpireDrpdwnWorker(action) {
  try {
    const res = yield call(incentiveExpiredApi.driIncentiveExpireDrpdwnApi);
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

export function* watchdriverIncentiveExpiredListWorker() {
  yield takeLatest(
    DRIVER_INCENTIVE_EXPIRED_LIST,
    driverIncentiveExpiredListWorker
  );
}

export function* watchdriverIncentiveExpiredWorker() {
  yield takeLatest(DRIVER_INCENTIVE_EXPIRED, driverIncentiveExpiredWorker);
}

export function* watchDriIncentiveExpireDrpdwnWorker() {
  yield takeLatest(DRI_INCENTIVE_EXPIRE_DRP_DWN, driIncentiveExpireDrpdwnWorker);
}
