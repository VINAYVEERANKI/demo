import { api } from "../../api";

export const riderFaqHelpCovidListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-help-covid19-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqHelpProfileAccountListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-help-profileaccount-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqHelpMyTripsListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-help-mytrip-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqHelpPaymentListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-help-payment-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqHelpSafetyListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-help-safety-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqHelpTroubleshootListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-help-troubleshoot-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqHelpGuideToComrideListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-help-guidetocomride-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderFaqHelpReferalListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/faq/rider-topic-or-faq-help-referral-findall?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };