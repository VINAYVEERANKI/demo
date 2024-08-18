import {
  FARES_LOCAL_UPDATE_PRICING_DETAILS,
  FARES_LOCAL_UPDATE_PRICING_MODULE,
  FARES_LOCAL_ZONES_LIST,
  FARES_LOCAL_ZONE_DROPDOWN_LIST,
  FARES_LOCAL_ZONE_INDIVIDUAL,
  FARES_ONEWAY_TRIP_INDIVIDUAL,
  FARES_ONEWAY_TRIP_INDIVIDUAL_EDIT,
  FARES_ONEWAY_TRIP_LIST,
  FARES_ONEWAY_TRIP_PACKAGE_EDIT,
  FARES_RENTAL_INDIVIDUAL,
  FARES_RENTAL_INDIVIDUAL_EDIT,
  FARES_ROUND_TRIP_INDIVIDUAL,
  FARES_ROUND_TRIP_INDIVIDUAL_EDIT,
  FARES_ROUND_TRIP_LIST,
  FARES_ROUND_TRIP_PACKAGE_EDIT,
  FARES_SPECIAL_ZONE_INDIVIDUAL,
  FARES_SPECIAL_ZONE_INDIVIDUAL_EDIT,
  FARES_TOLLS_ZONE_INDIVIDUAL,
  FARES_TOLLS_ZONE_INDIVIDUAL_EDIT,
  FARES_TOLLS_ZONE_LIST,
  LOCAL_CREATE_FARES,
  MANAGE_FARES_LIST,
  FARES_RENTAL_LIST,
  FARES_SPECIAL_ZONE_LIST,
  DELETED_INTRA_FARES_LIST,
  DELETED_INTRA_FARES_INDIVIDUAL,
  ZONE_STATUS_CHANGE,
  CREATE_RENTAL_PACKAGE,
  DELETE_RENTAL_PACKAGE,
  MANAGE_FARES_DRP_DWN,
} from "./types";

export const ManageFaresListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: MANAGE_FARES_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const faresSpecialZoneListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: FARES_SPECIAL_ZONE_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const FaresSpecialZonesAction = (data, onSuccess, onError) => {
  return {
    type: FARES_SPECIAL_ZONE_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};
export const FaresSpecialZonesEditAction = (data, onSuccess, onError) => {
  return {
    type: FARES_SPECIAL_ZONE_INDIVIDUAL_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const FaresTollsListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: FARES_TOLLS_ZONE_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const FaresTollsZonesAction = (data, onSuccess, onError) => {
  return {
    type: FARES_TOLLS_ZONE_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};
export const FaresTollsEditAction = (data, onSuccess, onError) => {
  return {
    type: FARES_TOLLS_ZONE_INDIVIDUAL_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const FaresOneWaytripListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: FARES_ONEWAY_TRIP_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const FaresOneWaytripAction = (data, onSuccess, onError) => {
  return {
    type: FARES_ONEWAY_TRIP_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};
export const FaresOneWaytripEditAction = (data, onSuccess, onError) => {
  return {
    type: FARES_ONEWAY_TRIP_INDIVIDUAL_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const FaresOneWaytripPackageEditAction = (data, onSuccess, onError) => {
  return {
    type: FARES_ONEWAY_TRIP_PACKAGE_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const FaresLocalDropDownListAction = (data, onSuccess, onError) => {
  return {
    type: FARES_LOCAL_ZONE_DROPDOWN_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const FaresLocalCreateAction = (data, onSuccess, onError) => {
  return {
    type: LOCAL_CREATE_FARES,
    data,
    onSuccess,
    onError,
  };
};
export const FaresLocalZonesListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: FARES_LOCAL_ZONES_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const FaresLocalZonesAction = (data, onSuccess, onError) => {
  return {
    type: FARES_LOCAL_ZONE_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};
export const FaresLocalUpdatepricingModuleAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: FARES_LOCAL_UPDATE_PRICING_MODULE,
    data,
    onSuccess,
    onError,
  };
};
export const FaresLocalUpdatepricingDetailsAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: FARES_LOCAL_UPDATE_PRICING_DETAILS,
    data,
    onSuccess,
    onError,
  };
};

export const FaresRoundTripListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: FARES_ROUND_TRIP_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const FaresRoundTripAction = (data, onSuccess, onError) => {
  return {
    type: FARES_ROUND_TRIP_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};
export const FaresRoundTripEditAction = (data, onSuccess, onError) => {
  return {
    type: FARES_ROUND_TRIP_INDIVIDUAL_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const FaresRoundTripPackageEditAction = (data, onSuccess, onError) => {
  return {
    type: FARES_ROUND_TRIP_PACKAGE_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const RentalListAction = (data, current_page, onSuccess, onError) => {
  return {
    type: FARES_RENTAL_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const FaresRentalAction = (data, onSuccess, onError) => {
  return {
    type: FARES_RENTAL_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};
export const FaresRentalEditAction = (data, onSuccess, onError) => {
  return {
    type: FARES_RENTAL_INDIVIDUAL_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const zoneStatusChangeAction = (data, onSuccess, onError) => {
  return {
    type: ZONE_STATUS_CHANGE,
    data,
    onSuccess,
    onError,
  };
};

export const createRentalPackageAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_RENTAL_PACKAGE,
    data,
    onSuccess,
    onError,
  };
};

export const deleteRentalPackageAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_RENTAL_PACKAGE,
    data,
    onSuccess,
    onError,
  };
};
export const managefaresDrpdwnAction = (onSuccess, onError) => {
  return {
    type: MANAGE_FARES_DRP_DWN,
    onSuccess,
    onError,
  };
};