import {
  ACTIVATE_RIDER,
  BLOCKED_RIDER_DROPDOWN_LIST,
  BLOCKED_RIDER_LIST,
  BLOCKED_RIDER_VIEW,
  BLOCK_RIDER,
  DELETED_RIDER_LIST,
  DELETED_RIDER_VIEW,
  DELETE_RIDER,
  DEL_RIDER_DROPDOWN_LIST,
  PERMANENTLY_DELETE_RIDER,
  PERMANENTLY_DELETE_RIDER_LIST,
  PERMANENTLY_DELETE_RIDER_VIEW,
  PER_DEL_RIDER_DROPDOWN_LIST,
  RESET_RIDER_PICTURE,
  RESET_RIDER_RATING,
  RESTORE_RIDER,
  RIDER_DROPDOWN_LIST,
  RIDER_LIST,
  RIDER_VIEW,
  UNBLOCK_RIDER,
} from "./types";

export const riderListAction = (data, current_page, onSuccess, onError) => {
  return {
    type: RIDER_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const riderViewAction = (data, current_page, onSuccess, onError) => {
  return {
    type: RIDER_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const resetRiderRatingAction = (id, data, onSuccess, onError) => {
  return {
    type: RESET_RIDER_RATING,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const resetRiderPictureAction = (id, data, onSuccess, onError) => {
  return {
    type: RESET_RIDER_PICTURE,
    id,
    data,
    onSuccess,
    onError,
  };
};

export const activateRiderAction = (id, data, onSuccess, onError) => {
  return {
    type: ACTIVATE_RIDER,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const blockRiderAction = (id, data, onSuccess, onError) => {
  return {
    type: BLOCK_RIDER,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const deleteRiderAction = (id, data, onSuccess, onError) => {
  return {
    type: DELETE_RIDER,
    id,
    data,
    onSuccess,
    onError,
  };
};

/*********blocked riders ***********/
export const blockedRiderListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: BLOCKED_RIDER_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const blockedRiderViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: BLOCKED_RIDER_VIEW,

    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const unblockRiderAction = (id, data, onSuccess, onError) => {
  return {
    type: UNBLOCK_RIDER,
    id,
    data,
    onSuccess,
    onError,
  };
};

/************Deleted Riders ******************/

export const deletedRiderListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DELETED_RIDER_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const deletedRiderViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DELETED_RIDER_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const restoreRiderAction = (id, data, onSuccess, onError) => {
  return {
    type: RESTORE_RIDER,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const permanentlyDeleteRiderAction = (id, data, onSuccess, onError) => {
  return {
    type: PERMANENTLY_DELETE_RIDER,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const permanentlyDelRiderListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: PERMANENTLY_DELETE_RIDER_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const permanentlyDelRiderViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: PERMANENTLY_DELETE_RIDER_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const riderdropdownListAction = (onSuccess, onError) => {
  return {
    type: RIDER_DROPDOWN_LIST,

    onSuccess,
    onError,
  };
};
export const blockedRiderdropdownListAction = (onSuccess, onError) => {
  return {
    type: BLOCKED_RIDER_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};

export const delRiderdropdownListAction = (onSuccess, onError) => {
  return {
    type: DEL_RIDER_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
export const perdelRiderdropdownListAction = (onSuccess, onError) => {
  return {
    type: PER_DEL_RIDER_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
