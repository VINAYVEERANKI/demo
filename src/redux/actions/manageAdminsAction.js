import {
  ADD_ADMIN,
  ADMIN_FIND_ONE,
  ADMIN_LIST,
  BLOCKED_ADMIN_EDIT,
  BLOCKED_DROPDOWN_LIST,
  BLOCK_ADMIN,
  BLOCK_ADMIN_LIST,
  DELETED_ADMIN_LIST,
  DELETED_DROPDOWN_LIST,
  DELETE_ADMIN,
  DROPDOWN_LIST,
  EDIT_ADMIN,
  UNBLOCK_ADMIN,
} from "./types";

export const dropdownListAction = (onSuccess, onError) => {
  return {
    type: DROPDOWN_LIST,

    onSuccess,
    onError,
  };
};
export const blockedDropDownListAction = (onSuccess, onError) => {
  return {
    type: BLOCKED_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
export const deletedDropdownListAction = (onSuccess, onError) => {
  return {
    type: DELETED_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};

export const addAdmin = (data, onSuccess, onError) => {
  return {
    type: ADD_ADMIN,
    data,
    onSuccess,
    onError,
  };
};
export const adminList = (data, current_page, onSuccess, onError) => {
  return {
    type: ADMIN_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const adminFindOne = (data, onSuccess, onError) => {
  return {
    type: ADMIN_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};

export const editAdmin = (id, data, onSuccess, onError) => {
  return {
    type: EDIT_ADMIN,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const blockAdmin = (id, data, onSuccess, onError) => {
  return {
    type: BLOCK_ADMIN,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const deleteAdmin = (id, data, onSuccess, onError) => {
  return {
    type: DELETE_ADMIN,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const unblockAdmin = (id, data, onSuccess, onError) => {
  return {
    type: UNBLOCK_ADMIN,
    id,
    data,
    onSuccess,
    onError,
  };
};

/*****Blocked Admins */

export const blockAdminList = (data, current_page, onSuccess, onError) => {
  return {
    type: BLOCK_ADMIN_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const blockedAdminEdit = (id, data, onSuccess, onError) => {
  return {
    type: BLOCKED_ADMIN_EDIT,
    id,
    data,
    onSuccess,
    onError,
  };
};
/*****Deleted Admins */

export const deletedAdminListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DELETED_ADMIN_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
