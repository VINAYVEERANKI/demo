import { call, put, takeLatest } from "redux-saga/effects";
import {
  ACTIVE_DRIVER_COUPON,
  ACTIVE_DRIVER_COUPON_BROADCAST_EDIT,
  ACTIVE_DRIVER_COUPON_EDIT,
  ACTIVE_DRIVER_COUPON_LIST,
  APPROVE_DRIVER_COUPON,
  CREATE_DRIVER_COUPON,
  CREATE_DRIVER_COUPON_BROADCAST,
  DELETED_DRIVER_COUPON,
  DELETED_DRIVER_COUPON_LIST,
  DELETE_DRIVER_COUPON,
  DRIVER_COUPON_USAGE_HISTORY,
  DRIVER_COUPON_USAGE_HISTORY_LIST,
  DROPDOWNLIST_DRIVER_ACTIVE_COUPON,
  DROPDOWNLIST_DRIVER_DELETED_COUPON,
  DROPDOWNLIST_DRIVER_EXPIRED_COUPON,
  DROPDOWNLIST_DRIVER_PENDING_COUPON,
  DROPDOWNLIST_DRIVER_REJECTED_COUPON,
  DROPDOWNLIST_DRIVER_USAGE_COUPON,
  EXPIRED_DRIVER_COUPON,
  EXPIRED_DRIVER_COUPON_LIST,
  REJECTED_DRIVER_COUPON,
  REJECTED_DRIVER_COUPON_LIST,
  REJECT_DRIVER_COUPON,
  REVIEW_REQ_DRIVER_COUPON,
  REVIEW_REQ_DRIVER_COUPON_EDIT,
  REVIEW_REQ_DRIVER_COUPON_LIST,
} from "../actions/types";
import * as driverCouponApi from "../apis/driverCouponApi";
import {
  CREATE_DRIVER_COUPON_FAILED,
  CREATE_DRIVER_COUPON_LOADED,
  CREATE_DRIVER_COUPON_LOADING,
} from "../actions/returnTypes";

export function* createDriverCouponWorker(action) {
  try {
    yield put({ type: CREATE_DRIVER_COUPON_LOADING });
    const res = yield call(driverCouponApi?.createDriverCouponApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield put({
        type: CREATE_DRIVER_COUPON_LOADED,
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
      type: CREATE_DRIVER_COUPON_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* createDriverCouponBroadCastWorker(action) {
  try {
    const res = yield call(
      driverCouponApi?.createDriverCouponBroadcastApi,
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
export function* reviewReqDriverCouponListWorker(action) {
  try {
    const res = yield call(
      driverCouponApi.reviewReqDriverCouponListApi,
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
export function* reviewReqDriverCouponWorker(action) {
  try {
    const res = yield call(
      driverCouponApi?.reviewReqDriverCouponApi,
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
export function* reviewReqDriverCouponEditWorker(action) {
  try {
    const res = yield call(
      driverCouponApi?.reviewReqDriverCouponEditApi,
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
export function* approveDriverCouponWorker(action) {
  try {
    const res = yield call(
      driverCouponApi?.approveDriverCouponApi,
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
export function* rejectDriverCouponWorker(action) {
  try {
    const res = yield call(driverCouponApi?.rejectDriverCouponApi, action.data);
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
export function* activeDriverCouponListWorker(action) {
  try {
    const res = yield call(
      driverCouponApi.activeDriverCouponListApi,
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
export function* activeDriverCouponWorker(action) {
  try {
    const res = yield call(driverCouponApi?.activeDriverCouponApi, action.data);
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
export function* activeDriverCouponEditWorker(action) {
  try {
    const res = yield call(
      driverCouponApi?.activeDriverCouponEditApi,
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
export function* activeDriverCouponBroadcastEditWorker(action) {
  try {
    const res = yield call(
      driverCouponApi?.activeDriverCouponBroadcastEditApi,
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
export function* rejectedDriverCouponListWorker(action) {
  try {
    const res = yield call(
      driverCouponApi.rejectedDriverCouponListApi,
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
export function* rejectedDriverCouponWorker(action) {
  try {
    const res = yield call(
      driverCouponApi?.rejectedDriverCouponApi,
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
export function* deletedDriverCouponListWorker(action) {
  try {
    const res = yield call(
      driverCouponApi.deletedDriverCouponListApi,
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
export function* deletedDriverCouponWorker(action) {
  try {
    const res = yield call(
      driverCouponApi?.deletedDriverCouponApi,
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
export function* deleteDriverCouponWorker(action) {
  try {
    const res = yield call(driverCouponApi?.deleteDriverCouponApi, action.data);
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
export function* expiredDriverCouponListWorker(action) {
  try {
    const res = yield call(
      driverCouponApi.expiredDriverCouponListApi,
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
export function* expiredDriverCouponWorker(action) {
  try {
    const res = yield call(
      driverCouponApi?.expiredDriverCouponApi,
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
export function* usageHistoryDriverCouponListWorker(action) {
  try {
    const res = yield call(
      driverCouponApi.usageHistoryDriverCouponListApi,
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
export function* usageHistoryDriverCouponWorker(action) {
  try {
    const res = yield call(
      driverCouponApi.usageHistoryDriverCouponApi,
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
export function* dropDownListDriverCouponWorker(action) {
  try {
    const res = yield call(driverCouponApi.dropDownListDriverCouponApi, action);
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
export function* dropDownListDriverCouponActiveWorker(action) {
  try {
    const res = yield call(
      driverCouponApi.dropDownListDriverCouponActiveApi,
      action
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
export function* dropDownListDriverCouponRejectedWorker(action) {
  try {
    const res = yield call(
      driverCouponApi.dropDownListDriverCouponRejectedApi,
      action
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
export function* dropDownListDriverCouponDeletedWorker(action) {
  try {
    const res = yield call(
      driverCouponApi.dropDownListDriverCouponDeletedApi,
      action
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
export function* dropDownListDriverCouponExpiredWorker(action) {
  try {
    const res = yield call(
      driverCouponApi.dropDownListDriverCouponExpiredApi,
      action
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
export function* dropDownListDriverCouponUsageWorker(action) {
  try {
    const res = yield call(
      driverCouponApi.dropDownListDriverCouponUsageApi,
      action
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

export function* watchcreateDriverCouponWorker() {
  yield takeLatest(CREATE_DRIVER_COUPON, createDriverCouponWorker);
}
export function* watchcreateDriverCouponBroadcastWorker() {
  yield takeLatest(
    CREATE_DRIVER_COUPON_BROADCAST,
    createDriverCouponBroadCastWorker
  );
}
export function* watchreviewReqDriverCouponWorker() {
  yield takeLatest(REVIEW_REQ_DRIVER_COUPON, reviewReqDriverCouponWorker);
}
export function* watchreviewReqDriverCouponEditWorker() {
  yield takeLatest(
    REVIEW_REQ_DRIVER_COUPON_EDIT,
    reviewReqDriverCouponEditWorker
  );
}
export function* watchapproveDriverCouponWorker() {
  yield takeLatest(APPROVE_DRIVER_COUPON, approveDriverCouponWorker);
}
export function* watchrejectDriverCouponWorker() {
  yield takeLatest(REJECT_DRIVER_COUPON, rejectDriverCouponWorker);
}
export function* watchreviewReqDriverCouponListWorker() {
  yield takeLatest(
    REVIEW_REQ_DRIVER_COUPON_LIST,
    reviewReqDriverCouponListWorker
  );
}
export function* watchactiveDriverCouponListWorker() {
  yield takeLatest(ACTIVE_DRIVER_COUPON_LIST, activeDriverCouponListWorker);
}
export function* watchactiveDriverCouponWorker() {
  yield takeLatest(ACTIVE_DRIVER_COUPON, activeDriverCouponWorker);
}
export function* watchactiveDriverCouponEditWorker() {
  yield takeLatest(ACTIVE_DRIVER_COUPON_EDIT, activeDriverCouponEditWorker);
}
export function* watchactiveDriverCouponBroadcastEditWorker() {
  yield takeLatest(
    ACTIVE_DRIVER_COUPON_BROADCAST_EDIT,
    activeDriverCouponBroadcastEditWorker
  );
}
export function* watchrejectedDriverCouponListWorker() {
  yield takeLatest(REJECTED_DRIVER_COUPON_LIST, rejectedDriverCouponListWorker);
}
export function* watchrejectedDriverCouponWorker() {
  yield takeLatest(REJECTED_DRIVER_COUPON, rejectedDriverCouponWorker);
}
export function* watchdeletedDriverCouponListWorker() {
  yield takeLatest(DELETED_DRIVER_COUPON_LIST, deletedDriverCouponListWorker);
}

export function* watchdeletedDriverCouponWorker() {
  yield takeLatest(DELETED_DRIVER_COUPON, deletedDriverCouponWorker);
}
export function* watchdeleteDriverCouponWorker() {
  yield takeLatest(DELETE_DRIVER_COUPON, deleteDriverCouponWorker);
}
export function* watchexpiredDriverCouponListWorker() {
  yield takeLatest(EXPIRED_DRIVER_COUPON_LIST, expiredDriverCouponListWorker);
}
export function* watchexpiredDriverCouponWorker() {
  yield takeLatest(EXPIRED_DRIVER_COUPON, expiredDriverCouponWorker);
}
export function* watchusageHistoryDriverCouponListWorker() {
  yield takeLatest(
    DRIVER_COUPON_USAGE_HISTORY_LIST,
    usageHistoryDriverCouponListWorker
  );
}
export function* watchusageHistoryDriverCouponWorker() {
  yield takeLatest(DRIVER_COUPON_USAGE_HISTORY, usageHistoryDriverCouponWorker);
}
export function* watchdropDownListDriverCouponWorker() {
  yield takeLatest(
    DROPDOWNLIST_DRIVER_PENDING_COUPON,
    dropDownListDriverCouponWorker
  );
}

export function* watchdropDownListDriverCouponActiveWorker() {
  yield takeLatest(
    DROPDOWNLIST_DRIVER_ACTIVE_COUPON,
    dropDownListDriverCouponActiveWorker
  );
}
export function* watchdropDownListDriverCouponRejectedWorker() {
  yield takeLatest(
    DROPDOWNLIST_DRIVER_REJECTED_COUPON,
    dropDownListDriverCouponRejectedWorker
  );
}
export function* watchdropDownListDriverCouponDeletedWorker() {
  yield takeLatest(
    DROPDOWNLIST_DRIVER_DELETED_COUPON,
    dropDownListDriverCouponDeletedWorker
  );
}
export function* watchdropDownListDriverCouponExpiredWorker() {
  yield takeLatest(
    DROPDOWNLIST_DRIVER_EXPIRED_COUPON,
    dropDownListDriverCouponExpiredWorker
  );
}
export function* watchdropDownListDriverCouponUsageWorker() {
  yield takeLatest(
    DROPDOWNLIST_DRIVER_USAGE_COUPON,
    dropDownListDriverCouponUsageWorker
  );
}
