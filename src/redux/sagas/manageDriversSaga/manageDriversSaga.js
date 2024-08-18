import { call, put, takeLatest } from "redux-saga/effects";
import {
  APPROVE_DRIVER_ACCOUNT,
  BANNED_DRIVER_DROPDOWN_LIST,
  BAN_DRIVER_ACCOUNT,
  BLOCKED_DRIVER_DROPDOWN_LIST,
  BLOCK_DRIVER_ACCOUNT,
  DELETED_DRIVER_DROPDOWN_LIST,
  DELETE_DRIVER_ACCOUNT,
  DRIVER_ADDRESS_PROOF_EDIT,
  DRIVER_BANK_DETAILS_EDIT,
  DRIVER_BG_VERIF_EDIT,
  DRIVER_DL_EDIT,
  DRIVER_DROPDOWN_LIST,
  DRIVER_LIST,
  DRIVER_PHY_VERIF_EDIT,
  DRIVER_PREMIUM_HISTORY,
  DRIVER_PREMIUM_LIST_ACTION,
  DRIVER_PROFILE_EDIT,
  DRIVER_PROFILE_PIC_EDIT,
  DRIVER_PROFILE_READ,
  DRIVER_RC_EDIT,
  DRIVER_VEHICLE_EDIT,
  DRIVER_VEHICLE_IMAGE_EDIT,
  DRIVER_VIEW,
  DRIVER_VI_EDIT,
  EXPIRED_DOCUMENT_DROPDOWN_LIST,
  PENDING_DROPDOWN_LIST,
  PER_DELETED_DRIVER_DROPDOWN_LIST,
  REJECTED_DRIVER_DROPDOWN_LIST,
  REJECT_DRIVER_ACCOUNT,
  VEHICLETYPE_MODEL_COLOR_LIST,
} from "../../actions/types";
import * as driverApis from "../../apis/manageDriversApi";
import {
  MANAGE_DRIVER_DATA_FAILED,
  MANAGE_DRIVER_DATA_LOADED,
  MANAGE_DRIVER_DATA_LOADING,
} from "../../actions/returnTypes";

export function* driverDropDownListWorker(action) {
  try {
    const res = yield call(driverApis.driverdropDownListApi);
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
export function* pendDropDownListWorker(action) {
  try {
    const res = yield call(driverApis.penddropDownListApi);
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
export function* expiredDropDownListWorker(action) {
  try {
    const res = yield call(driverApis.expireddropDownListApi);
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
    const res = yield call(driverApis.blockeddropDownListApi);
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
export function* rejdriverDropDownListWorker(action) {
  try {
    const res = yield call(driverApis.rejecteddropDownListApi);
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
export function* bannedDriverDropDownListWorker(action) {
  try {
    const res = yield call(driverApis.banneddropDownListApi);
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
export function* deletedDriverDropDownListWorker(action) {
  try {
    const res = yield call(driverApis.deletedDriverdropDownListApi);
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
export function* perdelDriverDropDownListWorker(action) {
  try {
    const res = yield call(driverApis.perdeletedDriverdropDownListApi);
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

export function* driverListWorker(action) {
  try {
    const res = yield call(
      driverApis.driverListApi,
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

export function* driverViewWorker(action) {
  try {
    const res = yield call(
      driverApis.driverViewApi,
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

export function* driverPremiumHistoryWorker(action) {
  console.log(action);
  try {
    const res = yield call(
      driverApis.driverPremiumHistoryApi,
      action.current_page,
      action.data.driver_id
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

export function* driverProfileReadWorker(action) {
  try {
    yield put({ type: MANAGE_DRIVER_DATA_LOADING });
    const res = yield call(driverApis.driverProfileReadApi, action.data);
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield put({ type: MANAGE_DRIVER_DATA_LOADED, data: res?.data });
    } else if (res.status === 200 && res.data.status === "fail") {
      yield put({
        type: MANAGE_DRIVER_DATA_FAILED,
        data: "Something Went Wrong! Please Try Again Later",
      });
    } else {
      yield put({
        type: MANAGE_DRIVER_DATA_FAILED,
        data: "Something Went Wrong! Please Try Again Later",
      });
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}
export function* driverProfileEditWorker(action) {
  try {
    const res = yield call(
      driverApis.driverProfileEditApi,
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
export function* driverVehicleEditWorker(action) {
  try {
    const res = yield call(
      driverApis.driverVehicleEditApi,
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
export function* banDriverWorker(action) {
  try {
    const res = yield call(driverApis.banDriverApi, action.id, action.data);
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
export function* deleteDriverWorker(action) {
  try {
    const res = yield call(driverApis.deleteDriverApi, action.id, action.data);
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
export function* blockDriverWorker(action) {
  try {
    const res = yield call(driverApis.blockDriverApi, action.id, action.data);
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
export function* approveDriverWorker(action) {
  try {
    const res = yield call(driverApis.approveDriverApi, action.data);
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
export function* rejectDriverWorker(action) {
  try {
    const res = yield call(driverApis.rejectDriverApi, action.data);
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
export function* driverbankdetailsWorker(action) {
  try {
    const res = yield call(driverApis.driverbankdetailsApi, action.data);
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
export function* rejectdApplicantadressproofWorker(action) {
  try {
    const res = yield call(driverApis.driveradressproofApi, action.data);
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

export function* driverDLWorker(action) {
  try {
    const res = yield call(driverApis.driverDLApi, action.data);
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
export function* driverprofilePicWorker(action) {
  try {
    const res = yield call(driverApis.driverprofilePicApi, action.data);
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

export function* driverBGverifWorker(action) {
  try {
    const res = yield call(driverApis.driverBGverifApi, action.data);
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

export function* driverVIWorker(action) {
  try {
    const res = yield call(driverApis.driverVIApi, action.data);
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

export function* driverRCWorker(action) {
  try {
    const res = yield call(driverApis.driverRCApi, action.data);
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

export function* driverVehiclePicWorker(action) {
  try {
    const res = yield call(driverApis.driverVehiclePicApi, action.data);
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

export function* driverPHYverifWorker(action) {
  try {
    const res = yield call(
      driverApis.driverPHYverifApi,

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
export function* driverPremiumListWorker(action) {
  try {
    const res = yield call(driverApis.driverPremiumListApi, action.data);
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
export function* VehicleModalColorWorker(action) {
  try {
    const res = yield call(driverApis.driverColorModalApi, action.id);
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
export function* watchdriverDropdownListWorker() {
  yield takeLatest(DRIVER_DROPDOWN_LIST, driverDropDownListWorker);
}
export function* watchpendDropdownListWorker() {
  yield takeLatest(PENDING_DROPDOWN_LIST, pendDropDownListWorker);
}
export function* watchblockeddriverDropdownListWorker() {
  yield takeLatest(BLOCKED_DRIVER_DROPDOWN_LIST, blockedDropDownListWorker);
}
export function* watchbannedDropdownListWorker() {
  yield takeLatest(BANNED_DRIVER_DROPDOWN_LIST, bannedDriverDropDownListWorker);
}
export function* watchexpiredDropdownListWorker() {
  yield takeLatest(EXPIRED_DOCUMENT_DROPDOWN_LIST, expiredDropDownListWorker);
}
export function* watchrejdriverDropdownListWorker() {
  yield takeLatest(REJECTED_DRIVER_DROPDOWN_LIST, rejdriverDropDownListWorker);
}
export function* watchdelDriverDropdownListWorker() {
  yield takeLatest(
    DELETED_DRIVER_DROPDOWN_LIST,
    deletedDriverDropDownListWorker
  );
}
export function* watchperdelDropdownListWorker() {
  yield takeLatest(
    PER_DELETED_DRIVER_DROPDOWN_LIST,
    perdelDriverDropDownListWorker
  );
}

export function* watchDriverListWorker() {
  yield takeLatest(DRIVER_LIST, driverListWorker);
}
export function* watchDriverViewWorker() {
  yield takeLatest(DRIVER_VIEW, driverViewWorker);
}
export function* watchDriverPremiumHistoryWorker() {
  yield takeLatest(DRIVER_PREMIUM_HISTORY, driverPremiumHistoryWorker);
}
export function* watchDriverProfileReadWorker() {
  yield takeLatest(DRIVER_PROFILE_READ, driverProfileReadWorker);
}

export function* watchdriverProfileEditWorker() {
  yield takeLatest(DRIVER_PROFILE_EDIT, driverProfileEditWorker);
}
export function* watchdriverVehicleEditWorker() {
  yield takeLatest(DRIVER_VEHICLE_EDIT, driverVehicleEditWorker);
}
export function* watchBanDriverWorker() {
  yield takeLatest(BAN_DRIVER_ACCOUNT, banDriverWorker);
}
export function* watchDeleteDriverWorker() {
  yield takeLatest(DELETE_DRIVER_ACCOUNT, deleteDriverWorker);
}
export function* watchBlockDriverWorker() {
  yield takeLatest(BLOCK_DRIVER_ACCOUNT, blockDriverWorker);
}
export function* watchApproveDriverWorker() {
  yield takeLatest(APPROVE_DRIVER_ACCOUNT, approveDriverWorker);
}
export function* watchRejectDriverWorker() {
  yield takeLatest(REJECT_DRIVER_ACCOUNT, rejectDriverWorker);
}

export function* watchdriverBankDetailsWorker() {
  yield takeLatest(DRIVER_BANK_DETAILS_EDIT, driverbankdetailsWorker);
}
export function* watchdriveraddressProofWorker() {
  yield takeLatest(
    DRIVER_ADDRESS_PROOF_EDIT,
    rejectdApplicantadressproofWorker
  );
}

export function* watchdriverDlWorker() {
  yield takeLatest(DRIVER_DL_EDIT, driverDLWorker);
}
export function* watchdriverprofilePicWorker() {
  yield takeLatest(DRIVER_PROFILE_PIC_EDIT, driverprofilePicWorker);
}
export function* watchdriverbgverifWorker() {
  yield takeLatest(DRIVER_BG_VERIF_EDIT, driverBGverifWorker);
}
export function* watchdriverVIWorker() {
  yield takeLatest(DRIVER_VI_EDIT, driverVIWorker);
}

export function* watchdriverRCWorker() {
  yield takeLatest(DRIVER_RC_EDIT, driverRCWorker);
}
export function* watchdrivervehicleImageWorker() {
  yield takeLatest(DRIVER_VEHICLE_IMAGE_EDIT, driverVehiclePicWorker);
}
export function* watchdriverphyverifWorker() {
  yield takeLatest(DRIVER_PHY_VERIF_EDIT, driverPHYverifWorker);
}
export function* watchdriverPremiumListWorker() {
  yield takeLatest(DRIVER_PREMIUM_LIST_ACTION, driverPremiumListWorker);
}
export function* watchVehicleModalColorWorker() {
  yield takeLatest(VEHICLETYPE_MODEL_COLOR_LIST, VehicleModalColorWorker);
}