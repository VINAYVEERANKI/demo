import { call, takeLatest } from "redux-saga/effects";
import {
  ADD_TOLLS_ZONES,
  DELETE_TOLLS_ZONES,
  TOLLS_ZONE_LIST,
  TOLLS_ZONE_VIEW,
  UPDATE_TOLLS_ZONES,
} from "../../actions/types";
import {
  addTollsZoneApi,
  deleteTollsZoneApi,
  tollsZoneListApi,
  tollsZoneViewApi,
  updateTollsZoneApi,
} from "../../apis/manageZonesApis/tollsZoneApi";
export function* tollsZonesListWorker(action) {
  try {
    const res = yield call(tollsZoneListApi, action.data);
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

export function* addTollsZoneWorker(action) {
  try {
    const res = yield call(addTollsZoneApi, action.data);
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

export function* updateTollsZoneWorker(action) {
  try {
    const res = yield call(updateTollsZoneApi, action.data);
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
export function* TollsZoneViewWorker(action) {
  try {
    const res = yield call(tollsZoneViewApi, action.data);
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
export function* deleteTollsZoneWorker(action) {
  try {
    const res = yield call(deleteTollsZoneApi, action.data);
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

export function* watchtollsZonesListWorker() {
  yield takeLatest(TOLLS_ZONE_LIST, tollsZonesListWorker);
}

export function* watchaddTollsZoneWorker() {
  yield takeLatest(ADD_TOLLS_ZONES, addTollsZoneWorker);
}
export function* watchaupdateTollsZoneWorker() {
  yield takeLatest(UPDATE_TOLLS_ZONES, updateTollsZoneWorker);
}
export function* watchTollsZoneViewWorker() {
  yield takeLatest(TOLLS_ZONE_VIEW, TollsZoneViewWorker);
}
export function* watchdeleteTollsZoneWorker() {
  yield takeLatest(DELETE_TOLLS_ZONES, deleteTollsZoneWorker);
}
