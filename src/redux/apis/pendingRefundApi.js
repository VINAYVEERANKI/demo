import { api } from "./api";

export const pendingRefundListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/refund/find-all-pending-refund?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const pendingRefundViewApi = (params) => {
  return api.post(
    `/api/refund/find-one-pending-refund`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const pendingRefundUpdateApi = (params) => {
  return api.post(
    `/api/refund/update-pending-refund`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const pendRefdropDownListApi = (params) => {
  return api.post(
    "/api/refund/pending-dropdown-list",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};