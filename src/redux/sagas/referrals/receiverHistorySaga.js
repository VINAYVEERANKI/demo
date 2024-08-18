import { call, takeLatest } from "redux-saga/effects";
import {
  DRIVER_REF_RECEIVER_USAGE_HISTORY,
  DRVIER_REF_RECEIVER_USAGE_HISTORY_LIST,
  REF_RECEIVER_USAGE_HISTORY_FIND_ALL,
  REF_RECEIVER_USAGE_HISTORY_FIND_ONE,
} from "../../actions/types";
import * as referralApi from "../../apis/referrals/recevierHistoryApi";

/*************rider referrals */

export function* riderRefReceiverFindAllusageHisWorker(action) {
  try {
    const res = yield call(
      referralApi?.riderRefReceiverFindAllUsageHisApi,
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

export function* riderRefReceiverFindOneUsageHisWorker(action) {
  try {
    const res = yield call(
      referralApi?.riderRefReceiverFindOneUsageHisApi,
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

/*************driver referrals ************/

export function* driverRefReceiverusageHistoryListWorker(action) {
  try {
    const res = yield call(
      referralApi?.driverRefReceiverUsageHistoryListApi,
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

export function* driverRefReceiverUsageHistoryWorker(action) {
  try {
    const res = yield call(
      referralApi?.driverRefReceiverUsageHistoryApi,
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

/*************rider referrals */

export function* WatchriderRefReceiverFindAllusageHisWorker() {
  yield takeLatest(
    REF_RECEIVER_USAGE_HISTORY_FIND_ALL,
    riderRefReceiverFindAllusageHisWorker
  );
}
export function* WatchriderRefReceiverFindOneUsageHisWorker() {
  yield takeLatest(
    REF_RECEIVER_USAGE_HISTORY_FIND_ONE,
    riderRefReceiverFindOneUsageHisWorker
  );
}

/*************driver referrals ************/

export function* WatchDriverRefReceiverUsageHistoryListWorker() {
  yield takeLatest(
    DRVIER_REF_RECEIVER_USAGE_HISTORY_LIST,
    driverRefReceiverusageHistoryListWorker
  );
}
export function* WatchDriverRefReceiverUsageHistoryWorker() {
  yield takeLatest(
    DRIVER_REF_RECEIVER_USAGE_HISTORY,
    driverRefReceiverUsageHistoryWorker
  );
}