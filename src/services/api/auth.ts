import { isAxiosError } from "axios";
import { delete_cookie, set_cookie } from "../../config/cookie";
import { AppDispatch } from "../../store";
import { setLoading, stopLoading } from "../../store/slices/loading";
import { ILogin } from "../../store/types/auth";
import axiosInstance from "../../utility/axiosInstance";
import { toast } from "sonner";

export const auth_user = async (
  formData: ILogin,
  dispatch: AppDispatch,
  navigate: any
) => {
  dispatch(setLoading());
  try {
    const response = await axiosInstance.post("/auth/admin/login", formData);

    const { data } = response;
    console.log("Respnse:", data);
    set_cookie("@serial", data?.token);
    localStorage.setItem("@serial", data.serial);
    // navigate(`/dashboard`);
    return data.token;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Please check your Internet.");
    }
  }
  dispatch(stopLoading());
};

export const logout_user = async (navigate: any) => {
  localStorage.removeItem("@serial");
  // localStorage.removeItem(LAST_ACTIVITY_KEY);
  delete_cookie("@serial");
  navigate("/login");
};

// Track last activity timestamp
// const LAST_ACTIVITY_KEY = "@last_activity";

// export const updateLastActivity = () => {
//   const now = new Date().getTime();
//   localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
// };

// export const checkInactivity = (navigate: any) => {
//   const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
//   const now = new Date().getTime();

//   if (!lastActivity) {
//     updateLastActivity();
//     return;
//   }

//   const oneHourInMs = 60 * 60 * 1000; // 1 hour in milliseconds
//   const timeSinceLastActivity = now - parseInt(lastActivity, 10);

//   if (timeSinceLastActivity > oneHourInMs) {
//     logout_user(navigate);
//   }
// };

// // Initialize activity tracking
// export const initActivityMonitor = (navigate: any) => {
//   // Set up event listeners for user activity
//   const activityEvents = ["mousedown", "keydown", "scroll", "touchstart"];

//   activityEvents.forEach((event) => {
//     window.addEventListener(event, updateLastActivity);
//   });

//   // Check every minute (adjust as needed)
//   setInterval(() => checkInactivity(navigate), 60000);

//   // Initial check
//   checkInactivity(navigate);
//   updateLastActivity();
// };
