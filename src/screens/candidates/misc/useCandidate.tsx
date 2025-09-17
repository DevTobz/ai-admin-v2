import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
// types
import {
  CandidateBulkCreation,
  CandidateBulkCreationError,
  CandidateCreation,
  CandidateCreationError,
  ConversationHistory,
  Feedbacks,
  GetAllCandidatesQuery,
  GetInterviewResponse,
  ICandidate,
  InterviewEvaluationReport,
  VideoDetails,
} from "../../../store/types/candidate";

// state and types
import { useAppDispatch } from "../../../store/hooks";
import { ErrorWarning } from "../../../store/types/misc";
import { toast } from "sonner";
import {
  candidate,
  getInterviewEvaluationById,
  getCandidatesByJobId,
  updateCandidate,
  candidateBulk,
} from "../../../services/api/candidate";
import { useNavigate } from "react-router-dom";
// import { setLoading } from "@/store/slices/loading";

export const useCandidate = (
  isEditMode: boolean = false,
  candidateId?: string
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [emailExist, emailExistSet] = React.useState<ErrorWarning>("");
  const [data, dataSet] = React.useState<CandidateCreation>({
    name: "",
    email: "",
    phoneNumber: "",
    interviewDate: "",
    jobId: "",
    interviewId: "",
    expirationDate: "",
  });

  const [error, errorSet] = React.useState<CandidateCreationError>({
    name: "",
    email: "",
    phoneNumber: "",
    interviewDate: "",
    jobId: "",
    expirationDate: "",
  });

  // Expose setData function for external use (like populating form in edit mode)
  const setData = (newData: Partial<CandidateCreation>) => {
    dataSet((prev) => ({ ...prev, ...newData }));
    console.log(newData);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    errorSet((prev) => ({ ...prev, [name]: "" }));
    dataSet((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      emailExistSet("");
    }
  };

  const onChangeHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    errorSet((prev) => ({ ...prev, [name]: "" }));
    dataSet((prev) => ({ ...prev, [name]: value }));
  };

  const onValidateUser = (): boolean => {
    let error: boolean = true;
    if (!data.name) {
      errorSet((prev) => ({ ...prev, name: "warning" }));
      error = false;
    }
    if (!data.phoneNumber) {
      errorSet((prev) => ({ ...prev, phoneNumber: "warning" }));
      error = false;
    }
    // if (!data.email || !validateEmail(data.email) || emailExist) {
    //   errorSet((prev) => ({ ...prev, email: "warning" }));
    //   error = false;
    // }
    if (!data.email) {
      errorSet((prev) => ({ ...prev, email: "warning" }));
      error = false;
    }
    if (!data.interviewDate) {
      errorSet((prev) => ({ ...prev, interviewDate: "warning" }));
      error = false;
    }
    return error;
  };

  // Create candidate function
  const onCreate = async () => {
    try {
      await candidate(dispatch, {
        ...data,
        interviewDate: data.interviewDate,
        expirationDate: data.expirationDate,
      });
      navigate(`/jobs`);
    } catch (error) {
      const err = error as AxiosError<any>;
      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err.message ||
        "Failed to create candidate";
      toast.error(backendMessage);
    }
  };

  // Update candidate function (you'll need to implement the actual API call)
  const onUpdate = async () => {
    try {
      // Replace this with your actual update API call
      await updateCandidate(dispatch, candidateId!, {
        ...data,
        interviewDate: data.interviewDate,
        expirationDate: data.expirationDate,
      });
      toast.success("Candidate updated successfully");
      navigate(`/jobs`);
    } catch (error) {
      toast.error("Failed to update candidate");
      throw error;
    }
  };

  const onSubmit = async () => {
    if (onValidateUser()) {
      if (isEditMode) {
        await onUpdate();
      } else {
        await onCreate();
      }
    }
  };

  return {
    data,
    setData, // Now exposed for external use
    emailExist,
    error,
    onChangeHandler,
    onChangeHandle,
    onSubmit,
    isEditMode,
  };
};

export const useBulkCandidates = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data, dataSet] = React.useState<CandidateBulkCreation>({
    csvFile: null,
    jobId: "",
  });

  const [err, errSet] = React.useState<CandidateBulkCreationError>({
    csvFile: "",
    jobId: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files, value } = e.target;
    errSet((prev) => ({ ...prev, [name]: "" }));
    if (name === "csvFile" && files && files.length > 0) {
      console.log("File selected:", files[0]); // Debug: log selected file
      dataSet((prev) => ({ ...prev, [name]: files[0] })); // store File object
    } else {
      dataSet((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onChangeTextbox = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dataSet((prev) => ({ ...prev, [name]: value }));
    errSet((prev) => ({ ...prev, [name]: "" }));
  };

  const onChangeHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    errSet((prev) => ({ ...prev, [name]: "" }));
    dataSet((prev) => ({ ...prev, [name]: value }));
  };

  const onValidateUsers = (): boolean => {
    let error: boolean = true;
    if (!data.csvFile) {
      errSet((prev) => ({ ...prev, name: "warning" }));
      error = false;
    }
    if (!data.jobId) {
      errSet((prev) => ({ ...prev, phoneNumber: "warning" }));
      error = false;
    }
    return error;
  };

  // Create bulk candidate function
  const onCreateBulk = async () => {
    try {
      const formData = new FormData();
      if (data.csvFile) {
        console.log("Appending file to FormData:", data.csvFile); // Debug: log file before append
        formData.append("csvFile", data.csvFile);
      } else {
        console.warn("No file selected for upload.");
      }
      console.log("Appending jobId to FormData:", data.jobId); // Debug: log jobId
      formData.append("jobId", data.jobId);
      console.log("Submitting FormData:", formData); // Debug: log FormData object
      await candidateBulk(dispatch, formData);
      toast.success("Bulk Candidates and interview created successfully");
      navigate(`/jobs`);
    } catch (error) {
      toast.error("Failed to create bulk candidates");
      throw error;
    }
  };

  const onSubmit = async () => {
    if (onValidateUsers()) {
      {
        await onCreateBulk();
      }
    }
  };

  return {
    data,
    err,
    onChangeHandler,
    onChangeTextbox,
    onChangeHandle,
    onSubmit,
  };
};

export const useCandidates = (initialQuery?: GetAllCandidatesQuery) => {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState(true);
  // const [pagination, setPagination] = useState<PaginationInfo>({
  //   currentPage: 1,
  //   totalPages: 1,
  //   totalItems: 0,
  // });
  const [query, setQuery] = useState<GetAllCandidatesQuery>(
    initialQuery || {
      page: "1",
      limit: "10",
    }
  );

  const fetchCandidates = async (initialQuery?: GetAllCandidatesQuery) => {
    try {
      setLoading(true);
      // const response = await getCandidates(params || query);
      console.log(query);
      const response = await getCandidatesByJobId(query?.jobId);
      console.log(response);
      setCandidates(response.data);
      // setPagination(response.pagination);
    } catch (error) {
      toast.error("Failed to fetch candidates");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    const newQuery = {
      ...query,
      page: page.toString(),
      limit: pageSize?.toString() || query.limit,
    };
    setQuery(newQuery);
    fetchCandidates(newQuery);
  };

  // const handleCategoryFilter = (category?: ActionCategory) => {
  //   const newQuery = {
  //     ...query,
  //     category,
  //     page: "1", // Reset to first page when filtering
  //   };
  //   setQuery(newQuery);
  //   fetchCandidates(newQuery);
  // };

  useEffect(() => {
    fetchCandidates();
  }, []); // Empty dependency array for initial fetch

  return {
    candidates,
    loading,
    handlePageChange,
    // handleCategoryFilter,
    refetch: fetchCandidates,
  };
};

export const ViewInterview = (interviewId: string, id: string) => {
  const [candidateEvaluation, setCandidateEvaluation] =
    useState<InterviewEvaluationReport>();
  const [conversationHistory, setConversationHistory] = useState<
    ConversationHistory[] | null
  >(null);
  const [candidateVideoUrl, setCandidateVideoUrl] = useState<string>("");
  const [candidateFeedback, setCandidateFeedback] = useState<Feedbacks | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInterviewEvaluation = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getInterviewEvaluationById(interviewId, id);
      setCandidateEvaluation(response.data.candidateEvaluation);
      setConversationHistory(response.data.conversationHistory);
      setCandidateVideoUrl(response.data?.videoDetails?.videoUrl ?? "");
      setCandidateFeedback(response.data?.feedback || null);
    } catch (err) {
      const errorMessage = "Failed to fetch Candidate details";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInterviewEvaluation();
    }
  }, [id]);

  return {
    candidateEvaluation,
    conversationHistory,
    candidateVideoUrl,
    candidateFeedback,
    loading,
    error,
    refetch: fetchInterviewEvaluation,
  };
};
