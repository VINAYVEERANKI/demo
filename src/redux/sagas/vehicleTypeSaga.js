import { call, takeLatest } from "redux-saga/effects";
import {
  ADD_VEHICLETYPE,
  RIDETYPE_DROPDOWN,
  VEHICLETYPE_EDIT,
  VEHICLETYPE_LIST,
  VEHICLETYPE_VIEW,
  VEHICLETYPE_DROPDOWN_LIST,
} from "../actions/types";
import * as vehicleTypeApi from "../apis/vehicleTypeApi";

export function* addVehicleTypeWorker(action) {
  try {
    const res = yield call(vehicleTypeApi.addVehicleTypeApi, action.data);
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

export function* rideTypeDropdownWorker(action) {
  try {
    const res = yield call(vehicleTypeApi.rideTypeDropdownApi);
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

export function* vehicleTypeListWorker(action) {
  try {
    const res = yield call(
      vehicleTypeApi.vehicleTypeListApi,
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
export function* vehicleTypeViewWorker(action) {
  try {
    const res = yield call(vehicleTypeApi.vehicleTypeViewApi, action.data);
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
export function* vehicleTypeUpdateWorker(action) {
  try {
    const res = yield call(
      vehicleTypeApi.vehicleTypeEditApi,
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

export function* vehicleTypeDropDownListWorker(action) {
  try {
    const res = yield call(vehicleTypeApi.vehicleTypeDropDownListApi);
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

export function* watchaddVehicleTypeWorker() {
  yield takeLatest(ADD_VEHICLETYPE, addVehicleTypeWorker);
}
export function* watchrideTypeDropdownWorker() {
  yield takeLatest(RIDETYPE_DROPDOWN, rideTypeDropdownWorker);
}
export function* watchvehicleTypeListWorker() {
  yield takeLatest(VEHICLETYPE_LIST, vehicleTypeListWorker);
}
export function* watchvehicleTypeViewWorker() {
  yield takeLatest(VEHICLETYPE_VIEW, vehicleTypeViewWorker);
}
export function* watchvehicleTypeUpdateWorker() {
  yield takeLatest(VEHICLETYPE_EDIT, vehicleTypeUpdateWorker);
}
export function* watchvehicleTypeDropDownListWorker() {
  yield takeLatest(VEHICLETYPE_DROPDOWN_LIST, vehicleTypeDropDownListWorker);
}