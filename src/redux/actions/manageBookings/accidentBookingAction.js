import {
  ACCIDENT_BOOKING_CANCEL_DRIVER_FINE,
  ACCIDENT_BOOKING_CANCEL_REFUND,
  ACCIDENT_BOOKING_CREATE_REFUND,
  ACCIDENT_BOOKING_INDIVIDUAL,
  ACCIDENT_BOOKING_LIST,
  ACCIDENT_UPDATE_BILLING_DETAILS,
  ACCIDENT_UPDATE_FINAL_ODOMETER,
  ACCIDENT_UPDATE_INITIAL_ODOMETER,
  ACCIDENT_UPDATE_PaymentMethod,
  ACCIDENT_BOOKINGS_DROPDOWN_LIST,
} from "../types";

export const accidentBookingListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ACCIDENT_BOOKING_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const accidentBookingIndividualAction = (data, onSuccess, onError) => {
  return {
    type: ACCIDENT_BOOKING_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};

export const accidentUpdateBillingDetailsAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: ACCIDENT_UPDATE_BILLING_DETAILS,
    data,
    onSuccess,
    onError,
  };
};

export const accidentUpdateInitialOdometerAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: ACCIDENT_UPDATE_INITIAL_ODOMETER,
    data,
    onSuccess,
    onError,
  };
};
export const accidentUpdateFinalOdometerAction = (data, onSuccess, onError) => {
  return {
    type: ACCIDENT_UPDATE_FINAL_ODOMETER,
    data,
    onSuccess,
    onError,
  };
};
export const accidentUpdatePaymentMethodAction = (data, onSuccess, onError) => {
  return {
    type: ACCIDENT_UPDATE_PaymentMethod,
    data,
    onSuccess,
    onError,
  };
};
export const accidentBookingCreateRefundAction = (data, onSuccess, onError) => {
  return {
    type: ACCIDENT_BOOKING_CREATE_REFUND,
    data,
    onSuccess,
    onError,
  };
};
export const accidentBookingCancelRefundAction = (data, onSuccess, onError) => {
  return {
    type: ACCIDENT_BOOKING_CANCEL_REFUND,
    data,
    onSuccess,
    onError,
  };
};
export const accidentBookingCancelDriverFineAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: ACCIDENT_BOOKING_CANCEL_DRIVER_FINE,
    data,
    onSuccess,
    onError,
  };
};
export const accidentBookingsDropdownListAction = (
  onSuccess,
  onError
) => {
  return {
    type: ACCIDENT_BOOKINGS_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
