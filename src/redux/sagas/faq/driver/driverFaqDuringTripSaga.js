import { call, takeLatest } from "redux-saga/effects";
import { driverFaqDuringTripLocalListApi, driverFaqDuringTripOneWaylListApi, driverFaqDuringTripRentalListApi, driverFaqDuringTripRoundlListApi } from "../../../apis/faq/driver/driverFaqDuringTripApi";
import { DRIVER_FAQ_DURING_TRIP_LOCAL_FIND_ALL, DRIVER_FAQ_DURING_TRIP_ONEWAY_FIND_ALL, DRIVER_FAQ_DURING_TRIP_RENTAL_FIND_ALL, DRIVER_FAQ_DURING_TRIP_ROUND_FIND_ALL } from "../../../actions/types";

export function* driverFaqDuringTripLocalListWorker(action) {
    try {
      const res = yield call(
        driverFaqDuringTripLocalListApi,
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

  export function* driverFaqDuringTripRentalListWorker(action) {
    try {
      const res = yield call(
        driverFaqDuringTripRentalListApi,
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

  export function* driverFaqDuringTripOnewayListWorker(action) {
    try {
      const res = yield call(
        driverFaqDuringTripOneWaylListApi,
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

  export function* driverFaqDuringTripRoundListWorker(action) {
    try {
      const res = yield call(
        driverFaqDuringTripRoundlListApi,
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

    //   WORKER FUNCTION

    export function* watchDriverFaqDuringTripLocalListWorker() {
        yield takeLatest(
            DRIVER_FAQ_DURING_TRIP_LOCAL_FIND_ALL,
            driverFaqDuringTripLocalListWorker
        );
      }

      export function* watchDriverFaqDuringTripRentalListWorker() {
        yield takeLatest(
            DRIVER_FAQ_DURING_TRIP_RENTAL_FIND_ALL,
            driverFaqDuringTripRentalListWorker
        );
      }

      export function* watchDriverFaqDuringTripOnewayListWorker() {
        yield takeLatest(
            DRIVER_FAQ_DURING_TRIP_ONEWAY_FIND_ALL,
            driverFaqDuringTripOnewayListWorker
        );
      }

      export function* watchDriverFaqDuringTripRoundListWorker() {
        yield takeLatest(
            DRIVER_FAQ_DURING_TRIP_ROUND_FIND_ALL,
            driverFaqDuringTripRoundListWorker
        );
      }