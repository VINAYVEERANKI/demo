import {
  CREATE_FAQ_OR_TOPIC,
  VIEW_FAQ_OR_TOPIC,
  EDIT_FAQ_OR_TOPIC,
  DELETE_FAQ_OR_TOPIC,
  CREATE_TOPIC_UNDER_FAQ,
  EDIT_TOPIC_UNDER_FAQ,
  VIEW_TOPIC_UNDER_FAQ,
  DELETE_TOPIC_UNDER_FAQ,
  TOPIC_UNDER_FAQ_RIDER_LIST,
  TOPIC_UNDER_FAQ_DRIVER_LIST,
  ACTIVE_FAQ_OR_TOPIC,
  INACTIVE_FAQ_OR_TOPIC,
} from "../types";

export const createFaqOrTopicAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_FAQ_OR_TOPIC,
    data,
    onSuccess,
    onError,
  };
};

export const ViewFaqOrTopicAction = (data, onSuccess, onError) => {
  return {
    type: VIEW_FAQ_OR_TOPIC,
    data,
    onSuccess,
    onError,
  };
};

export const EditFaqOrTopicAction = (data, onSuccess, onError) => {
  return {
    type: EDIT_FAQ_OR_TOPIC,
    data,
    onSuccess,
    onError,
  };
};

export const DeleteFaqOrTopicAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_FAQ_OR_TOPIC,
    data,
    onSuccess,
    onError,
  };
};

export const createTopicUnderFaqAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_TOPIC_UNDER_FAQ,
    data,
    onSuccess,
    onError,
  };
};

export const editTopicUnderFaqAction = (data, onSuccess, onError) => {
  return {
    type: EDIT_TOPIC_UNDER_FAQ,
    data,
    onSuccess,
    onError,
  };
};

export const viewTopicUnderFaqAction = (data, onSuccess, onError) => {
  return {
    type: VIEW_TOPIC_UNDER_FAQ,
    data,
    onSuccess,
    onError,
  };
};

export const deleteTopicUnderFaqAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_TOPIC_UNDER_FAQ,
    data,
    onSuccess,
    onError,
  };
};

export const topicUnderFaqRiderListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: TOPIC_UNDER_FAQ_RIDER_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const topicUnderFaqdriverListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: TOPIC_UNDER_FAQ_DRIVER_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const activeFaqOrTopicAction = (data, onSuccess, onError) => {
    return {
      type: ACTIVE_FAQ_OR_TOPIC,
      data,
      onSuccess,
      onError,
    };
  };
  
  export const inActiveFaqOrTopicAction = (data, onSuccess, onError) => {
    return {
      type: INACTIVE_FAQ_OR_TOPIC,
      data,
      onSuccess,
      onError,
    };
  };