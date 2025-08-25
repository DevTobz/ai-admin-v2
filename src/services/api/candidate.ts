import { isAxiosError } from "axios";
import axiosInstance from "../../utility/axiosInstance";

// types and state
import { setLoading, stopLoading } from "../../store/slices/loading";
import {
  CandidateBulkCreation,
  CandidateCreation,
  GetAllCandidatesQuery,
  GetAllCandidatesResponse,
  GetCandidateResponse,
  GetInterviewResponse,
} from "../../store/types/candidate";
import { toast } from "sonner";
import { setMessage } from "../../store/slices/message";


// const API_URL = "https://hr-pas-backend.onrender.com/api/v1";

type IGetCandidates = (dispatch: any, id: string | undefined) => Promise<void>;

export const getCandidatess: IGetCandidates = async (
  dispatch: any,
  id: string | undefined
) => {
  dispatch(setLoading());
  try {
    const response = await axiosInstance.get(`/job/${id}/candidates`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
    }
  }
  dispatch(setLoading());
};
export const getCandidatesByJobId = async (id: string | undefined) => {
  try {
    const response = await axiosInstance.get(`/job/${id}/candidates`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
    }
  }
};

// Get
export const getCandidates = async (
  query?: GetAllCandidatesQuery
): Promise<GetAllCandidatesResponse> => {
  const params = new URLSearchParams();
  if (query?.limit) params.append("limit", query.limit);
  // if (query?.category) params.append("category", query.category);

  const response = await axiosInstance.get(
    `/job/candidates?${params.toString()}`
  );
  return response.data;
};

export const getCandidateById = async (
  id: string
): Promise<GetCandidateResponse> => {
  const response = await axiosInstance.get(`/job/${id}/candidates`);
  return response.data;
};

export const getInterviewEvaluationById = async (
  interviewId: string,
  id: string
): Promise<GetInterviewResponse> => {
  const response = await axiosInstance.get(
    `/interview/evaluation?interviewId=${interviewId}&candidateId=${id}`
  );
  return response.data;
};

export const updateCandidate = async (
  dispatch: any,
  candidateId: string,
  candidateData: CandidateCreation
) => {
  try {
    // Dispatch loading state if you have it
    // dispatch(setLoading(true));
    console.log("This is candidate data")
    console.log(candidateData)
    const response = await axiosInstance.post(
      `/admin/schedule-interview`,
      candidateData
    );

    // dispatch(setMessage({ message: "Candidate updated successfully", type: "success" }));

    return response.data;
  } catch (error) {
    // Handle error
    // dispatch(setMessage({ message: "Failed to update candidate", type: "error" }));
    throw error;
  } finally {
    // dispatch(setLoading(false));
  }
};

type CandidateType = (
  dispatch: any,
  formData: CandidateCreation
) => Promise<void>;

export const candidate: CandidateType = async (dispatch, formData) => {
  dispatch(setLoading());
  try {
   
    const response = await axiosInstance.post(
      "/admin/register-candidate",
      formData
    );
    console.log(response)

    if (response.data.message) {
      // throw new Error(response.data?.message);
           toast.success(response.data.message as unknown as string);
    }

      return response.data;
    
  } catch (error) {
    if (isAxiosError(error)) {
      
        // toast.error(
        //   "Interview time conflicts with an existing interview for this candidate"
        // )
    
      // dispatch(toast.error(error?.response?.data?.message));
    } else {
      // dispatch(toast.error("An unexpected error occurred"));
    }
    // Re-throw the error so the calling function knows it failed
    throw error;
  } finally {
    dispatch(stopLoading());
  }
};

export const candidateBulk = async (dispatch: any, formData: FormData) => {
  dispatch(setLoading());
  try {
    // Get token from localStorage or your auth state if needed
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const response = await axiosInstance.post(
      "/admin/register-candidates-batch",
      formData,
      { headers }
    );

    if (response.data?.message === "Candidates already exist!") {
      throw new Error(response.data?.message);
    } else {
      dispatch(
        setMessage({
          type: "success",
          message: "Bulk Candidates Created Successfully",
          // message: response?.data?.message,
          title: "Candidate Created",
        })
      );
      toast.success("Bulk Candidates created successfully");
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error)) {
 
        toast.error(
          "Interview time conflicts with an existing interview for this candidate"
        )
      
      // dispatch(toast.error(error?.response?.data?.message));
    } else {
      // dispatch(toast.error("An unexpected error occurred"));
    }
    // Re-throw the error so the calling function knows it failed
    throw error;
  } finally {
    dispatch(stopLoading());
  }
};
