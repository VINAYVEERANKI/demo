import { api } from "../../api";

export const driverFaqDuringTripLocalListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/driver-topic-or-faq-duringtrip-local-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const driverFaqDuringTripRentalListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/driver-topic-or-faq-duringtrip-rental-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const driverFaqDuringTripOneWaylListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/driver-topic-or-faq-duringtrip-oneway-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const driverFaqDuringTripRoundlListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/driver-topic-or-faq-duringtrip-round-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };