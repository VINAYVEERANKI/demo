import { call, takeLatest } from "redux-saga/effects";
import {
  BG_VERIF_PIC,
  UPLOAD_ADRESS_PROOF,
  UPLOAD_DL,
  UPLOAD_PROFILE_PIC,
  UPLOAD_INSURANCE,
  UPLOAD_RC,
  VEHICLE_PIC,
  PHY_VERIF_PIC,
  IMAGE_UPLOAD_COUPON,
  IMAGE_UPLOAD_RIDETYPE,
  RIDETYPE_DROPDOWN_LIST,
} from "../actions/types";
import * as uploadImageApi from "../apis/imageUploadApi";

export function* uploadAdressWorker(action) {
  try {
    const image = new FormData();
    image.append("image", action.image);
    const res = yield call(uploadImageApi.ApplicantuploadAdressApi, image);
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res);
    } else {
      yield action.onError(res);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* UploadDLWorker(action) {
  try {
    const image = new FormData();
    image.append("image", action.image);
    const res = yield call(uploadImageApi.UploadDLApi, image);
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res);
    } else {
      yield action.onError(res);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* UploadProfilePicWorker(action) {
  try {
    const image = new FormData();
    image.append("image", action.image);
    const res = yield call(uploadImageApi.UploadProfilePicApi, image);
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res);
    } else {
      yield action.onError(res);
    }
  } catch (error) {
    console.log(error);
  }
}
export function* BGverifPicWorker(action) {
  try {
    const image = new FormData();
    image.append("image", action.image);
    const res = yield call(uploadImageApi.UploadBgverifPicApi, image);
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res);
    } else {
      yield action.onError(res);
    }
  } catch (error) {
    console.log(error);
  }
}
export function* UploadInsuranceWorker(action) {
  try {
    const image = new FormData();
    image.append("image", action.image);
    const res = yield call(uploadImageApi.UploadInsuranceApi, image);
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res);
    } else {
      yield action.onError(res);
    }
  } catch (error) {
    console.log(error);
  }
}
export function* UploadRCWorker(action) {
  try {
    const image = new FormData();
    image.append("image", action.image);
    const res = yield call(uploadImageApi.UploadRCApi, image);
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res);
    } else {
      yield action.onError(res);
    }
  } catch (error) {
    console.log(error);
  }
}
export function* UploadVehiclePicWorker(action) {
  try {
    const image = new FormData();
    image.append("image", action.image);
    const res = yield call(uploadImageApi.UploadVehiclePicApi, image);
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res);
    } else {
      yield action.onError(res);
    }
  } catch (error) {
    console.log(error);
  }
}
export function* UploadPhyVerifPicWorker(action) {
  try {
    const image = new FormData();
    image.append("image", action.image);
    const res = yield call(uploadImageApi.UploadPhyVerifPicApi, image);
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res);
    } else {
      yield action.onError(res);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* uploadImageCouponWorker(action) {
  try {
    const image = new FormData();
    image.append("image", action.image);
    const res = yield call(uploadImageApi.uploadImageCouponApi, image);
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res);
    } else {
      yield action.onError(res);
    }
  } catch (error) {
    console.log(error);
  }
}
export function* uploadImageRideTypeWorker(action) {
  try {
    const image = new FormData();
    image.append("image", action.image);
    const res = yield call(uploadImageApi.uploadImageRideTypeApi, image);
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      const modifiedUrl = res?.data?.data?.location?.replace(
        "/RideAndVehicleType/",
        "/"
      );
      console.log(res, "jgajhdgdgjadghadsj");
      console.log(modifiedUrl, "jgajhdgdgjadghadsj");
      yield action.onSuccess(res, modifiedUrl);
    } else {
      yield action.onError(res);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchuploadAdressWorker() {
  yield takeLatest(UPLOAD_ADRESS_PROOF, uploadAdressWorker);
}

export function* watchuploadDLWorker() {
  yield takeLatest(UPLOAD_DL, UploadDLWorker);
}

export function* watchuploadprofilePicWorker() {
  yield takeLatest(UPLOAD_PROFILE_PIC, UploadProfilePicWorker);
}

export function* watchuploadBGverifWorker() {
  yield takeLatest(BG_VERIF_PIC, BGverifPicWorker);
}
export function* watchuploadInsuranceWorker() {
  yield takeLatest(UPLOAD_INSURANCE, UploadInsuranceWorker);
}
export function* watchuploadRCWorker() {
  yield takeLatest(UPLOAD_RC, UploadRCWorker);
}
export function* watchuploadVehiclePicWorker() {
  yield takeLatest(VEHICLE_PIC, UploadVehiclePicWorker);
}
export function* watchuploadPhyVerifPicWorker() {
  yield takeLatest(PHY_VERIF_PIC, UploadPhyVerifPicWorker);
}
export function* watchuploadImageCouponWorker() {
  yield takeLatest(IMAGE_UPLOAD_COUPON, uploadImageCouponWorker);
}
export function* watchuploadImageRideTypeWorker() {
  yield takeLatest(IMAGE_UPLOAD_RIDETYPE, uploadImageRideTypeWorker);
}
