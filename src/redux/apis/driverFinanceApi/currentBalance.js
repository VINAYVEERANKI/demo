import { api } from "../api";
export const dFinaCurBalListApi = (pageNo = 0,params) => {
    return api.post(
        `/api/driver/finance/current-balance-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const dFinaCurBalFindOneApi = (pageNo = 0,params) => {
    return api.post(
        `/api/driver/finance/current-balance-findone?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const drifinCurbalDropDownListApi = (params) => {
    return api.post(
      "/api/driver/finance/current-balance-drop-down",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };