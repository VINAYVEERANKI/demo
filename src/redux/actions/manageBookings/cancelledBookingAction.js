import {
  CANCELLED_BOOKING_CANCEL_DRIVER_FINE,
  CANCELLED_BOOKING_CANCEL_REFUND,
  CANCELLED_BOOKING_CREATE_REFUND,
  CANCELLED_BOOKING_INDIVIDUAL,
  CANCELLED_BOOKING_LIST,
  CANCELLED_UPDATE_BILLING_DETAILS,
  CANCELLED_UPDATE_FINAL_ODOMETER,
  CANCELLED_UPDATE_INITIAL_ODOMETER,
  CANCELLED_UPDATE_PaymentMethod,
  CANCELLED_BOOKINGS_DROPDOWN_LIST,
} from "../types";

export const cancelledBookingListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: CANCELLED_BOOKING_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const cancelledBookingIndividualAction = (data, onSuccess, onError) => {
  return {
    type: CANCELLED_BOOKING_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};

export const cancelledUpdatePaymentMethodAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: CANCELLED_UPDATE_PaymentMethod,
    data,
    onSuccess,
    onError,
  };
};
export const cancelledUpdateBillingDetailsAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: CANCELLED_UPDATE_BILLING_DETAILS,
    data,
    onSuccess,
    onError,
  };
};
export const cancelledUpdateInitialOdometerAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: CANCELLED_UPDATE_INITIAL_ODOMETER,
    data,
    onSuccess,
    onError,
  };
};
export const cancelledUpdateFinalOdometerAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: CANCELLED_UPDATE_FINAL_ODOMETER,
    data,
    onSuccess,
    onError,
  };
};
export const cancelledBookingCreateRefundAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: CANCELLED_BOOKING_CREATE_REFUND,
    data,
    onSuccess,
    onError,
  };
};
export const cancelledBookingCancelRefundAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: CANCELLED_BOOKING_CANCEL_REFUND,
    data,
    onSuccess,
    onError,
  };
};
export const cancelledBookingCancelDriverFineAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: CANCELLED_BOOKING_CANCEL_DRIVER_FINE,
    data,
    onSuccess,
    onError,
  };
};

export const cancelledBookingsDropdownListAction = (
  onSuccess,
  onError
) => {
  return {
    type: CANCELLED_BOOKINGS_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
