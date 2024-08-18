import { call, takeLatest, put } from "redux-saga/effects";
import {
  riderFinanceListApi,
  riderFinanceViewApi,
  riderFinanceDropdownApi,
} from "../../apis/riderFinance/riderFinanceApi";
import {
  RIDER_FINANCE_LIST_FIND_ALL,
  RIDER_FINANCE_VIEW,
  RIDER_FINANCE_DROPDOWN_LIST,
} from "../../actions/types";

export function* riderFinanceListWorker(action) {
  try {
    const res = yield call(
      riderFinanceListApi,
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

export function* riderFinanceViewWorker(action) {
  try {
    const res = yield call(
      riderFinanceViewApi,
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

export function* riderFinanceDropDownListWorker(action) {
  try {
    const res = yield call(riderFinanceDropdownApi);
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

export function* watchriderFinanceListWorker() {
  yield takeLatest(RIDER_FINANCE_LIST_FIND_ALL, riderFinanceListWorker);
}

export function* watchriderFinanceFindOneWorker() {
  yield takeLatest(RIDER_FINANCE_VIEW, riderFinanceViewWorker);
}

export function* watchriderFinanceDropDownListWorker() {
  yield takeLatest(RIDER_FINANCE_DROPDOWN_LIST, riderFinanceDropDownListWorker);
}
