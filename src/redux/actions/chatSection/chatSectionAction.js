import {
  ALL_COMPLAINTS_MESSAGES,
  ALL_SOS_MESSAGES,
  STORAGED_MESSAGE,
  STORAGED_SOS_MESSAGE,
} from "../types";

export const storedMessageAction = (
  data,
  page,
  max_count,
  onSuccess,
  onError
) => {
  return {
    type: STORAGED_MESSAGE,
    page,
    max_count,
    data,
    onSuccess,
    onError,
  };
};

export const storedMessageSosAction = (data, onSuccess, onError) => {
  return {
    type: STORAGED_SOS_MESSAGE,
    data,
    onSuccess,
    onError,
  };
};

export const findAllComplaintsAction = (onSuccess, onError) => {
  return {
    type: ALL_COMPLAINTS_MESSAGES,
    onSuccess,
    onError,
  };
};

export const findAllSosMessageAction = (onSuccess, onError) => {
  return {
    type: ALL_SOS_MESSAGES,
    onSuccess,
    onError,
  };
};
