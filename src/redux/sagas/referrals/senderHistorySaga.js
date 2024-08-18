import { call, takeLatest } from "redux-saga/effects";
import {
  DRIVER_REF_SENDER_USAGE_HISTORY,
  DRVIER_REF_SENDER_USAGE_HISTORY_LIST,
  REF_SENDER_USAGE_HISTORY_FIND_ALL,
  REF_SENDER_USAGE_HISTORY_FIND_ONE,
} from "../../actions/types";
import {
  riderRefSenderFindAllUsageHistoryApi,
  riderRefSenderFindOneUsageHistoryApi,
} from "../../apis/referrals/senderHistoryApi";
import * as referralApi from "../../apis/referrals/senderHistoryApi";

/*************rider referrals */

export function* riderRefSenderFindAllusageHistoryWorker(action) {
  try {
    const res = yield call(
      riderRefSenderFindAllUsageHistoryApi,
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
export function* riderRefSenderFindOneUsageHistoryWorker(action) {
  try {
    const res = yield call(
      riderRefSenderFindOneUsageHistoryApi,
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

export function* driverRefSenderusageHistoryListWorker(action) {
  try {
    const res = yield call(
      referralApi?.driverRefSenderUsageHistoryListApi,
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
export function* driverRefSenderUsageHistoryWorker(action) {
  try {
    const res = yield call(
      referralApi?.driverRefSenderUsageHistoryApi,
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

export function* WatchriderRefSenderFindAllusageHistoryWorker() {
  yield takeLatest(
    REF_SENDER_USAGE_HISTORY_FIND_ALL,
    riderRefSenderFindAllusageHistoryWorker
  );
}
export function* WatchriderRefSenderFindOneUsageHistoryWorker() {
  yield takeLatest(
    REF_SENDER_USAGE_HISTORY_FIND_ONE,
    riderRefSenderFindOneUsageHistoryWorker
  );
}
export function* WatchDriverRefSenderusageHistoryListWorker() {
  yield takeLatest(
    DRVIER_REF_SENDER_USAGE_HISTORY_LIST,
    driverRefSenderusageHistoryListWorker
  );
}
export function* WatchDriverRefSenderUsageHistoryWorker() {
  yield takeLatest(
    DRIVER_REF_SENDER_USAGE_HISTORY,
    driverRefSenderUsageHistoryWorker
  );
}
