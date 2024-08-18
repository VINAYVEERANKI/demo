import {
  ARCHIVED_FARES_LOCAL_ZONES_LIST,
  ARCHIVED_FARES_LOCAL_ZONE_DROPDOWN_LIST,
  ARCHIVED_FARES_LOCAL_ZONE_INDIVIDUAL,
  ARCHIVED_FARES_ONEWAY_TRIP_INDIVIDUAL,
  ARCHIVED_FARES_ONEWAY_TRIP_LIST,
  ARCHIVED_FARES_RENTAL_INDIVIDUAL,
  ARCHIVED_FARES_ROUND_TRIP_INDIVIDUAL,
  ARCHIVED_FARES_ROUND_TRIP_LIST,
  ARCHIVED_FARES_SPECIAL_ZONE_INDIVIDUAL,
  ARCHIVED_FARES_TOLLS_ZONE_INDIVIDUAL,
  ARCHIVED_FARES_TOLLS_ZONE_LIST,
  LOCAL_CREATE_ARCHIVED_FARES,
  ARCHIVED_FARES_RENTAL_LIST,
  ARCHIVED_FARES_SPECIAL_ZONE_LIST,
  ARCHIVED_FARES_LIST,
  ARCHIVED_DELETED_INTRA_FARES_LIST,
} from "./types";

export const ArchivedFaresListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ARCHIVED_FARES_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const archivedSpecialfaresListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ARCHIVED_FARES_SPECIAL_ZONE_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const archivedSpecialFaresAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVED_FARES_SPECIAL_ZONE_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};

export const archivedTollsListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ARCHIVED_FARES_TOLLS_ZONE_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const ArchivedTollsFaresAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVED_FARES_TOLLS_ZONE_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};

export const archivedOneWaytripListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ARCHIVED_FARES_ONEWAY_TRIP_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const archivedOneWaytripAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVED_FARES_ONEWAY_TRIP_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};

export const ArchivedLocalDropDownListAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVED_FARES_LOCAL_ZONE_DROPDOWN_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const ArchivedLocalCreateAction = (data, onSuccess, onError) => {
  return {
    type: LOCAL_CREATE_ARCHIVED_FARES,
    data,
    onSuccess,
    onError,
  };
};
export const ArchivedLocalFaresListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ARCHIVED_FARES_LOCAL_ZONES_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const ArchivedLocalFaresAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVED_FARES_LOCAL_ZONE_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};

export const archivedRoundTripListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ARCHIVED_FARES_ROUND_TRIP_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const archivedRoundTripAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVED_FARES_ROUND_TRIP_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};

export const archivedRentalListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ARCHIVED_FARES_RENTAL_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const archivedRentalAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVED_FARES_RENTAL_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};
export const archiveDelIntraFaresListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ARCHIVED_DELETED_INTRA_FARES_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

