import { call, takeLatest } from "redux-saga/effects";
import {
  addBlockZoneApi,
  blockedzoneDrpdwnApi,
  blockZonesListApi,
  blockZoneViewApi,
  unBlockZoneApi,
  updateBlockZoneApi,
} from "../../apis/manageZonesApis/blockedZoneApi";
import {
  BLOCKED_ZONES_LIST,
  ADD_BLOCKED_ZONE,
  UNBLOCK_ZONE,
  BLOCKED_ZONE_VIEW,
  UPDATE_BLOCK_ZONE,
  BLOCKED_ZONES_DRP_DWN
} from "../../actions/types";

export function* BlockZonesListWorker(action) {
  try {
    const res = yield call(blockZonesListApi, action.current_page, action.data);
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

export function* addBlockZoneWorker(action) {
  try {
    const res = yield call(addBlockZoneApi, action.data);
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
export function* updateBlockZoneWorker(action) {
  try {
    const res = yield call(updateBlockZoneApi, action.data);
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
export function* BlockZoneViewWorker(action) {
  try {
    const res = yield call(blockZoneViewApi, action.data);
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
export function* unBlockZoneWorker(action) {
  try {
    const res = yield call(unBlockZoneApi, action.data);
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

export function* blockedzoneDrpdwnWorker(action) {
  try {
    const res = yield call(blockedzoneDrpdwnApi);
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

export function* watchBlockZonesListWorker() {
  yield takeLatest(BLOCKED_ZONES_LIST, BlockZonesListWorker);
}
export function* watchaddBlockZoneWorker() {
  yield takeLatest(ADD_BLOCKED_ZONE, addBlockZoneWorker);
}
export function* watchupdateBlockZoneWorker() {
  yield takeLatest(UPDATE_BLOCK_ZONE, updateBlockZoneWorker);
}
export function* watchBlockZoneViewWorker() {
  yield takeLatest(BLOCKED_ZONE_VIEW, BlockZoneViewWorker);
}
export function* watchunblockZoneWorker() {
  yield takeLatest(UNBLOCK_ZONE, unBlockZoneWorker);
}
export function* watchBlockedzoneDrpdwnWorker() {
  yield takeLatest(BLOCKED_ZONES_DRP_DWN, blockedzoneDrpdwnWorker);
}