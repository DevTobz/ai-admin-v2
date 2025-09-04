import axiosInstance from "../../utility/axiosInstance";

// types and state
// import { setLoading, stopLoading } from "../../store/slices/loading";

import { toast } from "sonner";
// import { setMessage } from "../../store/slices/message";
import { GetInterviewResponse } from "../../store/types/interview";
import { setMessage } from "../../store/slices/message";
import { isAxiosError } from "axios";
import { deleteInterview } from "../../store/slices/interview";
import { AppDispatch } from "../../store";

export const getInterviewById = async (
  interviewId: string,
  id: string
): Promise<GetInterviewResponse> => {
  const response = await axiosInstance.get(
    `/interview/evaluation?interviewId=${interviewId}&candidateId=${id}`
  );
  return response.data;
};

export const delete_interview = async (
  dispatch: AppDispatch,
  id: string,
  navigate: Function
): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/interviews/${id}`);

    const { data } = response.data;
    dispatch(deleteInterview(data));
    toast.success(response.data?.message);
    dispatch(
      setMessage({
        message: "Interview Deleted Successfully",
        // message: response.data?.message,
        type: "success",
        title: "Successful",
      })
    );
    navigate(-1);
  } catch (error: any) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
      dispatch(
        setMessage({
          message: error?.response?.data?.message,
          type: "error",
          title: "Failed",
        })
      );
    }
  }
};
