import { api } from "../api";
export const dFinCashTransHisListApi = (pageNo = 0,params) => {
    return api.post(
        `/api/driver/finance/cash-transaction-history-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const  dFinCashTransHisFindOneApi = (params) => {
    return api.post(
        `/api/driver/finance/cash-transaction-history-findone`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const drifinCashtransDropDownListApi = (params) => {
    return api.post(
      "/api/driver/finance/cash-transaction-history-drop-down",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };