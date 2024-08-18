import { api } from "../api";

export const ongoingBookingListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/riderbookings/find-all-ongoing-bookings?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ongoingBookingIndividualApi = (params) => {
  return api.post(
    `/api/riderbookings/find-one-ongoing-booking`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ongoingDriverReqCancelApi = (params) => {
  return api.post(
    `/api/riderbookings/ongoing-booking-driver-cancel`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ongoingRiderReqCancelApi = (params) => {
  return api.post(
    `/api/riderbookings/ongoing-booking-rider-cancel`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ongoingAccidentReportApi = (params) => {
  return api.post(
    `/api/riderbookings/ongoing-booking-accident-report`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ongoingEndTripApi = (params) => {
  return api.post(
    `/api/riderbookings/ongoing-booking-endtrip`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ongoingUpdatePaymentMethodApi = (params) => {
  return api.post(
    `/api/riderbookings/ongoing-booking-update-paymentMethod`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ongoingUpdateBillingDetailsApi = (params) => {
  return api.post(
    `/api/riderbookings/ongoing-update-billing-details`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ongoingUpdateInitialOdometerApi = (params) => {
  return api.post(
    `/api/riderbookings/ongoing-booking-update-initialodometer`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ongoingUpdateFinalOdometerApi = (params) => {
  return api.post(
    `/api/riderbookings/ongoing-update-finalodometer`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const ongoingBookingsDropDownListApi = (params) => {
  return api.post(
    "/api/riderbookings/ongoing-drop-down",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
