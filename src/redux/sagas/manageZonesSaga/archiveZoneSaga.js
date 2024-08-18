import { call, takeLatest } from "redux-saga/effects";
import {
  addArchiveZoneApi,
  archivezoneDrpdwnApi,
  archiveZonesListApi,
  archiveZoneViewApi,
  restoreArchiveZoneApi,
} from "../../apis/manageZonesApis/archiveZoneApi";
import {
  ARCHIVE_ZONES_LIST,
  ADD_ARCHIVE_ZONE,
  ARCHIVE_ZONE_VIEW,
  RESTORE_ARCHIVE_ZONE,
  ARCHIVE_ZONES_DRP_DWN,
} from "../../actions/types";

export function* archiveZonesListWorker(action) {
  try {
    const res = yield call(
      archiveZonesListApi,
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

export function* addArchiveZoneWorker(action) {
  try {
    const res = yield call(addArchiveZoneApi, action.data);
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
export function* archiveZoneViewWorker(action) {
  try {
    const res = yield call(archiveZoneViewApi, action.data);
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
export function* restoreArchiveZoneWorker(action) {
  try {
    const res = yield call(restoreArchiveZoneApi, action.data);
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

export function* archivezoneDrpdwnWorker(action) {
  try {
    const res = yield call(archivezoneDrpdwnApi);
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

export function* watcharchiveZonesListWorker() {
  yield takeLatest(ARCHIVE_ZONES_LIST, archiveZonesListWorker);
}
export function* watchaddArchiveZoneWorker() {
  yield takeLatest(ADD_ARCHIVE_ZONE, addArchiveZoneWorker);
}
export function* watcharchiveZoneViewWorker() {
  yield takeLatest(ARCHIVE_ZONE_VIEW, archiveZoneViewWorker);
}
export function* watchrestoreArchiveZoneWorker() {
  yield takeLatest(RESTORE_ARCHIVE_ZONE, restoreArchiveZoneWorker);
}
export function* watchArchivezoneDrpdwnWorker() {
  yield takeLatest(ARCHIVE_ZONES_DRP_DWN, archivezoneDrpdwnWorker);
}