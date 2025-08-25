interface ICandidate {
  candidate: {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    phoneNumber: string;
  };
  interviewId: string;
  interviewDate: string;
  expirationDate: string;
  jobTitle: string;
  isInvite: boolean;
  interviewStatus: string;
}

type User = {
  id: number;
  name: string;
  email: string;
  job: string;
  date: string;
  interviewDate?: string;
  status: string;
  actions: any;
};

type CandidateType = {
  id: number;
  candidateId: string;
  interviewId: string;
  name: string;
  email: string;
  job: string;
  date: string;
  interviewDate?: string;
  phoneNumber: string;
  interviewStatus: string;
  invitationStatus: string;
  expirationDate?: string;
  actions: any;
};

// Converter function
export const convertCandidatesToUsers = (candidates: ICandidate[]): User[] => {
  return candidates?.map((candidateData, index) => ({
    id: index + 1,
    name: candidateData.candidate.name,
    email: candidateData.candidate.email,
    job: candidateData.jobTitle,
    date: new Date(candidateData.interviewDate).toLocaleDateString(),
    interviewDate: new Date(candidateData.interviewDate).toLocaleTimeString(),
    expirationDate: new Date(candidateData.expirationDate).toLocaleDateString(),
    status: candidateData.isInvite ? "Invited" : "Pending",
    actions: null,
  }));
};

//Converting to candidate type
export const convertCandidatesToCandidatesType = (
  candidates: ICandidate[]
): CandidateType[] => {
  return candidates?.map((candidateData, index) => ({
    id: index + 1,
    candidateId: candidateData.candidate.id,
    interviewId: candidateData.interviewId,
    name: candidateData.candidate.name,
    email: candidateData.candidate.email,
    job: candidateData.jobTitle,
    phoneNumber: candidateData.candidate.phoneNumber,
    date: new Date(candidateData.interviewDate).toLocaleDateString(),
    interviewDate: new Date(candidateData.interviewDate).toLocaleTimeString(),
    invitationStatus: candidateData.isInvite ? "Invited" : "Pending",
    interviewStatus: candidateData.interviewStatus,
    expirationDate: new Date(candidateData.expirationDate).toLocaleDateString(),
    actions: null,
  }));
};

export const toLocalDatetimeString = (dateString: string) => {
  if (!dateString) return "";
  // Do not adjust for timezone, just slice the string for input type="datetime-local"
  return dateString.slice(0, 16);
};
