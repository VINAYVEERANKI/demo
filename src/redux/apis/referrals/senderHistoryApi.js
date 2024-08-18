import { api } from "../api";


/*************rider referrals */
export const riderRefSenderFindAllUsageHistoryApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/referral/referral-sender-usage-history-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const riderRefSenderFindOneUsageHistoryApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/referral/referral-sender-usage-history-findone?page_no=${pageNo}`,
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
export const driverRefSenderUsageHistoryListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/referral/referral-sender-usage-history-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverRefSenderUsageHistoryApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/referral/referral-sender-usage-history-findone?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};