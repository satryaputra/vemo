import React from "react";

import axios from "axios";
import { refreshTokenFn } from "@/api/services/auth";
import { getToken, isTokenSet, setToken } from "@/lib/utils/token";
import { ErrorConnection } from "@/components/templates";

const privateApi = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

privateApi.interceptors.request.use((config) => {
  if (isTokenSet()) {
    config.headers.Authorization = `Bearer ${getToken()}`;
  }
  return config;
});

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error?.config;
    const errMessage = error?.response?.data?.errors as string[];

    // 401
    if (
      error?.response?.status === 401 &&
      errMessage &&
      errMessage.includes("expired_token") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const data = await refreshTokenFn(getToken());
        setToken(data.accessToken);
      } catch (error) {
        // 403
        console.log("need login");
      }

      return privateApi(originalRequest);
    }

    // 500
    if (error?.response?.status === 500) {
      return React.createElement(ErrorConnection);
    }

    return Promise.reject(error);
  }
);

export default privateApi;
