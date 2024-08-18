import { call, takeLatest } from "redux-saga/effects";
import {
  DRIVER_INCENTIVE_USAGE_HIS,
  DRIVER_INCENTIVE_USAGE_HIS_LIST,
  DRI_INCENTIVE_USGHIS_DRP_DWN,
} from "../../actions/types";
import * as incentiveUseageHisApi from "../../apis/incentives/useageHisIncentivesApi";

export function* driverIncentiveUseageHisListWorker(action) {
  try {
    const res = yield call(
      incentiveUseageHisApi?.driverIncentiveUseageHisListApi,
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
export function* driverIncentiveUseageHisWorker(action) {
  try {
    const res = yield call(
      incentiveUseageHisApi?.driverIncentiveUseageHisApi,
      action.current_page,
      action.data,
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

// export function* driverIncentiveUseageHisWorker(action) {
//   try {
//     const res = yield call(
//       incentiveUseageHisApi?.driverIncentiveUseageHisApi,
//       action.data
//     );
//     console.log(res);
//     if (res.status === 200 && res.data.status === "success") {
//       if (typeof action.onSuccess === "function") {
//         yield call(action.onSuccess, res.data);
//       }
//       console.log(res.data);
//     } else if (res.status === 200 && res.data.status === "fail") {
//       console.log(res.data);
//       if (typeof action.onError === "function") {
//         yield call(action.onError, res);
//       }
//     } else {
//       if (typeof action.onError === "function") {
//         yield call(action.onError, "Something Went Wrong");
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     if (typeof action.onError === "function") {
//       yield call(action.onError, "Something Went Wrong");
//     }
//   }
// }

export function* driIncentiveUsghisDrpdwnWorker(action) {
  try {
    const res = yield call(incentiveUseageHisApi.driIncentiveUsghisDrpdwnApi);
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

export function* watchdriverIncentiveUseageHisListWorker() {
  yield takeLatest(
    DRIVER_INCENTIVE_USAGE_HIS_LIST,
    driverIncentiveUseageHisListWorker
  );
}

export function* watchdriverIncentiveUseageHisWorker() {
  yield takeLatest(DRIVER_INCENTIVE_USAGE_HIS, driverIncentiveUseageHisWorker);
}

export function* watchDriIncentiveUdghisDrpdwnWorker() {
  yield takeLatest(DRI_INCENTIVE_USGHIS_DRP_DWN, driIncentiveUsghisDrpdwnWorker);
}