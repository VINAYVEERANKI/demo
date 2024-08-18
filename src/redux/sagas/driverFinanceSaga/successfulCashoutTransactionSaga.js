import { call, takeLatest } from "redux-saga/effects";
import { dFinSucesCashTransHisFindOneApi, dFinSucesCashTransHisListApi, drifinSucescashDropDownListApi } from "../../apis/driverFinanceApi/successfulCashoutTransaction";
import { DRFIN_SUCES_CASH_DRP_DWN, DRFIN_SUCES_CASH_TRANS_HIST_FIND_ONE, DRFIN_SUCES_CASH_TRANS_HIST_LIST } from "../../actions/types";

export function* driverFinanceSuccessfulCashoutListWorker(action) {
    try {
      const res = yield call(
        dFinSucesCashTransHisListApi,
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

  export function* driverFinanceSuccessfulCashoutFindOneWorker(action) {
    try {
      const res = yield call(
        dFinSucesCashTransHisFindOneApi,
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

  export function* drifinSucescashDropDownListWorker(action) {
    try {
      const res = yield call(drifinSucescashDropDownListApi);
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


  export function* watchDriverFinanceSuccessfulCashoutListWorker() {
    yield takeLatest(
      DRFIN_SUCES_CASH_TRANS_HIST_LIST,
      driverFinanceSuccessfulCashoutListWorker
    );
  }

  export function* watchDriverFinanceSuccessfulCashoutFindOneWorker() {
    yield takeLatest(
      DRFIN_SUCES_CASH_TRANS_HIST_FIND_ONE,
        driverFinanceSuccessfulCashoutFindOneWorker
    );
  }

  export function* watchDrifinSucescashDropdownListWorker() {
    yield takeLatest(DRFIN_SUCES_CASH_DRP_DWN, drifinSucescashDropDownListWorker);
  }