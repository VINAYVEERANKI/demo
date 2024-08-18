import { api } from "../api";

export const completedBookingListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/riderbookings/find-all-completed-bookings?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const completedBookingIndividualApi = (params) => {
  return api.post(
    `/api/riderbookings/find-one-completed-booking`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const completedUpdatePaymentMethodApi = (params) => {
  return api.post(
    `/api/riderbookings/completed-booking-update-paymentMethod`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const completedUpdateBillingDetailsApi = (params) => {
  return api.post(
    `/api/riderbookings/updated-completed-billing-details`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const completedUpdateInitialOdometerApi = (params) => {
  return api.post(
    `/api/riderbookings/completed-booking-update-initialodometer`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),  
        "Content-Type": "application/json",
      },
    }
  );
};
export const completedUpdateFinalOdometerApi = (params) => {
  return api.post(
    `/api/riderbookings/completed-update-finalodometer`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const completedBookingCreateRefundApi = (params) => {
  return api.post(
    `/api/riderbookings/create-refund-request`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const completedBookingCancelRefundApi = (params) => {
  return api.post(
    `/api/riderbookings/cancel-refund-request`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),  
        "Content-Type": "application/json",
      },
    }
  );
};
export const completedBookingCancelDriverFineApi = (params) => {
  return api.post(
    `/api/riderbookings/cancel-driver-fine`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const completedBookingsDropDownListApi = (params) => {
  return api.post(
    "/api/riderbookings/completed-drop-down",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};