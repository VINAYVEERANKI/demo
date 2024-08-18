import { api } from "../../api";

export const riderFaqDuringTripLocalListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-duringtrip-local-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqDuringTripRentalListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-duringtrip-rental-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqDuringTripOneWaylListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-duringtrip-oneway-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqDuringTripRoundlListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-duringtrip-round-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };