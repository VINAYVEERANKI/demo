import { api } from "./api";

export const ongoingRequestListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/bookingRequests/find-all-booking-requests?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ongoingRequestIndividualApi = (params) => {
  return api.post(
    `/api/bookingRequests/find-one-booking-request`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const unSuccessfulRequestListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/bookingRequests/find-all-unsuccess-booking-request?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const unSuccessfulRequestIndividualApi = (params) => {
  return api.post(
    `/api/bookingRequests/find-one-unsuccess-booking-request`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const ongoingDropDownListApi = (params) => {
  return api.post("/api/bookingRequests/ongoing-drop-down", JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const unsuccessfulDropDownListApi = (params) => {
  return api.post(
    "/api/bookingRequests/unsuccess-drop-down",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
