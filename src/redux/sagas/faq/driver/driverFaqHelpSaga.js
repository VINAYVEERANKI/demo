import { call, takeLatest } from "redux-saga/effects";
import { driverFaqHelpCancelPolicyListApi, driverFaqHelpComrideServiceListApi, driverFaqHelpCovidListApi, driverFaqHelpGuideToComrideListApi, driverFaqHelpMyAccountListApi, driverFaqHelpPaymentListApi, driverFaqHelpReferalListApi, driverFaqHelpSafetyListApi } from "../../../apis/faq/driver/driverFaqHelpApi";
import { DRIVER_FAQ_COMRIDE_SERVICE_FIND_ALL, DRIVER_FAQ_HELP_CANCELLATION_POLICY_FIND_ALL, DRIVER_FAQ_HELP_COVID_FIND_ALL, DRIVER_FAQ_HELP_GUIDE_TO_COMRIDE_FIND_ALL, DRIVER_FAQ_HELP_MY_ACCOUNT_FIND_ALL, DRIVER_FAQ_HELP_PAYMENT_FIND_ALL, DRIVER_FAQ_HELP_REFERAL_FIND_ALL, DRIVER_FAQ_HELP_SAFETY_FIND_ALL } from "../../../actions/types";

export function* driverFaqHelpCovidListWorker(action) {
    try {
      const res = yield call(
        driverFaqHelpCovidListApi,
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

  export function* driverFaqHelpMyAccountListWorker(action) {
    try {
      const res = yield call(
        driverFaqHelpMyAccountListApi,
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

  export function* driverFaqHelpCancelPolicyListWorker(action) {
    try {
      const res = yield call(
        driverFaqHelpCancelPolicyListApi,
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

  export function* driverFaqHelpPaymentListWorker(action) {
    try {
      const res = yield call(
        driverFaqHelpPaymentListApi,
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

  export function* driverFaqHelpSafetyListWorker(action) {
    try {
      const res = yield call(
        driverFaqHelpSafetyListApi,
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

  export function* driverFaqHelpComrideServiceListWorker(action) {
    try {
      const res = yield call(
        driverFaqHelpComrideServiceListApi,
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

  export function* driverFaqHelpGuideToComrideListWorker(action) {
    try {
      const res = yield call(
        driverFaqHelpGuideToComrideListApi,
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

  export function* driverFaqHelpReferalListWorker(action) {
    try {
      const res = yield call(
        driverFaqHelpReferalListApi,
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

  export function* watchDriverFaqHelpCovidListWorker() {
    yield takeLatest(
        DRIVER_FAQ_HELP_COVID_FIND_ALL,
        driverFaqHelpCovidListWorker
    );
  }

  export function* watchDriverFaqHelpMyAccountListWorker() {
    yield takeLatest(
        DRIVER_FAQ_HELP_MY_ACCOUNT_FIND_ALL,
        driverFaqHelpMyAccountListWorker
    );
  }

  export function* watchDriverFaqHelpCancelPolicyListWorker() {
    yield takeLatest(
        DRIVER_FAQ_HELP_CANCELLATION_POLICY_FIND_ALL,
        driverFaqHelpCancelPolicyListWorker
    );
  }

  export function* watchDriverFaqHelpPaymentListWorker() {
    yield takeLatest(
        DRIVER_FAQ_HELP_PAYMENT_FIND_ALL,
        driverFaqHelpPaymentListWorker
    );
  }

  export function* watchDriverFaqHelpSafetyListWorker() {
    yield takeLatest(
        DRIVER_FAQ_HELP_SAFETY_FIND_ALL,
        driverFaqHelpSafetyListWorker
    );
  }

  export function* watchDriverFaqHelpComrideServiceListWorker() {
    yield takeLatest(
        DRIVER_FAQ_COMRIDE_SERVICE_FIND_ALL,
        driverFaqHelpComrideServiceListWorker
    );
  }

  export function* watchDriverFaqHelpGuideToComrideListWorker() {
    yield takeLatest(
      DRIVER_FAQ_HELP_GUIDE_TO_COMRIDE_FIND_ALL,
        driverFaqHelpGuideToComrideListWorker
    );
  }

  export function* watchDriverFaqHelpReferalListWorker() {
    yield takeLatest(
      DRIVER_FAQ_HELP_REFERAL_FIND_ALL,
      driverFaqHelpReferalListWorker
    );
  }