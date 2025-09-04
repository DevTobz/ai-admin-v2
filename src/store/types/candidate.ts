import { ErrorWarning } from "./misc";

export type CandidateCreation = {
  name: string;
  email: string;
  phoneNumber: string;
  interviewDate: string;
  jobId: string;
  interviewId?: string;
  expirationDate: string;
};

export type CandidateBulkCreation = {
  csvFile: File | null;
  jobId: string;
};

export type CandidateBulkCreationError = {
  csvFile: ErrorWarning;
  jobId: ErrorWarning;
};

export type ICandidateCreation = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  interviewDate: string;
  jobId: string;
  dateCreated: string;
  candidate: InterviewEvaluationReport;
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
  interviewStatus: string;
  expirationDate: string;
  isInvite: boolean;
}

export type CandidateCreationError = {
  name: ErrorWarning;
  email: ErrorWarning;
  phoneNumber: ErrorWarning;
  interviewDate: ErrorWarning;
  jobId: ErrorWarning;
  expirationDate: ErrorWarning;
};

export type IPayloadCandidateData = {
  data: ICandidateCreation[];
  current_page: string;
  last_page: string;
};

export type CandidateAction = {
  candidates: ICandidateCreation[];
  candidate: null;
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

export interface GetAllCandidatesResponse {
  status: string;
  results: number;
  data: {
    candidates: ICandidateCreation[];
  };
  pagination: PaginationInfo;
}

export interface GetCandidateResponse {
  status: string;
  data: {
    candidate: ICandidateCreation;
  };
}

export interface GetCandidateResponse2 {
  status: string;
  data: InterviewEvaluationReport;
}

export interface GetInterviewResponse {
  status: string;
  data: {
    candidateEvaluation: InterviewEvaluationReport;
    conversationHistory: ConversationHistory[];
    videoDetails?: VideoDetails;
    feedbacks?: Feedbacks;
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
  pretestQA: {
    question: string;
    answer: string;
  }[];
  assessmentQA: {
    question: string;
    answer: string;
  }[];
}

export interface ConversationHistory {
  aiQuestion: string;
  userResponse: string;
  questionTimestamp: string;
  responseTimestamp: string;
  metadata?: {
    questionIndex?: number;
    questionType?: string;
    responseDuration?: number;
    sentiment?: string;
    audioTranscription?: boolean;
    edited?: boolean;
    originalResponse?: string;
    responseWordCount?: number;
  };
}

type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

export interface VideoDetails {
  videoUrl: string;
  videoMetadata?: {
    id: string;
    fileName: string;
    originalName: string;
    size: number;
    mimeType: string;
    interviewId: string;
    metadata: JsonValue | null;
    userId: string | null;
    uploadedAt: Date;
  };
}

export type CandidateType = {
  id: number;
  candidateId: string;
  interviewId: string;
  name: string;
  email: string;
  job: string;
  date: string;
  phoneNumber: string;
  interviewStatus: string;
  invitationStatus: string;
  actions: any;
  expirationDate?: string;
  interviewDate?: string;
};

export interface Feedbacks {
  feedback: {
    ratings: number;
    review: string;
  };
}
