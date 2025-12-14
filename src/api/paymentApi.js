// api/paymentApi.js
import axiosClient from "./axiosClient";

export const paymentApi = {
  pay: (cart, total, paymentDetails, creditCard) => {
    return axiosClient.post("/payment/pay", { cart, total, paymentDetails, payType : creditCard });
  },
};