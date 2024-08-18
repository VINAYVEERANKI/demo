import { api } from "./api";

export const deletedDriverListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/delete/find-all-deleted-drivers?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const deletedDriverViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/delete/find-one-deleted-driver?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const deletedDriverProfileReadApi = (id = "", params) => {
  return api.post(
    `/api/driver/delete/deleted-driver-profile-read/${id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const restoreDriverApi = (id = "", params) => {
  return api.post(
    `/api/driver/delete/restore-deleted-driver/${id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const permDeleteDriverApi = (id = "", params) => {
  return api.post(
    `/api/driver/delete/delete-driver-permanently/${id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const permDeletedDriverListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/delete/find-all-permanently-deleted-drivers?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const permDeletedDriverViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/delete/find-one-permanently-deleted-driver?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const permDeletedDriverProfileReadApi = (id = "", params) => {
  return api.post(
    `/api/driver/delete/permanently-deleted-driver-profile-read/${id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
