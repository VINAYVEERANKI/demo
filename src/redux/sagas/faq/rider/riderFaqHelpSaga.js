import { call, takeLatest } from "redux-saga/effects";
import { riderFaqHelpCovidListApi, riderFaqHelpGuideToComrideListApi, riderFaqHelpMyTripsListApi, riderFaqHelpPaymentListApi, riderFaqHelpProfileAccountListApi, riderFaqHelpReferalListApi, riderFaqHelpSafetyListApi, riderFaqHelpTroubleshootListApi } from "../../../apis/faq/rider/riderFaqHelpApi";
import {  RIDER_FAQ_HELP_COVID_FIND_ALL, RIDER_FAQ_HELP_GUIDE_TO_COMRIDE_FIND_ALL, RIDER_FAQ_HELP_MY_TRIPS_FIND_ALL, RIDER_FAQ_HELP_PAYMENT_FIND_ALL, RIDER_FAQ_HELP_PROFILE_ACCOUNT_FIND_ALL, RIDER_FAQ_HELP_REFERAL_FIND_ALL, RIDER_FAQ_HELP_SAFETY_FIND_ALL, RIDER_FAQ_HELP_TROUBLESHOOT_FIND_ALL } from "../../../actions/types";

export function* riderFaqHelpCovidListWorker(action) {
    try {
      const res = yield call(
        riderFaqHelpCovidListApi,
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

  export function* riderFaqHelpProfileAccountListWorker(action) {
    try {
      const res = yield call(
        riderFaqHelpProfileAccountListApi,
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

  export function* riderFaqHelpMyTripsListWorker(action) {
    try {
      const res = yield call(
        riderFaqHelpMyTripsListApi,
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

  export function* riderFaqHelpPaymentListWorker(action) {
    try {
      const res = yield call(
        riderFaqHelpPaymentListApi,
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

  export function* riderFaqHelpSafetyListWorker(action) {
    try {
      const res = yield call(
        riderFaqHelpSafetyListApi,
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

  export function* riderFaqHelpTroubleshootListWorker(action) {
    try {
      const res = yield call(
        riderFaqHelpTroubleshootListApi,
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

  export function* riderFaqHelpGuideToComrideListWorker(action) {
    try {
      const res = yield call(
        riderFaqHelpGuideToComrideListApi,
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

  export function* riderFaqHelpReferalListWorker(action) {
    try {
      const res = yield call(
        riderFaqHelpReferalListApi,
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

  export function* watchriderFaqHelpCovidListWorker() {
    yield takeLatest(
        RIDER_FAQ_HELP_COVID_FIND_ALL,
      riderFaqHelpCovidListWorker
    );
  }

  export function* watchriderFaqHelpProfileAccountListWorker() {
    yield takeLatest(
        RIDER_FAQ_HELP_PROFILE_ACCOUNT_FIND_ALL,
        riderFaqHelpProfileAccountListWorker
    );
  }
  export function* watchriderFaqHelpMyTripsListWorker() {
    yield takeLatest(
        RIDER_FAQ_HELP_MY_TRIPS_FIND_ALL,
        riderFaqHelpMyTripsListWorker
    );
  }

  export function* watchriderFaqHelpPaymentListWorker() {
    yield takeLatest(
        RIDER_FAQ_HELP_PAYMENT_FIND_ALL,
        riderFaqHelpPaymentListWorker
    );
  }

  export function* watchriderFaqHelpSafetyListWorker() {
    yield takeLatest(
        RIDER_FAQ_HELP_SAFETY_FIND_ALL,
        riderFaqHelpSafetyListWorker
    );
  }

  export function* watchriderFaqHelpTroubleshootListWorker() {
    yield takeLatest(
        RIDER_FAQ_HELP_TROUBLESHOOT_FIND_ALL,
        riderFaqHelpTroubleshootListWorker
    );
  }

  export function* watchriderFaqHelpGuideToComrideListWorker() {
    yield takeLatest(
        RIDER_FAQ_HELP_GUIDE_TO_COMRIDE_FIND_ALL,
        riderFaqHelpGuideToComrideListWorker
    );
  }

  export function* watchriderFaqHelpReferalListWorker() {
    yield takeLatest(
        RIDER_FAQ_HELP_REFERAL_FIND_ALL,
        riderFaqHelpReferalListWorker
    );
  }