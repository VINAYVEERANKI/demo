import { api } from "../api";

/*************rider referrals */

export const expiredReferralAllViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/referral/expired-referral-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const expiredReferralFindOneApi = (params) => {
  return api.post(
    `/api/rider/referral/expired-referral-findone`,
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

export const expiredDriverRefIdListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/referral/expired-referral-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const expiredDriverRefIdApi = (params) => {
  return api.post(
    `/api/driver/referral/expired-referral-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
