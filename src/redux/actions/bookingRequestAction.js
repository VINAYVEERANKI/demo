import {
  ONGOING_REQUEST_INDIVIDUAL,
  ONGOING_REQUEST_LIST,
  UNSUCCESSFULL_REQUEST_INDIVIDUAL,
  UNSUCCESSFULL_REQUEST_LIST,
  ONGOING_DROPDOWN_LIST,
  UNSUCCESSFUL_DROPDOWN_LIST
} from "./types";

export const ongoingRequestListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ONGOING_REQUEST_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const ongoingRequestIndividualAction = (data, onSuccess, onError) => {
  return {
    type: ONGOING_REQUEST_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};
export const unSuccessfulRequestListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: UNSUCCESSFULL_REQUEST_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const unSuccessfulReqIndividualAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: UNSUCCESSFULL_REQUEST_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};
export const ongoingDropdownListAction = (onSuccess, onError) => {
  return {
    type: ONGOING_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
export const unsuccessfuldropdownListAction = (onSuccess, onError) => {
  return {
    type: UNSUCCESSFUL_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
