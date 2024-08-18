import { call, takeLatest } from "redux-saga/effects";
import {
  dFinCreateCashTransCreateApi,
  dFinCreateCashTransListApi,
  drifinCreatcashDropDownListApi,
  premiumPlanApi,
  premiumPlanCancelActiveApi,
  premiumPlanCancelScheduleApi,
  premiumPlanScheduleApi,
  premiumPlanSwitchApi,
  premiumSchedulePlanApi,
} from "../../apis/driverFinanceApi/createCashTransaction";
import {
  DRFIN_CREATE_CASH_TRANS_LIST,
  DRFIN_CREATE_CASH_TRANS,
  DRFIN_CREATE_CASH_DRP_DWN,
  PREMIUM_PLAN,
  PREMIUM_PLAN_SWITCH,
  PREMIUM_SCHEDULE_PLAN,
  PREMIUM_PLAN_SCHEDULE,
  PREMIUM_PLAN_CANCEL_SCHEDULE,
  PREMIUM_PLAN_CANCEL_ACTIVE,
} from "../../actions/types";

export function* driverFinanceCreateCashTransactionListWorker(action) {
  try {
    const res = yield call(
      dFinCreateCashTransListApi,
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

export function* driverFinanceCreateCashTransactionCreateWorker(action) {
  try {
    const res = yield call(dFinCreateCashTransCreateApi, action.data);
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

export function* drifinCreatecashDropDownListWorker(action) {
  try {
    const res = yield call(drifinCreatcashDropDownListApi);
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

export function* premiumPlanWorker(action) {
  try {
    const res = yield call(premiumPlanApi, action.data);
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
export function* premiumSchedulePlanWorker(action) {
  try {
    const res = yield call(premiumSchedulePlanApi, action.data);
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

export function* premiumPlanSwitchWorker(action) {
  try {
    const res = yield call(premiumPlanSwitchApi, action.data);
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

export function* premiumPlanScheduleWorker(action) {
  try {
    const res = yield call(premiumPlanScheduleApi, action.data);
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

export function* premiumPlanCancelScheduleWorker(action) {
  try {
    const res = yield call(premiumPlanCancelScheduleApi, action.data);
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

export function* premiumPlanCancelActiveWorker(action) {
  try {
    const res = yield call(premiumPlanCancelActiveApi, action.data);
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

export function* watchDriverFinanceCreateCashTransactionListWorker() {
  yield takeLatest(
    DRFIN_CREATE_CASH_TRANS_LIST,
    driverFinanceCreateCashTransactionListWorker
  );
}

export function* watchDriverFinanceCreateCashTransactionCreateWorker() {
  yield takeLatest(
    DRFIN_CREATE_CASH_TRANS,
    driverFinanceCreateCashTransactionCreateWorker
  );
}

export function* watchDrifinCreatecashDropdownListWorker() {
  yield takeLatest(
    DRFIN_CREATE_CASH_DRP_DWN,
    drifinCreatecashDropDownListWorker
  );
}

export function* watchPremiumPlanWorker() {
  yield takeLatest(PREMIUM_PLAN, premiumPlanWorker);
}
export function* watchPremiumSchedulePlanWorker() {
  yield takeLatest(PREMIUM_SCHEDULE_PLAN, premiumSchedulePlanWorker);
}
export function* watchPremiumPlanSwitchWorker() {
  yield takeLatest(PREMIUM_PLAN_SWITCH, premiumPlanSwitchWorker);
}
export function* watchPremiumPlanScheduleWorker() {
  yield takeLatest(PREMIUM_PLAN_SCHEDULE, premiumPlanScheduleWorker);
}

export function* watchPremiumPlanCancelScheduleWorker() {
  yield takeLatest(PREMIUM_PLAN_CANCEL_SCHEDULE, premiumPlanCancelScheduleWorker);
}
export function* watchPremiumPlanCancelActiveWorker() {
  yield takeLatest(PREMIUM_PLAN_CANCEL_ACTIVE, premiumPlanCancelActiveWorker);
}