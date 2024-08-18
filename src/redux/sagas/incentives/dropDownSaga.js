import { call, takeLatest, put } from "redux-saga/effects";
import { incentiveMainZoneListApi, incentiveRideTypeListApi } from "../../apis/incentives/dropDownApi";
import { INCENTIVE_MAIN_ZONE_LIST, INCENTIVE_RIDE_TYPE_LIST } from "../../actions/types";


export function* incentiveMainZoneListWorker(action) {
  try {
    const res = yield call(incentiveMainZoneListApi, action?.data);
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
export function* incentiveRideTypeListWorker(action) {
  try {
    const res = yield call(incentiveRideTypeListApi, action?.data);
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


export function* watchIncentiveMainZoneListWorker() {
  yield takeLatest(
    INCENTIVE_MAIN_ZONE_LIST,
    incentiveMainZoneListWorker
  );
}
export function* watchIncentiveRideTypeListWorker() {
  yield takeLatest(INCENTIVE_RIDE_TYPE_LIST, incentiveRideTypeListWorker);
}

