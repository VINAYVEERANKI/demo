import { api } from "../api";

/*************rider referrals */

export const approveReferralApi = (params) => {
  return api.post(
    `/api/rider/referral/approve-pending-referral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const activeReferralAllViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/referral/approved-referral-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const activeReferralFindOneApi = (params) => {
  return api.post(
    `/api/rider/referral/approved-referral-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const activeReferralEditApi = (params) => {
  return api.post(
    `/api/rider/referral/edit-approved-referral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const activeReferralBroadcastEditApi = (params) => {
  return api.post(
    `/api/rider/referral/edit-approved-referral-send-for-review`,
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

export const activeDriverRefListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/referral/approved-referral-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const approveDriverRefApi = (params) => {
  return api.post(
    `/api/driver/referral/approve-pending-referral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const activeDriverRefFindOneApi = (params) => {
  return api.post(
    `/api/driver/referral/approved-referral-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const activeDriverRefEditApi = (params) => {
  return api.post(
    `/api/driver/referral/edit-approved-referral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const activeDriverRefBroadcastEditApi = (params) => {
  return api.post(
    `/api/driver/referral/edit-approved-referral-send-for-review`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
