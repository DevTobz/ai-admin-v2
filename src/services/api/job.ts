import { isAxiosError } from "axios";
import axiosInstance from "../../utility/axiosInstance";

// types and state

import { deleteJob, setLoading } from "../../store/slices/job";
// import { setMessage } from "../../store/slices/message";
import { stopLoading } from "../../store/slices/loading";
import {
  GetAllJobsQuery,
  GetAllJobsResponse,
  IJob,
  JobCreation,
  QuestionCreation,
} from "../../store/types/job";
import { toast } from "sonner";
import { setMessage } from "../../store/slices/message";
import { AppDispatch } from "../../store";

// const API_URL = "/api/v1";

type IGetJobs = (dispatch: any) => Promise<void>;
export const getJobss: IGetJobs = async (dispatch: any) => {
  dispatch(setLoading());
  try {
    const response = await axiosInstance.get("/job");

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
    }
  }
  dispatch(setLoading());
};

export const getJobs = async (
  query?: GetAllJobsQuery
): Promise<GetAllJobsResponse> => {
  const response = await axiosInstance.get(`/job`);
  // ?${params.toString()}
  return response.data;
};

// export const getOrderById = async (id: string): Promise<GetOrderResponse> => {
//   const response = await axiosInstance.get(`${API_URL}/orders/${id}`);
//   return response.data;
// };

type JobType = (dispatch: any, formData: JobCreation) => Promise<void>;
export const jobs: JobType = async (dispatch, formData) => {
  dispatch(setLoading());
  try {
    const response = await axiosInstance.post("/job/createjob", formData);

    if (response.data?.message === "job already exist!") {
      throw new Error(response.data?.message);
    } else {
      dispatch(
        setMessage({
          type: "success",
          message: "Job created successfully",
          // message: response?.data?.message,
          title: "Job Created",
        })
      );

      toast.success("Job created successfully");

      // Return the response data if needed for further processing
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      // dispatch(toast.error("An unexpected error occurred"));
    }
    // Re-throw the error so the calling function knows it failed
    throw error;
  } finally {
    dispatch(stopLoading());
  }
};

// Create Pretest
type PretestType = (dispatch: any, formData: QuestionCreation) => Promise<void>;
export const pretest: PretestType = async (dispatch, formData) => {
  dispatch(setLoading());
  try {
    const response = await axiosInstance.post(
      "/admin/create-pretest",
      formData
    );

    if (response.data?.message === "Pretest already exist!") {
      throw new Error(response.data?.message);
    } else {
      dispatch(
        setMessage({
          type: "success",
          message: "Pretest created successfully",
          // message: response?.data?.message,
          title: "Pretest Created",
        })
      );

      toast.success("Pretest created successfully");

      // Return the response data if needed for further processing
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      // dispatch(toast.error("An unexpected error occurred"));
    }
    // Re-throw the error so the calling function knows it failed
    throw error;
  } finally {
    dispatch(stopLoading());
  }
};

// Create Assessment
type AssessmentType = (
  dispatch: any,
  formData: QuestionCreation
) => Promise<void>;
export const assessment: AssessmentType = async (dispatch, formData) => {
  dispatch(setLoading());
  try {
    const response = await axiosInstance.post(
      "/admin/create-assessment",
      formData
    );

    if (response.data?.message === "Assessment already exist!") {
      throw new Error(response.data?.message);
    } else {
      dispatch(
        setMessage({
          type: "success",
          message: "Assessment created successfully",
          // message: response?.data?.message,
          title: "Assessment Created",
        })
      );

      toast.success("Assessment created successfully");

      // Return the response data if needed for further processing
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      // dispatch(toast.error("An unexpected error occurred"));
    }
    // Re-throw the error so the calling function knows it failed
    throw error;
  } finally {
    dispatch(stopLoading());
  }
};

type EditJobType = (
  dispatch: any,
  formData: IJob
) => Promise<{ success: boolean; message: string }>;

export const editJob: EditJobType = async (dispatch, formData) => {
  dispatch(setLoading());

  try {
    const { id, ...rest } = formData;

    // Transform interview questions to match backend expectations
    const payload = {
      ...rest,
      interviewQuestions: rest.interviewQuestions.map((q) => ({
        question: q.question,
        ...(q.id && { id: q.id }), // Include id if it exists for updates
      })),
    };

    const response = await axiosInstance.put(`/job/${id}`, payload);

    if (response.status >= 200 && response.status < 300) {
      dispatch(
        setMessage({
          type: "success",
          message: response.data?.message || "Job updated successfully",
          title: "Job Updated",
        })
      );
      return { success: true, message: response.data?.message };
    } else {
      throw new Error(response.data?.message || "Failed to update job");
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while updating the job";

    dispatch(
      setMessage({
        type: "error",
        message: errorMessage,
        title: "Update Failed",
      })
    );

    return { success: false, message: errorMessage };
  } finally {
    dispatch(stopLoading());
  }
};

export const delete_job = async (
  dispatch: AppDispatch,
  id: string,
  navigate: Function
): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/job/${id}`);

    const { data } = response.data;
    dispatch(deleteJob(data));
    toast.success(response.data?.message);
    dispatch(
      setMessage({
        message: "Job Deleted Successfully",
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
