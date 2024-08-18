import { call, takeLatest } from "redux-saga/effects";
import { riderFaqAfterTripLocalListApi, riderFaqAfterTripOnewayListApi, riderFaqAfterTripPayOnewayListApi, riderFaqAfterTripPayRentListApi, riderFaqAfterTripPayRoundListApi, riderFaqAfterTripPaymentLocalListApi, riderFaqAfterTripRentalListApi, riderFaqAfterTripRoundListApi } from "../../../apis/faq/rider/riderFaqAfterTripApi";
import { RIDER_FAQ_AFTER_TRIP_LOCAL_FIND_ALL, RIDER_FAQ_AFTER_TRIP_ONEWAY_FIND_ALL, RIDER_FAQ_AFTER_TRIP_PAYMENT_LOCAL_FIND_ALL, RIDER_FAQ_AFTER_TRIP_PAY_ONEWAY_FIND_ALL, RIDER_FAQ_AFTER_TRIP_PAY_RENT_FIND_ALL, RIDER_FAQ_AFTER_TRIP_PAY_ROUND_FIND_ALL, RIDER_FAQ_AFTER_TRIP_RENTAL_FIND_ALL, RIDER_FAQ_AFTER_TRIP_ROUND_FIND_ALL } from "../../../actions/types";

export function* riderFaqAfterTripLocalListWorker(action) {
    try {
      const res = yield call(
        riderFaqAfterTripLocalListApi,
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

  export function* riderFaqAfterTripRentalListWorker(action) {
    try {
      const res = yield call(
        riderFaqAfterTripRentalListApi,
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

  export function* riderFaqAfterTripOnewayListWorker(action) {
    try {
      const res = yield call(
        riderFaqAfterTripOnewayListApi,
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

  export function* riderFaqAfterTripRoundListWorker(action) {
    try {
      const res = yield call(
        riderFaqAfterTripRoundListApi,
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

  export function* riderFaqAfterTripPaymentLocalListWorker(action) {
    try {
      const res = yield call(
        riderFaqAfterTripPaymentLocalListApi,
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

  export function* riderFaqAfterTripPayRentListWorker(action) {
    try {
      const res = yield call(
        riderFaqAfterTripPayRentListApi,
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

  export function* riderFaqAfterTripPayOnewayListWorker(action) {
    try {
      const res = yield call(
        riderFaqAfterTripPayOnewayListApi,
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

  export function* riderFaqAfterTripPayRoundListWorker(action) {
    try {
      const res = yield call(
        riderFaqAfterTripPayRoundListApi,
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

    export function* watchriderFaqAfterTripLocalListWorker() {
        yield takeLatest(
            RIDER_FAQ_AFTER_TRIP_LOCAL_FIND_ALL,
            riderFaqAfterTripLocalListWorker
        );
      }

      export function* watchriderFaqAfterTripRentalListWorker() {
        yield takeLatest(
          RIDER_FAQ_AFTER_TRIP_RENTAL_FIND_ALL,
          riderFaqAfterTripRentalListWorker
        );
      }

      export function* watchriderFaqAfterTripOnewayListWorker() {
        yield takeLatest(
            RIDER_FAQ_AFTER_TRIP_ONEWAY_FIND_ALL,
            riderFaqAfterTripOnewayListWorker
        );
      }

      export function* watchriderFaqAfterTripRoundListWorker() {
        yield takeLatest(
            RIDER_FAQ_AFTER_TRIP_ROUND_FIND_ALL,
            riderFaqAfterTripRoundListWorker
        );
      }

      export function* watchriderFaqAfterPaymentLocalListWorker() {
        yield takeLatest(
            RIDER_FAQ_AFTER_TRIP_PAYMENT_LOCAL_FIND_ALL,
            riderFaqAfterTripPaymentLocalListWorker
        );
      }

      export function* watchriderFaqAfterPayRentListWorker() {
        yield takeLatest(
            RIDER_FAQ_AFTER_TRIP_PAY_RENT_FIND_ALL,
            riderFaqAfterTripPayRentListWorker
        );
      }

      export function* watchriderFaqAfterPayOnewayListWorker() {
        yield takeLatest(
            RIDER_FAQ_AFTER_TRIP_PAY_ONEWAY_FIND_ALL,
            riderFaqAfterTripPayOnewayListWorker
        );
      }
      export function* watchriderFaqAfterPayRoundListWorker() {
        yield takeLatest(
            RIDER_FAQ_AFTER_TRIP_PAY_ROUND_FIND_ALL,
            riderFaqAfterTripPayRoundListWorker
        );
      }