import { call, takeLatest } from "redux-saga/effects";
import {
  ADD_LOCAL_ZONES,
  DELETE_LOCAL_ZONES,
  LOCAL_ZONE_LIST,
  LOCAL_ZONE_VIEW,
  UPDATE_LOCAL_ZONES,
} from "../../actions/types";
import {
  addLocalZoneApi,
  deleteLocalZoneApi,
  localZoneListApi,
  localZoneViewApi,
  updateLocalZoneApi,
} from "../../apis/manageZonesApis/localZoneApi";
export function* localZonesListWorker(action) {
  try {
    const res = yield call(localZoneListApi,  action.id);
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

export function* addLocalZoneWorker(action) {
  try {
    const res = yield call(addLocalZoneApi, action.data);
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

export function* updateLocalZoneWorker(action) {
  try {
    const res = yield call(updateLocalZoneApi, action.data);
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
export function* LocalZoneViewWorker(action) {
  try {
    const res = yield call(localZoneViewApi, action.data);
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
export function* deleteLocalZoneWorker(action) {
  try {
    const res = yield call(deleteLocalZoneApi, action.data);
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

export function* watchlocalZonesListWorker() {
  yield takeLatest(LOCAL_ZONE_LIST, localZonesListWorker);
}

export function* watchaddLocalZoneWorker() {
  yield takeLatest(ADD_LOCAL_ZONES, addLocalZoneWorker);
}
export function* watchaupdateLocalZoneWorker() {
  yield takeLatest(UPDATE_LOCAL_ZONES, updateLocalZoneWorker);
}
export function* watchLocalZoneViewWorker() {
  yield takeLatest(LOCAL_ZONE_VIEW, LocalZoneViewWorker);
}
export function* watchdeleteLocalZoneWorker() {
  yield takeLatest(DELETE_LOCAL_ZONES, deleteLocalZoneWorker);
}
