import {
  DEFAULT_RIDE_TYPE_LIST,
  EDIT_LOCAL_DEFAULT_FARE,
  EDIT_ONEWAY_PACKAGE_DETAILS,
  EDIT_ONEWAY_TRIP_FARE,
  EDIT_RENTAL_FARE,
  EDIT_ROUND_TRIP_FARE,
  EDIT_ROUND_TRIP_PACKAGE_DETAILS,
  EDIT_SPECIAL_ZONE_FARE,
  EDIT_TOLLS_FARE,
  LOCAL_DEFAULT_FARE_VALUE,
  ONEWAY_TRIP_FARE_VALUE,
  RENTAL_FARE_VALUE,
  ROUND_TRIP_FARE_VALUE,
  SPECIAL_ZONE_FARE_VALUE,
  TOLLS_FARE_VALUE,
} from "../actions/types";
import * as defaultFareApi from "../apis/defaultFareApi";
import { call, takeLatest } from "redux-saga/effects";
export function* localDefaultFareValueWorker(action) {
  try {
    const res = yield call(defaultFareApi.localDefaultFareValueApi);
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
export function* EditLocalDefaultfareWorker(action) {
  try {
    const res = yield call(defaultFareApi.EditLocalDefaultfareApi, action.data);
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
export function* specialZoneFareValueWorker(action) {
  try {
    const res = yield call(defaultFareApi.specialZoneFareValueApi);
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
export function* EditSpecialZonefareWorker(action) {
  try {
    const res = yield call(defaultFareApi.EditSpecialZonefareApi, action.data);
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
export function* RentalFareValueWorker(action) {
  try {
    const res = yield call(defaultFareApi.RentalFareValueApi, action.data);
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
export function* EditRentalFareWorker(action) {
  try {
    const res = yield call(defaultFareApi.EditRentalFareApi, action.data);
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
export function* tollsFareValueWorker(action) {
  try {
    const res = yield call(defaultFareApi.tollsFareValueApi);
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
export function* EditTollsfareWorker(action) {
  try {
    const res = yield call(defaultFareApi.EditTollsfareApi, action.data);
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
export function* OnewayTripFareValueWorker(action) {
  try {
    const res = yield call(defaultFareApi.OnewayTripFareValueApi);
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
export function* EditOnewayPackageDetailsWorker(action) {
  try {
    const res = yield call(
      defaultFareApi.EditOnewayPackageDetailsApi,
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
export function* EditOneWayTripfareWorker(action) {
  try {
    const res = yield call(defaultFareApi.EditOneWayTripfareApi, action.data);
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
export function* RoundTripFareValueWorker(action) {
  try {
    const res = yield call(defaultFareApi.RoundTripFareValueApi);
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
export function* EditRoundTripPackageDetailsWorker(action) {
  try {
    const res = yield call(
      defaultFareApi.EditRoundTripPackageDetailsApi,
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
export function* EditRoundTripfareWorker(action) {
  try {
    const res = yield call(defaultFareApi.EditRoundTripfareApi, action.data);
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
export function* defaultRideTypeListWorker(action) {
  try {
    const res = yield call(defaultFareApi.defaultRideTypeListApi);
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
export function* watchlocalDefaultFareValueWorker() {
  yield takeLatest(LOCAL_DEFAULT_FARE_VALUE, localDefaultFareValueWorker);
}
export function* watchEditLocalDefaultfareWorker() {
  yield takeLatest(EDIT_LOCAL_DEFAULT_FARE, EditLocalDefaultfareWorker);
}
export function* watchSpecialZoneFareValueWorker() {
  yield takeLatest(SPECIAL_ZONE_FARE_VALUE, specialZoneFareValueWorker);
}
export function* watchEditSpecialZonefareWorker() {
  yield takeLatest(EDIT_SPECIAL_ZONE_FARE, EditSpecialZonefareWorker);
}
export function* watchRentalFareValueWorker() {
  yield takeLatest(RENTAL_FARE_VALUE, RentalFareValueWorker);
}
export function* watchEditRentalFareWorker() {
  yield takeLatest(EDIT_RENTAL_FARE, EditRentalFareWorker);
}
export function* watchtollsFareValueWorker() {
  yield takeLatest(TOLLS_FARE_VALUE, tollsFareValueWorker);
}
export function* watchEditTollsfareWorker() {
  yield takeLatest(EDIT_TOLLS_FARE, EditTollsfareWorker);
}
export function* watchOnewayTripFareValueWorker() {
  yield takeLatest(ONEWAY_TRIP_FARE_VALUE, OnewayTripFareValueWorker);
}
export function* watchEditOneWayTripfareWorker() {
  yield takeLatest(EDIT_ONEWAY_TRIP_FARE, EditOneWayTripfareWorker);
}
export function* watchEditOnewayPackageDetailsWorker() {
  yield takeLatest(EDIT_ONEWAY_PACKAGE_DETAILS, EditOnewayPackageDetailsWorker);
}
export function* watchRoundTripFareValueWorker() {
  yield takeLatest(ROUND_TRIP_FARE_VALUE, RoundTripFareValueWorker);
}
export function* watchEditRoundTripfareWorker() {
  yield takeLatest(EDIT_ROUND_TRIP_FARE, EditRoundTripfareWorker);
}
export function* watchEditRoundTripPackageDetailsWorker() {
  yield takeLatest(
    EDIT_ROUND_TRIP_PACKAGE_DETAILS,
    EditRoundTripPackageDetailsWorker
  );
}
export function* watchdefaultRideTypeListWorker() {
  yield takeLatest(DEFAULT_RIDE_TYPE_LIST, defaultRideTypeListWorker);
}
