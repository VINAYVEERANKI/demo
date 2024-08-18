import {
  ADD_BLOCKED_ZONE,
  BLOCKED_ZONES_DRP_DWN,
  BLOCKED_ZONES_LIST,
  BLOCKED_ZONE_VIEW,
  UNBLOCK_ZONE,
  UPDATE_BLOCK_ZONE,
} from "../types";

export const blockZoneListAction = (data, current_page, onSuccess, onError) => {
  return {
    type: BLOCKED_ZONES_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const addblockZoneAction = (data, onSuccess, onError) => {
  return { type: ADD_BLOCKED_ZONE, data, onSuccess, onError };
};
export const updateblockZoneAction = (data, onSuccess, onError) => {
  return { type: UPDATE_BLOCK_ZONE, data, onSuccess, onError };
};

export const blockZoneViewAction = (data, onSuccess, onError) => {
  return {
    type: BLOCKED_ZONE_VIEW,
    data,
    onSuccess,
    onError,
  };
};
export const unblockZoneAction = (data, onSuccess, onError) => {
  return {
    type: UNBLOCK_ZONE,
    data,
    onSuccess,
    onError,
  };
};
export const blockedzoneDrpdwnAction = (onSuccess, onError) => {
  return {
    type: BLOCKED_ZONES_DRP_DWN,
    onSuccess,
    onError,
  };
};