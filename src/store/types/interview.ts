import { ErrorWarning } from "./misc";

export type CandidateCreation = {
  name: string;
  email: string;
  phoneNumber: string;
  interviewDate: string;
  jobId: string;
};

export type ICandidateCreation = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  interviewDate: string;
  jobId: string;
  dateCreated: string;
};

export interface ICandidate {
  candidate: {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    phoneNumber: string;
  };
  interviewId: string;
  interviewDate: string;
  jobTitle: string;
  isInvite: boolean;
}

export type CandidateCreationError = {
  name: ErrorWarning;
  email: ErrorWarning;
  phoneNumber: ErrorWarning;
  interviewDate: ErrorWarning;
  jobId: ErrorWarning;
};

export type IPayloadInterviewData = {
  data: ICandidateCreation[];
  current_page: string;
  last_page: string;
};

export type CandidateAction = {
  interviews: ICandidateCreation[];
  interview: null;
  current_page: string;
  last_page: string;
  loading: boolean;
};

export interface GetAllCandidatesQuery {
  limit?: string;
  page?: string;
  // category?: CandiateCategory;
  jobId?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface GetAllInterviewResponse {
  // status: string;
  data: {
    interviews: InterviewEvaluationReport[];
  };
}

export interface GetInterviewResponse {
  status: string;
  data: {
    interview: InterviewEvaluationReport;
  };
}

export interface InterviewEvaluationReport {
  id: string;
  candidateId: string;
  interviewId: string;
  candidateName: string;
  position: string;
  competencyAreas: {
    area: string;
    score: number;
    comments: string;
  }[];
  strengths: string[];
  areasOfConcern: string[];
  recommendationStatus: string;
  recommendationSummary: string;
  feedback: string | null;
  createdAt: string;
}
