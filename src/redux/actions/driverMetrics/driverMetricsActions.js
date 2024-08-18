import { DRIVER_METRICS_DRP_DWN, DRIVER_METRICS_LIST, DRIVER_METRICS_VIEW } from "../types";

export const driverMetricsListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_METRICS_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driverMetricsViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_METRICS_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const drimetDropdownListAction = (onSuccess, onError) => {
  return {
    type: DRIVER_METRICS_DRP_DWN,
    onSuccess,
    onError,
  };
};
