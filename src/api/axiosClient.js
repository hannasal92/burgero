import axios from "axios";
import { getAuthContext } from "../context/AuthContext"; // helper to access AuthContext outside React

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // required to send refresh token cookies
});

// ---- Flag to avoid multiple refresh calls at once ----
let isRefreshing = false;
let failedRequestsQueue = []; // just an empty array, JS doesn’t need types
/* ============================
   REQUEST INTERCEPTOR
============================ */
axiosClient.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuthContext(); // get token from context
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

/* ============================
   RESPONSE INTERCEPTOR
============================ */
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // queue all requests while refresh in progress
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch(Promise.reject);
      }

      isRefreshing = true;

      try {
        // Call refresh endpoint
        const res = await axiosClient.post("/auth/refreshToken");
        const newAccessToken = res.data.accessToken;

        // Update AuthContext
        const { updateAccessToken } = getAuthContext();
        updateAccessToken(newAccessToken);

        // Retry queued requests
        failedRequestsQueue.forEach((p) => p.resolve(newAccessToken));
        failedRequestsQueue = [];
        isRefreshing = false;

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);

      } catch (err) {
        failedRequestsQueue.forEach((p) => p.reject(err));
        failedRequestsQueue = [];
        isRefreshing = false;

        // Logout user
        const { logout } = getAuthContext();
        logout();

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;