import { call, takeLatest } from "redux-saga/effects";
import { CLEAR_DRIVER_COUPON, CLEAR_RIDER_COUPON } from "../../actions/types";
import {
  clearDriverCouponApi,
  clearRiderCouponApi,
} from "../../apis/riderCoupon/clearCouponApi";

export function* clearRiderCouponWorker(action) {
  try {
    const res = yield call(clearRiderCouponApi, action.data);
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
export function* clearDriverCouponWorker(action) {
  try {
    const res = yield call(clearDriverCouponApi, action.data);
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
export function* WatchclearRiderCouponWorker() {
  yield takeLatest(CLEAR_RIDER_COUPON, clearRiderCouponWorker);
}
export function* WatchclearDriverCouponWorker() {
  yield takeLatest(CLEAR_DRIVER_COUPON, clearDriverCouponWorker);
}
