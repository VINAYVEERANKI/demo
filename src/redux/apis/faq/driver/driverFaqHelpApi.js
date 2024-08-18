import { api } from "../../api";

export const driverFaqHelpCovidListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/driver-topic-or-faq-help-covid19-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const driverFaqHelpMyAccountListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/driver-topic-or-faq-help-myaccount-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const driverFaqHelpCancelPolicyListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/driver-topic-or-faq-help-cancellation-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const driverFaqHelpPaymentListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/driver-topic-or-faq-help-payment-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const driverFaqHelpSafetyListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/driver-topic-or-faq-help-safety-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const driverFaqHelpComrideServiceListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/driver-topic-or-faq-help-comrideservice-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const driverFaqHelpGuideToComrideListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/driver-topic-or-faq-help-guidetocomride-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const driverFaqHelpReferalListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/driver-topic-or-faq-help-referral-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };