import { ADJUSTED_BOOKING_INDIVIDUAL, ADJUSTED_BOOKING_LIST, ADJUSTED_BOOKINGS_DROPDOWN_LIST } from "../types";

export const adjustedBookingListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ADJUSTED_BOOKING_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const adjustedBookingIndividualAction = (data, onSuccess, onError) => {
  return {
    type: ADJUSTED_BOOKING_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};

export const adjustedBookingsDropdownListAction = (
  onSuccess,
  onError
) => {
  return {
    type: ADJUSTED_BOOKINGS_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};

