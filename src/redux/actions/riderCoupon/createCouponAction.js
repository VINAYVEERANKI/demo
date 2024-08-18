import {
  ACTIVE_COUPON_ALL_VIEW,
  COUPON_LOCAL_ZONE_LIST,
  COUPON_MAIN_ZONE_LIST,
  COUPON_OUTSTATION_ZONE_LIST,
  COUPON_SPECIAL_ZONE_LIST,
  CREATE_BOOKING_DESTINATION_ACTION,
  CREATE_BOOKING_DISTANCE_ACTION,
  CREATE_GENERAL_ACTION,
  CREATE_NEW_ACCOUNT_ACTION,
  CREATE_NEW_ACCOUNT_LIFE_SPAN,
  CREATE_OUTSTATION_PACKAGE_ACTION,
  CREATE_PAYMENT_METHOD_ACTION,
  CREATE_PICKUP_DROPOFF_ACTION,
  CREATE_RENTAL_PACKAGE_ACTION,
  DELETED_COUPON_ALL_VIEW,
  EXPIRED_COUPON_ALL_VIEW,
  PENDING_COUPON_ALL_VIEW,
  REJECTED_COUPON_ALL_VIEW,
} from "../types";

// zone list

export const couponMainZoneListAction = (onSuccess, onError) => {
  return {
    type: COUPON_MAIN_ZONE_LIST,
    onSuccess,
    onError,
  };
};

export const couponLocalZoneListAction = (data, onSuccess, onError) => {
  return {
    type: COUPON_LOCAL_ZONE_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const couponSpecialZoneListAction = (data, onSuccess, onError) => {
  return {
    type: COUPON_SPECIAL_ZONE_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const couponOutstationZoneListAction = (data, onSuccess, onError) => {
  return {
    type: COUPON_OUTSTATION_ZONE_LIST,
    data,
    onSuccess,
    onError,
  };
};

// zonelist ends

export const createGeneralAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_GENERAL_ACTION,
    data,
    onSuccess,
    onError,
  };
};

export const createNewAccountAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_NEW_ACCOUNT_ACTION,
    data,
    onSuccess,
    onError,
  };
};
export const createNewAccountLifeSpanAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_NEW_ACCOUNT_LIFE_SPAN,
    data,
    onSuccess,
    onError,
  };
};
export const createPaymentMethodAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_PAYMENT_METHOD_ACTION,
    data,
    onSuccess,
    onError,
  };
};

export const createBookingDestinationAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_BOOKING_DESTINATION_ACTION,
    data,
    onSuccess,
    onError,
  };
};
export const createPickupDropoffAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_PICKUP_DROPOFF_ACTION,
    data,
    onSuccess,
    onError,
  };
};
export const createRentalPackageAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_RENTAL_PACKAGE_ACTION,
    data,
    onSuccess,
    onError,
  };
};
export const createBookingDistanceAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_BOOKING_DISTANCE_ACTION,
    data,
    onSuccess,
    onError,
  };
};
export const createOutstationPackageAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_OUTSTATION_PACKAGE_ACTION,
    data,
    onSuccess,
    onError,
  };
};

// view all

export const pendingCouponAllViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: PENDING_COUPON_ALL_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const activeCouponAllViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ACTIVE_COUPON_ALL_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const rejectedCouponAllViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: REJECTED_COUPON_ALL_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const deletedCouponAllViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DELETED_COUPON_ALL_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const expiredCouponAllViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: EXPIRED_COUPON_ALL_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
