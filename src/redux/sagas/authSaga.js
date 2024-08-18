import { call, put, takeLatest } from "redux-saga/effects";
import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_LOADING,
  ADMIN_LOGIN_SUCCESS,
} from "../actions/returnTypes";
import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  RESET_ADMIN_PASSWORD,
  RESET_LOGOUT_ADMIN_PASSWORD,
} from "../actions/types";
import { adminLoginApi, resetAdminPasswordApi, resetLogoutAdminPasswordApi } from "../apis/authApi";
import { ADMIN_DETAILS } from "../config";

export function* loginWorker(action) {
  try {
    yield put({ type: ADMIN_LOGIN_LOADING });
    const res = yield call(adminLoginApi, {
      username: action.username,
      password: action.password,
    });
    if (res.status === 200 && res.data.status === "success") {
      localStorage.setItem("accessToken", res.data.data.access_token);
      localStorage.setItem("id", res.data.data.id);
      localStorage.setItem("user_name", res.data.data.user_name);
      localStorage.setItem("admin_type", res.data.data.adminData.admin_type);
      localStorage.setItem(
        "permissions",
        JSON.stringify(res?.data?.data?.adminData?.permissions)
      );
      yield put({
        type: ADMIN_LOGIN_SUCCESS,
        token: res.data.data.access_token,
        message: res.data.message,
      });
      yield action.onSuccess(res.data);
    } else {
      console.log(res);
      yield put({
        type: ADMIN_LOGIN_FAIL,
        message: res.data.message,
      });
      yield action.onError(res.data);
    }
  } catch (error) {}
}

export function* logoutWorker() {
  try {
    yield localStorage.clear();
    yield window.location.reload();
    ADMIN_DETAILS.accessToken = "";
    ADMIN_DETAILS.user_name = "";
    ADMIN_DETAILS.id = "";
  } catch (err) {
    console.log(err);
  }
}
export function* resetAdminPasswordWorker(action) {
  try {
    const res = yield call(resetAdminPasswordApi, action.data);
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
export function* resetLogoutAdminPasswordWorker(action) {
  try {
    const res = yield call(resetLogoutAdminPasswordApi, action.data);
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
export function* watchLoginWorker() {
  yield takeLatest(ADMIN_LOGIN, loginWorker);
}

export function* watchLogoutWorker() {
  yield takeLatest(ADMIN_LOGOUT, logoutWorker);
}
export function* watchresetAdminPasswordWorker() {
  yield takeLatest(RESET_ADMIN_PASSWORD, resetAdminPasswordWorker);
}

export function* watchResetLogoutAdminPasswordWorker() {
  yield takeLatest(RESET_LOGOUT_ADMIN_PASSWORD, resetLogoutAdminPasswordWorker);
}
