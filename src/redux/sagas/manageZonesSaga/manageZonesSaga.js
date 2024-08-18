import { call, takeLatest } from "redux-saga/effects";
import {
  MANAGE_ZONES_LIST,
  ADD_MAIN_ZONE,
  MAIN_ZONE_VIEW,
  FIND_ALL_COORDINATES,
  EDIT_MAIN_ZONE,
  MANAGE_ZONES_DRP_DWN,
} from "../../actions/types";
import {
  addMainZoneApi,
  editMainZoneApi,
  findAllCoordinatesApi,
  mainZoneViewApi,
  manageZonesListApi,
  managezoneDrpdwnApi,
} from "../../apis/manageZonesApis/manageZonesApi";

export function* manageZonesListWorker(action) {
  try {
    const res = yield call(
      manageZonesListApi,
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
export function* addMainZoneWorker(action) {
  try {
    const res = yield call(addMainZoneApi, action.data);
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
export function* mainZoneViewWorker(action) {
  try {
    const res = yield call(mainZoneViewApi, action.data);
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
export function* findAllCoordinatesWorker(action) {
  try {
    const res = yield call(findAllCoordinatesApi);
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
export function* editMainZoneWorker(action) {
  try {
    const res = yield call(editMainZoneApi, action.data);
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

export function* managezoneDrpdwnWorker(action) {
  try {
    const res = yield call(managezoneDrpdwnApi);
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

export function* watchManageZonesListWorker() {
  yield takeLatest(MANAGE_ZONES_LIST, manageZonesListWorker);
}
export function* watchAddMainZoneWorker() {
  yield takeLatest(ADD_MAIN_ZONE, addMainZoneWorker);
}
export function* watchMainZoneViewWorker() {
  yield takeLatest(MAIN_ZONE_VIEW, mainZoneViewWorker);
}
export function* watchFindAllCoordinatesWorker() {
  yield takeLatest(FIND_ALL_COORDINATES, findAllCoordinatesWorker);
}
export function* watchEditMainZoneWorker() {
  yield takeLatest(EDIT_MAIN_ZONE, editMainZoneWorker);
}
export function* watchManagezoneDrpdwnWorker() {
  yield takeLatest(MANAGE_ZONES_DRP_DWN, managezoneDrpdwnWorker);
}