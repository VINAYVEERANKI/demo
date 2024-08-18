import { call, takeLatest } from "redux-saga/effects";
import {
  FARES_LOCAL_UPDATE_PRICING_DETAILS,
  FARES_LOCAL_UPDATE_PRICING_MODULE,
  FARES_LOCAL_ZONES_LIST,
  FARES_LOCAL_ZONE_DROPDOWN_LIST,
  FARES_LOCAL_ZONE_INDIVIDUAL,
  FARES_ONEWAY_TRIP_INDIVIDUAL,
  FARES_ONEWAY_TRIP_INDIVIDUAL_EDIT,
  FARES_ONEWAY_TRIP_LIST,
  FARES_ONEWAY_TRIP_PACKAGE_EDIT,
  FARES_RENTAL_INDIVIDUAL,
  FARES_RENTAL_INDIVIDUAL_EDIT,
  FARES_RENTAL_LIST,
  FARES_ROUND_TRIP_INDIVIDUAL,
  FARES_ROUND_TRIP_INDIVIDUAL_EDIT,
  FARES_ROUND_TRIP_LIST,
  FARES_ROUND_TRIP_PACKAGE_EDIT,
  FARES_SPECIAL_ZONE_INDIVIDUAL,
  FARES_SPECIAL_ZONE_INDIVIDUAL_EDIT,
  FARES_TOLLS_ZONE_INDIVIDUAL,
  FARES_TOLLS_ZONE_INDIVIDUAL_EDIT,
  FARES_TOLLS_ZONE_LIST,
  MANAGE_FARES_LIST,
  FARES_SPECIAL_ZONE_LIST,
  ZONE_STATUS_CHANGE,
  CREATE_RENTAL_PACKAGE,
  DELETE_RENTAL_PACKAGE,
  MANAGE_FARES_DRP_DWN,

} from "../actions/types";
import * as manageFaresApi from "../apis/manageFaresApi";

export function* ManageFaresListWorker(action) {
  try {
    const res = yield call(
      manageFaresApi.ManageFaresListApi,
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
export function* SpecialZoneListWorker(action) {
  try {
    const res = yield call(
      manageFaresApi.SpecialZoneListApi,
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
export function* FaresSpecialZonesWorker(action) {
  try {
    const res = yield call(manageFaresApi.FaresSpecialZonesApi, action.data);
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
export function* FaresSpecialZonesEditWorker(action) {
  try {
    const res = yield call(
      manageFaresApi.FaresSpecialZonesEditApi,
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

export function* FaresTollsListWorker(action) {
  try {
    const res = yield call(
      manageFaresApi.FaresTollsListApi,
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
export function* FaresTollsZonesWorker(action) {
  try {
    const res = yield call(manageFaresApi.FaresTollsZonesApi, action.data);
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
export function* FaresTollsEditWorker(action) {
  try {
    const res = yield call(manageFaresApi.FaresTollsEditApi, action.data);
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
export function* FaresOneWaytripListWorker(action) {
  try {
    const res = yield call(
      manageFaresApi.FaresOneWaytripListApi,
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
export function* FaresOneWaytripZonesWorker(action) {
  try {
    const res = yield call(manageFaresApi.FaresOneWaytripZonesApi, action.data);
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
export function* FaresOneWaytripEditWorker(action) {
  try {
    const res = yield call(manageFaresApi.FaresOneWaytripEditApi, action.data);
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
export function* FaresOneWaytripPackageEditWorker(action) {
  try {
    const res = yield call(
      manageFaresApi.FaresOneWaytripPackageEditApi,
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
export function* FaresRoundTripListWorker(action) {
  try {
    const res = yield call(
      manageFaresApi.FaresRoundTripListApi,
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
export function* FaresRoundTripZonesWorker(action) {
  try {
    const res = yield call(manageFaresApi.FaresRoundTripZonesApi, action.data);
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
export function* FaresRoundTripEditWorker(action) {
  try {
    const res = yield call(manageFaresApi.FaresRoundTripEditApi, action.data);
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
export function* FaresRoundTripPackageEditWorker(action) {
  try {
    const res = yield call(
      manageFaresApi.FaresRoundTripPackageEditApi,
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
export function* FaresLocalDropDownListWorker(action) {
  try {
    const res = yield call(
      manageFaresApi.FaresLocalDropDownListApi,
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
// export function* FaresLocalCreateWorker(action) {
//   try {
//     const res = yield call(manageFaresApi.FaresLocalCreateApi, action.data);
//     console.log(res);
//     if (res.status === 200 && res.data.status === "success") {
//       yield action.onSuccess(res.data);
//       console.log(res.data);
//     } else if (res.status === 200 && res.data.status === "fail") {
//       console.log(res.data);
//       yield action.onError(res);
//     } else {
//       yield action.onError("Something Went Wrong");
//     }
//   } catch (err) {
//     console.log(err);
//     yield action.onError("Something Went Wrong");
//   }
// }
export function* FaresLocalZonesListWorker(action) {
  try {
    const response = yield call(
      manageFaresApi.FaresLocalCreateApi,
      action.data
    );
    console.log(response);
    if (response.status === 200 && response.data.status === "success") {
      yield action.onSuccess(response.data);
      console.log(response.data);
    } else if (response.status === 200 && response.data.status === "fail") {
      console.log(response.data);
      yield action.onError(response);
    } else {
      yield action.onError("Something Went Wrong");
    }
    const res = yield call(
      manageFaresApi.FaresLocalZonesListApi,
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
export function* FaresLocalZonesWorker(action) {
  try {
    const res = yield call(manageFaresApi.FaresLocalZonesApi, action.data);
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
export function* FaresLocalUpdatepricingModuleWorker(action) {
  try {
    const res = yield call(
      manageFaresApi.FaresLocalUpdatepricingModuleApi,
      action.data
    );
    console.log(res, "pricing module");
    if (res.status === 200 && res.data.success) {
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
export function* FaresLocalUpdatepricingDetailsWorker(action) {
  try {
    const res = yield call(
      manageFaresApi.FaresLocalUpdatepricingDetailsApi,
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
export function* RentalListWorker(action) {
  try {
    const res = yield call(
      manageFaresApi.RentalListApi,
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
export function* FaresRentalWorker(action) {
  try {
    const res = yield call(manageFaresApi.FaresRentalApi, action.data);
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
export function* FaresRentalEditWorker(action) {
  try {
    const res = yield call(manageFaresApi.FaresRentalEditApi, action.data);
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

export function* zoneStatusChangeWorker(action) {
  try {
    const res = yield call(manageFaresApi.zoneStatusChangeApi, action.data);
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

export function* createRentalPackageWorker(action) {
  try {
    const res = yield call(manageFaresApi.createRentalPackageApi, action.data);
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

export function* deleteRentalPackageWorker(action) {
  try {
    const res = yield call(manageFaresApi.deleteRentalPackageApi, action.data);
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


export function* managefaresDrpdwnWorker(action) {
  try {
    const res = yield call(manageFaresApi.managefaresDrpdwnApi);
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

export function* watchManageFaresListWorker() {
  yield takeLatest(MANAGE_FARES_LIST, ManageFaresListWorker);
}
export function* watchSpecialZoneListWorker() {
  yield takeLatest(FARES_SPECIAL_ZONE_LIST, SpecialZoneListWorker);
}
export function* watchFaresSpecialZonesWorker() {
  yield takeLatest(FARES_SPECIAL_ZONE_INDIVIDUAL, FaresSpecialZonesWorker);
}
export function* watchFaresSpecialZonesEditWorker() {
  yield takeLatest(
    FARES_SPECIAL_ZONE_INDIVIDUAL_EDIT,
    FaresSpecialZonesEditWorker
  );
}
export function* watchFaresTollsListWorker() {
  yield takeLatest(FARES_TOLLS_ZONE_LIST, FaresTollsListWorker);
}
export function* watchFaresTollsZonesWorker() {
  yield takeLatest(FARES_TOLLS_ZONE_INDIVIDUAL, FaresTollsZonesWorker);
}
export function* watchFaresTollsEditWorker() {
  yield takeLatest(FARES_TOLLS_ZONE_INDIVIDUAL_EDIT, FaresTollsEditWorker);
}
export function* watchFaresOneWaytripListWorker() {
  yield takeLatest(FARES_ONEWAY_TRIP_LIST, FaresOneWaytripListWorker);
}
export function* watchFaresOneWaytripZonesWorker() {
  yield takeLatest(FARES_ONEWAY_TRIP_INDIVIDUAL, FaresOneWaytripZonesWorker);
}
export function* watchFaresOneWaytripEditWorker() {
  yield takeLatest(
    FARES_ONEWAY_TRIP_INDIVIDUAL_EDIT,
    FaresOneWaytripEditWorker
  );
}
export function* watchFaresOneWaytripPackageEditWorker() {
  yield takeLatest(
    FARES_ONEWAY_TRIP_PACKAGE_EDIT,
    FaresOneWaytripPackageEditWorker
  );
}
export function* watchFaresRoundTripListWorker() {
  yield takeLatest(FARES_ROUND_TRIP_LIST, FaresRoundTripListWorker);
}
export function* watchFaresRoundTripZonesWorker() {
  yield takeLatest(FARES_ROUND_TRIP_INDIVIDUAL, FaresRoundTripZonesWorker);
}
export function* watchFaresRoundTripEditWorker() {
  yield takeLatest(FARES_ROUND_TRIP_INDIVIDUAL_EDIT, FaresRoundTripEditWorker);
}
export function* watchFaresRoundTripPackageEditWorker() {
  yield takeLatest(
    FARES_ROUND_TRIP_PACKAGE_EDIT,
    FaresRoundTripPackageEditWorker
  );
}
export function* watchFaresLocalDropDownListWorker() {
  yield takeLatest(
    FARES_LOCAL_ZONE_DROPDOWN_LIST,
    FaresLocalDropDownListWorker
  );
}
// export function* watchFaresLocalCreateWorker() {
//   yield takeLatest(LOCAL_CREATE_FARES, FaresLocalCreateWorker);
// }
export function* watchFaresLocalZonesListWorker() {
  yield takeLatest(FARES_LOCAL_ZONES_LIST, FaresLocalZonesListWorker);
}
export function* watchFaresLocalZonesWorker() {
  yield takeLatest(FARES_LOCAL_ZONE_INDIVIDUAL, FaresLocalZonesWorker);
}
export function* watchFaresLocalUpdatepricingModuleWorker() {
  yield takeLatest(
    FARES_LOCAL_UPDATE_PRICING_MODULE,
    FaresLocalUpdatepricingModuleWorker
  );
}
export function* watchFaresLocalUpdatepricingDetailsWorker() {
  yield takeLatest(
    FARES_LOCAL_UPDATE_PRICING_DETAILS,
    FaresLocalUpdatepricingDetailsWorker
  );
}
export function* watchRentalListWorker() {
  yield takeLatest(FARES_RENTAL_LIST, RentalListWorker);
}
export function* watchFaresRentalWorker() {
  yield takeLatest(FARES_RENTAL_INDIVIDUAL, FaresRentalWorker);
}
export function* watchFaresRentalEditWorker() {
  yield takeLatest(FARES_RENTAL_INDIVIDUAL_EDIT, FaresRentalEditWorker);
}
export function* watchzoneStatusChangeWorker() {
  yield takeLatest(ZONE_STATUS_CHANGE, zoneStatusChangeWorker);
}
export function* watchCreateRentalPackageWorker() {
  yield takeLatest(CREATE_RENTAL_PACKAGE, createRentalPackageWorker);
}
export function* watchDeleteRentalPackageWorker() {
  yield takeLatest(DELETE_RENTAL_PACKAGE, deleteRentalPackageWorker);
}

export function* watchManagefaresDrpdwnWorker() {
  yield takeLatest(MANAGE_FARES_DRP_DWN, managefaresDrpdwnWorker);
}
