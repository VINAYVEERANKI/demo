import { call, takeLatest } from "redux-saga/effects";
import {
  APPROVE_DRIVER_INCENTIVE,
  DRIVER_INCENTIVE_ACTIVE,
  DRIVER_INCENTIVE_ACTIVE_CAMPAIGN_EDIT,
  DRIVER_INCENTIVE_ACTIVE_EDIT,
  DRIVER_INCENTIVE_ACTIVE_LIST,
  DRI_INCENTIVE_ACTIVE_DRP_DWN,
} from "../../actions/types";
import * as incentiveActiveApi from "../../apis/incentives/activeIncentivesApi";

export function* driverIncentiveActiveListWorker(action) {
  try {
    const res = yield call(
      incentiveActiveApi?.driverIncentiveActiveListApi,
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
export function* driverIncentiveActiveWorker(action) {
  try {
    const res = yield call(
      incentiveActiveApi?.driverIncentiveActiveApi,
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
export function* driverIncentiveActiveEditWorker(action) {
  try {
    const res = yield call(
      incentiveActiveApi?.driverIncentiveActiveEditApi,
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

export function* driverIncentiveActiveCampaignEditWorker(action) {
  try {
    const res = yield call(
      incentiveActiveApi?.driverIncentiveActiveCampaignEditApi,
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
export function* ApproveDriverIncentiveWorker(action) {
  try {
    const res = yield call(
      incentiveActiveApi?.approveDriverIncentiveApi,
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

export function* driIncentiveActiveDrpdwnWorker(action) {
  try {
    const res = yield call(incentiveActiveApi.driIncentiveActiveDrpdwnApi);
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

export function* watchdriverIncentiveActiveListWorker() {
  yield takeLatest(
    DRIVER_INCENTIVE_ACTIVE_LIST,
    driverIncentiveActiveListWorker
  );
}

export function* watchdriverIncentiveActiveWorker() {
  yield takeLatest(DRIVER_INCENTIVE_ACTIVE, driverIncentiveActiveWorker);
}
export function* watchdriverIncentiveActiveEditWorker() {
  yield takeLatest(
    DRIVER_INCENTIVE_ACTIVE_EDIT,
    driverIncentiveActiveEditWorker
  );
}
export function* watchdriverIncentiveActiveCampaignEditWorker() {
  yield takeLatest(
    DRIVER_INCENTIVE_ACTIVE_CAMPAIGN_EDIT,
    driverIncentiveActiveCampaignEditWorker
  );
}
export function* watchApproveDriverIncentiveWorker() {
  yield takeLatest(APPROVE_DRIVER_INCENTIVE, ApproveDriverIncentiveWorker);
}

export function* watchDriIncentiveActiveDrpdwnWorker() {
  yield takeLatest(DRI_INCENTIVE_ACTIVE_DRP_DWN, driIncentiveActiveDrpdwnWorker);
}