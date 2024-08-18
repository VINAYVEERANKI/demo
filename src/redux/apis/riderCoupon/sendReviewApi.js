import { api } from "../api";

export const sendReviewApi = (params) => {
    return api.post(
      "/api/rider/coupon/send-for-review",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const activeCouponSendReviewApi = (params) => {
    return api.post(
      "/api/rider/coupon/active-coupon-sendforreview",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };