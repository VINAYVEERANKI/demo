import { call, takeLatest } from "redux-saga/effects";
import {
  ACTIVE_REFERRAL_ALL_VIEW,
  ACTIVE_REFERRAL_BROADCAST_EDIT,
  ACTIVE_REFERRAL_EDIT,
  ACTIVE_REFERRAL_FIND_ONE,
  APPROVE_DRIVER_REF,
  APPROVE_REFERRAL,
  DRIVER_ACTIVE_REF_BROADCAST_EDIT,
  DRIVER_ACTIVE_REF_EDIT,
  DRIVER_ACTIVE_REF_FIND_ONE,
  DRIVER_REF_ACTIVE_LIST,
} from "../../actions/types";
import * as activeRefApi from "../../apis/referrals/approveReferralApi";

/*************rider referrals */

export function* approveReferralWorker(action) {
  try {
    const res = yield call(activeRefApi?.approveReferralApi, action.data);
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

export function* activeReferralAllViewWorker(action) {
  try {
    const res = yield call(
      activeRefApi?.activeReferralAllViewApi,
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

export function* activeReferralFindOneWorker(action) {
  try {
    const res = yield call(activeRefApi?.activeReferralFindOneApi, action.data);
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

export function* activeReferralEditWorker(action) {
  try {
    const res = yield call(activeRefApi?.activeReferralEditApi, action.data);
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

export function* activeReferralBroadcastEditWorker(action) {
  try {
    const res = yield call(
      activeRefApi?.activeReferralBroadcastEditApi,
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

/*************driver referrals ************/

export function* activeDriverRefListWorker(action) {
  try {
    const res = yield call(
      activeRefApi?.activeDriverRefListApi,
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

export function* approveDriverRefWorker(action) {
  try {
    const res = yield call(activeRefApi?.approveDriverRefApi, action.data);
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

export function* activeDriverRefWorker(action) {
  try {
    const res = yield call(
      activeRefApi?.activeDriverRefFindOneApi,
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

export function* activeDriverRefEditWorker(action) {
  try {
    const res = yield call(activeRefApi?.activeDriverRefEditApi, action.data);
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

export function* activeDriverRefBroadcastEditWorker(action) {
  try {
    const res = yield call(
      activeRefApi?.activeDriverRefBroadcastEditApi,
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

/*************rider referrals */

export function* watchapproveReferralWorker() {
  yield takeLatest(APPROVE_REFERRAL, approveReferralWorker);
}
export function* watchactiveReferralAllViewWorker() {
  yield takeLatest(ACTIVE_REFERRAL_ALL_VIEW, activeReferralAllViewWorker);
}

export function* watchactiveReferralFindOneWorker() {
  yield takeLatest(ACTIVE_REFERRAL_FIND_ONE, activeReferralFindOneWorker);
}
export function* WatchactiveReferralEditWorker() {
  yield takeLatest(ACTIVE_REFERRAL_EDIT, activeReferralEditWorker);
}
export function* WatchactiveReferralBroadcastEditWorker() {
  yield takeLatest(
    ACTIVE_REFERRAL_BROADCAST_EDIT,
    activeReferralBroadcastEditWorker
  );
}

/*************driver referrals ************/

export function* watchactiveDriverRefListWorker() {
  yield takeLatest(DRIVER_REF_ACTIVE_LIST, activeDriverRefListWorker);
}

export function* watchapproveDriverRefWorker() {
  yield takeLatest(APPROVE_DRIVER_REF, approveDriverRefWorker);
}

export function* watchactiveDriverRefFindOneWorker() {
  yield takeLatest(DRIVER_ACTIVE_REF_FIND_ONE, activeDriverRefWorker);
}

export function* WatchactiveDriverRefEditWorker() {
  yield takeLatest(DRIVER_ACTIVE_REF_EDIT, activeDriverRefEditWorker);
}

export function* WatchactiveDriverRefBroadcastEditWorker() {
  yield takeLatest(
    DRIVER_ACTIVE_REF_BROADCAST_EDIT,
    activeDriverRefBroadcastEditWorker
  );
}
