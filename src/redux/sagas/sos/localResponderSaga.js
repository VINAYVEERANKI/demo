import { call, takeLatest } from "redux-saga/effects";
import {
  ADD_SOS_LOCAL_RESPNDER,
  DELETE_SOS_LOCAL_RESPONDER,
  LOCAL_RESPONDER_CONATACT_LIST,
  SOS_LOCAL_RESPONDER,
  SOS_LOCAL_RESPONDER_LIST,
  UPDATE_SOS_LOCAL_RESPONDER,
} from "../../actions/types";
import * as localResponderApis from "../../apis/sos/localResponderApi";

export function* localResponderListWorker(action) {
  try {
    const res = yield call(
      localResponderApis?.localResponderListApi,
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

export function* localResponderWorker(action) {
  try {
    const res = yield call(localResponderApis?.localResponderApi, action.data);
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

export function* addLocalResponderWorker(action) {
  try {
    const res = yield call(
      localResponderApis?.addLocalResponderApi,
      action.data
    );
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

export function* localResponderUpdateWorker(action) {
  try {
    const res = yield call(
      localResponderApis?.localResponderUpdateApi,
      action.data
    );
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
export function* localResponderDeleteWorker(action) {
  try {
    const res = yield call(
      localResponderApis?.localResponderDeleteApi,
      action.data
    );
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
export function* localResponderConatctListWorker(action) {
  try {
    const res = yield call(
      localResponderApis?.localResponderConatctListApi,
      action.data
    );
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

export function* watchLocalResponderListWorker() {
  yield takeLatest(SOS_LOCAL_RESPONDER_LIST, localResponderListWorker);
}
export function* watchLocalResponderWorker() {
  yield takeLatest(SOS_LOCAL_RESPONDER, localResponderWorker);
}

export function* watchaddLocalResponderWorker() {
  yield takeLatest(ADD_SOS_LOCAL_RESPNDER, addLocalResponderWorker);
}
export function* watchLocalResponderUpdateWorker() {
  yield takeLatest(UPDATE_SOS_LOCAL_RESPONDER, localResponderUpdateWorker);
}

export function* watchLocalResponderDeleteWorker() {
  yield takeLatest(DELETE_SOS_LOCAL_RESPONDER, localResponderDeleteWorker);
}
export function* watchLocalResponderConatctListWorker() {
  yield takeLatest(
    LOCAL_RESPONDER_CONATACT_LIST,
    localResponderConatctListWorker
  );
}
