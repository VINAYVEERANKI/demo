import { RIDER_FAQ_AFTER_TRIP_LOCAL_FIND_ALL, RIDER_FAQ_AFTER_TRIP_ONEWAY_FIND_ALL, RIDER_FAQ_AFTER_TRIP_PAYMENT_LOCAL_FIND_ALL, RIDER_FAQ_AFTER_TRIP_PAY_ONEWAY_FIND_ALL, RIDER_FAQ_AFTER_TRIP_PAY_RENT_FIND_ALL, RIDER_FAQ_AFTER_TRIP_PAY_ROUND_FIND_ALL, RIDER_FAQ_AFTER_TRIP_RENTAL_FIND_ALL, RIDER_FAQ_AFTER_TRIP_ROUND_FIND_ALL } from "../../types";

export const riderFaqAfterTripLocalFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_AFTER_TRIP_LOCAL_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqAfterTripRentalFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_AFTER_TRIP_RENTAL_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqAfterTripOnewayFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_AFTER_TRIP_ONEWAY_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqAfterTripRoundFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_AFTER_TRIP_ROUND_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqAfterTripPaymentLocalFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_AFTER_TRIP_PAYMENT_LOCAL_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqAfterTripPayRentFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_AFTER_TRIP_PAY_RENT_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqAfterTripPayOnewayFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_AFTER_TRIP_PAY_ONEWAY_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqAfterTripPayRoundFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_AFTER_TRIP_PAY_ROUND_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };