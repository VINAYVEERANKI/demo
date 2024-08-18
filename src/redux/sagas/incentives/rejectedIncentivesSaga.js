import { call, takeLatest } from "redux-saga/effects";
import {
  REJECT_DRIVER_INCENTIVE,
  DRIVER_INCENTIVE_REJECTED,
  DRIVER_INCENTIVE_REJECTED_LIST,
  DRI_INCENTIVE_REJECT_DRP_DWN,
} from "../../actions/types";
import * as incentiveRejectedApi from "../../apis/incentives/rejectedIncentivesApi";

export function* driverIncentiveRejectedListWorker(action) {
  try {
    const res = yield call(
      incentiveRejectedApi?.driverIncentiveRejectedListApi,
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
export function* driverIncentiveRejectedWorker(action) {
  try {
    const res = yield call(
      incentiveRejectedApi?.driverIncentiveRejectedApi,
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

export function* rejectDriverIncentiveWorker(action) {
  try {
    const res = yield call(
      incentiveRejectedApi?.rejectDriverIncentiveApi,
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

export function* driIncentiveRejectDrpdwnWorker(action) {
  try {
    const res = yield call(incentiveRejectedApi.driIncentiveRejectDrpdwnApi);
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

export function* watchdriverIncentiveRejectedListWorker() {
  yield takeLatest(
    DRIVER_INCENTIVE_REJECTED_LIST,
    driverIncentiveRejectedListWorker
  );
}

export function* watchdriverIncentiveRejectedWorker() {
  yield takeLatest(DRIVER_INCENTIVE_REJECTED, driverIncentiveRejectedWorker);
}

export function* watchrejcectDriverIncentiveWorker() {
  yield takeLatest(REJECT_DRIVER_INCENTIVE, rejectDriverIncentiveWorker);
}

export function* watchDriIncentiveRejectDrpdwnWorker() {
  yield takeLatest(DRI_INCENTIVE_REJECT_DRP_DWN, driIncentiveRejectDrpdwnWorker);
}