// find one view

import {
  PENDING_COUPON_FIND_ONE,
  GENERAL_COUPON_EDIT,
  NEWACCOUNT_COUPON_EDIT,
  PAYMENT_METHOD_COUPON_EDIT,
  BOOKING_DESTINATION_COUPON_EDIT,
  PICKUP_DROPOFF_COUPON_EDIT,
  RENTAL_PACKAGE_COUPON_EDIT,
  BOOKING_DISTANCE_COUPON_EDIT,
  OUTSTATION_PACKAGE_COUPON_EDIT,
  ACTIVE_COUPON_FIND_ONE,
  ACTIVE_COUPON_EDIT,
  REJECTED_COUPON_FIND_ONE,
  DELETED_COUPON_FIND_ONE,
  EXPIRED_COUPON_FIND_ONE,
  NEWACCOUNT_LIFE_SPAN_COUPON_EDIT,
} from "../types";

export const pendingCouponFindOneAction = (data, onSuccess, onError) => {
  return {
    type: PENDING_COUPON_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};

export const activeCouponFindOneAction = (data, onSuccess, onError) => {
  return {
    type: ACTIVE_COUPON_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const rejectedCouponFindOneAction = (data, onSuccess, onError) => {
  return {
    type: REJECTED_COUPON_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const deletedCouponFindOneAction = (data, onSuccess, onError) => {
  return {
    type: DELETED_COUPON_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const expiredCouponFindOneAction = (data, onSuccess, onError) => {
  return {
    type: EXPIRED_COUPON_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};

// edit

export const generalCouponEditAction = (data, onSuccess, onError) => {
  return {
    type: GENERAL_COUPON_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const newAccountCouponEditAction = (data, onSuccess, onError) => {
  return {
    type: NEWACCOUNT_COUPON_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const newAccountLifeSpanCouponEditAction = (data, onSuccess, onError) => {
  return {
    type: NEWACCOUNT_LIFE_SPAN_COUPON_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const paymentMethodCouponEditAction = (data, onSuccess, onError) => {
  return {
    type: PAYMENT_METHOD_COUPON_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const bookingDestinatinCouponEditAction = (data, onSuccess, onError) => {
  return {
    type: BOOKING_DESTINATION_COUPON_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const pickUpDropOffCouponEditAction = (data, onSuccess, onError) => {
  return {
    type: PICKUP_DROPOFF_COUPON_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const rentalPackageCouponEditAction = (data, onSuccess, onError) => {
  return {
    type: RENTAL_PACKAGE_COUPON_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const bookingDistanceCouponEditAction = (data, onSuccess, onError) => {
  return {
    type: BOOKING_DISTANCE_COUPON_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const outstationPackageCouponEditAction = (data, onSuccess, onError) => {
  return {
    type: OUTSTATION_PACKAGE_COUPON_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const activeCouponEditAction = (data, onSuccess, onError) => {
  return {
    type: ACTIVE_COUPON_EDIT,
    data,
    onSuccess,
    onError,
  };
};
