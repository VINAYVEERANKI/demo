import { call, takeLatest } from "redux-saga/effects";
import {
  DELETED_INTRA_ZONES_DRP_DWN,
  DELETED_INTRA_ZONES_LIST,
  DELETE_LOCAL_INTRA_ZONE_PERMANENTLY,
  DELETE_OUTSTATION_INTRA_ZONE_PERMANENTLY,
  DELETE_SPECIAL_ZONE_INTRA_ZONE_PERMANENTLY,
  DELETE_TOLL_INTRA_ZONE_PERMANENTLY,
  RESTORE_LOCAL_INTRA_ZONES,
  RESTORE_OUTSTATION_INTRA_ZONES,
  RESTORE_SPECIAL_ZONE_INTRA_ZONES,
  RESTORE_TOLL_INTRA_ZONES,
} from "../../actions/types";
import {
  deleteLocalIntraZonePermanentlyApi,
  deleteOutstationIntraZonePermanentlyApi,
  deleteSpecialIntraZonePermanentlyApi,
  deleteTollIntraZonePermanentlyApi,
  deletedIntraZoneListApi,
  deletintrazoneDrpdwnApi,
  restoreLocalDeletedIntraZoneApi,
  restoreOutstationDeletedIntraZoneApi,
  restoreSpecialDeletedIntraZoneApi,
  restoreTollDeletedIntraZoneApi,
} from "../../apis/manageZonesApis/deletedIntraZoneApi";

export function* deletedIntraZoneListWorker(action) {
  try {
    const res = yield call(
      deletedIntraZoneListApi,
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

export function* restoreDeletedLocalIntraZoneWorker(action) {
  try {
    const res = yield call(restoreLocalDeletedIntraZoneApi, action.data);
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

export function* restoreDeletedOutstationIntraZoneWorker(action) {
  try {
    const res = yield call(restoreOutstationDeletedIntraZoneApi, action.data);
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

export function* restoreDeletedSpecialIntraZoneWorker(action) {
  try {
    const res = yield call(restoreSpecialDeletedIntraZoneApi, action.data);
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

export function* restoreDeletedTollIntraZoneWorker(action) {
  try {
    const res = yield call(restoreTollDeletedIntraZoneApi, action.data);
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

export function* deleteLocalIntraZonePermanentlyWorker(action) {
  try {
    const res = yield call(deleteLocalIntraZonePermanentlyApi, action.data);
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
export function* deleteOutstationIntraZonePermanentlyWorker(action) {
  try {
    const res = yield call(
      deleteOutstationIntraZonePermanentlyApi,
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

export function* deleteSpecialIntraZonePermanentlyWorker(action) {
  try {
    const res = yield call(deleteSpecialIntraZonePermanentlyApi, action.data);
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

export function* deleteTollIntraZonePermanentlyWorker(action) {
  try {
    const res = yield call(deleteTollIntraZonePermanentlyApi, action.data);
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

export function* deletintrazoneDrpdwnWorker(action) {
  // console.log(action, "aaaaaaaaaaaaaaaaaaaaaa");
  try {
    const res = yield call(deletintrazoneDrpdwnApi);
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

export function* watchdeletedIntraZoneListWorker() {
  yield takeLatest(DELETED_INTRA_ZONES_LIST, deletedIntraZoneListWorker);
}
export function* watchrestoreDeletedLocalIntraZoneWorker() {
  yield takeLatest(
    RESTORE_LOCAL_INTRA_ZONES,
    restoreDeletedLocalIntraZoneWorker
  );
}
export function* watchrestoreDeletedOutstationIntraZoneWorker() {
  yield takeLatest(
    RESTORE_OUTSTATION_INTRA_ZONES,
    restoreDeletedOutstationIntraZoneWorker
  );
}
export function* watchrestoreDeletedSpecialIntraZoneWorker() {
  yield takeLatest(
    RESTORE_SPECIAL_ZONE_INTRA_ZONES,
    restoreDeletedSpecialIntraZoneWorker
  );
}
export function* watchrestoreDeletedTollIntraZoneWorker() {
  yield takeLatest(RESTORE_TOLL_INTRA_ZONES, restoreDeletedTollIntraZoneWorker);
}
export function* watchdeleteLocalIntraZonePermanentlyWorker() {
  yield takeLatest(
    DELETE_LOCAL_INTRA_ZONE_PERMANENTLY,
    deleteLocalIntraZonePermanentlyWorker
  );
}
export function* watchdeleteOutstationintraZonePermanentlyWorker() {
  yield takeLatest(
    DELETE_OUTSTATION_INTRA_ZONE_PERMANENTLY,
    deleteOutstationIntraZonePermanentlyWorker
  );
}
export function* watchdeleteSpecialintraZonePermanentlyWorker() {
  yield takeLatest(
    DELETE_SPECIAL_ZONE_INTRA_ZONE_PERMANENTLY,
    deleteSpecialIntraZonePermanentlyWorker
  );
}
export function* watchdeleteTollintraZonePermanentlyWorker() {
  yield takeLatest(
    DELETE_TOLL_INTRA_ZONE_PERMANENTLY,
    deleteTollIntraZonePermanentlyWorker
  );
}
export function* watchDeleteintrazoneDrpdwnWorker() {
  yield takeLatest(DELETED_INTRA_ZONES_DRP_DWN, deletintrazoneDrpdwnWorker);
}