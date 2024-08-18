import { call, takeLatest } from "redux-saga/effects";
import * as broadcastApi from "../../apis/broadcast/pendandCreateBroadcastApi";
import {
  CREATE_DRIVER_BROADCAST,
  CREATE_RIDER_BROADCAST,
  DRIVER_BROADCAST_APPROVE,
  DRIVER_BROADCAST_PEND_LIST,
  DRIVER_BROADCAST_REJECT,
  DRIVER_BROADCAST_REV_REQ_DRP_DWN,
  EDIT_REV_REQ_DRIVER_BROADCAST,
  EDIT_REV_REQ_RIDER_BROADCAST,
  REV_REQ_DRIVER_BROADCAST,
  REV_REQ_RIDER_BROADCAST,
  REV_REQ_RIDER_BROADCAST_DRP_DWN,
  RIDER_BROADCAST_APPROVE,
  RIDER_BROADCAST_PEND_LIST,
  RIDER_BROADCAST_REJECT,
  RIDETYPE_BROADCAST_DROPDOWN,
} from "../../actions/types";

export function* riderBroadCastPendingListWorker(action) {
  try {
    const res = yield call(
      broadcastApi?.riderBroadCastPendingListApi,
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

export function* riderBroadCastCreateWorker(action) {
  try {
    const res = yield call(broadcastApi?.riderBroadCastCreateApi, action.data);
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

export function* reviewReqRiderBroadCastWorker(action) {
  try {
    const res = yield call(
      broadcastApi?.reviewReqRiderBroadCastApi,
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

export function* riderBroadCastApproveWorker(action) {
  try {
    const res = yield call(broadcastApi?.riderBroadCastApproveApi, action.data);
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

export function* riderBroadCastRejectWorker(action) {
  try {
    const res = yield call(broadcastApi?.riderBroadCastRejectApi, action.data);
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

export function* reviewReqRiderBroadCastEditWorker(action) {
  try {
    const res = yield call(
      broadcastApi?.reviewReqRiderBroadCastEditApi,
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

export function* driverBroadCastPendingListWorker(action) {
  try {
    const res = yield call(
      broadcastApi?.driverBroadCastPendingListApi,
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
export function* reviewReqDriverBroadCastWorker(action) {
  try {
    const res = yield call(
      broadcastApi?.reviewReqDriverBroadCastApi,
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
export function* driverBroadCastCreateWorker(action) {
  try {
    const res = yield call(broadcastApi?.driverBroadCastCreateApi, action.data);
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
export function* driverBroadCastApproveWorker(action) {
  try {
    const res = yield call(
      broadcastApi?.driverBroadCastApproveApi,
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

export function* driverBroadCastRejectWorker(action) {
  try {
    const res = yield call(broadcastApi?.driverBroadCastRejectApi, action.data);
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

export function* reviewReqDriverBroadCastEditWorker(action) {
  try {
    const res = yield call(
      broadcastApi?.reviewReqDriverBroadCastEditApi,
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

export function* rideTypeBroadcastDropdownWorker(action) {
  try {
    const res = yield call(broadcastApi.rideTypeBroadcastDropdownApi);
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

export function* rideBroadcastRevreqDrpdwnWorker(action) {
  try {
    const res = yield call(broadcastApi.rideBroadcastRevreqDrpdwnApi);
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

export function* driBroadcastRevreqDrpdwnWorker(action) {
  try {
    const res = yield call(broadcastApi.driBroadcastRevreqDrpdwnApi);
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

export function* watchriderBroadCastPendingListWorker() {
  yield takeLatest(RIDER_BROADCAST_PEND_LIST, riderBroadCastPendingListWorker);
}
export function* watchriderBroadCastCreateWorker() {
  yield takeLatest(CREATE_RIDER_BROADCAST, riderBroadCastCreateWorker);
}
export function* watchriderBroadCastApproveWorker() {
  yield takeLatest(RIDER_BROADCAST_APPROVE, riderBroadCastApproveWorker);
}
export function* watchriderBroadCastRejectWorker() {
  yield takeLatest(RIDER_BROADCAST_REJECT, riderBroadCastRejectWorker);
}
export function* watchreviewReqRiderBroadCastWorker() {
  yield takeLatest(REV_REQ_RIDER_BROADCAST, reviewReqRiderBroadCastWorker);
}
export function* watchreviewReqRiderBroadCastEditWorker() {
  yield takeLatest(
    EDIT_REV_REQ_RIDER_BROADCAST,
    reviewReqRiderBroadCastEditWorker
  );
}

export function* watchdriverBroadCastPendingListWorker() {
  yield takeLatest(
    DRIVER_BROADCAST_PEND_LIST,
    driverBroadCastPendingListWorker
  );
}
export function* watchreviewReqDriverBroadCastWorker() {
  yield takeLatest(REV_REQ_DRIVER_BROADCAST, reviewReqDriverBroadCastWorker);
}
export function* watchdriverBroadCastCreateWorker() {
  yield takeLatest(CREATE_DRIVER_BROADCAST, driverBroadCastCreateWorker);
}
export function* watchdriverBroadCastApproveWorker() {
  yield takeLatest(DRIVER_BROADCAST_APPROVE, driverBroadCastApproveWorker);
}
export function* watchdriverBroadCastRejectWorker() {
  yield takeLatest(DRIVER_BROADCAST_REJECT, driverBroadCastRejectWorker);
}
export function* watchreviewReqDriverBroadCastEditWorker() {
  yield takeLatest(
    EDIT_REV_REQ_DRIVER_BROADCAST,
    reviewReqDriverBroadCastEditWorker
  );
}
export function* watchrideTypeBroadcastDropdownWorker() {
  yield takeLatest(RIDETYPE_BROADCAST_DROPDOWN, rideTypeBroadcastDropdownWorker);
}

export function* watchRideBroadcastRevreqDrpdwnWorker() {
  yield takeLatest(REV_REQ_RIDER_BROADCAST_DRP_DWN, rideBroadcastRevreqDrpdwnWorker);
}

export function* watchDriBroadcastRevreqDrpdwnWorker() {
  yield takeLatest(DRIVER_BROADCAST_REV_REQ_DRP_DWN, driBroadcastRevreqDrpdwnWorker);
}