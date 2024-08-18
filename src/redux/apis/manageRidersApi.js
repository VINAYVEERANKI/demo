import { api } from "./api";

export const riderDropDownListApi = (params) => {
  return api.post("/api/rider/drop-down-filter", JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const blockedRiderDropDownListApi = (params) => {
  return api.post(
    "/api/rider/blocked-rider-drop-down-filter",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const delRiderDropDownListApi = (params) => {
  return api.post(
    "/api/rider/deleted-drop-down-filter",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const perDelRiderDropDownListApi = (params) => {
  return api.post(
    "/api/rider/permanently-deleted-drop-down-filter",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const riderListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/find-all-riders?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const riderViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/find-one-rider?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const resetRiderRatingApi = (id = "", params) => {
  return api.post(`/api/rider/reset-rating/${id}`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const resetRiderPictureApi = (id = "", params) => {
  return api.post(`/api/rider/reset-profile/${id}`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const activateRiderApi = (id = "", params) => {
  return api.post(`/api/rider/activate-account/${id}`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const blockRiderApi = (id = "", params) => {
  return api.post(`/api/rider/block/${id}`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const deleteRiderApi = (id = "", params) => {
  return api.post(`/api/rider/delete/${id}`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

/*********blocked riders ***********/
export const blockedRiderListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/find-all-blocked-rider?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const blockedRiderViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/find-one-blocked-rider?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const unBlockRiderApi = (id = "", params) => {
  return api.post(`/api/rider/unblock/${id}`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

/*********Deleted riders ***********/

export const deletedRiderListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/find-all-deleted-riders?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const deletedRiderViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/find-one-deleted-rider?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const restoreRiderApi = (id = "", params) => {
  return api.post(`/api/rider/restore/${id}`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const permanentlyDeleteRiderApi = (id = "", params) => {
  return api.post(
    `/api/rider/delete-permanently/${id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const permanentlyDelRiderListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/find-all-permanently-deleted-riders?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const permanentlyDelRiderViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/find-one-permanently-deleted-rider?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
