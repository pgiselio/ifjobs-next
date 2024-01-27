import axios from "axios";
import { getUserLocalStorage } from "../contexts/AuthContext/util";

export const api = axios.create({
  baseURL: "https://ifjobs-backend.herokuapp.com",
});

api.interceptors.request.use(
  (config) => {
    let user = getUserLocalStorage();
    if (user && user.token) {
      config.headers.Authorization = user.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
