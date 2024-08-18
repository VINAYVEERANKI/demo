import { call, takeLatest } from "redux-saga/effects";
import * as broadCastActiveApi from "../../apis/broadcast/activeBroadcastApi";
import {
  DRIVER_BROADCAST_ACTIVE_DRP_DWN,
  DRIVER_BROADCAST_ACTIVE_EDIT,
  DRIVER_BROADCAST_ACTIVE_FIND_ONE,
  DRIVER_BROADCAST_ACTIVE_LIST,
  RIDER_BROADCAST_ACTIVE_DRP_DWN,
  RIDER_BROADCAST_ACTIVE_EDIT,
  RIDER_BROADCAST_ACTIVE_FIND_ONE,
  RIDER_BROADCAST_ACTIVE_LIST,
} from "../../actions/types";

export function* riderBroadCastActiveListWorker(action) {
  try {
    const res = yield call(
      broadCastActiveApi?.riderBroadCastActiveListApi,
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

export function* activeRiderBroadCastFindOneWorker(action) {
  try {
    const res = yield call(
      broadCastActiveApi?.activeRiderBroadCastFindOneApi,
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
export function* activeRiderBroadCastEditWorker(action) {
  try {
    const res = yield call(
      broadCastActiveApi?.activeRiderBroadCastEditApi,
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
export function* driverBroadCastActiveListWorker(action) {
  try {
    const res = yield call(
      broadCastActiveApi?.driverBroadCastActiveListApi,
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

export function* activeDriverBroadCastFindOneWorker(action) {
  try {
    const res = yield call(
      broadCastActiveApi?.activeDriverBroadCastFindOneApi,
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
export function* activeDriverBroadCastEditWorker(action) {
  try {
    const res = yield call(
      broadCastActiveApi?.activeDriverBroadCastEditApi,
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

export function* rideBroadcastActiveDrpdwnWorker(action) {
  try {
    const res = yield call(broadCastActiveApi.rideBroadcastActiveDrpdwnApi);
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

export function* driBroadcastActiveDrpdwnWorker(action) {
  try {
    const res = yield call(broadCastActiveApi.driBroadcastActiveDrpdwnApi);
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

export function* watchriderBroadCastActiveListWorker() {
  yield takeLatest(RIDER_BROADCAST_ACTIVE_LIST, riderBroadCastActiveListWorker);
}
export function* watchactiveRiderBroadCastFindOneWorker() {
  yield takeLatest(
    RIDER_BROADCAST_ACTIVE_FIND_ONE,
    activeRiderBroadCastFindOneWorker
  );
}
export function* watchActiveRiderBroadCastEditWorker() {
  yield takeLatest(RIDER_BROADCAST_ACTIVE_EDIT, activeRiderBroadCastEditWorker);
}

export function* watchdriverBroadCastActiveListWorker() {
  yield takeLatest(
    DRIVER_BROADCAST_ACTIVE_LIST,
    driverBroadCastActiveListWorker
  );
}

export function* watchactivedriverBroadCastFindOneWorker() {
  yield takeLatest(
    DRIVER_BROADCAST_ACTIVE_FIND_ONE,
    activeDriverBroadCastFindOneWorker
  );
}
export function* watchActiveDriverBroadCastEditWorker() {
  yield takeLatest(DRIVER_BROADCAST_ACTIVE_EDIT, activeDriverBroadCastEditWorker);
}

export function* watchRideBroadcastActiveDrpdwnWorker() {
  yield takeLatest(RIDER_BROADCAST_ACTIVE_DRP_DWN, rideBroadcastActiveDrpdwnWorker);
}

export function* watchDriBroadcastActiveDrpdwnWorker() {
  yield takeLatest(DRIVER_BROADCAST_ACTIVE_DRP_DWN, driBroadcastActiveDrpdwnWorker);
}