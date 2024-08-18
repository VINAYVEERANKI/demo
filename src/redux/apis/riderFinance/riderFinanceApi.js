import { api } from "../api";

export const riderFinanceListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/finance/findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const riderFinanceViewApi = (pageNo = 0,params) => {
  return api.post(
      `/api/rider/finance/findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const riderFinanceDropdownApi = (params) => {
  console.log("jjgchgchgch");
  return api.post(
    "/api/rider/finance/drop-down",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

