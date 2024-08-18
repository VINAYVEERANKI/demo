import { call, takeLatest } from "redux-saga/effects";
import {  REJECT_COUPON } from "../../actions/types";
import { rejectCouponApi } from "../../apis/riderCoupon/rejectCouponApi";

export function* rejectCouponWorker(action) {
  try {
    const res = yield call(rejectCouponApi, action.data);
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

export function* watchrejectCouponWorker() {
  yield takeLatest(REJECT_COUPON, rejectCouponWorker);
}
