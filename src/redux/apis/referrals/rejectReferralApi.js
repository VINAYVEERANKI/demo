import { api } from "../api";



/*************rider referrals */


export const rejectReferralApi = (params) => {
  return api.post(
    `/api/rider/referral/reject-referral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rejectedReferralAllViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/referral/rejected-referral-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rejectedReferralFindOneApi = (params) => {
  return api.post(
    `/api/rider/referral/rejected-referral-findone`,
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

export const rejectedDriverRefListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/referral/rejected-referral-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rejectDriverRefApi = (params) => {
  return api.post(
    `/api/driver/referral/reject-referral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const rejectedDriverRefApi = (params) => {
  return api.post(
    `/api/driver/referral/rejected-referral-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};