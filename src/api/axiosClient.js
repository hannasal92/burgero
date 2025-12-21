import axios from "axios";
import { getAuthContext } from "../context/AuthContext";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

/* ============================
   REQUEST INTERCEPTOR
============================ */
axiosClient.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuthContext();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // initialize retry counter
    config.__retryCount = config.__retryCount || 0;

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
    const { config, response } = error;

    // ❌ No config = cannot retry
    if (!config) return Promise.reject(error);

    /* ============================
       401 → logout user
    ============================ */
    if (response?.status === 401) {
      const { logout } = getAuthContext();
      logout();
      return Promise.reject(error);
    }

    /* ============================
       RETRY LOGIC (network / 5xx)
    ============================ */
    const MAX_RETRIES = 3;

    const shouldRetry =
      !response || // network error
      (response.status >= 500 && response.status < 600);

    if (shouldRetry && config.__retryCount < MAX_RETRIES) {
      config.__retryCount += 1;

      // optional delay (simple backoff)
      //await new Promise((res) => setTimeout(res, 500 * config.__retryCount));
      await new Promise((res) => setTimeout(res, 2000));

      return axiosClient(config);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;