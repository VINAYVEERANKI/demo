import { call, takeLatest } from "redux-saga/effects";
import {
  dFinCashoutTransHisFindOneApi,
  dFinCashoutTransHisListApi,
  drifinCashouttransDropDownListApi,
} from "../../apis/driverFinanceApi/cashoutTransactionHistory";
import {
  DRFIN_CASHOUT_TRANS_DRP_DWN,
  DRFIN_CASHOUT_TRANS_HIST_FIND_ONE,
  DRFIN_CASHOUT_TRANS_HIST_LIST,
} from "../../actions/types";

export function* driverFinanceCashOutTransactionHistoryListWorker(action) {
  try {
    const res = yield call(
      dFinCashoutTransHisListApi,
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

export function* driverFinanceCashOutTransactionHistoryFindOneWorker(action) {
  try {
    const res = yield call(
      dFinCashoutTransHisFindOneApi,
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

export function* drifinCashouttransDropDownListWorker(action) {
  try {
    const res = yield call(drifinCashouttransDropDownListApi);
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

export function* watchDriverFinanceCashOutTransactionHistoryListWorker() {
  yield takeLatest(
    DRFIN_CASHOUT_TRANS_HIST_LIST,
    driverFinanceCashOutTransactionHistoryListWorker
  );
}

export function* watchDriverFinanceCashOutTransactionHistoryFindOneWorker() {
  yield takeLatest(
    DRFIN_CASHOUT_TRANS_HIST_FIND_ONE,
    driverFinanceCashOutTransactionHistoryFindOneWorker
  );
}

export function* watchDrifinCashouttransDropdownListWorker() {
  yield takeLatest(
    DRFIN_CASHOUT_TRANS_DRP_DWN,
    drifinCashouttransDropDownListWorker
  );
}
