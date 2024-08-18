import { api } from "./api";

export const createDriverCouponApi = (params) => {
  return api.post(
    "/api/driver/coupon/create-newaccount-coupon",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const createDriverCouponBroadcastApi = (params) => {
  return api.post(
    "/api/driver/coupon/pending-coupon-send-for-review",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const reviewReqDriverCouponListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/coupon/pending-coupon-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const reviewReqDriverCouponApi = (params) => {
  return api.post(
    "/api/driver/coupon/pending-coupon-findone",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const reviewReqDriverCouponEditApi = (params) => {
  return api.post(
    "/api/driver/coupon/edit-pending-coupon",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const approveDriverCouponApi = (params) => {
  return api.post("/api/driver/coupon/approve-coupon", JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const rejectDriverCouponApi = (params) => {
  return api.post("/api/driver/coupon/reject-coupon", JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const activeDriverCouponListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/coupon/active-coupon-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const activeDriverCouponApi = (params) => {
  return api.post(
    "/api/driver/coupon/active-coupon-findone",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const activeDriverCouponEditApi = (params) => {
  return api.post(
    "/api/driver/coupon/active-coupon-edit",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const activeDriverCouponBroadcastEditApi = (params) => {
  return api.post(
    "/api/driver/coupon/active-coupon-send-for-review",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const rejectedDriverCouponListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/coupon/rejected-coupon-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const rejectedDriverCouponApi = (params) => {
  return api.post(
    "/api/driver/coupon//rejected-coupon-findone",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deletedDriverCouponListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/coupon/deleted-coupon-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deletedDriverCouponApi = (params) => {
  return api.post(
    "/api/driver/coupon/deleted-coupon-findone",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deleteDriverCouponApi = (params) => {
  return api.post("/api/driver/coupon/delete-coupon", JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const expiredDriverCouponListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/coupon/expired-coupon-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const expiredDriverCouponApi = (params) => {
  return api.post(
    "/api/driver/coupon//expired-coupon-findone",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const usageHistoryDriverCouponListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/coupon/coupon-usage-history-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const usageHistoryDriverCouponApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/coupon/coupon-usage-history-findone?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListDriverCouponApi = (params) => {
  return api.post(
    `/api/driver/coupon/drop-down-pending-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const dropDownListDriverCouponActiveApi = (params) => {
  return api.post(
    `/api/driver/coupon/drop-down-active-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListDriverCouponRejectedApi = (params) => {
  return api.post(
    `/api/driver/coupon/drop-down-reject-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListDriverCouponDeletedApi = (params) => {
  return api.post(
    `/api/driver/coupon/drop-down-delete-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListDriverCouponExpiredApi = (params) => {
  return api.post(
    `/api/driver/coupon/drop-down-expired-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListDriverCouponUsageApi = (params) => {
  return api.post(
    `/api/driver/coupon/drop-down-usage-history`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
