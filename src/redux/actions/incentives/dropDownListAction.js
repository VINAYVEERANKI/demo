import { INCENTIVE_MAIN_ZONE_LIST, INCENTIVE_RIDE_TYPE_LIST } from "../types";


export const incentiveMainZoneListAction = ( onSuccess, onError) => {
    return {
      type: INCENTIVE_MAIN_ZONE_LIST,
      onSuccess,
      onError,
    };
  };
  export const incentiveRideTypeListAction = ( onSuccess, onError) => {
    return {
      type: INCENTIVE_RIDE_TYPE_LIST,
      onSuccess,
      onError,
    };
  };