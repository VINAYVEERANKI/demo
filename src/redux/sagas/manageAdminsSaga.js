import { call, takeLatest } from "redux-saga/effects";
import {
  ADD_ADMIN,
  ADMIN_FIND_ONE,
  ADMIN_LIST,
  BLOCKED_ADMIN_EDIT,
  BLOCKED_DROPDOWN_LIST,
  BLOCK_ADMIN,
  BLOCK_ADMIN_LIST,
  DELETED_ADMIN_LIST,
  DELETED_DROPDOWN_LIST,
  DELETE_ADMIN,
  DROPDOWN_LIST,
  EDIT_ADMIN,
  UNBLOCK_ADMIN,
} from "../actions/types";
import * as adminApis from "../apis/manageAdminsApi";

export function* dropDownListWorker(action) {
  try {
    const res = yield call(adminApis.dropDownListApi);
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
export function* blockedDropDownListWorker(action) {
  try {
    const res = yield call(adminApis.blockedDropDownListApi);
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
export function* deletedDropDownListWorker(action) {
  try {
    const res = yield call(adminApis.deletedDropDownListApi);
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
export function* addAdminWorker(action) {
  try {
    const res = yield call(adminApis.addAdminApi, action.data);
    console.log(res, "AddAdmin");
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

export function* adminListWorker(action) {
  try {
    const res = yield call(
      adminApis.adminListApi,
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

export function* adminFindOneWorker(action) {
  try {
    const res = yield call(adminApis.adminFindOneApi, action.data);
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

export function* editAdminWorker(action) {
  try {
    const res = yield call(adminApis.editAdminApi, action.id, action.data);
    localStorage.setItem("editedAdminId", JSON.stringify(res?.data?.data?.id));
    localStorage.setItem(
      "editedPermissions",
      JSON.stringify(res?.data?.data?.permissions)
    );
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data, "asdasdad");
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res.data);
    } else {
      yield action.onError("Something Went Wrong!");
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}
export function* blockAdminWorker(action) {
  try {
    const res = yield call(adminApis.blockAdminApi, action.id, action.data);
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res.data);
    } else {
      yield action.onError("Something Went Wrong!");
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}
export function* deleteAdminWorker(action) {
  try {
    const res = yield call(adminApis.deleteAdminApi, action.id, action.data);
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res.data);
    } else {
      yield action.onError("Something Went Wrong!");
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}
export function* unblockAdminWorker(action) {
  try {
    const res = yield call(adminApis.unblockAdminApi, action.id, action.data);
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res.data);
    } else {
      yield action.onError("Something Went Wrong!");
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}

/*****Blocked Admins */

export function* blockAdminListWorker(action) {
  try {
    const res = yield call(
      adminApis.blockAdminListApi,
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
export function* blockedAdminEditWorker(action) {
  try {
    const res = yield call(
      adminApis.blockedEditAdminApi,
      action.id,
      action.data
    );
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res.data);
    } else {
      yield action.onError("Something Went Wrong!");
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}

/***********Deleted Admins ********/
export function* deletedAdminListWorker(action) {
  try {
    const res = yield call(
      adminApis.deletedAdminListApi,
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

export function* watchDropdownListWorker() {
  yield takeLatest(DROPDOWN_LIST, dropDownListWorker);
}
export function* watchblockedDropdownListWorker() {
  yield takeLatest(BLOCKED_DROPDOWN_LIST, blockedDropDownListWorker);
}
export function* watchdeletedDropdownListWorker() {
  yield takeLatest(DELETED_DROPDOWN_LIST, deletedDropDownListWorker);
}
export function* watchAddAdminWorker() {
  yield takeLatest(ADD_ADMIN, addAdminWorker);
}

export function* watchAdminListWorker() {
  yield takeLatest(ADMIN_LIST, adminListWorker);
}

export function* watchAdminFindOneWorker() {
  yield takeLatest(ADMIN_FIND_ONE, adminFindOneWorker);
}
export function* watchEditAdminWorker() {
  yield takeLatest(EDIT_ADMIN, editAdminWorker);
}

export function* watchBlockAdminWorker() {
  yield takeLatest(BLOCK_ADMIN, blockAdminWorker);
}
export function* watchDeleteAdminWorker() {
  yield takeLatest(DELETE_ADMIN, deleteAdminWorker);
}

export function* watchUnblockAdminWorker() {
  yield takeLatest(UNBLOCK_ADMIN, unblockAdminWorker);
}

/*****Blocked Admins */

export function* watchBlockAdminListWorker() {
  yield takeLatest(BLOCK_ADMIN_LIST, blockAdminListWorker);
}

export function* watchBlockedEditAdminWorker() {
  yield takeLatest(BLOCKED_ADMIN_EDIT, blockedAdminEditWorker);
}

/***********Deleted Admins *******/
export function* watchDeletedAdminListWorker() {
  yield takeLatest(DELETED_ADMIN_LIST, deletedAdminListWorker);
}
