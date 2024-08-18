import { api } from "../api";

export const accidentBookingListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/riderbookings/find-all-accident-bookings?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const accidentBookingIndividualApi = (params) => {
  return api.post(
    `/api/riderbookings/find-one-accident-booking`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const accidentBookingUpdateBillingDetailsApi = (params) => {
  return api.post(
    `/api/riderbookings/update-accident-billing-details`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const accidentUpdateInitialOdometerApi = (params) => {
  return api.post(
    `/api/riderbookings/accident-booking-update-initialodometer`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const accidentUpdateFinalOdometerApi = (params) => {
  return api.post(
    `/api/riderbookings/accident-update-finalodometer`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const accidentUpdatePaymentMethodApi = (params) => {
  return api.post(
    `/api/riderbookings/accident-booking-update-paymentMethod`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const accidentBookingCreateRefundApi = (params) => {
  return api.post(
    `/api/riderbookings/accident-create-refund-request`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const accidentBookingCancelRefundApi = (params) => {
  return api.post(
    `/api/riderbookings/accident-cancel-refund-request`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const accidentBookingCancelDriverFineApi = (params) => {
  return api.post(
    `/api/riderbookings/accident-cancel-driver-fine`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const accidentBookingsDropDownListApi = (params) => {
  console.log("jjgchgchgch");
  return api.post(
    "/api/riderbookings/accident-drop-down",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};