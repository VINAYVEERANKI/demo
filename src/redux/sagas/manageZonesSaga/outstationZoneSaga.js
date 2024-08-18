import { call, takeLatest } from "redux-saga/effects";
import {
  ADD_OUTSTATION_ZONES,
  DELETE_OUTSTATION_ZONES,
  OUTSTATION_ZONE_LIST,
  OUTSTATION_ZONE_VIEW,
  UPDATE_OUTSTATION_ZONES,
} from "../../actions/types";
import {
  addOutstationZoneApi,
  deleteOutstationZoneApi,
  outstationZoneListApi,
  outstationZoneViewApi,
  updateOutstationZoneApi,
} from "../../apis/manageZonesApis/outstationZoneApi";

export function* outstationZonesListWorker(action) {
  try {
    const res = yield call(
      outstationZoneListApi,
      action.id
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

export function* addOutstationZoneWorker(action) {
  try {
    const res = yield call(addOutstationZoneApi, action.data);
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

export function* updateOutstationZoneWorker(action) {
  try {
    const res = yield call(updateOutstationZoneApi, action.data);
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
export function* OutstationZoneViewWorker(action) {
  try {
    const res = yield call(outstationZoneViewApi, action.data);
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
export function* deleteOutstationZoneWorker(action) {
  try {
    const res = yield call(deleteOutstationZoneApi, action.data);
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

export function* watchoutstationZonesListWorker() {
  yield takeLatest(OUTSTATION_ZONE_LIST, outstationZonesListWorker);
}

export function* watchaddOutstationZoneWorker() {
  yield takeLatest(ADD_OUTSTATION_ZONES, addOutstationZoneWorker);
}
export function* watchaupdateOutstationZoneWorker() {
  yield takeLatest(UPDATE_OUTSTATION_ZONES, updateOutstationZoneWorker);
}
export function* watchOutstationZoneViewWorker() {
  yield takeLatest(OUTSTATION_ZONE_VIEW, OutstationZoneViewWorker);
}
export function* watchdeleteOutstationZoneWorker() {
  yield takeLatest(DELETE_OUTSTATION_ZONES, deleteOutstationZoneWorker);
}
