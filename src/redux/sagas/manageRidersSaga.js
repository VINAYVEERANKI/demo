import { call, takeLatest } from "redux-saga/effects";
import {
  ACTIVATE_RIDER,
  BLOCKED_RIDER_DROPDOWN_LIST,
  BLOCKED_RIDER_LIST,
  BLOCKED_RIDER_VIEW,
  BLOCK_RIDER,
  DELETED_RIDER_LIST,
  DELETED_RIDER_VIEW,
  DELETE_RIDER,
  DEL_RIDER_DROPDOWN_LIST,
  PERMANENTLY_DELETE_RIDER,
  PERMANENTLY_DELETE_RIDER_LIST,
  PERMANENTLY_DELETE_RIDER_VIEW,
  PER_DEL_RIDER_DROPDOWN_LIST,
  RESET_RIDER_PICTURE,
  RESET_RIDER_RATING,
  RESTORE_RIDER,
  RIDER_DROPDOWN_LIST,
  RIDER_LIST,
  RIDER_VIEW,
  UNBLOCK_RIDER,
} from "../actions/types";
import * as riderApis from "../apis/manageRidersApi";

export function* riderDropDownListWorker(action) {
  try {
    const res = yield call(riderApis.riderDropDownListApi);
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
export function* blockedRiderDropDownListWorker(action) {
  try {
    const res = yield call(riderApis.blockedRiderDropDownListApi);
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
export function* delRiderDropDownListWorker(action) {
  try {
    const res = yield call(riderApis.delRiderDropDownListApi);
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
export function* perDelRiderDropDownListWorker(action) {
  try {
    const res = yield call(riderApis.perDelRiderDropDownListApi);
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

export function* riderListWorker(action) {
  try {
    const res = yield call(
      riderApis.riderListApi,
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

export function* riderViewWorker(action) {
  try {
    const res = yield call(
      riderApis.riderViewApi,
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

export function* resetRiderRatingWorker(action) {
  try {
    const res = yield call(
      riderApis.resetRiderRatingApi,
      action.id,
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
export function* resetRiderPictureWorker(action) {
  try {
    const res = yield call(
      riderApis.resetRiderPictureApi,
      action.id,
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
export function* activateRiderWorker(action) {
  try {
    const res = yield call(riderApis.activateRiderApi, action.id, action.data);
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
export function* blockRiderWorker(action) {
  try {
    const res = yield call(riderApis.blockRiderApi, action.id, action.data);
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
export function* deleteRiderWorker(action) {
  try {
    const res = yield call(riderApis.deleteRiderApi, action.id, action.data);
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

/*********blocked riders ***********/

export function* blockedRiderListWorker(action) {
  try {
    const res = yield call(
      riderApis.blockedRiderListApi,
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

export function* blockedRiderViewWorker(action) {
  try {
    const res = yield call(
      riderApis.blockedRiderViewApi,
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

export function* unblockRiderWorker(action) {
  try {
    const res = yield call(riderApis.unBlockRiderApi, action.id, action.data);
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

/*********Deleted riders ***********/

export function* deletedRiderListWorker(action) {
  try {
    const res = yield call(
      riderApis.deletedRiderListApi,
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

export function* deletdRiderViewWorker(action) {
  try {
    const res = yield call(
      riderApis.deletedRiderViewApi,
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

export function* restoreRiderWorker(action) {
  try {
    const res = yield call(riderApis.restoreRiderApi, action.id, action.data);
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
export function* permanentlyDeleteRiderWorker(action) {
  try {
    const res = yield call(
      riderApis.permanentlyDeleteRiderApi,
      action.id,
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

export function* permanentlyDelRiderListWorker(action) {
  try {
    const res = yield call(
      riderApis.permanentlyDelRiderListApi,
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

export function* permanentlyDelRiderViewWorker(action) {
  try {
    const res = yield call(
      riderApis.permanentlyDelRiderViewApi,
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

export function* watchRiderDropDownListWorker() {
  yield takeLatest(RIDER_DROPDOWN_LIST, riderDropDownListWorker);
}

export function* watchBlockedRiderDropDownListWorker() {
  yield takeLatest(BLOCKED_RIDER_DROPDOWN_LIST, blockedRiderDropDownListWorker);
}
export function* watchdelRiderDropDownListWorker() {
  yield takeLatest(DEL_RIDER_DROPDOWN_LIST, delRiderDropDownListWorker);
}
export function* watchperDelRiderDropDownListWorker() {
  yield takeLatest(PER_DEL_RIDER_DROPDOWN_LIST, perDelRiderDropDownListWorker);
}

export function* watchRiderListWorker() {
  yield takeLatest(RIDER_LIST, riderListWorker);
}
export function* watchRiderViewWorker() {
  yield takeLatest(RIDER_VIEW, riderViewWorker);
}
export function* watchresetRiderRatingWorker() {
  yield takeLatest(RESET_RIDER_RATING, resetRiderRatingWorker);
}
export function* watchresetRiderPictureWorker() {
  yield takeLatest(RESET_RIDER_PICTURE, resetRiderPictureWorker);
}
export function* watchactivateRiderWorker() {
  yield takeLatest(ACTIVATE_RIDER, activateRiderWorker);
}
export function* watchblockRiderWorker() {
  yield takeLatest(BLOCK_RIDER, blockRiderWorker);
}
export function* watchdeleteRiderWorker() {
  yield takeLatest(DELETE_RIDER, deleteRiderWorker);
}

/*********blocked riders ***********/

export function* watchblockedRiderListWorker() {
  yield takeLatest(BLOCKED_RIDER_LIST, blockedRiderListWorker);
}
export function* watchblockedRiderViewWorker() {
  yield takeLatest(BLOCKED_RIDER_VIEW, blockedRiderViewWorker);
}
export function* watchUnblockRiderViewWorker() {
  yield takeLatest(UNBLOCK_RIDER, unblockRiderWorker);
}

/*********Deleted riders ***********/

export function* watchDeletedRiderListWorker() {
  yield takeLatest(DELETED_RIDER_LIST, deletedRiderListWorker);
}

export function* watchDeletedRiderViewWorker() {
  yield takeLatest(DELETED_RIDER_VIEW, deletdRiderViewWorker);
}
export function* watchRestoreRiderViewWorker() {
  yield takeLatest(RESTORE_RIDER, restoreRiderWorker);
}
export function* watchPermanentlyDeleteRiderWorker() {
  yield takeLatest(PERMANENTLY_DELETE_RIDER, permanentlyDeleteRiderWorker);
}

export function* watchpermanentDelRiderListWorker() {
  yield takeLatest(
    PERMANENTLY_DELETE_RIDER_LIST,
    permanentlyDelRiderListWorker
  );
}

export function* watchpermanentDelRiderViewWorker() {
  yield takeLatest(
    PERMANENTLY_DELETE_RIDER_VIEW,
    permanentlyDelRiderViewWorker
  );
}
