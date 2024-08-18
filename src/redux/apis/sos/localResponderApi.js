import { api } from "../api";

export const localResponderListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/admin/sos/local-responder/find-all-local-responder?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };


  export const localResponderApi = (params) => {
    return api.post(
      `/api/admin/sos/local-responder/find-one-local-responder`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const addLocalResponderApi = (params) => {
    return api.post(
      `/api/admin/sos/local-responder/add-local-responder`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const localResponderUpdateApi = (params) => {
    return api.post(
      `/api/admin/sos/local-responder/edit-local-responder`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const localResponderDeleteApi = (params) => {
    return api.post(
      `/api/admin/sos/local-responder/delete-local-responder`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const localResponderConatctListApi = (params) => {
    return api.post(
      `/api/admin/sos/local-responder/fetch-contact-details`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
