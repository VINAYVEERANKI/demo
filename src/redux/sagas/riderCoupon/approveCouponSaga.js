import { call, takeLatest } from "redux-saga/effects";
import { APPROVE_COUPON } from "../../actions/types";
import { approveCouponApi } from "../../apis/riderCoupon/approveCouponApi";

export function* approveCouponWorker(action) {
  try {
    const res = yield call(approveCouponApi, action.data);
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

export function* watchapproveCouponWorker() {
  yield takeLatest(APPROVE_COUPON, approveCouponWorker);
}
