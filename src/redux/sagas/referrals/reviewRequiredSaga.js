import { call, takeLatest } from "redux-saga/effects";
import {
  DRIVER_REF_REVIEW_REQ_LIST,
  REVIEW_REQUIRED_REFERRAL_ALL_VIEW,
  REVIEW_REQUIRED_REFRRAL_FIND_ONE,
  REVIEW_REQ_DRIVER_REF_BROADCAST_EDIT,
  REVIEW_REQ_DRIVER_REF_D_TO_D_EDIT,
  REVIEW_REQ_DRIVER_REF_D_TO_R_EDIT,
  REVIEW_REQ_DRIVER_REF_FIND_ONE,
  REVIEW_REQ_REFERRAL_BROADCAST_EDIT,
  REVIEW_REQ_REFERRAL_EDIT,
} from "../../actions/types";
import {
  reviewReqReferralBroadcastEditApi,
  reviewReqReferralEditApi,
  reviewRequiredReferralAllViewApi,
  reviewRequiredReferralFindOneApi,
} from "../../apis/referrals/reviewRequiredApi";
import * as reviewReqRefApi from "../../apis/referrals/reviewRequiredApi";

/*************rider referrals */

export function* reviewRequiredReferralAllViewWorker(action) {
  try {
    console.log(action.current_page);
    const res = yield call(
      reviewRequiredReferralAllViewApi,
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

export function* reviewRequiredReferralFindOneWorker(action) {
  try {
    const res = yield call(reviewRequiredReferralFindOneApi, action.data);
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

export function* reviewReqReferralEditWorker(action) {
  try {
    const res = yield call(reviewReqReferralEditApi, action.data);
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

export function* reviewReqReferralBroadcastEditWorker(action) {
  try {
    const res = yield call(reviewReqReferralBroadcastEditApi, action.data);
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

export function* reviewReqDriverRefListWorker(action) {
  try {
    console.log(action.current_page);
    const res = yield call(
      reviewReqRefApi?.reviewReqDriverRefListApi,
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
export function* reviewReqDriverRefWorker(action) {
  try {
    const res = yield call(reviewReqRefApi?.reviewReqDriverRefApi, action.data);
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

export function* reviewDriverRefDToDEditWorker(action) {
  try {
    const res = yield call(
      reviewReqRefApi?.reviewDriverRefDToDEditApi,
      action.data
    );
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
export function* reviewDriverRefDToREditWorker(action) {
  try {
    const res = yield call(
      reviewReqRefApi?.reviewDriverRefEditDToRApi,
      action.data
    );
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

export function* reviewReqDriverRefBroadcastEditWorker(action) {
  try {
    const res = yield call(
      reviewReqRefApi?.reviewReqDriverRefBroadcastEditApi,
      action.data
    );
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

export function* watchreviewRequiredReferralAllViewWorker() {
  yield takeLatest(
    REVIEW_REQUIRED_REFERRAL_ALL_VIEW,
    reviewRequiredReferralAllViewWorker
  );
}

export function* watchreviewRequiredReferralFindOneWorker() {
  yield takeLatest(
    REVIEW_REQUIRED_REFRRAL_FIND_ONE,
    reviewRequiredReferralFindOneWorker
  );
}
export function* watchreviewReqReferralEditWorker() {
  yield takeLatest(REVIEW_REQ_REFERRAL_EDIT, reviewReqReferralEditWorker);
}
export function* watchreviewReqReferralBroadcastEditWorker() {
  yield takeLatest(
    REVIEW_REQ_REFERRAL_BROADCAST_EDIT,
    reviewReqReferralBroadcastEditWorker
  );
}

/*************driver referrals ************/

export function* watchReviewReqDriverRefListWorker() {
  yield takeLatest(DRIVER_REF_REVIEW_REQ_LIST, reviewReqDriverRefListWorker);
}

export function* watchreviewReqDriverRefWorker() {
  yield takeLatest(
    REVIEW_REQ_DRIVER_REF_FIND_ONE,
    reviewReqDriverRefWorker
  );
}
export function* watchreviewDriverRefD_To_DEditWorker() {
  yield takeLatest(REVIEW_REQ_DRIVER_REF_D_TO_D_EDIT, reviewDriverRefDToDEditWorker);
}
export function* watchreviewDriverRefD_To_REditWorker() {
  yield takeLatest(REVIEW_REQ_DRIVER_REF_D_TO_R_EDIT, reviewDriverRefDToREditWorker);
}
export function* watchreviewReqDriverRefBroadcastEditWorker() {
  yield takeLatest(
    REVIEW_REQ_DRIVER_REF_BROADCAST_EDIT,
    reviewReqDriverRefBroadcastEditWorker
  );
}