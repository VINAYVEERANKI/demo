import { api } from "../api";

export const deleteCouponApi = (params) => {
  return api.post(
    `/api/rider/coupon/delete-rider-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};