import { api } from "../api";
export const dFinSucesCashTransHisListApi = (pageNo = 0,params) => {
    return api.post(
        `/api/driver/finance/successfull-cash-out-transaction-history-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const dFinSucesCashTransHisFindOneApi = (pageNo = 0,params) => {
    return api.post(
        `/api/driver/finance/successfull-cash-out-transaction-history-findone?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const drifinSucescashDropDownListApi = (params) => {
    return api.post(
      "/api/driver/finance/successfull-cash-out-transaction-history-drop-down",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };