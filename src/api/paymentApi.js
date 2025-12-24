// api/paymentApi.js
import axiosClient from "./axiosClient";

export const paymentApi = {
  pay: (cart, total, paymentDetails, delivery, creditCard) => {
    return axiosClient.post("/payment/pay", { cart, total, delivery, paymentDetails, paymentType : creditCard });
  },
};