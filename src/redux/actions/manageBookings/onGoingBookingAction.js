import {
  ONGOING_ACCIDENT_REPORTED,
  ONGOING_BOOKING_INDIVIDUAL,
  ONGOING_BOOKING_LIST,
  ONGOING_DRIVER_REQ_CANCEL,
  ONGOING_END_TRIP,
  ONGOING_RIDER_REQ_CANCEL,
  ONGOING_UPDATE_BILLING_DETAILS,
  ONGOING_UPDATE_FINAL_ODOMETER,
  ONGOING_UPDATE_INITIAL_ODOMETER,
  ONGOING_UPDATE_PaymentMethod,
  ONGOING_BOOKINGS_DROPDOWN_LIST,
} from "../types";

export const ongoingBookingListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ONGOING_BOOKING_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const ongoingBookingIndividualAction = (data, onSuccess, onError) => {
  return {
    type: ONGOING_BOOKING_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};
export const ongoingDriverReqCancelAction = (data, onSuccess, onError) => {
  return {
    type: ONGOING_DRIVER_REQ_CANCEL,
    data,
    onSuccess,
    onError,
  };
};
export const ongoingRiderReqCancelAction = (data, onSuccess, onError) => {
  return {
    type: ONGOING_RIDER_REQ_CANCEL,
    data,
    onSuccess,
    onError,
  };
};
export const ongoingAccidentReportAction = (data, onSuccess, onError) => {
  return {
    type: ONGOING_ACCIDENT_REPORTED,
    data,
    onSuccess,
    onError,
  };
};
export const ongoingEndTripAction = (data, onSuccess, onError) => {
  return {
    type: ONGOING_END_TRIP,
    data,
    onSuccess,
    onError,
  };
};
export const ongoingUpdatePaymentMethodAction = (data, onSuccess, onError) => {
  return {
    type: ONGOING_UPDATE_PaymentMethod,
    data,
    onSuccess,
    onError,
  };
};
export const ongoingUpdateBillingDetailsAction = (data, onSuccess, onError) => {
  return {
    type: ONGOING_UPDATE_BILLING_DETAILS,
    data,
    onSuccess,
    onError,
  };
};
export const ongoingUpdateInitialOdometerAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: ONGOING_UPDATE_INITIAL_ODOMETER,
    data,
    onSuccess,
    onError,
  };
};
export const ongoingUpdateFinalOdometerAction = (data, onSuccess, onError) => {
  return {
    type: ONGOING_UPDATE_FINAL_ODOMETER,
    data,
    onSuccess,
    onError,
  };
};

export const ongoingBookingsDropdownListAction = (
  onSuccess,
  onError
) => {
  return {
    type: ONGOING_BOOKINGS_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};