import { call, takeLatest,  } from "redux-saga/effects";
import { SUCCESSFUL_REFUND_LIST, SUCCESSFUL_REFUND_VIEW, SUCES_REF_DRP_DWN } from "../actions/types";
import * as successfulRefundApi from "../apis/successfulRefundApi";

export function* sucessfulRefundListWorker(action) {
  try {
    const res = yield call(
      successfulRefundApi.sucessFulRefundListApi,
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

export function* sucessfulRefundViewWorker(action) {
  try {
    const res = yield call(successfulRefundApi.successFulRefundViewApi, action.data);
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res.data);
    } else {
      yield action.onError("Something Went Wrong!");
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}

export function* sucesRefDropDownListWorker(action) {
  try {
    const res = yield call(successfulRefundApi.sucesRefdropDownListApi);
    console.log(res, "dropdownList");
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

export function* watchsucessfulRefundListWorker() {
  yield takeLatest(SUCCESSFUL_REFUND_LIST, sucessfulRefundListWorker);
}
export function* watchsucessfulRefundViewWorker() {
  yield takeLatest(SUCCESSFUL_REFUND_VIEW, sucessfulRefundViewWorker);
}

export function* watchsucessRefundDropdownListWorker() {
  yield takeLatest(SUCES_REF_DRP_DWN, sucesRefDropDownListWorker);
}