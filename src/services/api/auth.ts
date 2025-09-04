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
  delete_cookie("@serial");
  navigate("/login");
};
