import { call, takeLatest, put } from "redux-saga/effects";
import {
  manageDriverMainZoneListApi,
  manageDriverRideTypeListApi,
  manageDriverVehicleTypeListApi,
} from "../../apis/manageDriversApi";
import {
  MANAGE_DRIVER_MAIN_ZONE_LIST,
  MANAGE_DRIVER_RIDETYPE_LIST,
  MANAGE_DRIVER_VEHICLETYPE_LIST,
} from "../../actions/types";

export function* manageDriverMainZoneListWorker(action) {
  try {
    const res = yield call(manageDriverMainZoneListApi, action?.data);
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
export function* manageDriverRideTypeListWorker(action) {
  try {
    const res = yield call(manageDriverRideTypeListApi, action?.id);
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

export function* manageDriverVehicleTypeListWorker(action) {
  try {
    const res = yield call(manageDriverVehicleTypeListApi, action?.id);
    console.log(res, "response");
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      // yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* watchManageDriverMainZoneListWorker() {
  yield takeLatest(
    MANAGE_DRIVER_MAIN_ZONE_LIST,
    manageDriverMainZoneListWorker
  );
}
export function* watchManageDriverRideTypeListWorker() {
  yield takeLatest(MANAGE_DRIVER_RIDETYPE_LIST, manageDriverRideTypeListWorker);
}
export function* watchManageDriverVehicleTypeListWorker() {
  yield takeLatest(
    MANAGE_DRIVER_VEHICLETYPE_LIST,
    manageDriverVehicleTypeListWorker
  );
}
