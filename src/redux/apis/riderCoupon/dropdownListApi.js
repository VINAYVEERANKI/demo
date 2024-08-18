import { api } from "../api";

export const dropDownListRiderCouponApi = (params) => {
  return api.post(
    `/api/rider/coupon/drop-down-pending-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const dropDownListRiderCouponActiveApi = (params) => {
  return api.post(
    `/api/rider/coupon/drop-down-active-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListRiderCouponRejectedApi = (params) => {
  return api.post(
    `/api/rider/coupon/drop-down-reject-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListRiderCouponDeletedApi = (params) => {
  return api.post(
    `/api/rider/coupon/drop-down-delete-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListRiderCouponExpiredApi = (params) => {
  return api.post(
    `/api/rider/coupon/drop-down-expired-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListRiderCouponUsageApi = (params) => {
  return api.post(
    `/api/rider/coupon/drop-down-usage-history`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const couponRideTypeListApi = (params) => {
  return api.post(
    `/api/rider/coupon/ride-type-lists`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};