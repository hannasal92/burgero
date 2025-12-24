import axiosClient from "./axiosClient";

export const signupRequest = async (payload) => {
  const response = await axiosClient.post("/auth/signup", payload);
  return response.data;
};

export const loginRequest = async (payload) => {
  const response = await axiosClient.post("/auth/login", payload);
  return response.data;
};