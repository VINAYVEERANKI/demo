import { call, takeLatest } from "redux-saga/effects";
import { drimetDropDownListApi, driverMetricsListApi, driverMetricsViewApi } from "../../apis/driverMetricsApi/driverMetricsApi";
import { DRIVER_METRICS_DRP_DWN, DRIVER_METRICS_LIST, DRIVER_METRICS_VIEW } from "../../actions/types";

export function* driverMetricsListWorker(action) {
    try {
      const res = yield call(
        driverMetricsListApi,
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

  export function* driverMetricsViewWorker(action) {
    try {
      const res = yield call(
        driverMetricsViewApi,
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

  export function* drifmetDropDownListWorker(action) {
    try {
      const res = yield call(drimetDropDownListApi);
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

  export function* watchDriverMetricsListWorker() {
    yield takeLatest(
        DRIVER_METRICS_LIST,
        driverMetricsListWorker
    );
  }

  export function* watchDriverMetricsViewWorker() {
    yield takeLatest(
        DRIVER_METRICS_VIEW,
        driverMetricsViewWorker
    );
  }

  export function* watchDrimetDropdownListWorker() {
    yield takeLatest(DRIVER_METRICS_DRP_DWN, drifmetDropDownListWorker);
  }