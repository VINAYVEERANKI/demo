import { call, takeLatest } from "redux-saga/effects";
import { riderFaqDuringTripLocalListApi, riderFaqDuringTripOneWaylListApi, riderFaqDuringTripRentalListApi, riderFaqDuringTripRoundlListApi } from "../../../apis/faq/rider/riderFaqDuringTripApi";
import { RIDER_FAQ_DURING_TRIP_LOCAL_FIND_ALL, RIDER_FAQ_DURING_TRIP_ONEWAY_FIND_ALL, RIDER_FAQ_DURING_TRIP_RENTAL_FIND_ALL, RIDER_FAQ_DURING_TRIP_ROUND_FIND_ALL } from "../../../actions/types";

export function* riderFaqDuringTripLocalListWorker(action) {
    try {
      const res = yield call(
        riderFaqDuringTripLocalListApi,
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

  export function* riderFaqDuringTripRentalListWorker(action) {
    try {
      const res = yield call(
        riderFaqDuringTripRentalListApi,
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

  export function* riderFaqDuringTripOneWayListWorker(action) {
    try {
      const res = yield call(
        riderFaqDuringTripOneWaylListApi,
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

  export function* riderFaqDuringTripRoundListWorker(action) {
    try {
      const res = yield call(
        riderFaqDuringTripRoundlListApi,
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

  export function* watchriderFaqDuringTripLocalistWorker() {
    yield takeLatest(
        RIDER_FAQ_DURING_TRIP_LOCAL_FIND_ALL,
        riderFaqDuringTripLocalListWorker
    );
  }

  export function* watchriderFaqDuringTripRentaListWorker() {
    yield takeLatest(
        RIDER_FAQ_DURING_TRIP_RENTAL_FIND_ALL,
        riderFaqDuringTripRentalListWorker
    );
  }

  export function* watchriderFaqDuringTripOneWayListWorker() {
    yield takeLatest(
        RIDER_FAQ_DURING_TRIP_ONEWAY_FIND_ALL,
        riderFaqDuringTripOneWayListWorker
    );
  }

  export function* watchriderFaqDuringTripRoundListWorker() {
    yield takeLatest(
        RIDER_FAQ_DURING_TRIP_ROUND_FIND_ALL,
        riderFaqDuringTripRoundListWorker
    );
  }