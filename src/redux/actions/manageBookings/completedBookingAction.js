import {
  COMPLETED_BOOKING_CANCEL_DRIVER_FINE,
  COMPLETED_BOOKING_CANCEL_REFUND,
  COMPLETED_BOOKING_CREATE_REFUND,
  COMPLETED_BOOKING_INDIVIDUAL,
  COMPLETED_BOOKING_LIST,
  COMPLETED_UPDATE_BILLING_DETAILS,
  COMPLETED_UPDATE_FINAL_ODOMETER,
  COMPLETED_UPDATE_INITIAL_ODOMETER,
  COMPLETED_UPDATE_PaymentMethod,
  COMPLETED_BOOKINGS_DROPDOWN_LIST,
} from "../types";

export const completedBookingListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: COMPLETED_BOOKING_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const completedBookingIndividualAction = (data, onSuccess, onError) => {
  return {
    type: COMPLETED_BOOKING_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};

export const completedUpdatePaymentMethodAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: COMPLETED_UPDATE_PaymentMethod,
    data,
    onSuccess,
    onError,
  };
};
export const completedUpdateBillingDetailsAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: COMPLETED_UPDATE_BILLING_DETAILS,
    data,
    onSuccess,
    onError,
  };
};
export const completedUpdateInitialOdometerAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: COMPLETED_UPDATE_INITIAL_ODOMETER,
    data,
    onSuccess,
    onError,
  };
};
export const completedUpdateFinalOdometerAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: COMPLETED_UPDATE_FINAL_ODOMETER,
    data,
    onSuccess,
    onError,
  };
};
export const completedBookingCreateRefundAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: COMPLETED_BOOKING_CREATE_REFUND  ,
    data,
    onSuccess, 
    onError,
  };
};
export const completedBookingCancelRefundAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: COMPLETED_BOOKING_CANCEL_REFUND,
    data,
    onSuccess,
    onError,
  };
};
export const completedBookingCancelDriverFineAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: COMPLETED_BOOKING_CANCEL_DRIVER_FINE,
    data,
    onSuccess,
    onError,
  };
};

export const completedBookingsDropdownListAction = (
  onSuccess,
  onError
) => {
  return {
    type: COMPLETED_BOOKINGS_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
