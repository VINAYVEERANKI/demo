import { call, takeLatest,  } from "redux-saga/effects";
import { PENDING_REFUND_LIST, PENDING_REFUND_VIEW, PENDING_REFUND_UPDATE, PEND_REF_DRP_DWN } from "../actions/types";
import * as pendingRefundApi from "../apis/pendingRefundApi";

export function* pendingRefundListWorker(action) {
  try {
    const res = yield call(
      pendingRefundApi.pendingRefundListApi,
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

export function* pendinfRefundViewWorker(action) {
  try {
    const res = yield call(pendingRefundApi.pendingRefundViewApi, action.data);
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

export function* pendinfRefundUpdateWorker(action) {
  try {
    const res = yield call(
      pendingRefundApi.pendingRefundUpdateApi,
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

export function* pendRefDropDownListWorker(action) {
  try {
    const res = yield call(pendingRefundApi.pendRefdropDownListApi);
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

export function* watchpendingRefundListWorker() {
  yield takeLatest(PENDING_REFUND_LIST, pendingRefundListWorker);
}
export function* watchpendinfRefundViewWorker() {
  yield takeLatest(PENDING_REFUND_VIEW, pendinfRefundViewWorker);
}
export function* watchpendinfRefundUpdateWorker() {
  yield takeLatest(PENDING_REFUND_UPDATE, pendinfRefundUpdateWorker);
}
export function* watchpendRefundDropdownListWorker() {
  yield takeLatest(PEND_REF_DRP_DWN, pendRefDropDownListWorker);
}