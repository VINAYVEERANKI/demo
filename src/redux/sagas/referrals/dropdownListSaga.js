import { call, put, takeLatest } from "redux-saga/effects";
import * as referralApi from "../../apis/referrals/dropdownListApi";
import {
  DROPDOWNLIST_RIDER_ACTIVE_REFERRAL,
  DROPDOWNLIST_RIDER_PENDING_REFERRAL,
  DROPDOWNLIST_RIDER_DELETED_REFERRAL,
  DROPDOWNLIST_RIDER_EXPIRED_REFERRAL,
  DROPDOWNLIST_RIDER_REJECTED_REFERRAL,
  DROPDOWNLIST_DRIVER_ACTIVE_REFERRAL,
  DROPDOWNLIST_DRIVER_PENDING_REFERRAL,
  DROPDOWNLIST_DRIVER_DELETED_REFERRAL,
  DROPDOWNLIST_DRIVER_EXPIRED_REFERRAL,
  DROPDOWNLIST_DRIVER_REJECTED_REFERRAL,
  DROPDOWNLIST_RIDER_USAGE_REFERRAL,
  DROPDOWNLIST_DRIVER_USAGE_REFERRAL,
  REFERRAL_RIDETYPE_LIST,
} from "../../actions/types";

// rider referral
export function* dropDownListRiderReferralWorker(action) {
  try {
    const res = yield call(referralApi.dropDownListRiderReferralApi, action);
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
export function* dropDownListRiderReferralActiveWorker(action) {
  try {
    const res = yield call(
      referralApi.dropDownListRiderReferralActiveApi,
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
export function* dropDownListRiderReferralRejectedWorker(action) {
  try {
    const res = yield call(
      referralApi.dropDownListRiderReferralRejectedApi,
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
export function* dropDownListRiderReferralDeletedWorker(action) {
  try {
    const res = yield call(
      referralApi.dropDownListRiderReferralDeletedApi,
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
export function* dropDownListRiderReferralExpiredWorker(action) {
  try {
    const res = yield call(
      referralApi.dropDownListRiderReferralExpiredApi,
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
export function* dropDownListRiderReferralUsageWorker(action) {
  try {
    const res = yield call(
      referralApi.dropDownListRiderReferralUsageApi,
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
// driver referral
export function* dropDownListDriverReferralWorker(action) {
  try {
    const res = yield call(referralApi.dropDownListDriverReferralApi, action);
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
export function* dropDownListDriverReferralActiveWorker(action) {
  try {
    const res = yield call(
      referralApi.dropDownListDriverReferralActiveApi,
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
export function* dropDownListDriverReferralRejectedWorker(action) {
  try {
    const res = yield call(
      referralApi.dropDownListDriverReferralRejectedApi,
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
export function* dropDownListDriverReferralDeletedWorker(action) {
  try {
    const res = yield call(
      referralApi.dropDownListDriverReferralDeletedApi,
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
export function* dropDownListDriverReferralExpiredWorker(action) {
  try {
    const res = yield call(
      referralApi.dropDownListDriverReferralExpiredApi,
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
export function* dropDownListDriverReferralUsageWorker(action) {
  try {
    const res = yield call(
      referralApi.dropDownListDriverReferralUsageApi,
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

export function* referralRideTypeListWorker(action) {
  try {
    const res = yield call(referralApi.referralRideTypeListApi, action?.data);
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

// rider referral
export function* watchdropDownListRiderReferralWorker() {
  yield takeLatest(
    DROPDOWNLIST_RIDER_PENDING_REFERRAL,
    dropDownListRiderReferralWorker
  );
}
export function* watchdropDownListRiderReferralActiveWorker() {
  yield takeLatest(
    DROPDOWNLIST_RIDER_ACTIVE_REFERRAL,
    dropDownListRiderReferralActiveWorker
  );
}
export function* watchdropDownListRiderReferralRejectedWorker() {
  yield takeLatest(
    DROPDOWNLIST_RIDER_REJECTED_REFERRAL,
    dropDownListRiderReferralRejectedWorker
  );
}
export function* watchdropDownListRiderReferralDeletedWorker() {
  yield takeLatest(
    DROPDOWNLIST_RIDER_DELETED_REFERRAL,
    dropDownListRiderReferralDeletedWorker
  );
}
export function* watchdropDownListRiderReferralExpiredWorker() {
  yield takeLatest(
    DROPDOWNLIST_RIDER_EXPIRED_REFERRAL,
    dropDownListRiderReferralExpiredWorker
  );
}
export function* watchdropDownListRiderReferralUsageWorker() {
  yield takeLatest(
    DROPDOWNLIST_RIDER_USAGE_REFERRAL,
    dropDownListRiderReferralUsageWorker
  );
}
// driver referral
export function* watchdropDownListDriverReferralWorker() {
  yield takeLatest(
    DROPDOWNLIST_DRIVER_PENDING_REFERRAL,
    dropDownListDriverReferralWorker
  );
}
export function* watchdropDownListDriverReferralActiveWorker() {
  yield takeLatest(
    DROPDOWNLIST_DRIVER_ACTIVE_REFERRAL,
    dropDownListDriverReferralActiveWorker
  );
}
export function* watchdropDownListDriverReferralRejectedWorker() {
  yield takeLatest(
    DROPDOWNLIST_DRIVER_REJECTED_REFERRAL,
    dropDownListDriverReferralRejectedWorker
  );
}
export function* watchdropDownListDriverReferralDeletedWorker() {
  yield takeLatest(
    DROPDOWNLIST_DRIVER_DELETED_REFERRAL,
    dropDownListDriverReferralDeletedWorker
  );
}
export function* watchdropDownListDriverReferralExpiredWorker() {
  yield takeLatest(
    DROPDOWNLIST_DRIVER_EXPIRED_REFERRAL,
    dropDownListDriverReferralExpiredWorker
  );
}
export function* watchdropDownListDriverReferralUsageWorker() {
  yield takeLatest(
    DROPDOWNLIST_DRIVER_USAGE_REFERRAL,
    dropDownListDriverReferralUsageWorker
  );
}
export function* watchreferralRideTypeListWorker() {
  yield takeLatest(REFERRAL_RIDETYPE_LIST, referralRideTypeListWorker);
}
