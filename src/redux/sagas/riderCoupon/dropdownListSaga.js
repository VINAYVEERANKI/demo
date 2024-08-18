import { call, put, takeLatest } from "redux-saga/effects";
import * as riderCouponApi from "../../apis/riderCoupon/dropdownListApi";
import {
  COUPON_RIDETYPE_LIST,
  DROPDOWNLIST_RIDER_ACTIVE_COUPON,
  DROPDOWNLIST_RIDER_COUPON,
  DROPDOWNLIST_RIDER_DELETED_COUPON,
  DROPDOWNLIST_RIDER_EXPIRED_COUPON,
  DROPDOWNLIST_RIDER_REJECTED_COUPON,
  DROPDOWNLIST_RIDER_USAGE_COUPON,
} from "../../actions/types";

export function* dropDownListRiderCouponWorker(action) {
  try {
    const res = yield call(riderCouponApi.dropDownListRiderCouponApi, action);
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
export function* dropDownListRiderCouponActiveWorker(action) {
  try {
    const res = yield call(
      riderCouponApi.dropDownListRiderCouponActiveApi,
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
export function* dropDownListRiderCouponRejectedWorker(action) {
  try {
    const res = yield call(
      riderCouponApi.dropDownListRiderCouponRejectedApi,
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
export function* dropDownListRiderCouponDeletedWorker(action) {
  try {
    const res = yield call(
      riderCouponApi.dropDownListRiderCouponDeletedApi,
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
export function* dropDownListRiderCouponExpiredWorker(action) {
  try {
    const res = yield call(
      riderCouponApi.dropDownListRiderCouponExpiredApi,
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
export function* dropDownListRiderCouponUsageWorker(action) {
  try {
    const res = yield call(
      riderCouponApi.dropDownListRiderCouponUsageApi,
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
export function* couponRideTypeListWorker(action) {
  try {
    const res = yield call(riderCouponApi.couponRideTypeListApi, action?.data);
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

export function* watchdropDownListRiderCouponWorker() {
  yield takeLatest(DROPDOWNLIST_RIDER_COUPON, dropDownListRiderCouponWorker);
}
export function* watchdropDownListRiderCouponActiveWorker() {
  yield takeLatest(
    DROPDOWNLIST_RIDER_ACTIVE_COUPON,
    dropDownListRiderCouponActiveWorker
  );
}
export function* watchdropDownListRiderCouponRejectedWorker() {
  yield takeLatest(
    DROPDOWNLIST_RIDER_REJECTED_COUPON,
    dropDownListRiderCouponRejectedWorker
  );
}
export function* watchdropDownListRiderCouponDeletedWorker() {
  yield takeLatest(
    DROPDOWNLIST_RIDER_DELETED_COUPON,
    dropDownListRiderCouponDeletedWorker
  );
}
export function* watchdropDownListRiderCouponExpiredWorker() {
  yield takeLatest(
    DROPDOWNLIST_RIDER_EXPIRED_COUPON,
    dropDownListRiderCouponExpiredWorker
  );
}
export function* watchdropDownListRiderCouponUsageWorker() {
  yield takeLatest(
    DROPDOWNLIST_RIDER_USAGE_COUPON,
    dropDownListRiderCouponUsageWorker
  );
}
export function* watchcouponRideTypeListWorker() {
  yield takeLatest(
    COUPON_RIDETYPE_LIST,
    couponRideTypeListWorker
  );
}
