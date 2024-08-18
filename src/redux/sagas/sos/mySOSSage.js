import { call, takeLatest } from "redux-saga/effects";
import * as mySOSApi from "../../apis/sos/mySOSApi";
import {
  DRIVER_CLOSE_SOS,
  DRIVER_FORWARD_SOS,
  MY_SOS_DRIVER_LIST,
  MY_SOS_RIDER_LIST,
  DRIVER_RESOLVE_SOS,
  RIDER_CLOSE_SOS,
  RIDER_RESOLVE_SOS,
  RIDER_FORWARD_SOS,
} from "../../actions/types";

export function* mySOSDriverListWorker(action) {
  try {
    const res = yield call(mySOSApi?.mySOSDriverListApi, action.data);
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

export function* mySOSRiderListWorker(action) {
  try {
    const res = yield call(mySOSApi?.mySOSRiderListApi, action.data);
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
export function* closeSOSWorker(action) {
  try {
    const res = yield call(mySOSApi?.closeSOSApi, action.data);
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
export function* resolveSOSWorker(action) {
  try {
    const res = yield call(mySOSApi?.resolveSOSApi, action.data);
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
export function* forwardSOSWorker(action) {
  try {
    const res = yield call(mySOSApi?.forwardSOSApi, action.data);
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

export function* closeRiderSOSWorker(action) {
  try {
    const res = yield call(mySOSApi?.closeRiderSOSApi, action.data);
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
export function* resolveRiderSOSWorker(action) {
  try {
    const res = yield call(mySOSApi?.resolveRiderSOSApi, action.data);
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
export function* forwardRiderSOSWorker(action) {
  try {
    const res = yield call(mySOSApi?.forwardRiderSOSApi, action.data);
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

export function* watchmySOSDriverListWorker() {
  yield takeLatest(MY_SOS_DRIVER_LIST, mySOSDriverListWorker);
}
export function* watchmySOSRiderListWorker() {
  yield takeLatest(MY_SOS_RIDER_LIST, mySOSRiderListWorker);
}
export function* watchCloseSOSWorker() {
  yield takeLatest(DRIVER_CLOSE_SOS, closeSOSWorker);
}

export function* watchResolveSOSWorker() {
  yield takeLatest(DRIVER_RESOLVE_SOS, resolveSOSWorker);
}

export function* watchForwardSOSWorker() {
  yield takeLatest(DRIVER_FORWARD_SOS, forwardSOSWorker);
}

export function* watchCloseRiderSOSWorker() {
  yield takeLatest(RIDER_CLOSE_SOS, closeRiderSOSWorker);
}

export function* watchResolveRiderSOSWorker() {
  yield takeLatest(RIDER_RESOLVE_SOS, resolveRiderSOSWorker);
}

export function* watchForwardRiderSOSWorker() {
  yield takeLatest(RIDER_FORWARD_SOS, forwardRiderSOSWorker);
}
