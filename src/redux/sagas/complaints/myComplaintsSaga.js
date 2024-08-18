import { call, takeLatest } from "redux-saga/effects";
import * as myComplaintsApi from "../../apis/complaints/myComplaintsApi";
import {
  DRIVER_CLOSE_COMPLAINT,
  DRIVER_FORWARD_COMPLAINT,
  MY_COMPLAINTS_LIST,
  MY_COMPLAINTS_RIDER_LIST,
  DRIVER_RESOLVE_COMPLAINT,
  RIDER_CLOSE_COMPLAINT,
  RIDER_RESOLVE_COMPLAINT,
  RIDER_FORWARD_COMPLAINT,
} from "../../actions/types";

export function* myComplaintsListWorker(action) {
  try {
    const res = yield call(
      myComplaintsApi?.myDriverComplaintsListApi,
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

export function* myComplaintsRiderListWorker(action) {
  try {
    const res = yield call(
      myComplaintsApi?.myComplaintsRiderListApi,
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
export function* closeDriverComplaintWorker(action) {
  try {
    const res = yield call(
      myComplaintsApi?.closeDriverComplaintApi,
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
export function* resolveDriverComplaintWorker(action) {
  try {
    const res = yield call(
      myComplaintsApi?.resolveDriverComplaintApi,
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

export function* forwardDriverComplaintWorker(action) {
  try {
    const res = yield call(
      myComplaintsApi?.forwardDriverComplaintApi,
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

export function* closeRiderComplaintWorker(action) {
  try {
    const res = yield call(
      myComplaintsApi?.closeRiderComplaintApi,
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
export function* resolveRiderComplaintWorker(action) {
  try {
    const res = yield call(
      myComplaintsApi?.resolveRiderComplaintApi,
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

export function* forwardRiderComplaintWorker(action) {
  try {
    const res = yield call(
      myComplaintsApi?.forwardRiderComplaintApi,
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

export function* watchmyComplaintsListWorker() {
  yield takeLatest(MY_COMPLAINTS_LIST, myComplaintsListWorker);
}
export function* watchmyComplaintsRiderListWorker() {
  yield takeLatest(MY_COMPLAINTS_RIDER_LIST, myComplaintsRiderListWorker);
}
export function* watchCloseDriverCompliantWorker() {
  yield takeLatest(DRIVER_CLOSE_COMPLAINT, closeDriverComplaintWorker);
}

export function* watchresolveDriverComplaintWorker() {
  yield takeLatest(DRIVER_RESOLVE_COMPLAINT, resolveDriverComplaintWorker);
}

export function* watchforwardDriverComplaintWorker() {
  yield takeLatest(DRIVER_FORWARD_COMPLAINT, forwardDriverComplaintWorker);
}

export function* watchCloseRiderCompliantWorker() {
  yield takeLatest(RIDER_CLOSE_COMPLAINT, closeRiderComplaintWorker);
}

export function* watchresolveRiderComplaintWorker() {
  yield takeLatest(RIDER_RESOLVE_COMPLAINT, resolveRiderComplaintWorker);
}

export function* watchforwardRiderComplaintWorker() {
  yield takeLatest(RIDER_FORWARD_COMPLAINT, forwardRiderComplaintWorker);
}
