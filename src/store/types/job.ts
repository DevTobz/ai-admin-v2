import { ErrorWarning } from "./misc";

export type InterviewQuestions = {
  id?: string;
  question: string;
};

export type JobCreation = {
  title: string;
  description: string;
  interviewQuestions: InterviewQuestions[];
  interviewMode: string;
  maxAiQuestions: number;
  pretestId: string;
  assessmentId: string;
};

export type IJobCreation = {
  id: string;
  title: string;
  description: string;
  interviewQuestions?: string[];
  createdAt: Date | null;
  adminId?: string;
  actions?: string;
  interviewMode?: string;
  pretestId: string;
  assessmentId: string;
  questionCategory: string;
};

export type IJobFetch = {
  id: string;
  adminId: string;
  status: string;
  currentTemplate: InterviewTemplate;
};

export type InterviewTemplate = {
  id: string;
  title: string;
  description: string;
  interviewQuestions: string[];
  interviewMode: string;
  maxAiQuestions?: number;
  assessmentId?: string | null;
  pretestId?: string | null;
  version?: number;
  status?: string;
};

export type JobCreationError = {
  title: ErrorWarning;
  description: ErrorWarning;
  interviewQuestions: ErrorWarning;
  interviewMode: ErrorWarning;
};

export type QuestionCreation = {
  jobTitle: string;
  questionCategory?: string;
  questions: string[];
  duration: string;
};

export type IQuestionCreation = {
  id: string;
  jobTitle: string;
  description: string;
  questions?: string[];
  createdAt: Date | null;
  duration: string;
};

export type QuestionCreationError = {
  jobTitle: ErrorWarning;
  questions: ErrorWarning;
  duration: ErrorWarning;
};

export type IPayloadJobData = {
  data: IJobCreation[];
  current_page: string;
  last_page: string;
};

export type JobAction = {
  jobs: IJobCreation[];
  job: null;
  current_page: string;
  last_page: string;
  loading: boolean;
};

export interface GetAllJobsQuery {
  limit?: string;
  page?: string;
  // category?: CandiateCategory;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface GetAllJobsResponse {
  status: string;
  results: number;
  data: {
    jobs: IJobCreation[];
  };
  pagination: PaginationInfo;
}

export interface GetJobResponse {
  status: string;
  data: {
    job: IJobCreation;
  };
}

export interface IJob {
  id: string;
  title: string;
  description: string;
  interviewMode: "AUTONOMOUS" | "GUIDED" | "MIXED" | "";
  maxAiQuestions: number;
  pretestId?: string;
  assessmentId?: string;
  interviewQuestions: InterviewQuestions[];
}

export interface JobCreations extends Omit<IJob, "id"> {
  interviewQuestions: InterviewQuestions[];
}

export interface JobCreation2Error {
  title: string;
  description: string;
  interviewQuestions: string;
  interviewMode: string;
  maxAiQuestions?: string;
}
