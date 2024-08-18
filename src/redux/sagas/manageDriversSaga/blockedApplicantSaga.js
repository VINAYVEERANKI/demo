import { call, takeLatest, put } from "redux-saga/effects";
import {
  BLOCKED_APPLICANT_DATA_FAILED,
  BLOCKED_APPLICANT_DATA_LOADED,
  BLOCKED_APPLICANT_DATA_LOADING,
} from "../../actions/returnTypes";
import {
  BLOCKED_ADDRESS_PROOF_EDIT,
  BLOCKED_APPLICANT_READ,
  BLOCKED_APPLICANT_VIEW,
  BLOCKED_APPLICATION_LIST,
  BLOCKED_BANK_DETAILS_EDIT,
  BLOCKED_BG_VERIF_EDIT,
  BLOCKED_DL_EDIT,
  BLOCKED_PHY_VERIF_EDIT,
  BLOCKED_PROFILE_PIC_EDIT,
  BLOCKED_RC_EDIT,
  BLOCKED_VEHICLE_IMAGE_EDIT,
  BLOCKED_VI_EDIT,
  UNBLOCK_DRIVER,
} from "../../actions/types";
import * as blockedApplicationApi from "../../apis/blockedApplicantApi";

export function* blockedApplicationListWorker(action) {
  try {
    const res = yield call(
      blockedApplicationApi.blockedApplicationListApi,
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
export function* blockedApplicantViewWorker(action) {
  try {
    const res = yield call(
      blockedApplicationApi.blockedApplicantViewApi,
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
export function* unBlockDriverWorker(action) {
  try {
    const res = yield call(blockedApplicationApi.unblockDriverApi, action.data);
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

export function* blockedApplicantReadWorker(action) {
  try {
    yield put({ type: BLOCKED_APPLICANT_DATA_LOADING });
    const res = yield call(
      blockedApplicationApi.blockedApplicantReadApi,
      action.data
    );
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield put({ type: BLOCKED_APPLICANT_DATA_LOADED, data: res?.data });
    } else if (res.status === 200 && res.data.status === "fail") {
      yield put({
        type: BLOCKED_APPLICANT_DATA_FAILED,
        data: "Something Went Wrong! Please Try Again Later",
      });
    } else {
      yield put({
        type: BLOCKED_APPLICANT_DATA_FAILED,
        data: "Something Went Wrong! Please Try Again Later",
      });
      yield action.onError("Something Went Wrong!");
    }
  } catch (err) {
    yield put({
      type: BLOCKED_APPLICANT_DATA_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}

export function* blockedApplicantbankdetailsWorker(action) {
  try {
    const res = yield call(
      blockedApplicationApi.blockedApplicantbankdetailsApi,
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
export function* blockeddApplicantadressproofWorker(action) {
  try {
    const res = yield call(
      blockedApplicationApi.blockedApplicantadressproofApi,
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

export function* blockedApplicantDLWorker(action) {
  try {
    const res = yield call(
      blockedApplicationApi.blockedApplicantDLApi,
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
export function* blockedApplicantprofilePicWorker(action) {
  try {
    const res = yield call(
      blockedApplicationApi.blockedApplicantprofilePicApi,
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

export function* blockedApplicantBGverifWorker(action) {
  try {
    const res = yield call(
      blockedApplicationApi.blockedApplicantBGverifApi,
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

export function* blockedApplicantVIWorker(action) {
  try {
    const res = yield call(
      blockedApplicationApi.blockedApplicantVIApi,
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

export function* blockedApplicantRCWorker(action) {
  try {
    const res = yield call(
      blockedApplicationApi.blockedApplicantRCApi,
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

export function* blockedApplicantVehiclePicWorker(action) {
  try {
    const res = yield call(
      blockedApplicationApi.blockedApplicantVehiclePicApi,
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

export function* blockedApplicantPHYverifWorker(action) {
  try {
    const res = yield call(
      blockedApplicationApi.blockedApplicantPHYverifApi,
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

export function* watchblockedApplicationListWorker() {
  yield takeLatest(BLOCKED_APPLICATION_LIST, blockedApplicationListWorker);
}

export function* watchblockedApplicationViewWorker() {
  yield takeLatest(BLOCKED_APPLICANT_VIEW, blockedApplicantViewWorker);
}
export function* watchblockedApplicantReadWorker() {
  yield takeLatest(BLOCKED_APPLICANT_READ, blockedApplicantReadWorker);
}
export function* watchUnblockDriverWorker() {
  yield takeLatest(UNBLOCK_DRIVER, unBlockDriverWorker);
}
export function* watchblockedapplicantBankDetailsWorker() {
  yield takeLatest(
    BLOCKED_BANK_DETAILS_EDIT,
    blockedApplicantbankdetailsWorker
  );
}
export function* watchblockedApplicantaddressProofWorker() {
  yield takeLatest(
    BLOCKED_ADDRESS_PROOF_EDIT,
    blockeddApplicantadressproofWorker
  );
}

export function* watchblockedApplicatantDlWorker() {
  yield takeLatest(BLOCKED_DL_EDIT, blockedApplicantDLWorker);
}
export function* watchblockedApplicantprofilePicWorker() {
  yield takeLatest(BLOCKED_PROFILE_PIC_EDIT, blockedApplicantprofilePicWorker);
}
export function* watchblockedapplicantbgverifWorker() {
  yield takeLatest(BLOCKED_BG_VERIF_EDIT, blockedApplicantBGverifWorker);
}
export function* watchblockedApplicantVIWorker() {
  yield takeLatest(BLOCKED_VI_EDIT, blockedApplicantVIWorker);
}

export function* watchblockedApplicatantRCWorker() {
  yield takeLatest(BLOCKED_RC_EDIT, blockedApplicantRCWorker);
}
export function* watchblockedApplicantvehicleImageWorker() {
  yield takeLatest(
    BLOCKED_VEHICLE_IMAGE_EDIT,
    blockedApplicantVehiclePicWorker
  );
}
export function* watchblockedapplicantphyverifWorker() {
  yield takeLatest(BLOCKED_PHY_VERIF_EDIT, blockedApplicantPHYverifWorker);
}
