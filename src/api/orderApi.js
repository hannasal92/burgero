// api/paymentApi.js
import axiosClient from "./axiosClient";

export const orderApi = {
  get: () => {
    return axiosClient.get("/order/userOrders");
  },
};