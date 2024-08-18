import {
  DEFAULT_RIDE_TYPE_LIST,
  EDIT_LOCAL_DEFAULT_FARE,
  EDIT_ONEWAY_PACKAGE_DETAILS,
  EDIT_ONEWAY_TRIP_FARE,
  EDIT_RENTAL_FARE,
  EDIT_ROUND_TRIP_FARE,
  EDIT_ROUND_TRIP_PACKAGE_DETAILS,
  EDIT_SPECIAL_ZONE_FARE,
  EDIT_TOLLS_FARE,
  LOCAL_DEFAULT_FARE_VALUE,
  ONEWAY_TRIP_FARE_VALUE,
  RENTAL_FARE_VALUE,
  ROUND_TRIP_FARE_VALUE,
  SPECIAL_ZONE_FARE_VALUE,
  TOLLS_FARE_VALUE,
} from "./types";

export const localDefaultFareValueAction = (onSuccess, onError) => {
  return {
    type: LOCAL_DEFAULT_FARE_VALUE,
    onSuccess,
    onError,
  };
};
export const EditLocalDefaultfareAction = (data, onSuccess, onError) => {
  return {
    type: EDIT_LOCAL_DEFAULT_FARE,
    data,
    onSuccess,
    onError,
  };
};
export const specialZoneFareValueAction = (onSuccess, onError) => {
  return {
    type: SPECIAL_ZONE_FARE_VALUE,
    onSuccess,
    onError,
  };
};
export const EditSpecialZonefareAction = (data, onSuccess, onError) => {
  return {
    type: EDIT_SPECIAL_ZONE_FARE,
    data,
    onSuccess,
    onError,
  };
};
export const tollsFareValueAction = (onSuccess, onError) => {
  return {
    type: TOLLS_FARE_VALUE,
    onSuccess,
    onError,
  };
};
export const EditTollsfareAction = (data, onSuccess, onError) => {
  return {
    type: EDIT_TOLLS_FARE,
    data,
    onSuccess,
    onError,
  };
};
export const EditOneWayTripfareAction = (data, onSuccess, onError) => {
  return {
    type: EDIT_ONEWAY_TRIP_FARE,
    data,
    onSuccess,
    onError,
  };
};
export const OnewayTripFareValueAction = (onSuccess, onError) => {
  return {
    type: ONEWAY_TRIP_FARE_VALUE,
    onSuccess,
    onError,
  };
};
export const EditOnewayPackageDetailsAction = (data, onSuccess, onError) => {
  return {
    type: EDIT_ONEWAY_PACKAGE_DETAILS,
    data,
    onSuccess,
    onError,
  };
};
export const EditRoundTripfareAction = (data, onSuccess, onError) => {
  return {
    type: EDIT_ROUND_TRIP_FARE,
    data,
    onSuccess,
    onError,
  };
};
export const RoundTripFareValueAction = (onSuccess, onError) => {
  return {
    type: ROUND_TRIP_FARE_VALUE,
    onSuccess,
    onError,
  };
};
export const EditRoundTripPackageDetailsAction = (data, onSuccess, onError) => {
  return {
    type: EDIT_ROUND_TRIP_PACKAGE_DETAILS,
    data,
    onSuccess,
    onError,
  };
};
export const RentalFareValueAction = (data, onSuccess, onError) => {
  return {
    type: RENTAL_FARE_VALUE,
    data,
    onSuccess,
    onError,
  };
};
export const EditRentalFareAction = (data, onSuccess, onError) => {
  return {
    type: EDIT_RENTAL_FARE,
    data,
    onSuccess,
    onError,
  };
};
export const defaultRideTypeListAction = (onSuccess, onError) => {
  return {
    type: DEFAULT_RIDE_TYPE_LIST,
    onSuccess,
    onError,
  };
};
