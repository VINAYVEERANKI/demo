import { api } from "../api";

export const generateComplaintRiderApi = (params) => {
  return api.post(
    `/api/admin/rider/inprogress-complaint/generate-call-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const generateComplaintDriverApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-complaint/generate-call-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const callComplaintDescriptionApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-complaint/save-call-complaint-description`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
