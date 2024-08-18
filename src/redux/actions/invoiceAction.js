import {
  TRIP_INVOICE,
  TRIP_INVOICE_DROPDOWN_LIST,
  TRIP_INVOICE_LIST,
} from "./types";

export const tripInvoiceListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: TRIP_INVOICE_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const tripInvoiceAction = (data, onSuccess, onError) => {
  return {
    type: TRIP_INVOICE,
    data,
    onSuccess,
    onError,
  };
};

export const tripInvoicedropdownListAction = (onSuccess, onError) => {
  return {
    type: TRIP_INVOICE_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
