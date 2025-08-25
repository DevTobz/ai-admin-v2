import { isAxiosError } from "axios";
import axiosInstance from "../../utility/axiosInstance";

// types and state

import { setLoading } from "../../store/slices/job";
// import { setMessage } from "../../store/slices/message";
import { stopLoading } from "../../store/slices/loading";
import {
  GetAllJobsQuery,
  GetAllJobsResponse,
  JobCreation,
  QuestionCreation,
} from "../../store/types/job";
import { toast } from "sonner";
import { setMessage } from "../../store/slices/message";

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
