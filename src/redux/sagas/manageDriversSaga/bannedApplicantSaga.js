import { call, takeLatest, put } from "redux-saga/effects";
import {
  BANNED_APPLICANT_DATA_FAILED,
  BANNED_APPLICANT_DATA_LOADED,
  BANNED_APPLICANT_DATA_LOADING,
} from "../../actions/returnTypes";
import {
  BANEED_APPLICANT_READ,
  BANNED_APPLICANT_VIEW,
  BANNED_APPLICATION_LIST,
} from "../../actions/types";
import * as bannedApplicationApi from "../../apis/bannedApplicantApi";

export function* bannedApplicationListWorker(action) {
  try {
    const res = yield call(
      bannedApplicationApi.bannedApplicationListApi,
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
export function* bannedApplicantViewWorker(action) {
  try {
    const res = yield call(
      bannedApplicationApi.bannedApplicantViewApi,
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
export function* bannedApplicantReadWorker(action) {
  try {
    yield put({ type: BANNED_APPLICANT_DATA_LOADING });
    const res = yield call(
      bannedApplicationApi.bannedApplicantReadApi,
      action.data
    );
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield put({ type: BANNED_APPLICANT_DATA_LOADED, data: res?.data });
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield put({
        type: BANNED_APPLICANT_DATA_FAILED,
        data: "Something Went Wrong! Please Try Again Later",
      });
    } else {
      yield put({
        type: BANNED_APPLICANT_DATA_FAILED,
        data: "Something Went Wrong! Please Try Again Later",
      });
      yield action.onError("Something Went Wrong!");
      console.log(res.data);
    }
  } catch (err) {
    yield put({
      type: BANNED_APPLICANT_DATA_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}

export function* watchbannedApplicationListWorker() {
  yield takeLatest(BANNED_APPLICATION_LIST, bannedApplicationListWorker);
}
export function* watchbannedApplicationViewWorker() {
  yield takeLatest(BANNED_APPLICANT_VIEW, bannedApplicantViewWorker);
}
export function* watchbannedApplicationReadWorker() {
  yield takeLatest(BANEED_APPLICANT_READ, bannedApplicantReadWorker);
}
