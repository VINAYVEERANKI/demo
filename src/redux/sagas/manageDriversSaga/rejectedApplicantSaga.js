import { call, takeLatest, put } from "redux-saga/effects";
import * as rejectedApplicationApi from "../../apis/rejectedApplicantApi";
import {
  REJECTED_APPLICANT_VIEW,
  REJECTED_APPLICATION_LIST,
  REJECT_ADDRESS_PROOF_EDIT,
  REJECT_APPLICANT_READ,
  REJECT_BANK_DETAILS_EDIT,
  REJECT_BG_VERIF_EDIT,
  REJECT_DL_EDIT,
  REJECT_PHY_VERIF_EDIT,
  REJECT_PROFILE_PIC_EDIT,
  REJECT_RC_EDIT,
  REJECT_VEHICLE_IMAGE_EDIT,
  REJECT_VI_EDIT,
} from "../../actions/types";
import {
  REJECT_APPLICANT_DATA_FAILED,
  REJECT_APPLICANT_DATA_LOADED,
  REJECT_APPLICANT_DATA_LOADING,
} from "../../actions/returnTypes";

export function* rejectedApplicationListWorker(action) {
  try {
    const res = yield call(
      rejectedApplicationApi.rejectedApplicationListApi,
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

export function* rejectedApplicantViewWorker(action) {
  try {
    const res = yield call(
      rejectedApplicationApi.rejectedApplicantViewApi,
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
export function* rejectApplicantReadWorker(action) {
  try {
    yield put({ type: REJECT_APPLICANT_DATA_LOADING });
    const res = yield call(
      rejectedApplicationApi.rejectApplicantReadApi,
      action.data
    );
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield put({ type: REJECT_APPLICANT_DATA_LOADED, data: res?.data });
    } else if (res.status === 200 && res.data.status === "fail") {
      yield put({
        type: REJECT_APPLICANT_DATA_FAILED,
        data: "Something Went Wrong! Please Try Again Later",
      });
    } else {
      yield put({
        type: REJECT_APPLICANT_DATA_FAILED,
        data: "Something Went Wrong! Please Try Again Later",
      });
      yield action.onError("Something Went Wrong!");
    }
  } catch (err) {
    yield put({
      type: REJECT_APPLICANT_DATA_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}

export function* rejectApplicantbankdetailsWorker(action) {
  try {
    const res = yield call(
      rejectedApplicationApi.rejectApplicantbankdetailsApi,
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
export function* rejectdApplicantadressproofWorker(action) {
  try {
    const res = yield call(
      rejectedApplicationApi.rejectApplicantadressproofApi,
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

export function* rejectApplicantDLWorker(action) {
  try {
    const res = yield call(
      rejectedApplicationApi.rejectApplicantDLApi,
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
export function* rejectApplicantprofilePicWorker(action) {
  try {
    const res = yield call(
      rejectedApplicationApi.rejectApplicantprofilePicApi,
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

export function* rejectApplicantBGverifWorker(action) {
  try {
    const res = yield call(
      rejectedApplicationApi.rejectApplicantBGverifApi,
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

export function* rejectApplicantVIWorker(action) {
  try {
    const res = yield call(
      rejectedApplicationApi.rejectApplicantVIApi,
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

export function* rejectApplicantRCWorker(action) {
  try {
    const res = yield call(
      rejectedApplicationApi.rejectApplicantRCApi,
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

export function* rejectApplicantVehiclePicWorker(action) {
  try {
    const res = yield call(
      rejectedApplicationApi.rejectApplicantVehiclePicApi,
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

export function* rejectApplicantPHYverifWorker(action) {
  try {
    const res = yield call(
      rejectedApplicationApi.rejectApplicantPHYverifApi,
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

export function* watchrejectedApplicationListWorker() {
  yield takeLatest(REJECTED_APPLICATION_LIST, rejectedApplicationListWorker);
}
export function* watchrejectedApplicationViewWorker() {
  yield takeLatest(REJECTED_APPLICANT_VIEW, rejectedApplicantViewWorker);
}

export function* watchrejectApplicationReadWorker() {
  yield takeLatest(REJECT_APPLICANT_READ, rejectApplicantReadWorker);
}
export function* watchrejectapplicantBankDetailsWorker() {
  yield takeLatest(REJECT_BANK_DETAILS_EDIT, rejectApplicantbankdetailsWorker);
}
export function* watchrejectApplicantaddressProofWorker() {
  yield takeLatest(
    REJECT_ADDRESS_PROOF_EDIT,
    rejectdApplicantadressproofWorker
  );
}

export function* watchrejectApplicatantDlWorker() {
  yield takeLatest(REJECT_DL_EDIT, rejectApplicantDLWorker);
}
export function* watchrejectApplicantprofilePicWorker() {
  yield takeLatest(REJECT_PROFILE_PIC_EDIT, rejectApplicantprofilePicWorker);
}
export function* watchrejectapplicantbgverifWorker() {
  yield takeLatest(REJECT_BG_VERIF_EDIT, rejectApplicantBGverifWorker);
}
export function* watchrejectApplicantVIWorker() {
  yield takeLatest(REJECT_VI_EDIT, rejectApplicantVIWorker);
}

export function* watchrejectApplicatantRCWorker() {
  yield takeLatest(REJECT_RC_EDIT, rejectApplicantRCWorker);
}
export function* watchrejectApplicantvehicleImageWorker() {
  yield takeLatest(REJECT_VEHICLE_IMAGE_EDIT, rejectApplicantVehiclePicWorker);
}
export function* watchrejectapplicantphyverifWorker() {
  yield takeLatest(REJECT_PHY_VERIF_EDIT, rejectApplicantPHYverifWorker);
}
