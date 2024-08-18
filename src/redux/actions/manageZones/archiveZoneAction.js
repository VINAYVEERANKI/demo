import { ADD_ARCHIVE_ZONE, ARCHIVE_ZONES_DRP_DWN, ARCHIVE_ZONES_LIST, ARCHIVE_ZONE_VIEW, RESTORE_ARCHIVE_ZONE } from "../types";

export const archiveZoneListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ARCHIVE_ZONES_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const addArchiveZoneAction = (data, onSuccess, onError) => {
  return { type: ADD_ARCHIVE_ZONE, data, onSuccess, onError };
};

export const archiveZoneViewAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVE_ZONE_VIEW,
    data,
    onSuccess,
    onError,
  };
};
export const restoreArchiveZoneAction = (data, onSuccess, onError) => {
  return {
    type: RESTORE_ARCHIVE_ZONE,
    data,
    onSuccess,
    onError,
  };
};

export const archivezoneDrpdwnAction = (onSuccess, onError) => {
  return {
    type: ARCHIVE_ZONES_DRP_DWN,
    onSuccess,
    onError,
  };
};