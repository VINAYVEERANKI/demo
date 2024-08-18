import { api } from "./api";

export const cancelledRefundListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/refund/find-all-cancelled-refund?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const cancelledRefundViewApi = (params) => {
  return api.post(
    `/api/refund/find-one-cancelled-refund`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const cancelRefdropDownListApi = (params) => {
  return api.post(
    "/api/refund/cancel-dropdown-list",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
