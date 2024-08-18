import axios from "axios";
import queryString from "query-string";
import { ADMIN_LOGOUT } from "../actions/types";
import { url } from "../config";
import store from "../store";

export const api = axios.create({
  baseURL: url,
  timeout: 60000,

  headers: { "Content-Type": "application/json" },
});
export const qs = queryString;

// api.interceptors.request.use(
//   async(config)=>{
//     if(localStorage.getItem("accessToken")){
//       config.headers["Authorization"]=`Bearer ${localStorage.getItem("accessToken")}`
//     }
//     return config;
//   },async(error)=>{}

// )

function excludeAccessToken (config) {
  return (
    config.url.includes("/login")
  )
}

api.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem("accessToken")) {
      if (!excludeAccessToken(config)) {
        config.headers["x-access-token"] = localStorage.getItem("accessToken");
      }
    }
    return config;
  },
  async (error) => {}
);


api.interceptors.response.use(
  async (config) => {
    // if (
    //   config.data.message === "Authentication failed"
    //   // ||config.data.message ==="Un-expected Error"
    // ) {
    //   localStorage.clear();
    //   window.location.reload();
    // }
    return config;
  },
  async (error) => {
    console.log(error, "jadbAKJDa");
  }
);


console.log(api.interceptors.response, "kjgjhgjgjg");