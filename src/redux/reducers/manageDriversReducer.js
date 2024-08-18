import {
  PENDING_APPLICANT_DATA_LOADED,
  PENDING_APPLICANT_DATA_LOADING,
  PENDING_APPLICANT_DATA_FAILED,
  BANNED_APPLICANT_DATA_LOADING,
  BANNED_APPLICANT_DATA_LOADED,
  BANNED_APPLICANT_DATA_FAILED,
  BLOCKED_APPLICANT_DATA_FAILED,
  BLOCKED_APPLICANT_DATA_LOADED,
  BLOCKED_APPLICANT_DATA_LOADING,
  DELETED_DRIVER_DATA_LOADED,
  DELETED_DRIVER_DATA_LOADING,
  DELETE_DRIVER_DATA_FAILED,
  Expired_APPLICANT_DATA_LOADING,
  Expired_APPLICANT_DATA_FAILED,
  Expired_APPLICANT_DATA_LOADED,
  PERM_DELETED_DATA_LOADED,
  PERM_DELETED_DATA_LOADING,
  PERM_DELETED_DATA_FAILED,
  REJECT_APPLICANT_DATA_FAILED,
  REJECT_APPLICANT_DATA_LOADED,
  REJECT_APPLICANT_DATA_LOADING,
  MANAGE_DRIVER_DATA_LOADING,
  MANAGE_DRIVER_DATA_LOADED,
  MANAGE_DRIVER_DATA_FAILED,
} from "../actions/returnTypes";
import {
  fetchbannedApplicantData,
  fetchblockedApplicantData,
  fetchdeletedDriverData,
  fetchexpiredApplicantData,
  fetchmanageDriverData,
  fetchpendingApplicantData,
  fetchpermdeletedDriverData,
  fetchrejectApplicantData,
} from "../constants";

export const pendingApplicantReducer = (
  state = fetchpendingApplicantData,
  action
) => {
  switch (action.type) {
    case PENDING_APPLICANT_DATA_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case PENDING_APPLICANT_DATA_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        data: action.data,
      };
    case PENDING_APPLICANT_DATA_LOADED:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        data: action.data,
      };
    default:
      return state;
  }
};

export const bannedApplicantReducer = (
  state = fetchbannedApplicantData,
  action
) => {
  switch (action.type) {
    case BANNED_APPLICANT_DATA_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case BANNED_APPLICANT_DATA_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        data: action.data,
      };
    case BANNED_APPLICANT_DATA_LOADED:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        data: action.data,
      };
    default:
      return state;
  }
};

export const blockedApplicantReducer = (
  state = fetchblockedApplicantData,
  action
) => {
  switch (action.type) {
    case BLOCKED_APPLICANT_DATA_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case BLOCKED_APPLICANT_DATA_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        data: action.data,
      };
    case BLOCKED_APPLICANT_DATA_LOADED:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        data: action.data,
      };
    default:
      return state;
  }
};

export const deletedDriverReducer = (
  state = fetchdeletedDriverData,
  action
) => {
  switch (action.type) {
    case DELETED_DRIVER_DATA_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case DELETE_DRIVER_DATA_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        data: action.data,
      };
    case DELETED_DRIVER_DATA_LOADED:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        data: action.data,
      };
    default:
      return state;
  }
};

export const expiredApplicantReducer = (
  state = fetchexpiredApplicantData,
  action
) => {
  switch (action.type) {
    case Expired_APPLICANT_DATA_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case Expired_APPLICANT_DATA_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        data: action.data,
      };
    case Expired_APPLICANT_DATA_LOADED:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        data: action.data,
      };
    default:
      return state;
  }
};

export const perDeletedDriverReducer = (
  state = fetchpermdeletedDriverData,
  action
) => {
  switch (action.type) {
    case PERM_DELETED_DATA_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case PERM_DELETED_DATA_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        data: action.data,
      };
    case PERM_DELETED_DATA_LOADED:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        data: action.data,
      };
    default:
      return state;
  }
};

export const rejectApplicantReducer = (
  state = fetchrejectApplicantData,
  action
) => {
  switch (action.type) {
    case REJECT_APPLICANT_DATA_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case REJECT_APPLICANT_DATA_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        data: action.data,
      };
    case REJECT_APPLICANT_DATA_LOADED:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        data: action.data,
      };
    default:
      return state;
  }
};

export const manageDriverReducer = (state = fetchmanageDriverData, action) => {
  switch (action.type) {
    case MANAGE_DRIVER_DATA_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case MANAGE_DRIVER_DATA_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        data: action.data,
      };
    case MANAGE_DRIVER_DATA_LOADED:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        data: action.data,
      };
    default:
      return state;
  }
};
