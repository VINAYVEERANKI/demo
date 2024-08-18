import { api } from "../api";


/*************rider referrals */

export const riderRefReceiverFindAllUsageHisApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/referral/referral-receiver-usage-history-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const riderRefReceiverFindOneUsageHisApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/referral/referral-receiver-usage-history-findone?page_no=${pageNo}`,
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

export const driverRefReceiverUsageHistoryListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/referral/referral-receiver-usage-history-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverRefReceiverUsageHistoryApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/referral/referral-receiver-usage-history-findone?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};