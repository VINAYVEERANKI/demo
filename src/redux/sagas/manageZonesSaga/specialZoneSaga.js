import { call, takeLatest } from "redux-saga/effects";
import {
  ADD_SPECIAL_ZONES,
  DELETE_SPECIAL_ZONES,
  SPECIAL_ZONE_LIST,
  SPECIAL_ZONE_VIEW,
  UPDATE_SPECIAL_ZONES,
} from "../../actions/types";
import {
  addSpecialZoneApi,
  deleteSpecialZoneApi,
  specialZoneListApi,
  specialZoneViewApi,
  updateSpecialZoneApi,
} from "../../apis/manageZonesApis/specialZoneApi";

export function* specialZonesListWorker(action) {
  try {
    const res = yield call(specialZoneListApi, action.data);
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

export function* addSpecialZoneWorker(action) {
  try {
    const res = yield call(addSpecialZoneApi, action.data);
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

export function* updateSpecialZoneWorker(action) {
  try {
    const res = yield call(updateSpecialZoneApi, action.data);
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
export function* SpecialZoneViewWorker(action) {
  try {
    const res = yield call(specialZoneViewApi, action.data);
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
export function* deleteSpecialZoneWorker(action) {
  try {
    const res = yield call(deleteSpecialZoneApi, action.data);
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

export function* watchspecialZonesListWorker() {
  yield takeLatest(SPECIAL_ZONE_LIST, specialZonesListWorker);
}

export function* watchaddSpecialZoneWorker() {
  yield takeLatest(ADD_SPECIAL_ZONES, addSpecialZoneWorker);
}
export function* watchaupdateSpecialZoneWorker() {
  yield takeLatest(UPDATE_SPECIAL_ZONES, updateSpecialZoneWorker);
}
export function* watchSpecialZoneViewWorker() {
  yield takeLatest(SPECIAL_ZONE_VIEW, SpecialZoneViewWorker);
}
export function* watchdeleteSpecialZoneWorker() {
  yield takeLatest(DELETE_SPECIAL_ZONES, deleteSpecialZoneWorker);
}
