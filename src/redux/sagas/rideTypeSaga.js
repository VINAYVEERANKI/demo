import { call, takeLatest } from "redux-saga/effects";
import {
  ADD_RIDETYPE,
  EDIT_RIDETYPE,
  RIDETYPE_LIST,
  RIDETYPE_VIEW,
  RIDETYPE_ZONE_LIST,
  RIDETYPE_DROPDOWN_LIST,
} from "../actions/types";
import * as rideTypeApi from "../apis/rideTypeApi";

export function* addRideTypeWorker(action) {
  try {
    const res = yield call(rideTypeApi.addRideTypeApi, action.data);
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

export function* rideTypeZoneListWorker(action) {
  try {
    const res = yield call(rideTypeApi.rideTypeZoneListApi);
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

export function* rideTypeListWorker(action) {
  try {
    const res = yield call(
      rideTypeApi.rideTypeListApi,
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
export function* rideTypeViewWorker(action) {
  try {
    const res = yield call(rideTypeApi.rideTypeViewApi, action.data);
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res.data);
    } else {
      yield action.onError("Something Went Wrong!");
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}
export function* rideTypeUpdateWorker(action) {
  try {
    const res = yield call(
      rideTypeApi.editRideTypeApi,
      action.data
    );
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res.data);
    } else {
      yield action.onError("Something Went Wrong!");
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}

export function* rideTypeDropDownListWorker(action) {
  try {
    const res = yield call(rideTypeApi.rideTypeDropDownListApi);
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

export function* watchaddRideTypeWorker() {
  yield takeLatest(ADD_RIDETYPE, addRideTypeWorker);
}
export function* watchrideTypeZoneListWorker() {
  yield takeLatest(RIDETYPE_ZONE_LIST, rideTypeZoneListWorker);
}
export function* watchrideTypeListWorker() {
  yield takeLatest(RIDETYPE_LIST, rideTypeListWorker);
}
export function* watchrideTypeViewWorker() {
  yield takeLatest(RIDETYPE_VIEW, rideTypeViewWorker);
}
export function* watchrideTypeUpdateWorker() {
  yield takeLatest(EDIT_RIDETYPE, rideTypeUpdateWorker);
}
export function* watchrideTypeDropDownListWorker() {
  yield takeLatest(RIDETYPE_DROPDOWN_LIST, rideTypeDropDownListWorker);
}
