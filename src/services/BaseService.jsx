import axios from "axios";
import { getAccessToken, logout } from "../token/AccessToken";

const createHttp = (useAccessToken = false) => {
  const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
  });

  // interceptors response / request
  http.interceptors.request.use((request) => {
    if (useAccessToken && getAccessToken()) {
      // entro en este if si quiero enviar cabecera y además hay token en el localStorage
      // meto el token en la cabezera Authorization

      request.headers.Authorization = `Bearer ${getAccessToken()}`;
    }

    return request;
  });

  http.interceptors.response.use(
    (response) => response.data,
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      if (
        error?.response?.status &&
        [401, 403].includes(error.response.status) // en este if puedo entrar si no envío token o bien si esta expirado y el back ha devuelto un 401/403
      ) {
        if (getAccessToken()) {
          // delete token
          logout(); // quitamos el access_token y redirigir a login

          if (window.location.pathname !== "/login") {
            window.location.assign("/login");
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return http;
};

export default createHttp;