import { DRIVER_FAQ_DURING_TRIP_LOCAL_FIND_ALL, DRIVER_FAQ_DURING_TRIP_ONEWAY_FIND_ALL, DRIVER_FAQ_DURING_TRIP_RENTAL_FIND_ALL, DRIVER_FAQ_DURING_TRIP_ROUND_FIND_ALL } from "../../types";


export const driverFaqDuringTripLocalFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRIVER_FAQ_DURING_TRIP_LOCAL_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const driverFaqDuringTripRentalFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRIVER_FAQ_DURING_TRIP_RENTAL_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const driverFaqDuringTripOneWayFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRIVER_FAQ_DURING_TRIP_ONEWAY_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const driverFaqDuringTripRoundFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRIVER_FAQ_DURING_TRIP_ROUND_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };