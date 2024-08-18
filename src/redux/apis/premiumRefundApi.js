import { api } from "./api";

export const premiumPendingRefundListApi = (data, params) => {
  return api.get(
    `/api/premium-refund/active-find-all?page_no=${data?.page_no}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const premiumPendingRefundViewApi = (data, params) => {
  return api.get(
    `/api/premium-refund/active-find-one?refund_id=${data.refund_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const premiumPendingRefundUpdateApi = (params) => {
  return api.post(`/api/premium-refund/active-create-refund`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const premiumCancelledRefundListApi = (data, params) => {
  return api.get(
    `/api/premium-refund/cancel-find-all?page_no=${data?.page_no}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const premiumCancelledRefundViewApi = (data, params) => {
  return api.get(
    `/api/premium-refund/cancel-find-one?refund_id=${data.refund_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const premiumSucessFulRefundListApi = (data, params) => {
  return api.get(
    `/api/premium-refund/success-find-all?page_no=${data?.page_no}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const premiumSuccessFulRefundViewApi = (data, params) => {
  return api.get(
    `/api/premium-refund/success-find-one?refund_id=${data.refund_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};


export const premiumRefundCancelApi = (params) => {
  return api.post(`/api/premium-refund/cancel-refund`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};