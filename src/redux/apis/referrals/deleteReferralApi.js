import { api } from "../api";

/*************rider referrals */

export const deleteReferralApi = (params) => {
  return api.post(
    `/api/rider/referral/delete-referral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const deletedReferralAllViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/referral/deleted-referral-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const deletedReferralFindOneApi = (params) => {
  return api.post(
    `/api/rider/referral/deleted-referral-findone`,
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

export const deleteDriverRefApi = (params) => {
  return api.post(
    `/api/driver/referral/delete-referral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const deletedDriverRefListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/referral/deleted-referral-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const deletedDriverRefApi = (params) => {
  return api.post(
    `/api/driver/referral/deleted-referral-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
