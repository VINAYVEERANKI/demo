import { api } from "./api";

export const dropDownListApi = (params) => {
  return api.post(
    "/api/admin/drop-down-filter-details",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deletedDropDownListApi = (params) => {
  return api.post(
    "/api/admin/drop-down-deleted-filter-details",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const blockedDropDownListApi = (params) => {
  return api.post(
    "/api/admin/drop-down-blocked-filter-details",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const addAdminApi = (params) => {
  return api.post("/api/admin/add", JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const adminListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/find-all-admins?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const adminFindOneApi = (params) => {
  return api.post(`/api/admin/find-one-admin`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const editAdminApi = (id, params) => {
  return api.post(`/api/admin/edit/${id}`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const blockAdminApi = (id, params) => {
  return api.post(`/api/admin/block/${id}`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const deleteAdminApi = (id, params) => {
  return api.post(`/api/admin/delete/${id}`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const unblockAdminApi = (id, params) => {
  return api.post(`/api/admin/unblock/${id}`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

/******Blocked Admins **********/

export const blockAdminListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/find-all-blocked-admins?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const blockedEditAdminApi = (id, params) => {
  return api.post(
    `/api/admin/edit-blocked-admin/${id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

/******************Deleted admins ********/
export const deletedAdminListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/find-all-deleted-admins?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "content-Type": "application/json",
      },
    }
  );
};
