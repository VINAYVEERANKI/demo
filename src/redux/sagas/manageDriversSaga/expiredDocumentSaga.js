import { call, takeLatest, put } from "redux-saga/effects";
import {
  Expired_APPLICANT_DATA_FAILED,
  Expired_APPLICANT_DATA_LOADED,
  Expired_APPLICANT_DATA_LOADING,
} from "../../actions/returnTypes";
import {
  EXPIRED_ADDRESS_PROOF_EDIT,
  EXPIRED_APPLICANT_VIEW,
  EXPIRED_APPLICATION_LIST,
  EXPIRED_BANK_DETAILS_EDIT,
  EXPIRED_BG_VERIF_EDIT,
  EXPIRED_DL_EDIT,
  EXPIRED_PHY_VERIF_EDIT,
  EXPIRED_PROFILE_PIC_EDIT,
  EXPIRED_PROFILE_READ,
  EXPIRED_RC_EDIT,
  EXPIRED_VEHICLE_IMAGE_EDIT,
  EXPIRED_VI_EDIT,
} from "../../actions/types";
import * as expiredDocumentApi from "../../apis/expiredDocumentApi";

export function* expiredDocumentListWorker(action) {
  try {
    const res = yield call(
      expiredDocumentApi.expiredDocumentListApi,
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

export function* expiredDocumentViewWorker(action) {
  try {
    const res = yield call(
      expiredDocumentApi.expiredDocumentViewApi,
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
export function* expiredprofileReadWorker(action) {
  try {
    yield put({ type: Expired_APPLICANT_DATA_LOADING });
    const res = yield call(
      expiredDocumentApi.expiredprofileReadApi,
      action.data
    );
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      yield put({ type: Expired_APPLICANT_DATA_LOADED, data: res?.data });
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      yield put({
        type: Expired_APPLICANT_DATA_FAILED,
        data: "Something Went Wrong! Please Try Again Later",
      });
    } else {
      yield put({
        type: Expired_APPLICANT_DATA_FAILED,
        data: "Something Went Wrong! Please Try Again Later",
      });
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* expiredDocumentsbankdetailsWorker(action) {
  try {
    const res = yield call(
      expiredDocumentApi.expiredbankdetailsApi,
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
export function* expireddocumentadressproofWorker(action) {
  try {
    const res = yield call(
      expiredDocumentApi.expireddocumentadressproofApi,
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

export function* expireddocumentDLWorker(action) {
  try {
    const res = yield call(
      expiredDocumentApi.expireddocumentDLApi,
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
export function* expireddocumentprofilePicWorker(action) {
  try {
    const res = yield call(
      expiredDocumentApi.expireddocumentprofilePicApi,
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

export function* expireddocumentBGverifWorker(action) {
  try {
    const res = yield call(
      expiredDocumentApi.expireddocumentBGverifApi,
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

export function* expireddocumentVIWorker(action) {
  try {
    const res = yield call(
      expiredDocumentApi.expireddocumentVIApi,
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

export function* expireddocumentRCWorker(action) {
  try {
    const res = yield call(
      expiredDocumentApi.expireddocumentRCApi,
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

export function* expireddocumentVehiclePicWorker(action) {
  try {
    const res = yield call(
      expiredDocumentApi.expireddocumentVehiclePicApi,
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

export function* expireddocumentPHYverifWorker(action) {
  try {
    const res = yield call(
      expiredDocumentApi.expireddocumentPHYverifApi,
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

export function* watchexpiredDocumentListWorker() {
  yield takeLatest(EXPIRED_APPLICATION_LIST, expiredDocumentListWorker);
}
export function* watchexpiredDocumentViewWorker() {
  yield takeLatest(EXPIRED_APPLICANT_VIEW, expiredDocumentViewWorker);
}
export function* watchexpiredprofileReadWorker() {
  yield takeLatest(EXPIRED_PROFILE_READ, expiredprofileReadWorker);
}
export function* watchexpireddcoumentBankDetailsWorker() {
  yield takeLatest(
    EXPIRED_BANK_DETAILS_EDIT,
    expiredDocumentsbankdetailsWorker
  );
}
export function* watchexpireddocumentaddressProofWorker() {
  yield takeLatest(
    EXPIRED_ADDRESS_PROOF_EDIT,
    expireddocumentadressproofWorker
  );
}

export function* watchexpireddocumentDlWorker() {
  yield takeLatest(EXPIRED_DL_EDIT, expireddocumentDLWorker);
}
export function* watchexpireddocumentprofilePicWorker() {
  yield takeLatest(EXPIRED_PROFILE_PIC_EDIT, expireddocumentprofilePicWorker);
}
export function* watchexpireddocumentbgverifWorker() {
  yield takeLatest(EXPIRED_BG_VERIF_EDIT, expireddocumentBGverifWorker);
}
export function* watchexpireddocumentVIWorker() {
  yield takeLatest(EXPIRED_VI_EDIT, expireddocumentVIWorker);
}

export function* watchexpireddocumentRCWorker() {
  yield takeLatest(EXPIRED_RC_EDIT, expireddocumentRCWorker);
}
export function* watchexpireddocumentvehicleImageWorker() {
  yield takeLatest(EXPIRED_VEHICLE_IMAGE_EDIT, expireddocumentVehiclePicWorker);
}
export function* watchexpireddocumentphyverifWorker() {
  yield takeLatest(EXPIRED_PHY_VERIF_EDIT, expireddocumentPHYverifWorker);
}
