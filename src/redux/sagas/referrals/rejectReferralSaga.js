import { call, takeLatest } from "redux-saga/effects";
import {
  DRIVER_REF_REJECTED_LIST,
  REJECTED_REFERRAL_ALL_VIEW,
  REJECTED_REFERRAL_FIND_ONE,
  REJECT_DRIVER_REF,
  REJECT_DRIVER_REF_FIND_ONE,
  REJECT_REFERRAL,
} from "../../actions/types";
import {
  rejectedReferralFindOneApi,
  rejectReferralApi,
} from "../../apis/referrals/rejectReferralApi";
import * as rejectedReferralApi from "../../apis/referrals/rejectReferralApi";

/*************rider referrals */

export function* rejectReferralWorker(action) {
  try {
    const res = yield call(rejectReferralApi, action.data);
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

export function* rejectedReferralAllViewWorker(action) {
  try {
    const res = yield call(
      rejectedReferralApi?.rejectedReferralAllViewApi,
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

export function* rejectedReferralFindOneWorker(action) {
  try {
    const res = yield call(rejectedReferralFindOneApi, action.data);
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

export function* rejectedDriverRefListWorker(action) {
  try {
    const res = yield call(
      rejectedReferralApi?.rejectedDriverRefListApi,
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
export function* rejectDriverRefWorker(action) {
  try {
    const res = yield call(
      rejectedReferralApi?.rejectDriverRefApi,
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

export function* rejectedDriverRefWorker(action) {
  try {
    const res = yield call(
      rejectedReferralApi?.rejectedDriverRefApi,
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

export function* watchrejectReferralWorker() {
  yield takeLatest(REJECT_REFERRAL, rejectReferralWorker);
}
export function* watchrejectedReferralAllViewWorker() {
  yield takeLatest(REJECTED_REFERRAL_ALL_VIEW, rejectedReferralAllViewWorker);
}

export function* watchrejectedReferralFindOneWorker() {
  yield takeLatest(REJECTED_REFERRAL_FIND_ONE, rejectedReferralFindOneWorker);
}

/*************driver referrals ************/
export function* watchrejectDriverRefWorker() {
  yield takeLatest(REJECT_DRIVER_REF, rejectDriverRefWorker);
}
export function* watchrejectedDriverRefListWorker() {
  yield takeLatest(DRIVER_REF_REJECTED_LIST, rejectedDriverRefListWorker);
}
export function* watchrejectedDriverRefWorker() {
  yield takeLatest(REJECT_DRIVER_REF_FIND_ONE, rejectedDriverRefWorker);
}
