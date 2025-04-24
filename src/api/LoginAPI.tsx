import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://dummyjson.com/auth",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export default api;
