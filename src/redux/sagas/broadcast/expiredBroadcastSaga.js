import { call, takeLatest } from "redux-saga/effects";
import * as broadCastExpiredApi from "../../apis/broadcast/expiredBroadcastApi";
import {
  DRIVER_BROADCAST_EXPIRED_FIND_ONE,
  DRIVER_BROADCAST_EXPIRED_LIST,
  DRIVER_BROADCAST_EXPIRE_DRP_DWN,
  RIDER_BROADCAST_EXPIRED_DRP_DWN,
  RIDER_BROADCAST_EXPIRED_FIND_ONE,
  RIDER_BROADCAST_EXPIRED_LIST,
} from "../../actions/types";

export function* riderBroadCastExpiredListWorker(action) {
  try {
    const res = yield call(
      broadCastExpiredApi?.riderBroadCastExpiredListApi,
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
export function* riderBroadCastExpiredFindOneWorker(action) {
  try {
    const res = yield call(
      broadCastExpiredApi?.RiderBroadCastExpiredFindOneApi,
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
export function* driverBroadCastExpiredListWorker(action) {
  try {
    const res = yield call(
      broadCastExpiredApi?.driverBroadCastExpiredListApi,
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
export function* driverBroadCastExpiredFindOneWorker(action) {
  try {
    const res = yield call(
      broadCastExpiredApi?.driverBroadCastExpiredFindOneApi,
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

export function* rideBroadcastExpiredDrpdwnWorker(action) {
  try {
    const res = yield call(broadCastExpiredApi.rideBroadcastExpiredDrpdwnApi);
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

export function* driBroadcastExpireDrpdwnWorker(action) {
  try {
    const res = yield call(broadCastExpiredApi.driBroadcastExpireDrpdwnApi);
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

export function* watchriderBroadCastExpiredListWorker() {
  yield takeLatest(
    RIDER_BROADCAST_EXPIRED_LIST,
    riderBroadCastExpiredListWorker
  );
}
export function* watchriderBroadCastExpiredFindOneWorker() {
  yield takeLatest(
    RIDER_BROADCAST_EXPIRED_FIND_ONE,
    riderBroadCastExpiredFindOneWorker
  );
}

export function* watchdriverBroadCastExpiredList() {
  yield takeLatest(
    DRIVER_BROADCAST_EXPIRED_LIST,
    driverBroadCastExpiredListWorker
  );
}
export function* watchdriverBroadCastExpiredFindOneWorker() {
  yield takeLatest(
    DRIVER_BROADCAST_EXPIRED_FIND_ONE,
    driverBroadCastExpiredFindOneWorker
  );
}

export function* watchRideBroadcastExpiredDrpdwnWorker() {
  yield takeLatest(RIDER_BROADCAST_EXPIRED_DRP_DWN, rideBroadcastExpiredDrpdwnWorker);
}

export function* watchDriBroadcastExpireDrpdwnWorker() {
  yield takeLatest(DRIVER_BROADCAST_EXPIRE_DRP_DWN, driBroadcastExpireDrpdwnWorker);
}