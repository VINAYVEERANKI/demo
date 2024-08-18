import { call, put, takeLatest } from "redux-saga/effects";
import {
  ACTIVE_COUPON_ALL_VIEW,
  COUPON_LOCAL_ZONE_LIST,
  COUPON_MAIN_ZONE_LIST,
  COUPON_OUTSTATION_ZONE_LIST,
  COUPON_SPECIAL_ZONE_LIST,
  CREATE_BOOKING_DESTINATION_ACTION,
  CREATE_BOOKING_DISTANCE_ACTION,
  CREATE_GENERAL_ACTION,
  CREATE_NEW_ACCOUNT_ACTION,
  CREATE_NEW_ACCOUNT_LIFE_SPAN,
  CREATE_OUTSTATION_PACKAGE_ACTION,
  CREATE_PAYMENT_METHOD_ACTION,
  CREATE_PICKUP_DROPOFF_ACTION,
  CREATE_RENTAL_PACKAGE_ACTION,
  DELETED_COUPON_ALL_VIEW,
  EXPIRED_COUPON_ALL_VIEW,
  PENDING_COUPON_ALL_VIEW,
  REJECTED_COUPON_ALL_VIEW,
} from "../../actions/types";
import {
  activeCouponAllViewApi,
  createBookingDestinationApi,
  createBookingDistanceApi,
  createGeneralApi,
  createNewAccountApi,
  createNewAccountLifeSpanApi,
  createOutstationPackageApi,
  createPaymentMethodApi,
  createPickupDropoffApi,
  createRentalPackageApi,
  deletedCouponAllViewApi,
  expiredCouponAllViewApi,
  localZoneListApi,
  mainZoneListApi,
  outstationZoneListApi,
  pendingCouponAllViewApi,
  rejectedCouponAllViewApi,
  specialZoneListApi,
} from "../../apis/riderCoupon/createCouponApi";
import {
  CREATE_RIDER_COUPON_FAILED,
  CREATE_RIDER_COUPON_LOADED,
  CREATE_RIDER_COUPON_LOADING,
} from "../../actions/returnTypes";

// zonelist
export function* couponMainZoneListApiWorker(action) {
  try {
    const res = yield call(mainZoneListApi);
    console.log(res,"COUPON_MAIN_ZONE_LIST");
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

export function* couponLocalZoneListWorker(action) {
  try {
    console.log(action.data);
    const res = yield call(localZoneListApi, action.data);
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

export function* couponSpecialZoneListWorker(action) {
  try {
    console.log(action.data);
    const res = yield call(specialZoneListApi, action.data);
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
export function* couponOustationZoneListWorker(action) {
  try {
    console.log(action.data);
    const res = yield call(outstationZoneListApi, action.data);
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

// zone list ends

// create

export function* createGeneralWorker(action) {
  try {
    yield put({ type: CREATE_RIDER_COUPON_LOADING });
    console.log(action.data);
    const res = yield call(createGeneralApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield put({
        type: CREATE_RIDER_COUPON_LOADED,
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
      type: CREATE_RIDER_COUPON_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* createNewAccountWorker(action) {
  try {
    yield put({ type: CREATE_RIDER_COUPON_LOADING });
    console.log(action.data);
    const res = yield call(createNewAccountApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield put({
        type: CREATE_RIDER_COUPON_LOADED,
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
      type: CREATE_RIDER_COUPON_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

export function* createNewAccountLifeSpanWorker(action) {
  try {
    yield put({ type: CREATE_RIDER_COUPON_LOADING });
    console.log(action.data);
    const res = yield call(createNewAccountLifeSpanApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield put({
        type: CREATE_RIDER_COUPON_LOADED,
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
      type: CREATE_RIDER_COUPON_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* createPaymentMethodWorker(action) {
  try {
    yield put({ type: CREATE_RIDER_COUPON_LOADING });
    const res = yield call(createPaymentMethodApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield put({
        type: CREATE_RIDER_COUPON_LOADED,
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
      type: CREATE_RIDER_COUPON_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* createBookingDestinationWorker(action) {
  try {
    yield put({ type: CREATE_RIDER_COUPON_LOADING });
    console.log(action.data);
    const res = yield call(createBookingDestinationApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield put({
        type: CREATE_RIDER_COUPON_LOADED,
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
      type: CREATE_RIDER_COUPON_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* createPickupDropoffWorker(action) {
  try {
    yield put({ type: CREATE_RIDER_COUPON_LOADING });
    const res = yield call(createPickupDropoffApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield put({
        type: CREATE_RIDER_COUPON_LOADED,
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
      type: CREATE_RIDER_COUPON_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* createRentalPackageWorker(action) {
  try {
    yield put({ type: CREATE_RIDER_COUPON_LOADING });
    console.log(action.data);
    const res = yield call(createRentalPackageApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield put({
        type: CREATE_RIDER_COUPON_LOADED,
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
      type: CREATE_RIDER_COUPON_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

export function* createBookingDistanceWorker(action) {
  try {
    yield put({ type: CREATE_RIDER_COUPON_LOADING });
    const res = yield call(createBookingDistanceApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield put({
        type: CREATE_RIDER_COUPON_LOADED,
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
      type: CREATE_RIDER_COUPON_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

export function* createOutstationPackageWorker(action) {
  try {
    yield put({ type: CREATE_RIDER_COUPON_LOADING });
    const res = yield call(createOutstationPackageApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield put({
        type: CREATE_RIDER_COUPON_LOADED,
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
      type: CREATE_RIDER_COUPON_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
// create ends

// view all

export function* pendingCouponAllViewWorker(action) {
  try {
    console.log(action.current_page);
    const res = yield call(
      pendingCouponAllViewApi,
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
export function* activeCouponAllViewWorker(action) {
  try {
    console.log(action.current_page);
    const res = yield call(
      activeCouponAllViewApi,
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
export function* rejectedCouponAllViewWorker(action) {
  try {
    console.log(action.current_page);
    const res = yield call(
      rejectedCouponAllViewApi,
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

export function* deletedCouponAllViewWorker(action) {
  try {
    console.log(action.current_page);
    const res = yield call(
      deletedCouponAllViewApi,
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

export function* expiredCouponAllViewWorker(action) {
  try {
    console.log(action.current_page);
    const res = yield call(
      expiredCouponAllViewApi,
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

// zonelist
export function* watchcouponMainZoneListApiWorker() {
  yield takeLatest(COUPON_MAIN_ZONE_LIST, couponMainZoneListApiWorker);
}
export function* watchcouponLocalZoneListWorkerWorker() {
  yield takeLatest(COUPON_LOCAL_ZONE_LIST, couponLocalZoneListWorker);
}
export function* watchcouponSpecialZoneListWorkerWorker() {
  yield takeLatest(COUPON_SPECIAL_ZONE_LIST, couponSpecialZoneListWorker);
}
export function* watchcouponOustationZoneListWorkerWorker() {
  yield takeLatest(COUPON_OUTSTATION_ZONE_LIST, couponOustationZoneListWorker);
}
// zonelist ends

// create
export function* watchcreateGeneralWorker() {
  yield takeLatest(CREATE_GENERAL_ACTION, createGeneralWorker);
}
export function* watchcreateNewAccountWorker() {
  yield takeLatest(CREATE_NEW_ACCOUNT_ACTION, createNewAccountWorker);
}
export function* watchcreateNewAccountLifeSpanWorker() {
  yield takeLatest(
    CREATE_NEW_ACCOUNT_LIFE_SPAN,
    createNewAccountLifeSpanWorker
  );
}
export function* watchcreatePaymentMethodWorker() {
  yield takeLatest(CREATE_PAYMENT_METHOD_ACTION, createPaymentMethodWorker);
}
export function* watchcreateBookingDestinationWorker() {
  yield takeLatest(
    CREATE_BOOKING_DESTINATION_ACTION,
    createBookingDestinationWorker
  );
}
export function* watchcreatePickupDropoffWorker() {
  yield takeLatest(CREATE_PICKUP_DROPOFF_ACTION, createPickupDropoffWorker);
}
export function* watchcreateRentalPackageWorker() {
  yield takeLatest(CREATE_RENTAL_PACKAGE_ACTION, createRentalPackageWorker);
}
export function* watchcreateBookingDistanceWorker() {
  yield takeLatest(CREATE_BOOKING_DISTANCE_ACTION, createBookingDistanceWorker);
}
export function* watchcreateOutstationPackageWorker() {
  yield takeLatest(
    CREATE_OUTSTATION_PACKAGE_ACTION,
    createOutstationPackageWorker
  );
}
// view
export function* watchpendingCouponAllViewWorker() {
  yield takeLatest(PENDING_COUPON_ALL_VIEW, pendingCouponAllViewWorker);
}
export function* watchactiveCouponAllViewWorker() {
  yield takeLatest(ACTIVE_COUPON_ALL_VIEW, activeCouponAllViewWorker);
}
export function* watchrejectedCouponAllViewWorker() {
  yield takeLatest(REJECTED_COUPON_ALL_VIEW, rejectedCouponAllViewWorker);
}
export function* watchdeletedCouponAllViewWorker() {
  yield takeLatest(DELETED_COUPON_ALL_VIEW, deletedCouponAllViewWorker);
}
export function* watchexpiredCouponAllViewWorker() {
  yield takeLatest(EXPIRED_COUPON_ALL_VIEW, expiredCouponAllViewWorker);
}
