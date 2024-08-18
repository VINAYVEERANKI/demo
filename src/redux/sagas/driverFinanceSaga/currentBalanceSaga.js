import { call, takeLatest } from "redux-saga/effects";
import { DRFIN_CUR_BAL_DRP_DWN, DRFIN_CUR_BAL_FIND_ONE, DRFIN_CUR_BAL_LIST } from "../../actions/types";
import { dFinaCurBalFindOneApi, dFinaCurBalListApi, drifinCurbalDropDownListApi } from "../../apis/driverFinanceApi/currentBalance";

export function* driverFinanceCurrentBalanceListWorker(action) {
    try {
      const res = yield call(
        dFinaCurBalListApi,
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

  export function* driverFinanceCurrentBalanceFindOneWorker(action) {
    try {
      const res = yield call(
        dFinaCurBalFindOneApi,
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

  export function* drifinCurbalDropDownListWorker(action) {
    try {
      const res = yield call(drifinCurbalDropDownListApi);
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

  export function* watchDriverFinanceCurrentBalanceListWorker() {
    yield takeLatest(
      DRFIN_CUR_BAL_LIST,
        driverFinanceCurrentBalanceListWorker
    );
  }

  export function* watchDriverFinanceCurrentBalanceFindOneWorker() {
    yield takeLatest(
      DRFIN_CUR_BAL_FIND_ONE,
        driverFinanceCurrentBalanceFindOneWorker
    );
  }

  export function* watchDrifinCurbalDropdownListWorker() {
    yield takeLatest(DRFIN_CUR_BAL_DRP_DWN, drifinCurbalDropDownListWorker);
  }
