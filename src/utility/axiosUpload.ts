import axios, {
  // AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { delete_cookie, get_cookie } from "../config/cookie";
import { env } from "process";

const headers = {};

const axiosUpload = axios.create({
  baseURL: env.baseURL,
  headers,
});

axiosUpload.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const serial = get_cookie("@serial");
    if (serial) {
      config.headers.Authorization = `bearer ${serial}`;
    }
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

axiosUpload.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (
      error?.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      delete_cookie("@serial");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosUpload;
