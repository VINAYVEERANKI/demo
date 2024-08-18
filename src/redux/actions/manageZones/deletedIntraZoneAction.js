import {
  DELETED_INTRA_ZONES_DRP_DWN,
  DELETED_INTRA_ZONES_LIST,
  DELETE_LOCAL_INTRA_ZONE_PERMANENTLY,
  DELETE_OUTSTATION_INTRA_ZONE_PERMANENTLY,
  DELETE_SPECIAL_ZONE_INTRA_ZONE_PERMANENTLY,
  DELETE_TOLL_INTRA_ZONE_PERMANENTLY,
  RESTORE_LOCAL_INTRA_ZONES,
  RESTORE_OUTSTATION_INTRA_ZONES,
  RESTORE_SPECIAL_ZONE_INTRA_ZONES,
  RESTORE_TOLL_INTRA_ZONES,
} from "../types";

export const deletedIntraZoneListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DELETED_INTRA_ZONES_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const restoreDeletedLocalIntraZoneAction = (
  data,
  onSuccess,
  onError
) => {
  return { type: RESTORE_LOCAL_INTRA_ZONES, data, onSuccess, onError };
};
export const restoreDeletedSpecialIntraZoneAction = (
  data,
  onSuccess,
  onError
) => {
  return { type: RESTORE_SPECIAL_ZONE_INTRA_ZONES, data, onSuccess, onError };
};
export const restoreDeletedTollIntraZoneAction = (data, onSuccess, onError) => {
  return { type: RESTORE_TOLL_INTRA_ZONES, data, onSuccess, onError };
};
export const restoreDeletedOutstationIntraZoneAction = (
  data,
  onSuccess,
  onError
) => {
  return { type: RESTORE_OUTSTATION_INTRA_ZONES, data, onSuccess, onError };
};

export const deleteLocalIntraZonePermanentlyAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_LOCAL_INTRA_ZONE_PERMANENTLY,
    data,
    onSuccess,
    onError,
  };
};
export const deleteOutstationIntraZonePermanentlyAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_OUTSTATION_INTRA_ZONE_PERMANENTLY,
    data,
    onSuccess,
    onError,
  };
};
export const deleteSpecialIntraZonePermanentlyAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_SPECIAL_ZONE_INTRA_ZONE_PERMANENTLY,
    data,
    onSuccess,
    onError,
  };
};
export const deleteTollIntraZonePermanentlyAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_TOLL_INTRA_ZONE_PERMANENTLY,
    data,
    onSuccess,
    onError,
  };
};

export const deletintrazoneDrpdwnAction = (onSuccess, onError) => {
  return {
    type: DELETED_INTRA_ZONES_DRP_DWN,
    onSuccess,
    onError,
  };
};