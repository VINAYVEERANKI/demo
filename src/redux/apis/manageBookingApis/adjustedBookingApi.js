import { api } from "../api";

export const adjustedBookingListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/riderbookings/find-all-adjusted-bookings?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const adjustedBookingIndividualApi = (params) => {
  return api.post(
    `/api/riderbookings/find-one-adjusted-booking`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const adjustedBookingsDropDownListApi = (params) => {
  return api.post(
    "/api/riderbookings/adjusted-drop-down",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

