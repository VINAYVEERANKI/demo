import { call, takeLatest } from "redux-saga/effects";
import {
  DRIVER_REF_EXPIRED_ID_LIST,
  EXPIRED_DRIVER_REF_ID,
  EXPIRED_REFERRAL_ALL_VIEW,
  EXPIRED_REFERRAL_FIND_ONE,
} from "../../actions/types";
import * as expiredRefApi from "../../apis/referrals/expiredReferralApi";


/*************rider referrals */

export function* expiredReferralAllViewWorker(action) {
  try {
   
    const res = yield call(
      expiredRefApi?.expiredReferralAllViewApi,
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


export function* expiredReferralFindOneWorker(action) {
  try {
    const res = yield call(expiredRefApi?.expiredReferralFindOneApi, action.data);
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

export function* expiredDriverRefIdListWorker(action) {
  try {

    const res = yield call(
      expiredRefApi?.expiredDriverRefIdListApi,
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
export function* expiredDriverRefIdWorker(action) {
  try {
    const res = yield call(expiredRefApi?.expiredDriverRefIdApi, action.data);
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
export function* watchexpiredReferralAllViewWorker() {
  yield takeLatest(EXPIRED_REFERRAL_ALL_VIEW, expiredReferralAllViewWorker);
}

export function* watchexpiredReferralFindOneWorker() {
  yield takeLatest(EXPIRED_REFERRAL_FIND_ONE, expiredReferralFindOneWorker);
}



/*************driver referrals ************/
export function* watchexpiredDriverRefIdListWorker() {
  yield takeLatest(DRIVER_REF_EXPIRED_ID_LIST, expiredDriverRefIdListWorker);
}
export function* watchexpiredDriverRefIdWorker() {
  yield takeLatest(EXPIRED_DRIVER_REF_ID, expiredDriverRefIdWorker);
}