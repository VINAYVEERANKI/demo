import { call, takeLatest } from "redux-saga/effects";
import { ACTIVE_COUPON_SEND_REVIEW, SEND_REVIEW_ACTION } from "../../actions/types";
import { activeCouponSendReviewApi, sendReviewApi } from "../../apis/riderCoupon/sendReviewApi";

  export function* sendReviewWorker(action) {
    try {
      console.log(action.data);
      const res = yield call(sendReviewApi, action.data);
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


  export function* activeCouponSendReviewWorker(action) {
    try {
      console.log(action.data);
      const res = yield call(activeCouponSendReviewApi, action.data);
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

  export function* watchsendReviewWorker() {
    yield takeLatest(SEND_REVIEW_ACTION, sendReviewWorker);
  }

  export function* watchactiveCouponSendReviewWorker() {
    yield takeLatest(ACTIVE_COUPON_SEND_REVIEW, activeCouponSendReviewWorker);
  }