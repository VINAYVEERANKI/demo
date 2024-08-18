import { api } from "../api";

export const rejectCouponApi = (params) => {
  return api.post(
    `/api/rider/coupon/reject-rider-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
