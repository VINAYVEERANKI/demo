import { api } from "../api";

export const riderBroadCastPendingListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider-broadcast/pending-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const riderBroadCastCreateApi = (params) => {
  return api.post(`/api/rider-broadcast/create`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const reviewReqRiderBroadCastApi = (params) => {
  return api.post(
    `/api/rider-broadcast/pending-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const riderBroadCastApproveApi = (params) => {
  return api.post(`/api/rider-broadcast/approve`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const riderBroadCastRejectApi = (params) => {
  return api.post(`/api/rider-broadcast/reject`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const reviewReqRiderBroadCastEditApi = (params) => {
  return api.post(`/api/rider-broadcast/pending-edit`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const driverBroadCastPendingListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver-broadcast/pending-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const reviewReqDriverBroadCastApi = (params) => {
  return api.post(
    `/api/driver-broadcast/pending-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverBroadCastCreateApi = (params) => {
  return api.post(`/api/driver-broadcast/create`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const driverBroadCastApproveApi = (params) => {
  return api.post(`/api/driver-broadcast/approve`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const driverBroadCastRejectApi = (params) => {
  return api.post(`/api/driver-broadcast/reject`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const reviewReqDriverBroadCastEditApi = (params) => {
  return api.post(`/api/driver-broadcast/pending-edit`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const rideTypeBroadcastDropdownApi = (params) => {
  return api.post(
    "/api/driver-broadcast/ride-type-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rideBroadcastRevreqDrpdwnApi = (params) => {
  return api.post(
    "/api/rider-broadcast/pending-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driBroadcastRevreqDrpdwnApi = (params) => {
  return api.post(
    "/api/driver-broadcast/pending-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};