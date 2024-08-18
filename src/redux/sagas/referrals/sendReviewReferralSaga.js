import { call, takeLatest } from "redux-saga/effects";
import { SEND_REVIEW_DRIVER_REFERRAL, SEND_REVIEW_REFERRAL } from "../../actions/types";
import { sendReviewDriverReferralApi, sendReviewReferralApi } from "../../apis/referrals/riderReferralApis/sendReviewReferralApi";
export function* sendReviewReferralWorker(action) {
    try {
      console.log(action.data);
      const res = yield call(sendReviewReferralApi, action.data);
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
  export function* sendReviewDriverReferralWorker(action) {
    try {
      console.log(action.data);
      const res = yield call(sendReviewDriverReferralApi, action.data);
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

  export function* watchsendReviewReferralWorker() {
    yield takeLatest(SEND_REVIEW_REFERRAL, sendReviewReferralWorker);
  }

  export function* watchsendReviewDriverReferralWorker() {
    yield takeLatest(SEND_REVIEW_DRIVER_REFERRAL, sendReviewDriverReferralWorker);
  }