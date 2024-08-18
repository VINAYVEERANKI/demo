import { call, takeLatest } from "redux-saga/effects";
import { DRFIN_CASH_TRANS_DRP_DWN, DRFIN_CREATE_CASH_TRANS_HIST_FIND_ONE, DRFIN_CREATE_CASH_TRANS_HIST_LIST } from "../../actions/types";
import { dFinCashTransHisFindOneApi, dFinCashTransHisListApi, drifinCashtransDropDownListApi } from "../../apis/driverFinanceApi/cashTransactionHistory";

export function* driverFinanceCashTransactionHistoryListWorker(action) {
    try {
      const res = yield call(
        dFinCashTransHisListApi,
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

  export function* driverFinanceCashTransactionHistoryFindOneWorker(action) {
    try {
      const res = yield call(
        dFinCashTransHisFindOneApi,
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

  export function* drifinCashtransDropDownListWorker(action) {
    try {
      const res = yield call(drifinCashtransDropDownListApi);
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

  export function* watchDriverFinanceCashTransactionHistoryListWorker() {
    yield takeLatest(
      DRFIN_CREATE_CASH_TRANS_HIST_LIST,
        driverFinanceCashTransactionHistoryListWorker
    );
  }

  export function* watchDriverFinanceCashTransactionHistoryFindOneWorker() {
    yield takeLatest(
      DRFIN_CREATE_CASH_TRANS_HIST_FIND_ONE,
        driverFinanceCashTransactionHistoryFindOneWorker
    );
  }

  export function* watchDrifinCashtransDropdownListWorker() {
    yield takeLatest(DRFIN_CASH_TRANS_DRP_DWN, drifinCashtransDropDownListWorker);
  }