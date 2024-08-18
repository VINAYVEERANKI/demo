import { BANEED_APPLICANT_READ, BANNED_APPLICANT_VIEW, BANNED_APPLICATION_LIST } from "../types";

export const bannedApplicationListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: BANNED_APPLICATION_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const bannedApplicantViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: BANNED_APPLICANT_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const bannedApplicantReadAction = (data, onError) => {
  return {
    type: BANEED_APPLICANT_READ,
    data,
    onError
  };
};