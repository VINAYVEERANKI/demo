import { api } from "./api";

export const tripInvoiceListApi = (pageNo = "", params) => {
  return api.post(
    `/api/trip_invoices/find-all-trip-invoice?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const tripInvoiceApi = (params) => {
  return api.post(
    `/api/trip_invoices/find-one-trip-invoice`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const tripInvoiceDropDownListApi = (params) => {
  return api.post(
    `/api/trip_invoices/trip-invoice-dropdown-list`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
