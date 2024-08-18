import { api } from "./api";

export const adminLoginApi = (params) => {
  return api.post("/api/admin/login", JSON.stringify(params), {
    headers: { "Content-Type": "application/json" },
  });
};
export const resetAdminPasswordApi = (params) => {
  return api.post(`/api/admin/reset-password`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const resetLogoutAdminPasswordApi = (params) => {
  return api.post(`/api/admin/reset-password-with-logout`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
