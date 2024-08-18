import { call, takeLatest } from "redux-saga/effects";
import {
  CLEAR_DRIVER_REFERRAL,
  CLEAR_RIDER_REFERRAL,
} from "../../actions/types";
import {
  clearDriverReferralApi,
  clearRiderReferralApi,
} from "../../apis/referrals/clearReferralApi";

export function* clearRiderReferralWorker(action) {
  try {
    const res = yield call(clearRiderReferralApi, action.data);
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
export function* clearDriverReferralWorker(action) {
  try {
    const res = yield call(clearDriverReferralApi, action.data);
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
export function* WatchclearRiderReferralWorker() {
  yield takeLatest(CLEAR_RIDER_REFERRAL, clearRiderReferralWorker);
}
export function* WatchclearDriverReferralWorker() {
  yield takeLatest(CLEAR_DRIVER_REFERRAL, clearDriverReferralWorker);
}
