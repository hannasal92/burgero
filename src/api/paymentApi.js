// api/paymentApi.js
import axiosClient from "./axiosClient";

export const paymentApi = {
  pay: (cart, total, paymentDetails) => {
    return axiosClient.post("/payment", { cart, total, paymentDetails });
  },
};