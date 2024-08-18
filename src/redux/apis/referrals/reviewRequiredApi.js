import { api } from "../api";


/*************rider referrals */

export const reviewRequiredReferralAllViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/referral/pending-referral-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};



export const reviewRequiredReferralFindOneApi = (params) => {
  return api.post(
    `/api/rider/referral/pending-referral-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const reviewReqReferralEditApi = (params) => {
  return api.post(
    `/api/rider/referral/edit-pending-referral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const reviewReqReferralBroadcastEditApi = (params) => {
  return api.post(
    `/api/rider/referral/edit-pending-referral-send-for-review`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

/*************driver referrals ************/



export const reviewReqDriverRefListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/referral/pending-referral-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const reviewReqDriverRefApi = (params) => {
  return api.post(
    `/api/driver/referral/pending-referral-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const reviewDriverRefDToDEditApi = (params) => {
  return api.post(
    `/api/driver/referral/edit-pending-driver-to-driver-referral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const reviewDriverRefEditDToRApi = (params) => {
  return api.post(
    `/api/driver/referral/edit-pending-driver-to-rider-referral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const reviewReqDriverRefBroadcastEditApi = (params) => {
  return api.post(
    `/api/driver/referral/edit-pending-send-for-review`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};