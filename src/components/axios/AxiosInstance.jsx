import axios from "axios";
import { ApiConfig } from "../../config/api.config";

const myBaseUrl = ApiConfig.API_URL;

const AxiosInstance = axios.create({
  baseURL: myBaseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default AxiosInstance;
