import { api } from "./api";

export const ArchivedFaresListApi = (pageNo = 0, params) => {
  return api.post(
    `api/archive_fares/find-all-archiveFares?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ArchivedSpecialfaresListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/archive_fares/find-all-archiveSpecialFares?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ArchivedSpecialFaresApi = (params) => {
  return api.post(
    `/api/archive_fares/find-one-archiveSpecialFares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const ArchivedTollsListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/archive_fares/find-all-archiveTollFares?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ArchivedTollsFaresApi = (params) => {
  return api.post(
    `/api/archive_fares/find-one-archiveTollFares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ArchivedOneWaytripListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/archive_fares/find-all-archiveOneWayFares?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const ArchivedOneWaytripFaresApi = (params) => {
  return api.post(
    `/api/archive_fares/find-one-archiveOneWayFares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const ArchivedLocalDropDownListApi = (params) => {
  return api.post(
    `/api/archive_fares/dropDown-list-archiveLocalFares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ArchivedLocalCreateApi = (params) => {
  return api.post(
    `/api/manage_fares/create-fare-cities`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ArchivedLocalFaresListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/archive_fares/find-all-local-archiveLocalFares?page_no=${pageNo}`,
    params,
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ArchivedLocalFaresApi = (params) => {
  return api.post(
    `/api/archive_fares/find-one-local-archiveLocalFares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const ArchivedRoundTripListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/archive_fares/find-all-archiveRoundtripFares?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ArchivedRoundTripFaresApi = (params) => {
  return api.post(
    `/api/archive_fares/find-one-archiveRoundtripFares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const ArchivedRentalListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/archive_fares/find-all-rentalFares?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const ArchivedRentalApi = (params) => {
  return api.post(
    `/api/archive_fares/find-one-rentalFares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};


