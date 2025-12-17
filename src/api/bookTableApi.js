import axiosClient from "./axiosClient";

export const bookTableApi = {
  book: (data) => {
    return axiosClient.post("/book/bookTable", data);
  },
};