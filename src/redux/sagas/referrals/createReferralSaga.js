import { call, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_DRIVER_TO_DRIVER_REFERRAL,
  CREATE_DRIVER_TO_RIDER_REFERRAL,
  CREATE_REFERRAL,
} from "../../actions/types";
import {
  createDriverToDriverReferralApi,
  createDriverToRiderReferralApi,
  createReferralApi,
} from "../../apis/referrals/riderReferralApis/createRiderReferralApi";
import {
  CREATE_DRIVER_REFERRAL_FAILED,
  CREATE_DRIVER_REFERRAL_LOADED,
  CREATE_DRIVER_REFERRAL_LOADING,
  CREATE_RIDER_REFERRAL_FAILED,
  CREATE_RIDER_REFERRAL_LOADED,
  CREATE_RIDER_REFERRAL_LOADING,
} from "../../actions/returnTypes";
export function* createReferralWorker(action) {
  try {
    yield put({ type: CREATE_RIDER_REFERRAL_LOADING });
    console.log(action.data);
    const res = yield call(createReferralApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield put({
        type: CREATE_RIDER_REFERRAL_LOADED,
        data: res.data,
      });
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    yield put({
      type: CREATE_RIDER_REFERRAL_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

export function* createDriverToDriverReferralWorker(action) {
  try {
    yield put({ type: CREATE_DRIVER_REFERRAL_LOADING });
    console.log(action.data);
    const res = yield call(createDriverToDriverReferralApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield put({
        type: CREATE_DRIVER_REFERRAL_LOADED,
        data: res.data,
      });
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    yield put({
      type: CREATE_DRIVER_REFERRAL_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

export function* createDriverToRiderReferralWorker(action) {
  try {
    yield put({ type: CREATE_DRIVER_REFERRAL_LOADING });
    console.log(action.data);
    const res = yield call(createDriverToRiderReferralApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield put({
        type: CREATE_DRIVER_REFERRAL_LOADED,
        data: res.data,
      });
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    yield put({
      type: CREATE_DRIVER_REFERRAL_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

export function* watchcreateReferralWorker() {
  yield takeLatest(CREATE_REFERRAL, createReferralWorker);
}

export function* createDriverToDriverReferralWatcher() {
  yield takeLatest(
    CREATE_DRIVER_TO_DRIVER_REFERRAL,
    createDriverToDriverReferralWorker
  );
}
export function* createDriverToRiderReferralWatcher() {
  yield takeLatest(
    CREATE_DRIVER_TO_RIDER_REFERRAL,
    createDriverToRiderReferralWorker
  );
}
