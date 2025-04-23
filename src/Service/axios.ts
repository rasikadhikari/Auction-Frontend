import Axios from "axios";

export const axios = Axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  console.log(token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default axios;
