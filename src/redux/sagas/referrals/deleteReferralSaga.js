import { call, takeLatest } from "redux-saga/effects";
import {
  DELETED_REFERRAL_ALL_VIEW,
  DELETED_REFERRAL_FIND_ONE,
  DELETE_DRIVER_REF,
  DELETE_DRIVER_REF_FIND_ONE,
  DELETE_REFERRAL,
  DRIVER_REF_DELETED_LIST,
} from "../../actions/types";
import * as deletedRefApi from "../../apis/referrals/deleteReferralApi";



/*************rider referrals */


export function* deleteReferralWorker(action) {
  try {
    const res = yield call(deletedRefApi?.deleteReferralApi, action.data);
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

export function* deletedReferralAllViewWorker(action) {
  try {
    const res = yield call(
      deletedRefApi?.deletedReferralAllViewApi,
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


export function* deletedReferralFindOneWorker(action) {
  try {
    const res = yield call(deletedRefApi?.deletedReferralFindOneApi, action.data);
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

export function* deleteDriverRefWorker(action) {
  try {
    const res = yield call(deletedRefApi?.deleteDriverRefApi, action.data);
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



export function* deletedDriverRefListWorker(action) {
  try {
    const res = yield call(
      deletedRefApi?.deletedDriverRefListApi,
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

export function* deletedDriverRefWorker(action) {
  try {
    const res = yield call(deletedRefApi?.deletedDriverRefApi, action.data);
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


export function* watchdeleteReferralWorker() {
  yield takeLatest(DELETE_REFERRAL, deleteReferralWorker);
}
export function* watchdeletedReferralAllViewWorker() {
  yield takeLatest(DELETED_REFERRAL_ALL_VIEW, deletedReferralAllViewWorker);
}

export function* watchdeletedReferralFindOneWorker() {
  yield takeLatest(DELETED_REFERRAL_FIND_ONE, deletedReferralFindOneWorker);
}


/*************driver referrals ************/

export function* watchdeleteDriverRefWorker() {
  yield takeLatest(DELETE_DRIVER_REF, deleteDriverRefWorker);
}

export function* watchdelDriverRefListWorker() {
  yield takeLatest(DRIVER_REF_DELETED_LIST, deletedDriverRefListWorker);
}
export function* watchdeletedDriverRefWorker() {
  yield takeLatest(DELETE_DRIVER_REF_FIND_ONE, deletedDriverRefWorker);
}
