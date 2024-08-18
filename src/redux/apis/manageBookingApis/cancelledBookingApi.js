import { api } from "../api";

export const cancelledBookingListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/riderbookings/find-all-cancelled-bookings?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const cancelledBookingIndividualApi = (params) => {
  return api.post(
    `/api/riderbookings/find-one-cancelled-booking`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const cancelledUpdatePaymentMethodApi = (params) => {
  return api.post(`/api/riderbookings/cancelled-booking-update-paymentMethod`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const cancelledUpdateBillingDetailsApi = (params) => {
  return api.post(
    `/api/riderbookings/updated-cancel-billing-details`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const cancelledUpdateInitialOdometerApi = (params) => {
  return api.post(`/api/riderbookings/cancelled-booking-update-initialodometer`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const cancelledUpdateFinalOdometerApi = (params) => {
  return api.post(`/api/riderbookings/cancelled-update-finalodometer`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const cancelledBookingCreateRefundApi = (params) => {
  return api.post(`/api/riderbookings/cancelled-create-refund-request`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const cancelledBookingCancelRefundApi = (params) => {
  return api.post(`/api/riderbookings/cancelled-cancel-refund-request`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const cancelledBookingCancelDriverFineApi = (params) => {
  return api.post(`/api/riderbookings/cancelled-cancel-driver-fine`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const cancelledBookingsDropDownListApi = (params) => {
  return api.post(
    "/api/riderbookings/cancelled-drop-down",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
 