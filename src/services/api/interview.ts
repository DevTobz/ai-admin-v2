import axiosInstance from "../../utility/axiosInstance";

// types and state
// import { setLoading, stopLoading } from "../../store/slices/loading";

import { toast } from "sonner";
// import { setMessage } from "../../store/slices/message";
import { GetInterviewResponse } from "../../store/types/interview";

export const getInterviewById = async (
  interviewId: string,
  id: string
): Promise<GetInterviewResponse> => {
  const response = await axiosInstance.get(
    `/interview/evaluation?interviewId=${interviewId}&candidateId=${id}`
  );
  return response.data;
};
