import { api } from "../api";

export const storedMessageApi = (page = 0, max_count = 15, params) => {
  return api.post(
    `/api/socket/findOne-complaint-chat-history?page_no=${page}&max=${max_count}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const storedMessageSosApi = (params) => {
  return api.post(
    `/api/socket/findOne-sos-chat-history`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const findALLComplaintsApi = (params) => {
  return api.post(
    `/api/socket/findAll-complaint-chat-history-count`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const findALLSosMessagesApi = (params) => {
  return api.post(
    `/api/socket/findAll-sos-chat-history-count`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
