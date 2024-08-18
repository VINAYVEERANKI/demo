import { call, takeLatest } from "redux-saga/effects";
import {
  ASSIGN_TO_ADMIN_LIST,
  DRIVER_COMPLAINT_ASSIGN,
  DRIVER_COMPLAINT_INITIATE,
  DRIVER_COMPL_PENDING_DROPDOWN,
  DRIVER_PENDING_COMPLAINT,
  DRIVER_PENDING_COMPLAINTS_LIST,
  RIDER_COMPLAINT_ASSIGN,
  RIDER_COMPLAINT_INITIATE,
  RIDER_COMPL_PENDING_DROPDOWN,
  RIDER_PENDING_COMPLAINT,
  RIDER_PENDING_COMPLAINTS_LIST,
} from "../../actions/types";
import * as pendComplaintsApi from "../../apis/complaints/pendingComplaintsApi";

export function* riderPendComplaintsListWorker(action) {
  try {
    const res = yield call(
      pendComplaintsApi.riderPendComplaintsListApi,
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
export function* driverPendComplaintsListWorker(action) {
  try {
    const res = yield call(
      pendComplaintsApi.driverPendComplaintsListApi,
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

export function* riderPendComplaintWorker(action) {
  try {
    const res = yield call(
      pendComplaintsApi?.riderPendComplaintApi,
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

export function* driverPendComplaintWorker(action) {
  try {
    const res = yield call(
      pendComplaintsApi?.driverPendComplaintApi,
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

export function* driverComplaintInitiateWorker(action) {
  try {
    const res = yield call(
      pendComplaintsApi?.driverComplaintInitiateApi,
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
export function* riderComplaintInitiateWorker(action) {
  try {
    const res = yield call(
      pendComplaintsApi?.riderComplaintInitiateApi,
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

export function* driverComplaintAssignWorker(action) {
  try {
    const res = yield call(
      pendComplaintsApi?.driverComplaintAssignApi,
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
export function* riderComplaintAssignWorker(action) {
  try {
    const res = yield call(
      pendComplaintsApi?.riderComplaintAssignApi,
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

export function* assignToAdminListWorker(action) {
  try {
    const res = yield call(
      pendComplaintsApi.assignToAdminListApi,
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
export function* riderComplPendingDropDownWorker(action) {
  try {
    const res = yield call(pendComplaintsApi?.riderComplPendingDropDownApi, action);
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
export function* driverComplPendingDropDownWorker(action) {
  try {
    const res = yield call(pendComplaintsApi?.driverComplPendingDropDownApi, action);
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

export function* watchRiderPendComplaintsListWorker() {
  yield takeLatest(
    RIDER_PENDING_COMPLAINTS_LIST,
    riderPendComplaintsListWorker
  );
}
export function* watchDriverPendComplaintsListWorker() {
  yield takeLatest(
    DRIVER_PENDING_COMPLAINTS_LIST,
    driverPendComplaintsListWorker
  );
}
export function* watchRiderPendComplaintWorker() {
  yield takeLatest(RIDER_PENDING_COMPLAINT, riderPendComplaintWorker);
}
export function* watchDriverPendComplaintWorker() {
  yield takeLatest(DRIVER_PENDING_COMPLAINT, driverPendComplaintWorker);
}

export function* watchDriverComplaintInitiateWorker() {
  yield takeLatest(DRIVER_COMPLAINT_INITIATE, driverComplaintInitiateWorker);
}
export function* watchRiderComplaintInitiateWorker() {
  yield takeLatest(RIDER_COMPLAINT_INITIATE, riderComplaintInitiateWorker);
}

export function* watchDriverComplaintAssignWorker() {
  yield takeLatest(DRIVER_COMPLAINT_ASSIGN, driverComplaintAssignWorker);
}
export function* watchRiderComplaintAssignWorker() {
  yield takeLatest(RIDER_COMPLAINT_ASSIGN, riderComplaintAssignWorker);
}
export function* watchAssignToAdminListWorker() {
  yield takeLatest(ASSIGN_TO_ADMIN_LIST, assignToAdminListWorker);
}
export function* watchriderComplPendingDropDownWorker() {
  yield takeLatest(RIDER_COMPL_PENDING_DROPDOWN, riderComplPendingDropDownWorker);
}
export function* watchdriverComplPendingDropDownWorker() {
  yield takeLatest(DRIVER_COMPL_PENDING_DROPDOWN, driverComplPendingDropDownWorker);
}