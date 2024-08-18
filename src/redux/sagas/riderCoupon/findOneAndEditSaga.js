import { call, takeLatest, put } from "redux-saga/effects";
import {
  REVIEW_REQUIRED_COUPON_DATA_FAILED,
  REVIEW_REQUIRED_COUPON_DATA_LOADED,
  REVIEW_REQUIRED_COUPON_DATA_LOADING,
} from "../../actions/returnTypes";
import {
  ACTIVE_COUPON_EDIT,
  ACTIVE_COUPON_FIND_ONE,
  BOOKING_DESTINATION_COUPON_EDIT,
  BOOKING_DISTANCE_COUPON_EDIT,
  DELETED_COUPON_FIND_ONE,
  EXPIRED_COUPON_FIND_ONE,
  GENERAL_COUPON_EDIT,
  NEWACCOUNT_COUPON_EDIT,
  NEWACCOUNT_LIFE_SPAN_COUPON_EDIT,
  OUTSTATION_PACKAGE_COUPON_EDIT,
  PAYMENT_METHOD_COUPON_EDIT,
  PENDING_COUPON_FIND_ONE,
  PICKUP_DROPOFF_COUPON_EDIT,
  REJECTED_COUPON_FIND_ONE,
  RENTAL_PACKAGE_COUPON_EDIT,
} from "../../actions/types";
import {
  activeCouponEditApi,
  activeCouponFindOneApi,
  bookingDestinationCouponEditApi,
  bookingDistanceCouponEditApi,
  deletedCouponFindOneApi,
  expiredCouponFindOneApi,
  generalCouponEditApi,
  newAccountCouponEditApi,
  newAccountLifeSpanCouponEditApi,
  outStationPackageCouponEditApi,
  paymentMethodCouponEditApi,
  pendingCouponFindOneApi,
  pickUpDropOffCouponEditApi,
  rejectedCouponFindOneApi,
  rentalPackageCouponEditApi,
} from "../../apis/riderCoupon/findOneAndEditApi";

// find one
export function* pendingCouponFindOneWorker(action) {
  try {
    yield put({ type: REVIEW_REQUIRED_COUPON_DATA_LOADING });
    const res = yield call(pendingCouponFindOneApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield put({
        type: REVIEW_REQUIRED_COUPON_DATA_LOADED,
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
      type: REVIEW_REQUIRED_COUPON_DATA_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

export function* activeCouponFindOneWorker(action) {
  try {
    const res = yield call(activeCouponFindOneApi, action.data);
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
export function* rejectedCouponFindOneWorker(action) {
  try {
    const res = yield call(rejectedCouponFindOneApi, action.data);
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
export function* deletedCouponFindOneWorker(action) {
  try {
    const res = yield call(deletedCouponFindOneApi, action.data);
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
export function* expiredCouponFindOneWorker(action) {
  try {
    const res = yield call(expiredCouponFindOneApi, action.data);
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

// edit
export function* generalCouponEditWorker(action) {
  try {
    const res = yield call(generalCouponEditApi, action.data);
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
export function* newAccountCouponEditWorker(action) {
  try {
    const res = yield call(newAccountCouponEditApi, action.data);
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
export function* newAccountLifeSpanCouponEditWorker(action) {
  try {
    const res = yield call(newAccountLifeSpanCouponEditApi, action.data);
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

export function* paymentMethodCouponEditWorker(action) {
  try {
    const res = yield call(paymentMethodCouponEditApi, action.data);
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
export function* bookingDestinationCouponEditWorker(action) {
  try {
    const res = yield call(bookingDestinationCouponEditApi, action.data);
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
export function* pickUpDropOffCouponEditWorker(action) {
  try {
    const res = yield call(pickUpDropOffCouponEditApi, action.data);
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
export function* rentalPackageCouponEditWorker(action) {
  try {
    const res = yield call(rentalPackageCouponEditApi, action.data);
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
export function* bookingDistanceCouponEditWorker(action) {
  try {
    const res = yield call(bookingDistanceCouponEditApi, action.data);
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
export function* outStationPackageCouponEditWorker(action) {
  try {
    const res = yield call(outStationPackageCouponEditApi, action.data);
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

export function* activeCouponEditWorker(action) {
  try {
    const res = yield call(activeCouponEditApi, action.data);
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

// find one
export function* watchpendingCouponFindOneWorker() {
  yield takeLatest(PENDING_COUPON_FIND_ONE, pendingCouponFindOneWorker);
}
export function* watchactiveCouponFindOneWorker() {
  yield takeLatest(ACTIVE_COUPON_FIND_ONE, activeCouponFindOneWorker);
}
export function* watchrejectedCouponFindOneWorker() {
  yield takeLatest(REJECTED_COUPON_FIND_ONE, rejectedCouponFindOneWorker);
}
export function* watchdeletedCouponFindOneWorker() {
  yield takeLatest(DELETED_COUPON_FIND_ONE, deletedCouponFindOneWorker);
}
export function* watchexpiredCouponFindOneWorker() {
  yield takeLatest(EXPIRED_COUPON_FIND_ONE, expiredCouponFindOneWorker);
}


// edit
export function* watchgeneralCouponEditWorker() {
  yield takeLatest(GENERAL_COUPON_EDIT, generalCouponEditWorker);
}
export function* watchnewAccountCouponEditWorker() {
  yield takeLatest(NEWACCOUNT_COUPON_EDIT, newAccountCouponEditWorker);
}
export function* watchnewAccountLifeSpanCouponEditWorker() {
  yield takeLatest(NEWACCOUNT_LIFE_SPAN_COUPON_EDIT, newAccountLifeSpanCouponEditWorker);
}
export function* watchpaymentMethodCouponEditWorker() {
  yield takeLatest(PAYMENT_METHOD_COUPON_EDIT, paymentMethodCouponEditWorker);
}
export function* watchbookingDestinationCouponEditWorker() {
  yield takeLatest(
    BOOKING_DESTINATION_COUPON_EDIT,
    bookingDestinationCouponEditWorker
  );
}
export function* watchpickUpDropOffCouponEditWorker() {
  yield takeLatest(PICKUP_DROPOFF_COUPON_EDIT, pickUpDropOffCouponEditWorker);
}
export function* watchrentalPackageCouponEditWorker() {
  yield takeLatest(RENTAL_PACKAGE_COUPON_EDIT, rentalPackageCouponEditWorker);
}
export function* watchbookingDistanceCouponEditWorker() {
  yield takeLatest(
    BOOKING_DISTANCE_COUPON_EDIT,
    bookingDistanceCouponEditWorker
  );
}
export function* watchoutStationPackageCouponEditWorker() {
  yield takeLatest(
    OUTSTATION_PACKAGE_COUPON_EDIT,
    outStationPackageCouponEditWorker
  );
}
export function* watchactiveCouponEditWorker() {
  yield takeLatest(ACTIVE_COUPON_EDIT, activeCouponEditWorker);
}
