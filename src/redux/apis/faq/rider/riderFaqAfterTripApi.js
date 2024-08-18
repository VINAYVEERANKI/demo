import { api } from "../../api";

export const riderFaqAfterTripLocalListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-aftertrip-realted-local-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqAfterTripRentalListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-aftertrip-realted-rental-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqAfterTripOnewayListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-aftertrip-realted-oneway-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqAfterTripRoundListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-aftertrip-realted-round-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqAfterTripPaymentLocalListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-aftertrip-payment-local-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqAfterTripPayRentListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-aftertrip-payment-rental-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqAfterTripPayOnewayListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-aftertrip-payment-oneway-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqAfterTripPayRoundListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-aftertrip-payment-round-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };