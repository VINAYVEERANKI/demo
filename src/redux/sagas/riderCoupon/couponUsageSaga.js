import { call, takeLatest } from "redux-saga/effects";
import { COUPON_USAGE_HISTORY_ALL_VIEW, COUPON_USAGE_HISTORY_FIND_ONE } from "../../actions/types";
import { couponUsageHistoryAllViewApi, couponUsageHistoryFindOneApi } from "../../apis/riderCoupon/couponUsageApi";

export function* couponUsageHistoryAllViewWorker(action) {
  try {
    console.log(action.current_page);
    const res = yield call(
      couponUsageHistoryAllViewApi,
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
export function* couponUsageHistoryFindOneWorker(action) {
    try {
      console.log(action.current_page);
      const res = yield call(
        couponUsageHistoryFindOneApi,
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

export function* watchcouponUsageHistoryAllViewWorker() {
  yield takeLatest(
    COUPON_USAGE_HISTORY_ALL_VIEW,
    couponUsageHistoryAllViewWorker
  );
}
export function* watchcouponUsageHistoryFindOneWorker() {
    yield takeLatest(
        COUPON_USAGE_HISTORY_FIND_ONE,
      couponUsageHistoryFindOneWorker
    );
  }