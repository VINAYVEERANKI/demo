import { call, takeLatest, put } from "redux-saga/effects";
import {
  PENDING_APPLICANT_EDIT,
  PENDING_APPLICANT_READ,
  PENDING_APPLICANT_VEHICLE_EDIT,
  PENDING_APPLICANT_VIEW,
  PENDING_APPLICATION_LIST,
  PEND_ADDRESS_PROOF_APPROVE,
  PEND_ADDRESS_PROOF_EDIT,
  PEND_BANK_DETAILS_EDIT,
  PEND_BG_VERIF_APPROVE,
  PEND_BG_VERIF_EDIT,
  PEND_DL_APPROVE,
  PEND_DL_EDIT,
  PEND_PROFILE_PIC_APPROVE,
  PEND_PROFILE_PIC_EDIT,
  PEND_VEHICLE_INSURANCE_EDIT,
  PEND_VEHICLE_INSURANCE_APPROVE,
  PEND_RC_EDIT,
  PEND_RC_APPROVE,
  VEHICLE_PIC_EDIT,
  VEHICLE_PIC_APPROVE,
  PEND_PHY_VERIF_APPROVE,
  PEND_PHY_VERIF_EDIT,
} from "../../actions/types";
import {
  PENDING_APPLICANT_DATA_FAILED,
  PENDING_APPLICANT_DATA_LOADED,
  PENDING_APPLICANT_DATA_LOADING,
} from "../../actions/returnTypes";

import * as pendingApplicantApi from "../../apis/pendApplicantApi";

export function* pendingApplicationListWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendingApplicationListApi,
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

export function* pendingApplicantViewWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendingApplicantViewApi,
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
export function* pendingApplicantReadWorker(action) {
  try {
    yield put({ type: PENDING_APPLICANT_DATA_LOADING });
    const res = yield call(
      pendingApplicantApi.pendingApplicantReadApi,
      action.data
    );
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield put({ type: PENDING_APPLICANT_DATA_LOADED, data: res?.data });
    } else if (res.status === 200 && res.data.status === "fail") {
      yield put({
        type: PENDING_APPLICANT_DATA_FAILED,
        data: "Something Went Wrong! Please Try Again Later",
      });
    } else {
      yield put({
        type: PENDING_APPLICANT_DATA_FAILED,
        data: "Something Went Wrong! Please Try Again Later",
      });
    }
  } catch (err) {
    yield put({
      type: PENDING_APPLICANT_DATA_FAILED,
      data: "Something Went Wrong! Please Try Again Later",
    });
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}

export function* pendingApplicantEditWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendingApplicantEditApi,
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
export function* pendingApplicantVehicleEditWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendingApplicantVehicleEditApi,
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
export function* pendApplicantbankdetailsWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendApplicantbankdetailsApi,
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
export function* pendApplicantadressproofWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendApplicantadressproofApi,
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

export function* pendadressApproveWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendadressApproveApi,
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
export function* pendApplicantDLWorker(action) {
  try {
    const res = yield call(pendingApplicantApi.pendApplicantDLApi, action.data);
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

export function* pendDLApproveWorker(action) {
  try {
    const res = yield call(pendingApplicantApi.pendDLApproveApi, action.data);
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
export function* pendApplicantprofilePicWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendApplicantprofilePicApi,
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

export function* pendProfilePicApproveWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendApplicantprofilePicApproveApi,
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

export function* pendApplicantBGverifWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendApplicantBGverifApi,
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

export function* pendBGverifApproveWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendApplicantBGApproveApi,
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
export function* pendApplicantVIWorker(action) {
  try {
    const res = yield call(pendingApplicantApi.pendApplicantVIApi, action.data);
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
export function* pendApplicantVIApproveWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendApplicantVIApproveApi,
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

export function* pendApplicantRCWorker(action) {
  try {
    const res = yield call(pendingApplicantApi.pendApplicantRCApi, action.data);
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
export function* pendApplicantRCApproveWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendApplicantRCApproveApi,
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

export function* pendApplicantVehiclePicWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendApplicantVehiclePicApi,
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
export function* pendApplicantVehiclePicApproveWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendApplicantVehiclePicApproveApi,
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

export function* pendApplicantPHYverifWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendApplicantPHYverifApi,
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
export function* pendApplicantPHYverifApproveWorker(action) {
  try {
    const res = yield call(
      pendingApplicantApi.pendApplicantPHYApproveVerifApi,

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

export function* watchpendingApplicationListWorker() {
  yield takeLatest(PENDING_APPLICATION_LIST, pendingApplicationListWorker);
}
export function* watchpendingApplicantViewWorker() {
  yield takeLatest(PENDING_APPLICANT_VIEW, pendingApplicantViewWorker);
}
export function* watchpendingApplicantReadWorker() {
  yield takeLatest(PENDING_APPLICANT_READ, pendingApplicantReadWorker);
}

export function* watchpendingApplicantEditWorker() {
  yield takeLatest(PENDING_APPLICANT_EDIT, pendingApplicantEditWorker);
}
export function* watchpendingadressEditWorker() {
  yield takeLatest(PEND_ADDRESS_PROOF_EDIT, pendApplicantadressproofWorker);
}

export function* watchpendadressApproveWorker() {
  yield takeLatest(PEND_ADDRESS_PROOF_APPROVE, pendadressApproveWorker);
}

export function* watchpendApplicantDLWorker() {
  yield takeLatest(PEND_DL_EDIT, pendApplicantDLWorker);
}

export function* watchpendDLApproveWorker() {
  yield takeLatest(PEND_DL_APPROVE, pendDLApproveWorker);
}
export function* watchpendApplicantprofilePicWorker() {
  yield takeLatest(PEND_PROFILE_PIC_EDIT, pendApplicantprofilePicWorker);
}

export function* watchpendprofilePicApproveWorker() {
  yield takeLatest(PEND_PROFILE_PIC_APPROVE, pendProfilePicApproveWorker);
}
export function* watchpendApplicantBGverifWorker() {
  yield takeLatest(PEND_BG_VERIF_EDIT, pendApplicantBGverifWorker);
}

export function* watchpendBGverifApproveWorker() {
  yield takeLatest(PEND_BG_VERIF_APPROVE, pendBGverifApproveWorker);
}
export function* watchpendingApplicantVehicleEditWorker() {
  yield takeLatest(
    PENDING_APPLICANT_VEHICLE_EDIT,
    pendingApplicantVehicleEditWorker
  );
}
export function* watchpendingApplicantVIEditWorker() {
  yield takeLatest(PEND_VEHICLE_INSURANCE_EDIT, pendApplicantVIWorker);
}
export function* watchpendingApplicantVIApproveWorker() {
  yield takeLatest(
    PEND_VEHICLE_INSURANCE_APPROVE,
    pendApplicantVIApproveWorker
  );
}
export function* watchpendingApplicantRCEditWorker() {
  yield takeLatest(PEND_RC_EDIT, pendApplicantRCWorker);
}
export function* watchpendingApplicantRCApproveWorker() {
  yield takeLatest(PEND_RC_APPROVE, pendApplicantRCApproveWorker);
}
export function* watchpendingApplicantVehiclePicWorker() {
  yield takeLatest(VEHICLE_PIC_EDIT, pendApplicantVehiclePicWorker);
}
export function* watchpendingApplicantVehiclePicApproveWorker() {
  yield takeLatest(VEHICLE_PIC_APPROVE, pendApplicantVehiclePicApproveWorker);
}
export function* watchpendingApplicantPHYverifWorker() {
  yield takeLatest(PEND_PHY_VERIF_EDIT, pendApplicantPHYverifWorker);
}
export function* watchpendingApplicantPHYverifApproveWorker() {
  yield takeLatest(PEND_PHY_VERIF_APPROVE, pendApplicantPHYverifApproveWorker);
}

export function* watchpendApplicantbankdetailsWorker() {
  yield takeLatest(PEND_BANK_DETAILS_EDIT, pendApplicantbankdetailsWorker);
}
