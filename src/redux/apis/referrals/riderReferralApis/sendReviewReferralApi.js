import { api } from "../../api";

export const sendReviewReferralApi = (params) => {
    return api.post(
      "/api/rider/referral/rider-referral-send-for-review",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const sendReviewDriverReferralApi = (params) => {
    return api.post(
      "/api/driver/referral/pending-send-for-review",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };