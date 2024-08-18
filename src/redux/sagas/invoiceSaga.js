import { call, takeLatest } from "redux-saga/effects";
import { TRIP_INVOICE, TRIP_INVOICE_DROPDOWN_LIST, TRIP_INVOICE_LIST } from "../actions/types";
import * as tripInvoiceApis from "../apis/invoiceApi";

export function* tripInvoiceListWorker(action) {
  try {
    const res = yield call(
      tripInvoiceApis?.tripInvoiceListApi,
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

export function* tripInvoiceWorker(action) {
  try {
    const res = yield call(tripInvoiceApis?.tripInvoiceApi, action.data);
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
export function* tripInvoiceDropDownListWorker(action) {
  try {
    const res = yield call(tripInvoiceApis?.tripInvoiceDropDownListApi);
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
export function* watchtripInvoiceListWorker() {
  yield takeLatest(TRIP_INVOICE_LIST, tripInvoiceListWorker);
}
export function* watchtripInvoiceWorker() {
  yield takeLatest(TRIP_INVOICE, tripInvoiceWorker);
}
export function* watchtripInvoiceDropDownListWorker() {
  yield takeLatest(TRIP_INVOICE_DROPDOWN_LIST, tripInvoiceDropDownListWorker);
}
