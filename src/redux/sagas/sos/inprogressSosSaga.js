import { call, takeLatest } from "redux-saga/effects";
import {
  DRIVER_ID_LIST,
  DRIVER_INPROGRESS_SOS,
  DRIVER_INPROGRESS_SOS_LIST,
  DRIVER_INPROG_SOS_REASSIGN,
  DRIVER_SOS_INPROGRESS_DROPDOWN,
  RIDER_ID_LIST,
  RIDER_INPROGRESS_SOS,
  RIDER_INPROGRESS_SOS_LIST,
  RIDER_INPROG_SOS_REASSIGN,
  RIDER_SOS_INPROGRESS_DROPDOWN,
} from "../../actions/types";
import * as InprogressSOSApi from "../../apis/sos/inprogressSosApi";

export function* riderInprogressSOSListWorker(action) {
  try {
    const res = yield call(
      InprogressSOSApi.riderInprogressSOSListApi,
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
export function* driverInprogressSOSListWorker(action) {
  try {
    const res = yield call(
      InprogressSOSApi.driverInprogressSOSListApi,
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

export function* riderInprogreeSOSWorker(action) {
  try {
    const res = yield call(
      InprogressSOSApi?.riderInprogressSOSApi,
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

export function* driverInprogreeSOSWorker(action) {
  try {
    const res = yield call(
      InprogressSOSApi?.driverInprogressSOSApi,
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

export function* driverInProgSOSReAssignWorker(action) {
  try {
    const res = yield call(
      InprogressSOSApi?.driverInProgSOSReAssignApi,
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
export function* riderInProgSOSReAssignWorker(action) {
  try {
    const res = yield call(
      InprogressSOSApi?.riderInProgSOSReAssignApi,
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
export function* riderIDListApiWorker(action) {
  try {
    const res = yield call(InprogressSOSApi?.riderIDListApi);
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
export function* driverIDListApiWorker(action) {
  try {
    const res = yield call(InprogressSOSApi?.driverIDListApi);
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
export function* riderSOSInprogressDropDownWorker(action) {
  try {
    const res = yield call(InprogressSOSApi?.riderSOSInprogressDropDownApi, action);
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
export function* driverSOSInprogressDropDownWorker(action) {
  try {
    const res = yield call(InprogressSOSApi?.driverSOSInprogressDropDownApi, action);
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

export function* watchRiderInprogressSOSListWorker() {
  yield takeLatest(RIDER_INPROGRESS_SOS_LIST, riderInprogressSOSListWorker);
}
export function* watchDriverInprogressSOSListWorker() {
  yield takeLatest(DRIVER_INPROGRESS_SOS_LIST, driverInprogressSOSListWorker);
}
export function* watchRiderInprogressSOSWorker() {
  yield takeLatest(RIDER_INPROGRESS_SOS, riderInprogreeSOSWorker);
}
export function* watchDriverInprogressSOSWorker() {
  yield takeLatest(DRIVER_INPROGRESS_SOS, driverInprogreeSOSWorker);
}

export function* watchdriverInProgSOSReAssignWorker() {
  yield takeLatest(DRIVER_INPROG_SOS_REASSIGN, driverInProgSOSReAssignWorker);
}
export function* watchriderInProgSOSReAssignWorker() {
  yield takeLatest(RIDER_INPROG_SOS_REASSIGN, riderInProgSOSReAssignWorker);
}
export function* watchriderIDListApiWorker() {
  yield takeLatest(RIDER_ID_LIST, riderIDListApiWorker);
}
export function* watchdriverIDListApiWorker() {
  yield takeLatest(DRIVER_ID_LIST, driverIDListApiWorker);
}
export function* watchriderSOSInprogressDropDownWorker() {
  yield takeLatest(RIDER_SOS_INPROGRESS_DROPDOWN, riderSOSInprogressDropDownWorker);
}
export function* watchdriverSOSInprogressDropDownWorker() {
  yield takeLatest(DRIVER_SOS_INPROGRESS_DROPDOWN, driverSOSInprogressDropDownWorker);
}