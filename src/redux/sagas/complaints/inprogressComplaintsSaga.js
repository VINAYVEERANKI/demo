import { call, takeLatest } from "redux-saga/effects";
import {
  BOOKING_ID_LIST,
  DRIVER_COMPL_INPROGRESS_DROPDOWN,
  DRIVER_INPROGRESS_COMPLAINT,
  DRIVER_INPROGRESS_COMPLAINTS_LIST,
  DRIVER_INPROG_COMPLAINT_REASSIGN,
  RIDER_COMPL_INPROGRESS_DROPDOWN,
  RIDER_INPROGRESS_COMPLAINT,
  RIDER_INPROGRESS_COMPLAINTS_LIST,
  RIDER_INPROG_COMPLAINT_REASSIGN,
} from "../../actions/types";
import * as InprogressComplaintsApi from "../../apis/complaints/inprogressComplaintsApi";

export function* riderInprogressComplaintsListWorker(action) {
  try {
    const res = yield call(
      InprogressComplaintsApi.riderInprogressComplaintsListApi,
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
export function* driverInprogressComplaintsListWorker(action) {
  try {
    const res = yield call(
      InprogressComplaintsApi.driverInprogressComplaintsListApi,
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

export function* riderInprogreeComplaintWorker(action) {
  try {
    const res = yield call(
      InprogressComplaintsApi?.riderInprogressComplaintApi,
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

export function* driverInprogreeComplaintWorker(action) {
  try {
    const res = yield call(
      InprogressComplaintsApi?.driverInprogressComplaintApi,
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

export function* driverInProgComplaintReAssignWorker(action) {
  try {
    const res = yield call(
      InprogressComplaintsApi?.driverInProgComplaintReAssignApi,
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
export function* riderInProgComplaintReAssignWorker(action) {
  try {
    const res = yield call(
      InprogressComplaintsApi?.riderInProgComplaintReAssignApi,
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
export function* riderComplInprogressDropDownWorker(action) {
  try {
    const res = yield call(InprogressComplaintsApi?.riderComplInprogressDropDownApi, action);
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
export function* driverComplInprogressDropDownWorker(action) {
  try {
    const res = yield call(InprogressComplaintsApi?.driverComplInprogressDropDownApi, action);
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

// booking Id list
export function* bookingIDListWorker(action) {
  try {
    const res = yield call(InprogressComplaintsApi?.bookingIDListApi);
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

export function* watchRiderInprogressComplaintsListWorker() {
  yield takeLatest(
    RIDER_INPROGRESS_COMPLAINTS_LIST,
    riderInprogressComplaintsListWorker
  );
}
export function* watchDriverInprogressComplaintsListWorker() {
  yield takeLatest(
    DRIVER_INPROGRESS_COMPLAINTS_LIST,
    driverInprogressComplaintsListWorker
  );
}
export function* watchRiderInprogressComplaintWorker() {
  yield takeLatest(RIDER_INPROGRESS_COMPLAINT, riderInprogreeComplaintWorker);
}
export function* watchDriverInprogressComplaintWorker() {
  yield takeLatest(DRIVER_INPROGRESS_COMPLAINT, driverInprogreeComplaintWorker);
}

export function* watchdriverInProgComplaintReAssignWorker() {
  yield takeLatest(
    DRIVER_INPROG_COMPLAINT_REASSIGN,
    driverInProgComplaintReAssignWorker
  );
}
export function* watchriderInProgComplaintReAssignWorker() {
  yield takeLatest(
    RIDER_INPROG_COMPLAINT_REASSIGN,
    riderInProgComplaintReAssignWorker
  );
}
export function* watchbookingIDListWorker() {
  yield takeLatest(BOOKING_ID_LIST, bookingIDListWorker);
}
export function* watchriderComplInprogressDropDownWorker() {
  yield takeLatest(RIDER_COMPL_INPROGRESS_DROPDOWN, riderComplInprogressDropDownWorker);
}
export function* watchdriverComplInprogressDropDownWorker() {
  yield takeLatest(DRIVER_COMPL_INPROGRESS_DROPDOWN, driverComplInprogressDropDownWorker);
}