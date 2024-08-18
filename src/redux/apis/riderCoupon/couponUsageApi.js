import { api } from "../api";

export const couponUsageHistoryAllViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/coupon/coupon-usage-history-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const couponUsageHistoryFindOneApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/coupon/coupon-usage-history-findone?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
