import { call, takeLatest } from "redux-saga/effects";
import {
  DRIVER_SOS_ASSIGN,
  DRIVER_SOS_INITIATE,
  DRIVER_PENDING_SOS,
  DRIVER_PENDING_SOS_LIST,
  RIDER_SOS_ASSIGN,
  RIDER_SOS_INITIATE,
  RIDER_PENDING_SOS,
  RIDER_PENDING_SOS_LIST,
  GENERATE_SOS_CALL_RIDER,
  GENERATE_SOS_CALL_DRIVER,
  ASSIGN_SOS_TO_ADMIN_LIST,
  RIDER_SOS_PENDING_DROPDOWN,
  DRIVER_SOS_PENDING_DROPDOWN,
} from "../../actions/types";
import * as pendSOSApi from "../../apis/sos/pendingSosApi";

export function* riderPendSOSListWorker(action) {
  try {
    const res = yield call(
      pendSOSApi.riderPendSOSListApi,
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
export function* driverPendSOSListWorker(action) {
  try {
    const res = yield call(
      pendSOSApi.driverPendSOSListApi,
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

export function* riderPendSOSWorker(action) {
  try {
    const res = yield call(pendSOSApi?.riderPendSOSApi, action.data);
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

export function* driverPendSOSWorker(action) {
  try {
    const res = yield call(pendSOSApi?.driverPendSOSApi, action.data);
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

export function* driverSOSInitiateWorker(action) {
  try {
    const res = yield call(pendSOSApi?.driverSOSInitiateApi, action.data);
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
export function* riderSOSInitiateWorker(action) {
  try {
    const res = yield call(pendSOSApi?.riderSOSInitiateApi, action.data);
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

export function* driverSOSAssignWorker(action) {
  try {
    const res = yield call(pendSOSApi?.driverSOSAssignApi, action.data);
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
export function* riderSOSAssignWorker(action) {
  try {
    const res = yield call(pendSOSApi?.riderSOSAssignApi, action.data);
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
export function* riderSOSPendingDropDownWorker(action) {
  try {
    const res = yield call(pendSOSApi?.riderSOSPendingDropDownApi, action);
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
export function* driverSOSPendingDropDownWorker(action) {
  try {
    const res = yield call(pendSOSApi?.driverSOSPendingDropDownApi, action);
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

// call generate
export function* generateSosCallRiderWorker(action) {
  try {
    const res = yield call(pendSOSApi?.generateSosCallRiderApi, action.data);
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
export function* generateSosCallDriverWorker(action) {
  try {
    const res = yield call(pendSOSApi?.generateSosCallDriverApi, action.data);
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
export function* assignSosToAdminListWorker(action) {
  try {
    const res = yield call(
      pendSOSApi.assignSosToAdminListApi,
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

export function* watchRiderPendSOSListWorker() {
  yield takeLatest(RIDER_PENDING_SOS_LIST, riderPendSOSListWorker);
}
export function* watchDriverPendSOSListWorker() {
  yield takeLatest(DRIVER_PENDING_SOS_LIST, driverPendSOSListWorker);
}
export function* watchRiderPendSOSWorker() {
  yield takeLatest(RIDER_PENDING_SOS, riderPendSOSWorker);
}
export function* watchDriverPendSOSWorker() {
  yield takeLatest(DRIVER_PENDING_SOS, driverPendSOSWorker);
}

export function* watchDriverSOSInitiateWorker() {
  yield takeLatest(DRIVER_SOS_INITIATE, driverSOSInitiateWorker);
}
export function* watchRiderSOSInitiateWorker() {
  yield takeLatest(RIDER_SOS_INITIATE, riderSOSInitiateWorker);
}

export function* watchDriverSOSAssignWorker() {
  yield takeLatest(DRIVER_SOS_ASSIGN, driverSOSAssignWorker);
}
export function* watchRiderSOSAssignWorker() {
  yield takeLatest(RIDER_SOS_ASSIGN, riderSOSAssignWorker);
}
export function* watchgenerateSosCallRiderWorker() {
  yield takeLatest(GENERATE_SOS_CALL_RIDER, generateSosCallRiderWorker);
}
export function* watchgenerateSosCallDriverWorker() {
  yield takeLatest(GENERATE_SOS_CALL_DRIVER, generateSosCallDriverWorker);
}
export function* watchassignSosToAdminListWorker() {
  yield takeLatest(ASSIGN_SOS_TO_ADMIN_LIST, assignSosToAdminListWorker);
}
export function* watchriderSOSPendingDropDownWorker() {
  yield takeLatest(RIDER_SOS_PENDING_DROPDOWN, riderSOSPendingDropDownWorker);
}
export function* watchdriverSOSPendingDropDownWorker() {
  yield takeLatest(DRIVER_SOS_PENDING_DROPDOWN, driverSOSPendingDropDownWorker);
}