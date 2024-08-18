import { call, takeLatest,  } from "redux-saga/effects";
import { CANCELLED_REFUND_LIST, CANCELLED_REFUND_VIEW, CANCEL_REF_DRP_DWN } from "../actions/types";
import * as cancelledRefundApi from "../apis/cancelledRefundApi";

export function* cancelledRefundListWorker(action) {
  try {
    const res = yield call(
      cancelledRefundApi.cancelledRefundListApi,
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

export function* cancelledRefundViewWorker(action) {
  try {
    const res = yield call(
      cancelledRefundApi.cancelledRefundViewApi,
      action.data
    );
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

export function* cancelRefDropDownListWorker(action) {
  try {
    const res = yield call(cancelledRefundApi.cancelRefdropDownListApi);
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


export function* watchcancelledRefundListWorker() {
  yield takeLatest(CANCELLED_REFUND_LIST, cancelledRefundListWorker);
}
export function* watchcancelledRefundViewWorker() {
  yield takeLatest(CANCELLED_REFUND_VIEW, cancelledRefundViewWorker);
}
export function* watchCancelRefundDropdownListWorker() {
  yield takeLatest(CANCEL_REF_DRP_DWN, cancelRefDropDownListWorker);
}