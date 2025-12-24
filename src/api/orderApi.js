// src/api/orderApi.js
import axiosClient from "./axiosClient";

export const orderApi = {
  get: (page = 1, limit = 5) =>
    axiosClient.get(`/order/userOrders?page=${page}&limit=${limit}`),
};