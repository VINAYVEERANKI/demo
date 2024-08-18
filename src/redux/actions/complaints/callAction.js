import { CALL_COMPLAINT_DESCRIPTION, GENERATE_COMP_DRIVER, GENERATE_COMP_RIDER } from "../types";

export const generateComplaintRiderAction = (data, onSuccess, onError) => {
  return {
    type: GENERATE_COMP_RIDER,
    data,
    onSuccess,
    onError,
  };
};

export const generateComplaintDriverAction = (data, onSuccess, onError) => {
  return {
    type: GENERATE_COMP_DRIVER,
    data,
    onSuccess,
    onError,
  };
};
export const callComplaintDescriptionAction = (data, onSuccess, onError) => {
  return {
    type: CALL_COMPLAINT_DESCRIPTION,
    data,
    onSuccess,
    onError,
  };
};
