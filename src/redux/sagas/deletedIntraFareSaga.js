import { call, takeLatest } from "redux-saga/effects";
import {
  ARCH_DEL_INTRA_FARES_INDIVIDUAL,
  ARCH_DEL_INTRA_FARES_LOCAL_IND_LIST,
  ARCH_DEL_INTRA_FARES_LOCAL_LIST,
  ARCH_DEL_INTRA_FARES_ONE_WAY_LIST,
  ARCH_DEL_INTRA_FARES_SPECIAL_LIST,
  ARCH_DEL_INTRA_FARES_TOLL_LIST,
  DELETED_INTRA_FARES_INDIVIDUAL,
  DELETED_INTRA_FARES_LIST,
  DELETED_INTRA_FARES_LOCAL_INDIVIDUAL_LIST,
  DELETED_INTRA_FARES_LOCAL_LIST,
  DELETED_INTRA_FARES_ONE_WAY_LIST,
  DELETED_INTRA_FARES_SPECIAL_LIST,
  DELETED_INTRA_FARES_TOLL_LIST,
} from "../actions/types";
import * as deletedIntraFareApi from "../apis/deletedIntraFareApi";

export function* deletedIntraFaresListWorker(action) {
  try {
    const res = yield call(
      deletedIntraFareApi.deletedIntraFaresListApi,
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
export function* deletedIntraFaresLocalListWorker(action) {
  try {
    const res = yield call(
      deletedIntraFareApi.deletedIntraFaresLocalListApi,
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
export function* deletedIntraFaresLocalIndiviListWorker(action) {
  try {
    const res = yield call(
      deletedIntraFareApi.deletedIntraFaresLocalIndiviListApi,
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
export function* deletedIntraFaresSpecialListWorker(action) {
  try {
    const res = yield call(
      deletedIntraFareApi.deletedIntraFaresSpecialListApi,
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
export function* deletedIntraFaresTollsListWorker(action) {
  try {
    const res = yield call(
      deletedIntraFareApi.deletedIntraFaresTollsListApi,
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
export function* deletedIntraFaresOneWayListWorker(action) {
  try {
    const res = yield call(
      deletedIntraFareApi.deletedIntraFaresOnewayListApi,
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
export function* delintraFaresIndiviWorker(action) {
  try {
    const res = yield call(
      deletedIntraFareApi.delintraFaresIndividualApi,
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
export function* archivedelIntraFaresLocalListWorker(action) {
  try {
    const res = yield call(
      deletedIntraFareApi.archivedelIntraFaresLocalListApi,
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
export function* archivedelIntraFaresLocalIndiviListWorker(action) {
  try {
    const res = yield call(
      deletedIntraFareApi.archivedelIntraFaresLocalIndiviListApi,
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
export function* archivedelIntraFaresSpecialListWorker(action) {
  try {
    const res = yield call(
      deletedIntraFareApi.archivedelIntraFaresSpecialListApi,
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
export function* archivedelIntraFaresTollsListWorker(action) {
  try {
    const res = yield call(
      deletedIntraFareApi.archivedelIntraFaresTollsListApi,
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
export function* archivedelIntraFaresOneWayListWorker(action) {
  try {
    const res = yield call(
      deletedIntraFareApi.archivedelIntraFaresOnewayListApi,
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

export function* archivedDelintraFaresIndiviWorker(action) {
  try {
    const res = yield call(
      deletedIntraFareApi.archiveDelintraFaresIndividualApi,
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
export function* watchDeletedIntraFaresListWorker() {
  yield takeLatest(DELETED_INTRA_FARES_LIST, deletedIntraFaresListWorker);
}
export function* watchDeletedIntraFaresLocalListWorker() {
  yield takeLatest(
    DELETED_INTRA_FARES_LOCAL_LIST,
    deletedIntraFaresLocalListWorker
  );
}
export function* watchDeletedIntraFaresLocalIndiviListWorker() {
  yield takeLatest(
    DELETED_INTRA_FARES_LOCAL_INDIVIDUAL_LIST,
    deletedIntraFaresLocalIndiviListWorker
  );
}
export function* watchDeletedIntraFaresSpecialListWorker() {
  yield takeLatest(
    DELETED_INTRA_FARES_SPECIAL_LIST,
    deletedIntraFaresSpecialListWorker
  );
}
export function* watchDeletedIntraFaresTollsListWorker() {
  yield takeLatest(
    DELETED_INTRA_FARES_TOLL_LIST,
    deletedIntraFaresTollsListWorker
  );
}
export function* watchDeletedIntraFaresOnewayListWorker() {
  yield takeLatest(
    DELETED_INTRA_FARES_ONE_WAY_LIST,
    deletedIntraFaresOneWayListWorker
  );
}
export function* watchDelintraFaresIndiviWorker() {
  yield takeLatest(DELETED_INTRA_FARES_INDIVIDUAL, delintraFaresIndiviWorker);
}

export function* watcharchivedelIntraFaresLocalListWorker() {
  yield takeLatest(
    ARCH_DEL_INTRA_FARES_LOCAL_LIST,
    archivedelIntraFaresLocalListWorker
  );
}

export function* watcharchivedelIntraFaresLocalIndiviListWorker() {
  yield takeLatest(
    ARCH_DEL_INTRA_FARES_LOCAL_IND_LIST,
    archivedelIntraFaresLocalIndiviListWorker
  );
}
export function* watcharchivedelIntraFaresSpecialListWorker() {
  yield takeLatest(
    ARCH_DEL_INTRA_FARES_SPECIAL_LIST,
    archivedelIntraFaresSpecialListWorker
  );
}
export function* watcharchivedelIntraFaresTollsListWorker() {
  yield takeLatest(
    ARCH_DEL_INTRA_FARES_TOLL_LIST,
    archivedelIntraFaresTollsListWorker
  );
}
export function* watcharchivedelIntraFaresOnewayListWorker() {
  yield takeLatest(
    ARCH_DEL_INTRA_FARES_ONE_WAY_LIST,
    archivedelIntraFaresOneWayListWorker
  );
}

export function* watcharchivedDelintraFaresIndiviWorker() {
  yield takeLatest(
    ARCH_DEL_INTRA_FARES_INDIVIDUAL,
    archivedDelintraFaresIndiviWorker
  );
}
