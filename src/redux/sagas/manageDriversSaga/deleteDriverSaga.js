import { call, takeLatest, put } from "redux-saga/effects";
import {
  DELETED_DRIVER_DATA_LOADED,
  DELETED_DRIVER_DATA_LOADING,
  DELETE_DRIVER_DATA_FAILED,
  PERM_DELETED_DATA_FAILED,
  PERM_DELETED_DATA_LOADED,
  PERM_DELETED_DATA_LOADING,
} from "../../actions/returnTypes";
import {
  DELETED_DRIVER_LIST,
  DELETED_DRIVER_PROFILE_READ,
  DELETED_DRIVER_VIEW,
  DELETE_ACCOUNT_PERMANENTLTY,
  PERMANENT_DELETED_DRIVER_LIST,
  PERMANENT_DELETED_DRIVER_READ,
  PERMANENT_DELETED_DRIVER_VIEW,
  RESTORE_DRIVER,
} from "../../actions/types";
import * as deletedDriverApi from "../../apis/deletedDriverApi";

export function* deletedDriverListWorker(action) {
  try {
    const res = yield call(
      deletedDriverApi.deletedDriverListApi,
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

export function* deletedDriverViewWorker(action) {
  try {
    const res = yield call(
      deletedDriverApi.deletedDriverViewApi,
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
export function* deletedDriverReadWorker(action) {
  try {
    yield put({ type: DELETED_DRIVER_DATA_LOADING });
    const res = yield call(
      deletedDriverApi.deletedDriverProfileReadApi,
      action.id
    );
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield put({ type: DELETED_DRIVER_DATA_LOADED, data: res?.data });
    } else if (res.status === 200 && res.data.status === "fail") {
    } else {
      yield put({
        type: DELETE_DRIVER_DATA_FAILED,
        data: "Something Went Wrong! Please Try Again Later",
      });
      yield action.onError("Something Went Wrong!");
    }
  } catch (err) {
    yield put({
      type: DELETE_DRIVER_DATA_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}
export function* restoreDriverWorker(action) {
  try {
    const res = yield call(
      deletedDriverApi.restoreDriverApi,
      action.id,
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
export function* perDeleteDriverWorker(action) {
  try {
    const res = yield call(
      deletedDriverApi.permDeleteDriverApi,
      action.id,
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
export function* perDeletedDriverListWorker(action) {
  try {
    const res = yield call(
      deletedDriverApi.permDeletedDriverListApi,
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

export function* perDeletedDriverViewWorker(action) {
  try {
    const res = yield call(
      deletedDriverApi.permDeletedDriverViewApi,
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
export function* perDeletedDriverReadWorker(action) {
  try {
    yield put({ type: PERM_DELETED_DATA_LOADING });
    const res = yield call(
      deletedDriverApi.permDeletedDriverProfileReadApi,
      action.id
    );
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield put({ type: PERM_DELETED_DATA_LOADED, data: res?.data });
    } else if (res.status === 200 && res.data.status === "fail") {
      yield put({
        type: PERM_DELETED_DATA_FAILED,
        data: "Something Went Wrong! Please Try Again Later",
      });
    } else {
      yield put({
        type: PERM_DELETED_DATA_FAILED,
        data: "Something Went Wrong! Please Try Again Later",
      });
      yield action.onError("Something Went Wrong!");
    }
  } catch (err) {
    yield put({
      type: PERM_DELETED_DATA_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}

export function* watchDeletedDriverListWorker() {
  yield takeLatest(DELETED_DRIVER_LIST, deletedDriverListWorker);
}
export function* watchDeletedDriverViewWorker() {
  yield takeLatest(DELETED_DRIVER_VIEW, deletedDriverViewWorker);
}
export function* watchDeletedDriverReadWorker() {
  yield takeLatest(DELETED_DRIVER_PROFILE_READ, deletedDriverReadWorker);
}
export function* watchRestoreDriverWorker() {
  yield takeLatest(RESTORE_DRIVER, restoreDriverWorker);
}
export function* watchPerDeletedDriverWorker() {
  yield takeLatest(DELETE_ACCOUNT_PERMANENTLTY, perDeleteDriverWorker);
}
export function* watchperDeletedDriverListWorker() {
  yield takeLatest(PERMANENT_DELETED_DRIVER_LIST, perDeletedDriverListWorker);
}
export function* watchperDeletedDriverViewWorker() {
  yield takeLatest(PERMANENT_DELETED_DRIVER_VIEW, perDeletedDriverViewWorker);
}
export function* watchperDeletedDriverReadWorker() {
  yield takeLatest(PERMANENT_DELETED_DRIVER_READ, perDeletedDriverReadWorker);
}
