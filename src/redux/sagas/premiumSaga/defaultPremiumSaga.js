import { call, takeLatest } from "redux-saga/effects";
import {
  defaultPremiumOneListApi,
  defaultPremiumOneFindoneApi,
  defaultPremiumFourViewApi,
  defaultPremiumFourEditApi,
  managePremiumFourEditApi,
  managePremiumListApi,
  defaultPremiumRideListApi,
  defaultPremiumTwoFindoneApi,
  defaultPremiumThreeFindoneApi,
  defaultPremiumFiveFindoneApi,
  defaultPremiumDuedepositEditApi,
  defaultPremiumDuedepositApi,
  defaultPremium1235EditApi,
  managePremiumOneFindoneApi,
  managePremiumTwoFindoneApi,
  managePremiumThreeFindoneApi,
  managePremiumFiveFindoneApi,
  defaultPremiumPricingModuleEditApi,
  managePremiumFourFindoneApi,
  managePremium1235EditApi,
  managePremiumPricingModuleEditApi,
  managePremiumDuedepositEditApi,
  managePremiumDuedepositApi,
  managePremiumStatusUpdateApi,
  managePremium4SubscriptionApi,
  managePremium5SubscriptionApi,
  managePremiumSubscriptionEditApi,
  archivedPremiumListApi,
  archivedPremiumRideListApi,
  archivedPremiumOneFindoneApi,
  archivedPremiumTwoFindoneApi,
  archivedPremiumThreeFindoneApi,
  archivedPremiumFourFindoneApi,
  archivedPremiumFiveFindoneApi,
  archivedPremiumDuedepositApi,
  archivedPremium4SubscriptionApi,
  archivedPremium5SubscriptionApi,
  AutoReneActiveInactivePremiumApi,
  cancelAutoRenewalPremiumApi,
  cancelActiveAutoRenewalPremiumApi,
  cancelActiveScheduledPremiumApi,
} from "../../apis/premiumsapi/defaultPremiumApi";
import {
  DEFAULT_PREMIUMONE_LIST,
  DEFAULT_PREMIUMONE_FIND_ONE,
  DEFAULT_PREMIUMFOUR_VIEW,
  DEFAULT_PREMIUMFOUR_EDIT,
  MANAGE_PREMIUMFOUR_EDIT,
  MANAGE_PREMIUM_LIST,
  MANAGE_PREMIUM_RIDE_LIST,
  DEFAULT_PREMIUMTWO_FIND_ONE,
  DEFAULT_PREMIUMTHREE_FIND_ONE,
  DEFAULT_PREMIUMFIVE_FIND_ONE,
  DEFAULT_PREMIUM_DUEDEPOSIT_FIND_ONE,
  DEFAULT_PREMIUM_DUEDEPOSIT_EDIT,
  DEFAULT_PREMIUM1235__EDIT,
  MANAGE_PREMIUMONE_FIND_ONE,
  MANAGE_PREMIUMTWO_FIND_ONE,
  MANAGE_PREMIUMTHREE_FIND_ONE,
  MANAGE_PREMIUMFIVE_FIND_ONE,
  DEFAULT_PREMIUM_PRICING_MODULE_EDIT,
  MANAGE_PREMIUMFOUR_FIND_ONE,
  MANAGE_PREMIUM1235__EDIT,
  MANAGE_PREMIUM_PRICING_MODULE_EDIT,
  MANAGE_PREMIUM_DUEDEPOSIT_EDIT,
  MANAGE_PREMIUM_DUEDEPOSIT_FIND_ONE,
  MANAGE_PREMIUM_STATUS_UPDATE_EDIT,
  MANAGE_PREMIUM4_SUBSCRIPTION,
  MANAGE_PREMIUM5_SUBSCRIPTION,
  MANAGE_PREMIUM_SUBSCRIPTION_EDIT,
  ARCHIVED_PREMIUM_LIST,
  ARCHIVED_PREMIUM_RIDE_LIST,
  ARCHIVED_PREMIUMONE_FIND_ONE,
  ARCHIVED_PREMIUMTWO_FIND_ONE,
  ARCHIVED_PREMIUMTHREE_FIND_ONE,
  ARCHIVED_PREMIUMFOUR_FIND_ONE,
  ARCHIVED_PREMIUMFIVE_FIND_ONE,
  ARCHIVED_PREMIUM_DUEDEPOSIT_FIND_ONE,
  ARCHIVED_PREMIUM4_SUBSCRIPTION,
  ARCHIVED_PREMIUM5_SUBSCRIPTION,
  AUTO_RENEWAL_ACTIVE_INACTIVE_PREMIUM,
  CANCEL_AUTO_RENEWAL_PREMIUM,
  CANCEL_ACTIVE_AUTO_RENEWAL_PREMIUM,
  CANCEL_ACTIVE_SCHEDULED_PREMIUM,
} from "../../actions/types";

export function* driverPremiumOneListWorker(action) {
  try {
    const res = yield call(defaultPremiumOneListApi, action.data);
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

export function* driverPremiumOneFindOneWorker(action) {
  console.log(action, "action");
  try {
    // const res = yield call(defaultPremiumOneFindoneApi, action.id.ride_type_id);
    const res = yield call(defaultPremiumOneFindoneApi, action.data);
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
export function* driverPremiumTwoFindOneWorker(action) {
  console.log(action, "action");
  try {
    const res = yield call(defaultPremiumTwoFindoneApi, action.data);
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
export function* driverPremiumThreeFindOneWorker(action) {
  console.log(action, "action");
  try {
    const res = yield call(defaultPremiumThreeFindoneApi, action.data);
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
export function* driverPremiumFiveFindOneWorker(action) {
  console.log(action, "action");
  try {
    const res = yield call(defaultPremiumFiveFindoneApi, action.data);
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

export function* defaultPremium1235EditWorker(action) {
  console.log(action, "action");
  try {
    const res = yield call(
      defaultPremium1235EditApi,
      action.data,
      action.data1
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

export function* driverPremiumFourViewWorker(action) {
  try {
    const res = yield call(defaultPremiumFourViewApi, action.data);
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

export function* driverPremiumFourEditWorker(action) {
  try {
    const res = yield call(
      defaultPremiumFourEditApi,
      action.data,
      action.data1
    );
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

export function* managePremiumFourEditWorker(action) {
  try {
    const res = yield call(managePremiumFourEditApi, action.data, action.data1);
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

export function* managePremiumListWorker(action) {
  try {
    const res = yield call(managePremiumListApi, action.data);
    console.log(res, "managePremiumList");
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

export function* managePremiumRideListWorker(action) {
  try {
    const res = yield call(defaultPremiumRideListApi, action.data);
    console.log(res, "defaultPremiumRideList");
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

export function* defaultPremiumDuedepositWorker(action) {
  try {
    const res = yield call(defaultPremiumDuedepositApi, action.data);
    console.log(res, "defaultPremiumDuedeposit");
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

export function* managePremiumDuedepositWorker(action) {
  try {
    const res = yield call(managePremiumDuedepositApi, action.data);
    console.log(res, "defaultPremiumDuedeposit");
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

export function* defaultPremiumDuedepositEditWorker(action) {
  try {
    const res = yield call(
      defaultPremiumDuedepositEditApi,
      action.data,
      action.data1
    );
    console.log(res, "defaultPremiumDuedepositEdit");
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

export function* managePremiumOneFindOneWorker(action) {
  console.log(action, "action");
  try {
    // const res = yield call(defaultPremiumOneFindoneApi, action.id.ride_type_id);
    const res = yield call(managePremiumOneFindoneApi, action.data);
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
export function* managePremiumTwoFindOneWorker(action) {
  console.log(action, "action");
  try {
    const res = yield call(managePremiumTwoFindoneApi, action.data);
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
export function* managePremiumThreeFindOneWorker(action) {
  console.log(action, "action");
  try {
    const res = yield call(managePremiumThreeFindoneApi, action.data);
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
export function* managePremiumFourFindOneWorker(action) {
  console.log(action, "action");
  try {
    const res = yield call(managePremiumFourFindoneApi, action.data);
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
export function* managePremiumFiveFindOneWorker(action) {
  console.log(action, "action");
  try {
    const res = yield call(managePremiumFiveFindoneApi, action.data);
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

export function* defaultPremiumPricingModuleEditApiWorker(action) {
  try {
    const res = yield call(
      defaultPremiumPricingModuleEditApi,
      action.data,
      action.data1
    );
    console.log(res, "defaultPremiumDuedepositEdit");
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

export function* managePremium1235EditWorker(action) {
  console.log(action, "action");
  try {
    const res = yield call(managePremium1235EditApi, action.data, action.data1);
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

export function* managePremiumPricingModuleEditApiWorker(action) {
  try {
    const res = yield call(
      managePremiumPricingModuleEditApi,
      action.data,
      action.data1
    );
    console.log(res, "managePremiumDuedepositEdit");
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

export function* managePremiumDuedepositEditWorker(action) {
  try {
    const res = yield call(
      managePremiumDuedepositEditApi,
      action.data,
      action.data1
    );
    console.log(res, "managePremiumDuedepositEdit");
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

export function* managePremiumStatusUpdateApiWorker(action) {
  try {
    const res = yield call(managePremiumStatusUpdateApi, action.data);
    console.log(res, "managePremiumDuedepositEdit");
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

export function* managePremium4SubscriptionWorker(action) {
  try {
    const res = yield call(managePremium4SubscriptionApi, action.data);
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

export function* managePremium5SubscriptionWorker(action) {
  try {
    const res = yield call(managePremium5SubscriptionApi, action.data);
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

export function* managePremiumSubscriptionEditWorker(action) {
  try {
    const res = yield call(managePremiumSubscriptionEditApi, action.data);
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

export function* archivedPremiumListWorker(action) {
  try {
    const res = yield call(archivedPremiumListApi, action.data);
    console.log(res, "archivedPremiumList");
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

export function* archivedPremiumRideListWorker(action) {
  try {
    const res = yield call(archivedPremiumRideListApi, action.data);
    console.log(res, "archivedPremiumRideList");
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

export function* archivedPremiumOneFindOneWorker(action) {
  console.log(action, "action");
  try {
    // const res = yield call(defaultPremiumOneFindoneApi, action.id.ride_type_id);
    const res = yield call(archivedPremiumOneFindoneApi, action.data);
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
export function* archivedPremiumTwoFindOneWorker(action) {
  console.log(action, "action");
  try {
    const res = yield call(archivedPremiumTwoFindoneApi, action.data);
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
export function* archivedPremiumThreeFindOneWorker(action) {
  console.log(action, "action");
  try {
    const res = yield call(archivedPremiumThreeFindoneApi, action.data);
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
export function* archivedPremiumFourFindOneWorker(action) {
  console.log(action, "action");
  try {
    const res = yield call(archivedPremiumFourFindoneApi, action.data);
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
export function* archivedPremiumFiveFindOneWorker(action) {
  console.log(action, "action");
  try {
    const res = yield call(archivedPremiumFiveFindoneApi, action.data);
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

export function* archivedPremiumDuedepositWorker(action) {
  try {
    const res = yield call(archivedPremiumDuedepositApi, action.data);
    console.log(res, "defaultPremiumDuedeposit");
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

export function* archivedPremium4SubscriptionWorker(action) {
  try {
    const res = yield call(archivedPremium4SubscriptionApi, action.data);
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

export function* archivedPremium5SubscriptionWorker(action) {
  try {
    const res = yield call(archivedPremium5SubscriptionApi, action.data);
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

export function* autoReneActiveInactivePremiumWorker(action) {
  try {
    const res = yield call(AutoReneActiveInactivePremiumApi, action.data);
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

export function* cancelAutoRenewalPremiumWorker(action) {
  try {
    const res = yield call(cancelAutoRenewalPremiumApi, action.data);
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

export function* cancelActiveAutoRenewalPremiumWorker(action) {
  try {
    const res = yield call(cancelActiveAutoRenewalPremiumApi, action.data);
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

export function* cancelActiveScheduledPremiumWorker(action) {
  try {
    const res = yield call(cancelActiveScheduledPremiumApi, action.data);
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

export function* watchDefaultPremiumOneListWorker() {
  yield takeLatest(DEFAULT_PREMIUMONE_LIST, driverPremiumOneListWorker);
}

export function* watchDefaultPremiumOneFindOneWorker() {
  yield takeLatest(DEFAULT_PREMIUMONE_FIND_ONE, driverPremiumOneFindOneWorker);
}
export function* watchDefaultPremiumTwoFindOneWorker() {
  yield takeLatest(DEFAULT_PREMIUMTWO_FIND_ONE, driverPremiumTwoFindOneWorker);
}
export function* watchDefaultPremiumThreeFindOneWorker() {
  yield takeLatest(
    DEFAULT_PREMIUMTHREE_FIND_ONE,
    driverPremiumThreeFindOneWorker
  );
}
export function* watchDefaultPremiumFiveFindOneWorker() {
  yield takeLatest(
    DEFAULT_PREMIUMFIVE_FIND_ONE,
    driverPremiumFiveFindOneWorker
  );
}
export function* watchDefaultPremium1235EditWorker() {
  yield takeLatest(DEFAULT_PREMIUM1235__EDIT, defaultPremium1235EditWorker);
}

export function* watchDefaultPremiumFourViewWorker() {
  yield takeLatest(DEFAULT_PREMIUMFOUR_VIEW, driverPremiumFourViewWorker);
}

export function* watchDefaultPremiumFourEditWorker() {
  yield takeLatest(DEFAULT_PREMIUMFOUR_EDIT, driverPremiumFourEditWorker);
}

export function* watchManagePremiumFourEditWorker() {
  yield takeLatest(MANAGE_PREMIUMFOUR_EDIT, managePremiumFourEditWorker);
}

export function* watchManagePremiumListWorker() {
  yield takeLatest(MANAGE_PREMIUM_LIST, managePremiumListWorker);
}

export function* watchManagePremiumRideListWorker() {
  yield takeLatest(MANAGE_PREMIUM_RIDE_LIST, managePremiumRideListWorker);
}

export function* watchDefaultPremiumDuedepositWorker() {
  yield takeLatest(
    DEFAULT_PREMIUM_DUEDEPOSIT_FIND_ONE,
    defaultPremiumDuedepositWorker
  );
}

export function* watchManagePremiumDuedepositWorker() {
  yield takeLatest(
    MANAGE_PREMIUM_DUEDEPOSIT_FIND_ONE,
    managePremiumDuedepositWorker
  );
}

export function* watchDefaultPremiumDuedepositEditWorker() {
  yield takeLatest(
    DEFAULT_PREMIUM_DUEDEPOSIT_EDIT,
    defaultPremiumDuedepositEditWorker
  );
}

export function* watchmanagePremiumOneFindOneWorker() {
  yield takeLatest(MANAGE_PREMIUMONE_FIND_ONE, managePremiumOneFindOneWorker);
}
export function* watchmanagePremiumTwoFindOneWorker() {
  yield takeLatest(MANAGE_PREMIUMTWO_FIND_ONE, managePremiumTwoFindOneWorker);
}
export function* watchmanagePremiumThreeFindOneWorker() {
  yield takeLatest(
    MANAGE_PREMIUMTHREE_FIND_ONE,
    managePremiumThreeFindOneWorker
  );
}
export function* watchmanagePremiumFourFindOneWorker() {
  yield takeLatest(MANAGE_PREMIUMFOUR_FIND_ONE, managePremiumFourFindOneWorker);
}
export function* watchmanagePremiumFiveFindOneWorker() {
  yield takeLatest(MANAGE_PREMIUMFIVE_FIND_ONE, managePremiumFiveFindOneWorker);
}

export function* watchDefaultPremiumPricingModuleEditApiWorker() {
  yield takeLatest(
    DEFAULT_PREMIUM_PRICING_MODULE_EDIT,
    defaultPremiumPricingModuleEditApiWorker
  );
}
export function* watchManagePremium1235EditWorker() {
  yield takeLatest(MANAGE_PREMIUM1235__EDIT, managePremium1235EditWorker);
}

export function* watchManagePremiumDuedepositEditWorker() {
  yield takeLatest(
    MANAGE_PREMIUM_DUEDEPOSIT_EDIT,
    managePremiumDuedepositEditWorker
  );
}

export function* watchManagePremiumPricingModuleEditApiWorker() {
  yield takeLatest(
    MANAGE_PREMIUM_PRICING_MODULE_EDIT,
    managePremiumPricingModuleEditApiWorker
  );
}
export function* watchManagePremiumStatusUpdateApiWorker() {
  yield takeLatest(
    MANAGE_PREMIUM_STATUS_UPDATE_EDIT,
    managePremiumStatusUpdateApiWorker
  );
}
export function* watchManagePremium4SubscriptionWorker() {
  yield takeLatest(
    MANAGE_PREMIUM4_SUBSCRIPTION,
    managePremium4SubscriptionWorker
  );
}
export function* watchManagePremium5SubscriptionWorker() {
  yield takeLatest(
    MANAGE_PREMIUM5_SUBSCRIPTION,
    managePremium5SubscriptionWorker
  );
}

export function* watchManagePremiumSubscriptionEditWorker() {
  yield takeLatest(
    MANAGE_PREMIUM_SUBSCRIPTION_EDIT,
    managePremiumSubscriptionEditWorker
  );
}

export function* watchArchivedPremiumListWorker() {
  yield takeLatest(ARCHIVED_PREMIUM_LIST, archivedPremiumListWorker);
}

export function* watchArchivedPremiumRideListWorker() {
  yield takeLatest(ARCHIVED_PREMIUM_RIDE_LIST, archivedPremiumRideListWorker);
}

export function* watchArchivedPremiumOneFindOneWorker() {
  yield takeLatest(
    ARCHIVED_PREMIUMONE_FIND_ONE,
    archivedPremiumOneFindOneWorker
  );
}
export function* watchArchivedPremiumTwoFindOneWorker() {
  yield takeLatest(
    ARCHIVED_PREMIUMTWO_FIND_ONE,
    archivedPremiumTwoFindOneWorker
  );
}
export function* watchArchivedPremiumThreeFindOneWorker() {
  yield takeLatest(
    ARCHIVED_PREMIUMTHREE_FIND_ONE,
    archivedPremiumThreeFindOneWorker
  );
}
export function* watchArchivedPremiumFourFindOneWorker() {
  yield takeLatest(
    ARCHIVED_PREMIUMFOUR_FIND_ONE,
    archivedPremiumFourFindOneWorker
  );
}
export function* watchArchivedPremiumFiveFindOneWorker() {
  yield takeLatest(
    ARCHIVED_PREMIUMFIVE_FIND_ONE,
    archivedPremiumFiveFindOneWorker
  );
}

export function* watchArchivedPremiumDuedepositWorker() {
  yield takeLatest(
    ARCHIVED_PREMIUM_DUEDEPOSIT_FIND_ONE,
    archivedPremiumDuedepositWorker
  );
}
export function* watchArchivedPremium4SubscriptionWorker() {
  yield takeLatest(
    ARCHIVED_PREMIUM4_SUBSCRIPTION,
    archivedPremium4SubscriptionWorker
  );
}
export function* watchArchivedPremium5SubscriptionWorker() {
  yield takeLatest(
    ARCHIVED_PREMIUM5_SUBSCRIPTION,
    archivedPremium5SubscriptionWorker
  );
}
export function* watchAutoReneActiveInactivePremiumWorker() {
  yield takeLatest(
    AUTO_RENEWAL_ACTIVE_INACTIVE_PREMIUM,
    autoReneActiveInactivePremiumWorker
  );
}
export function* watchCancelAutoRenewalPremiumWorker() {
  yield takeLatest(CANCEL_AUTO_RENEWAL_PREMIUM, cancelAutoRenewalPremiumWorker);
}

export function* watchCancelActiveAutoRenewalPremiumWorker() {
  yield takeLatest(
    CANCEL_ACTIVE_AUTO_RENEWAL_PREMIUM,
    cancelActiveAutoRenewalPremiumWorker
  );
}

export function* watchCancelActiveScheduledPremiumWorker() {
  yield takeLatest(
    CANCEL_ACTIVE_SCHEDULED_PREMIUM,
    cancelActiveScheduledPremiumWorker
  );
}
