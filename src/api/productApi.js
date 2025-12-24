import axiosClient from "./axiosClient";

export const productApi = {
  getAll: () => axiosClient.get("/product/getProduct"),
  getById: (id) => axiosClient.get(`/products/${id}`),
  create: (data) => axiosClient.post("/products", data),
  update: (id, data) => axiosClient.put(`/products/${id}`, data),
  delete: (id) => axiosClient.delete(`/products/${id}`)
};