import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

// config
const base_url = process.env.REACT_APP_BASE_URL;

const headers = {};

const axiosInstance = axios.create({
  baseURL: base_url,
  headers,
});

console.log(base_url)

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const serial: string | null = localStorage.getItem("@serial");
    if (serial) {
      config.headers.Authorization = `bearer ${serial}`;
    }
    config.headers.Accept = "application/json";
    if (
      config.data &&
      typeof config.data === "object" &&
      !(config.data instanceof FormData)
    ) {
      config.headers["Content-Type"] = "application/json";
    } else {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error: Promise<AxiosError>) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: any): Promise<AxiosResponse> => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (
      error?.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      localStorage.removeItem("@serial");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
