import { api } from "../api";

export const clearRiderCouponApi = (params) => {
  return api.post(`/api/rider/coupon/go-back`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const clearDriverCouponApi = (params) => {
  return api.post(`/api/driver/coupon/go-back`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
