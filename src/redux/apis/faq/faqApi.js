import { api } from "../api";

export const createFaqOrTopicApi = (params) => {
  return api.post(`/api/faq/topic-or-faq-create`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const viewFaqOrTopicApi = (params) => {
  return api.post(`/api/faq/topic-or-faq-findone`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const editFaqOrTopicApi = (params) => {
  return api.post(`/api/faq/topic-or-faq-edit`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const deleteFaqOrTopicApi = (params) => {
  return api.post(`/api/faq/topic-delete`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const createTopicUnderFaqApi = (params) => {
  return api.post(`/api/faq/topic-under-faq-create`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const editTopicUnderFaqApi = (params) => {
  return api.post(`/api/faq/topic-under-faq-edit`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const viewTopicUnderFaqApi = (params) => {
  return api.post(`/api/faq/topic-under-faq-findone`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const deleteTopicUnderFaqApi = (params) => {
  return api.post(`/api/faq/topic-under-faq-delete`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const topicUnderFaqRiderListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/faq/rider-topic-under-faq-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const topicUnderFaqDriverListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/faq/driver-topic-under-faq-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const activeFaqOrTopicApi = (params) => {
  return api.post(`/api/faq/topic-or-faq-active`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const inActiveFaqOrTopicApi = (params) => {
  return api.post(`/api/faq/topic-faq-inactive`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
