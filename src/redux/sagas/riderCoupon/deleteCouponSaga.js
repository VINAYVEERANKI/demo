import { call, takeLatest } from "redux-saga/effects";
import { DELETE_COUPON } from "../../actions/types";
import { deleteCouponApi } from "../../apis/riderCoupon/deleteCouponApi";

export function* deleteCouponWorker(action) {
  try {
    const res = yield call(deleteCouponApi, action.data);
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

export function* watchdeleteCouponWorker() {
  yield takeLatest(DELETE_COUPON, deleteCouponWorker);
}
