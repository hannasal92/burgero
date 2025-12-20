import axiosClient from "./axiosClient";

export const bookTableApi = {
  book: (data) => {
    return axiosClient.post("/tables/bookTable", data);
  },
};