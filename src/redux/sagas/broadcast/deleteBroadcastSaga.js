import { call, takeLatest } from "redux-saga/effects";
import * as broadCastDeleteApi from "../../apis/broadcast/deleteBroadcastApi";
import {
  DELETE_DRIVER_BROADCAST,
  DELETE_RIDER_BROADCAST,
  DRIVER_BROADCAST_DELETED_LIST,
  DRIVER_BROADCAST_DELETE_DRP_DWN,
  DRIVER_BROADCAST_DELETE_FIND_ONE,
  RIDER_BROADCAST_DELETED_LIST,
  RIDER_BROADCAST_DELETE_DRP_DWN,
  RIDER_BROADCAST_DELETE_FIND_ONE,
} from "../../actions/types";

export function* riderBroadCastDeleteListWorker(action) {
  try {
    const res = yield call(
      broadCastDeleteApi?.riderBroadCastDeleteListApi,
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
export function* riderBroadCastDeleteWorker(action) {
  try {
    const res = yield call(
      broadCastDeleteApi?.riderBroadCastDeleteApi,
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

export function* driverBroadCastDeleteListWorker(action) {
  try {
    const res = yield call(
      broadCastDeleteApi?.driverBroadCastDeleteListApi,
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
export function* deleteRiderBroadCastFindOneWorker(action) {
  try {
    const res = yield call(
      broadCastDeleteApi?.deleteRiderBroadCastFindOneApi,
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
export function* driverBroadCastDeleteWorker(action) {
  try {
    const res = yield call(
      broadCastDeleteApi?.driverBroadCastDeleteApi,
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
export function* deleteDriverBroadCastFindOneWorker(action) {
  try {
    const res = yield call(
      broadCastDeleteApi?.deletDriverBroadCastFindOneApi,
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

export function* rideBroadcastDeleteDrpdwnWorker(action) {
  try {
    const res = yield call(broadCastDeleteApi.rideBroadcastDeleteDrpdwnApi);
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

export function* driBroadcastDeleteDrpdwnWorker(action) {
  try {
    const res = yield call(broadCastDeleteApi.driBroadcastDeleteDrpdwnApi);
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

export function* watchriderBroadCastDeleteListWorker() {
  yield takeLatest(
    RIDER_BROADCAST_DELETED_LIST,
    riderBroadCastDeleteListWorker
  );
}
export function* watchriderBroadCastDeleteWorker() {
  yield takeLatest(DELETE_RIDER_BROADCAST, riderBroadCastDeleteWorker);
}
export function* watchriderBroadCastDeleteFindOneWorker() {
  yield takeLatest(
    RIDER_BROADCAST_DELETE_FIND_ONE,
    deleteRiderBroadCastFindOneWorker
  );
}
export function* watchdriverBroadCastDeleteListWorker() {
  yield takeLatest(
    DRIVER_BROADCAST_DELETED_LIST,
    driverBroadCastDeleteListWorker
  );
}
export function* watchdriverBroadCastDeleteWorker() {
  yield takeLatest(DELETE_DRIVER_BROADCAST, driverBroadCastDeleteWorker);
}
export function* watchdriverBroadCastDeleteFindOneWorker() {
  yield takeLatest(
    DRIVER_BROADCAST_DELETE_FIND_ONE,
    deleteDriverBroadCastFindOneWorker
  );
}

export function* watchRideBroadcastDeleteDrpdwnWorker() {
  yield takeLatest(RIDER_BROADCAST_DELETE_DRP_DWN, rideBroadcastDeleteDrpdwnWorker);
}

export function* watchDriBroadcastDeleteDrpdwnWorker() {
  yield takeLatest(DRIVER_BROADCAST_DELETE_DRP_DWN, driBroadcastDeleteDrpdwnWorker);
}