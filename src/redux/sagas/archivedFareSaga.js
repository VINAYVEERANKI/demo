import { call, takeLatest } from "redux-saga/effects";
import {
  ARCHIVED_FARES_LOCAL_ZONES_LIST,
  ARCHIVED_FARES_LOCAL_ZONE_DROPDOWN_LIST,
  ARCHIVED_FARES_LOCAL_ZONE_INDIVIDUAL,
  ARCHIVED_FARES_ONEWAY_TRIP_INDIVIDUAL,
  ARCHIVED_FARES_ONEWAY_TRIP_LIST,
  ARCHIVED_FARES_RENTAL_INDIVIDUAL,
  ARCHIVED_FARES_ROUND_TRIP_INDIVIDUAL,
  ARCHIVED_FARES_ROUND_TRIP_LIST,
  ARCHIVED_FARES_SPECIAL_ZONE_INDIVIDUAL,
  ARCHIVED_FARES_TOLLS_ZONE_INDIVIDUAL,
  ARCHIVED_FARES_TOLLS_ZONE_LIST,
  LOCAL_CREATE_ARCHIVED_FARES,
  ARCHIVED_FARES_RENTAL_LIST,
  ARCHIVED_FARES_SPECIAL_ZONE_LIST,
  ARCHIVED_FARES_LIST,
} from "../actions/types";
import * as archivedFaresApi from "../apis/archivedfaresApi";

export function* ArchivedFaresListWorker(action) {
  try {
    const res = yield call(
      archivedFaresApi.ArchivedFaresListApi,
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
export function* ArchivedSpecialfaresListWorker(action) {
  try {
    const res = yield call(
      archivedFaresApi.ArchivedSpecialfaresListApi,
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
export function* ArchivedSpecialFaresWorker(action) {
  try {
    const res = yield call(
      archivedFaresApi.ArchivedSpecialFaresApi,
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

export function* ArchivedTollsListWorker(action) {
  try {
    const res = yield call(
      archivedFaresApi.ArchivedTollsListApi,
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
export function* ArchivedTollsFaresWorker(action) {
  try {
    const res = yield call(archivedFaresApi.ArchivedTollsFaresApi, action.data);
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

export function* ArchivedOneWaytripListWorker(action) {
  try {
    const res = yield call(
      archivedFaresApi.ArchivedOneWaytripListApi,
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
export function* ArchivedOneWaytripFaresWorker(action) {
  try {
    const res = yield call(
      archivedFaresApi.ArchivedOneWaytripFaresApi,
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

export function* ArchivedRoundTripListWorker(action) {
  try {
    const res = yield call(
      archivedFaresApi.ArchivedRoundTripListApi,
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
export function* ArchivedRoundTripFaresWorker(action) {
  try {
    const res = yield call(
      archivedFaresApi.ArchivedRoundTripFaresApi,
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

export function* ArchivedLocalDropDownListWorker(action) {
  try {
    const res = yield call(
      archivedFaresApi.ArchivedLocalDropDownListApi,
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
export function* ArchivedLocalCreateWorker(action) {
  try {
    const res = yield call(
      archivedFaresApi.ArchivedLocalCreateApi,
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
export function* ArchivedLocalFaresListWorker(action) {
  try {
    const res = yield call(
      archivedFaresApi.ArchivedLocalFaresListApi,
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
export function* ArchivedLocalFaresWorker(action) {
  try {
    const res = yield call(archivedFaresApi.ArchivedLocalFaresApi, action.data);
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

export function* ArchivedRentalListWorker(action) {
  try {
    const res = yield call(
      archivedFaresApi.ArchivedRentalListApi,
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
export function* ArchivedRentalWorker(action) {
  try {
    const res = yield call(archivedFaresApi.ArchivedRentalApi, action.data);
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

export function* watchArchivedFaresListWorker() {
  yield takeLatest(ARCHIVED_FARES_LIST, ArchivedFaresListWorker);
}
export function* watchArchivedSpecialfaresListWorker() {
  yield takeLatest(
    ARCHIVED_FARES_SPECIAL_ZONE_LIST,
    ArchivedSpecialfaresListWorker
  );
}
export function* watchArchivedSpecialFaresWorker() {
  yield takeLatest(
    ARCHIVED_FARES_SPECIAL_ZONE_INDIVIDUAL,
    ArchivedSpecialFaresWorker
  );
}

export function* watchArchivedTollsListWorker() {
  yield takeLatest(ARCHIVED_FARES_TOLLS_ZONE_LIST, ArchivedTollsListWorker);
}
export function* watchArchivedTollsFaresWorker() {
  yield takeLatest(
    ARCHIVED_FARES_TOLLS_ZONE_INDIVIDUAL,
    ArchivedTollsFaresWorker
  );
}

export function* watchArchivedOneWaytripListWorker() {
  yield takeLatest(
    ARCHIVED_FARES_ONEWAY_TRIP_LIST,
    ArchivedOneWaytripListWorker
  );
}
export function* watchArchivedOneWaytripFaresWorker() {
  yield takeLatest(
    ARCHIVED_FARES_ONEWAY_TRIP_INDIVIDUAL,
    ArchivedOneWaytripFaresWorker
  );
}

export function* watchArchivedRoundTripListWorker() {
  yield takeLatest(ARCHIVED_FARES_ROUND_TRIP_LIST, ArchivedRoundTripListWorker);
}
export function* watchArchivedRoundTripFaresWorker() {
  yield takeLatest(
    ARCHIVED_FARES_ROUND_TRIP_INDIVIDUAL,
    ArchivedRoundTripFaresWorker
  );
}

export function* watchArchivedLocalDropDownListWorker() {
  yield takeLatest(
    ARCHIVED_FARES_LOCAL_ZONE_DROPDOWN_LIST,
    ArchivedLocalDropDownListWorker
  );
}
export function* watchArchivedLocalCreateWorker() {
  yield takeLatest(LOCAL_CREATE_ARCHIVED_FARES, ArchivedLocalCreateWorker);
}
export function* watchArchivedLocalFaresListWorker() {
  yield takeLatest(
    ARCHIVED_FARES_LOCAL_ZONES_LIST,
    ArchivedLocalFaresListWorker
  );
}
export function* watchArchivedLocalFaresWorker() {
  yield takeLatest(
    ARCHIVED_FARES_LOCAL_ZONE_INDIVIDUAL,
    ArchivedLocalFaresWorker
  );
}

export function* watchArchivedRentalListWorker() {
  yield takeLatest(ARCHIVED_FARES_RENTAL_LIST, ArchivedRentalListWorker);
}
export function* watchArchivedRentalWorker() {
  yield takeLatest(ARCHIVED_FARES_RENTAL_INDIVIDUAL, ArchivedRentalWorker);
}
