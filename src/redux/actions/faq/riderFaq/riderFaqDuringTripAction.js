import { RIDER_FAQ_DURING_TRIP_LOCAL_FIND_ALL, RIDER_FAQ_DURING_TRIP_ONEWAY_FIND_ALL, RIDER_FAQ_DURING_TRIP_RENTAL_FIND_ALL, RIDER_FAQ_DURING_TRIP_ROUND_FIND_ALL } from "../../types";


export const riderFaqDuringTripLocalFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_DURING_TRIP_LOCAL_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqDuringTripRentalFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_DURING_TRIP_RENTAL_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqDuringTripOneWayFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_DURING_TRIP_ONEWAY_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqDuringTripRoundFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_DURING_TRIP_ROUND_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };