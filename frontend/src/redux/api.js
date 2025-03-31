import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8080" });
import Cookies from "js-cookie";

const token = Cookies.get("token");

API.interceptors.request.use((req) => {
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
    req.headers["Content-Type"] = "multipart/form-data";
  }
  return req;
});

export default API;
