import { call, takeLatest } from "redux-saga/effects";
import {
  CALL_COMPLAINT_DESCRIPTION,
  GENERATE_COMP_DRIVER,
  GENERATE_COMP_RIDER,
} from "../../actions/types";
import * as callComplaintsApi from "../../apis/complaints/callApi";

export function* generateComplaintRiderWorker(action) {
  try {
    const res = yield call(
      callComplaintsApi?.generateComplaintRiderApi,
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
export function* generateComplaintDriverWorker(action) {
  try {
    const res = yield call(
      callComplaintsApi?.generateComplaintDriverApi,
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
export function* callComplaintDescriptionWorker(action) {
  try {
    const res = yield call(
      callComplaintsApi?.callComplaintDescriptionApi,
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
export function* watchgenerateComplaintRiderWorker() {
  yield takeLatest(GENERATE_COMP_RIDER, generateComplaintRiderWorker);
}
export function* watchgenerateComplaintDriverWorker() {
  yield takeLatest(GENERATE_COMP_DRIVER, generateComplaintDriverWorker);
}
export function* watchcallComplaintDescriptionWorker() {
  yield takeLatest(CALL_COMPLAINT_DESCRIPTION, callComplaintDescriptionWorker);
}
