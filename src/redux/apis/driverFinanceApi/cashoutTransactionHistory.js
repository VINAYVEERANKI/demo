import { api } from "../api";
export const dFinCashoutTransHisListApi = (pageNo = 0,params) => {
    return api.post(
        `/api/driver/finance/cash-out-transaction-history-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const dFinCashoutTransHisFindOneApi = (pageNo = 0,params) => {
    return api.post(
        `/api/driver/finance/cash-out-transaction-history-findone?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const drifinCashouttransDropDownListApi = (params) => {
    return api.post(
      "/api/driver/finance/cash-out-transaction-history-drop-down",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };