import { api } from "../api";

export const deletedIntraZoneListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/manage_zone/find-all-deleted-intra-zones?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const restoreLocalDeletedIntraZoneApi = (params) => {
  return api.post(
    `/api/manage_zone/restore-local-deleted-intra-zones`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const restoreOutstationDeletedIntraZoneApi = (params) => {
  return api.post(
    `/api/manage_zone/restore-outstation-deleted-intra-zones`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const restoreSpecialDeletedIntraZoneApi = (params) => {
  return api.post(
    `/api/manage_zone/restore-special-deleted-intra-zones`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const restoreTollDeletedIntraZoneApi = (params) => {
  return api.post(
    `/api/manage_zone/restore-toll-deleted-intra-zones`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteLocalIntraZonePermanentlyApi = (params) => {
  return api.post(
    `/api/manage_zone/permanently-local-deleted-intra-zones`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deleteOutstationIntraZonePermanentlyApi = (params) => {
  return api.post(
    `/api/manage_zone/permanently-outstation-deleted-intra-zones`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deleteSpecialIntraZonePermanentlyApi = (params) => {
  return api.post(
    `/api/manage_zone/permanently-special-deleted-intra-zones`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deleteTollIntraZonePermanentlyApi = (params) => {
  return api.post(
    `/api/manage_zone/permanently-toll-deleted-intra-zones`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deletintrazoneDrpdwnApi = (params) => {
  return api.post(
    "/api/manage_zone/deleted-intra-zone-drop-down",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};