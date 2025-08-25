import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../../components/Layout";
import Dashboard from "../../screens/dashboard";
import CreateJob from "../../screens/jobs/create";
import JobsCreated from "../../screens/jobs/dashboard";
import InterviewReports from "../../screens/jobs/reports[id]";
import CandidateCreate from "../../screens/candidates/create";
import Candidates from "../../screens/candidates/dashboard[id]";
import CreateCandidateBulk from "../../screens/candidates/create-bulk";
import CreateQuestions from "../../screens/jobs/create-questions";

const AuthRoutes: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/jobs" element={<JobsCreated />} />
        <Route path="/reports" element={<InterviewReports />} />
        <Route path="/create-candidate" element={<CandidateCreate />} />
        <Route path="/edit-candidate" element={<CandidateCreate />} />
        <Route path="/candidates/:id" element={<Candidates />} />
        <Route
          path="/create-bulk-candidates"
          element={<CreateCandidateBulk />}
        />
        <Route path="/create-questions" element={<CreateQuestions />} />
      </Routes>
    </AdminLayout>
  );
};

export default AuthRoutes;
