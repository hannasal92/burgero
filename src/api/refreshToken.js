import axios from "axios";
import { setTokenFromInterceptor } from "../context/AuthContext";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/refresh-token");
        const newAccessToken = res.data.accessToken;

        // Update both localStorage and AuthContext
        localStorage.setItem("accessToken", newAccessToken);
        setTokenFromInterceptor(newAccessToken);

        // Retry original request
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (err) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;