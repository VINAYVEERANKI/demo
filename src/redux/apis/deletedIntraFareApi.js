import { api } from "./api";

export const deletedIntraFaresListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/deleted_intra_fares/find-all-deleted-archived-zones?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deletedIntraFaresLocalListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/deleted_intra_fares/find-all-local-deleted-intra-zones?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deletedIntraFaresLocalIndiviListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/deleted_intra_fares/find-all-local-deleted-pickup-drop?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deletedIntraFaresSpecialListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/deleted_intra_fares/find-all-special-deleted-intra-zones?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deletedIntraFaresTollsListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/deleted_intra_fares/find-all-toll-deleted-intra-zones?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deletedIntraFaresOnewayListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/deleted_intra_fares/find-all-oneway-deleted-intra-zones?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const delintraFaresIndividualApi = (params) => {
  return api.post(
    `/api/deleted_intra_fares/find-one-deleted-intra-fare`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const archivedelIntraFaresLocalListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/deleted_intra_fares/find-all-local-archived-intra-zones?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const archivedelIntraFaresLocalIndiviListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/deleted_intra_fares/find-all-local-archived-pickup-drop?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const archivedelIntraFaresSpecialListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/deleted_intra_fares/find-all-special-archived-intra-zones?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const archivedelIntraFaresTollsListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/deleted_intra_fares/find-all-toll-archived-intra-zones?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const archivedelIntraFaresOnewayListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/deleted_intra_fares/find-all-oneway-archived-intra-zones?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const archiveDelintraFaresIndividualApi = (params) => {
  return api.post(
    `/api/deleted_intra_fares/find-one-archived-intra-fare`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
