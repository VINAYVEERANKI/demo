import { api } from "../api";
export const dFinCreateCashTransListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/finance/create-cash-transaction-history-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const dFinCreateCashTransCreateApi = (params) => {
  return api.post(
    `/api/driver/finance/create-cash-transaction-create`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const drifinCreatcashDropDownListApi = (params) => {
  return api.post(
    "/api/driver/finance/create-cash-transaction-history-drop-down",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const premiumPlanApi = (data, params) => {
  return api.get(
    `/api/manage-premium/fetch-plan?driver_id=${data.driver_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const premiumSchedulePlanApi = (data, params) => {
  return api.get(
    `/api/manage-premium/fetch-schedule-plan?driver_id=${data.driver_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const premiumPlanSwitchApi = (params) => {
  return api.post(`/api/manage-premium/switch-plan`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const premiumPlanScheduleApi = (params) => {
  return api.post(
    `/api/manage-premium/schedule-the-plan`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const premiumPlanCancelScheduleApi = (params) => {
  return api.post(
    `/api/manage-premium/cancel-scheduled-plan`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const premiumPlanCancelActiveApi = (params) => {
  return api.post(
    `/api/manage-premium/cancel-active-premium`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
