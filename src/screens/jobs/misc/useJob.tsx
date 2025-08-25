import React, { useEffect, useState, useCallback } from "react";

// types
import {
  ICandidateCreation,
  PaginationInfo,
} from "../../../store/types/candidate";

// state and types
import { useAppDispatch } from "../../../store/hooks";
import { toast } from "sonner";
import { getCandidateById } from "../../../services/api/candidate";
import {
  GetAllJobsQuery,
  IJobCreation,
  InterviewQuestions,
  JobCreation,
  JobCreationError,
} from "../../../store/types/job";
import { getJobs, jobs } from "../../../services/api/job";
import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../../utility/axiosInstance";

const initialQuestion: InterviewQuestions = {
  question: "",
  id: "",
};

export const useJob = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [data, dataSet] = React.useState<JobCreation>({
    title: "",
    description: "",
    interviewQuestions: [initialQuestion],
    interviewMode: "",
    maxAiQuestions: 0,
    pretestId: "",
    assessmentId: "",
  });

  const [error, errorSet] = React.useState<JobCreationError>({
    title: "",
    description: "",
    interviewQuestions: "",
    interviewMode: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    errorSet((prev) => ({ ...prev, [name]: "" }));
    dataSet((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeTextbox = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dataSet((prev) => ({ ...prev, [name]: value }));
    errorSet((prev) => ({ ...prev, [name]: "" }));
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dataSet((prev) => {
      const newData = { ...prev, [name]: value };
      return newData;
    });
    errorSet((prev) => ({ ...prev, [name]: "" }));
  };

  const onChangeQuestionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dataSet((prev) => {
      const newData = { ...prev, [name]: value };
      return newData;
    });
    errorSet((prev) => ({ ...prev, [name]: "" }));
  };

  // const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //     dataSet((prev) => ({ ...prev, [name]: value }));
  //     errorSet((prev) => ({ ...prev, [name]: "" }));
  //   console.log("Selected mode:", e.target);
  //   console.log("clicked f=dropdown")
  // };

  const updateQuestion = (
    index: number,
    field: keyof InterviewQuestions,
    value: string
  ) => {
    const newQuestion = [...data.interviewQuestions];
    newQuestion[index] = { ...newQuestion[index], [field]: value };
    handleInputChange("interviewQuestions", newQuestion);
  };

  const handleInputChange = (name: keyof JobCreation, value: any) => {
    dataSet((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when field is modified
    if (error[name as keyof JobCreationError]) {
      errorSet((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const addQuestion = () => {
    dataSet((prev) => ({
      ...prev,
      interviewQuestions: [...prev.interviewQuestions, { ...initialQuestion }],
    }));
  };

  const removeQuestion = (id: string) => {
    dataSet((prev) => ({
      ...prev,
      interviewQuestions: prev.interviewQuestions.filter(
        (question) => question.id !== id
      ),
    }));
  };

  const onValidate = (): boolean => {
    let error: boolean = true;
    if (!data.title) {
      errorSet((prev) => ({ ...prev, title: "warning" }));
      error = false;
    }
    if (!data.description) {
      errorSet((prev) => ({ ...prev, description: "warning" }));
      error = false;
    }
    if (!data.interviewQuestions) {
      errorSet((prev) => ({ ...prev, interviewQuestions: "warning" }));
      error = false;
    }
    return error;
    // if (validate) return;
    // navigate("/orders");
  };

  const onSubmit = async () => {
    if (onValidate()) {
      try {
        const payload = {
          title: data.title,
          description: data.description,
          interviewQuestions: data.interviewQuestions.map((question) => ({
            question: question.question,
          })),
          interviewMode: data.interviewMode,
          maxAiQuestions: data.maxAiQuestions,
          pretestId: data.pretestId,
          assessmentId: data.assessmentId,
        };
        setLoading(true);

        console.log("Before paylaod");
        console.log(payload);

        await jobs(dispatch, payload);
        setLoading(false);
        console.log("calling on navigate");
        // Only navigate if the API call is successful
        navigate(`/create-candidate`);
      } catch (error) {}
    }
  };

  return {
    data,
    error,
    loading,
    onChangeHandler,
    onChangeTextbox,
    onChangeSelect,
    onChangeQuestionSelect,
    updateQuestion,
    addQuestion,
    removeQuestion,
    onSubmit,
  };
};

export const useJobs = (initialQuery?: GetAllJobsQuery) => {
  const [jobs, setJobs] = useState<IJobCreation[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [query, setQuery] = useState<GetAllJobsQuery>(
    initialQuery || {
      page: "1",
      limit: "10",
    }
  );

  useEffect(() => {
    getJobs();
  }, []);

  const fetchJobs = async (params?: GetAllJobsQuery) => {
    try {
      setLoading(true);
      const response = await getJobs();
      setJobs(response.data.jobs);
      setPagination(response.pagination);
    } catch (error) {
      toast.error("Failed to fetch jobs");
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
    fetchJobs(newQuery);
  };

  // const handleCategoryFilter = (category?: ActionCategory) => {
  //   const newQuery = {
  //     ...query,
  //     category,
  //     page: "1", // Reset to first page when filtering
  //   };
  //   setQuery(newQuery);
  //   fetchJobs(newQuery);
  // };

  useEffect(() => {
    fetchJobs();
  }, []); // Empty dependency array for initial fetch

  return {
    jobs,
    loading,
    pagination,
    handlePageChange,
    // handleCategoryFilter,
    refetch: fetchJobs,
  };
};

export const ViewCandidate = (id: string) => {
  const [candidate, setBlocks] = useState<ICandidateCreation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidate = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCandidateById(id);
      setBlocks(response.data.candidate);
    } catch (err) {
      const errorMessage = "Failed to fetch Candidate details";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCandidate();
    }
  }, [id, fetchCandidate]);

  return { candidate, loading, error, refetch: fetchCandidate };
};
