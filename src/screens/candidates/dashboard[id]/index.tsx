import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal, Skeleton } from "antd";
import Table2 from "../../../components/Table";
import { useCandidates } from "../misc/useCandidate";
import { convertCandidatesToCandidatesType } from "../../../utility/candidateHelper";
import { CandidateType } from "../../../store/types/candidate";
import { delete_interview } from "../../../services/api/interview";
import { useAppDispatch } from "../../../store/hooks";
import DeleteConfirmModal from "../../../components/elements/DeleteConfirmModal";

type User = {
  id: number | string;
  name: string;
  email: string;
  job: string;
  date: string;
  interviewDate?: string;
  status: string;
  actions: any;
};

const data: User[] = [
  {
    id: 1,
    name: "Ebenezer Ndukwe",
    email: "ebenezer.ndukwe@25thmail.com",
    job: "Frontend Engineer",
    date: "Mar 20, 2025",
    status: "Completed",
    actions: "Edit",
  },
  {
    id: 2,
    name: "Christian Monte",
    email: "christian@email.com",
    job: "UI/UX Designer",
    date: "Mar 20, 2025",
    status: "Completed",
    actions: "Edit",
  },
  {
    id: 3,
    name: "Anu Sani",
    email: "anu@email.com",
    job: "Human Resource",
    date: "Mar 19, 2025",
    status: "Pending",
    actions: "Edit",
  },
  {
    id: 4,
    name: "Tobi Awe",
    email: "tobi@email.com",
    job: "Office Assistant",
    date: "Mar 19, 2025",
    status: "Completed",
    actions: "Edit",
  },
  {
    id: 5,
    name: "John Mark",
    email: "john@email.com",
    job: "HR Director",
    date: "Mar 18, 2025",
    status: "Pending",
    actions: "Edit",
  },
  {
    id: 6,
    name: "Bright Isaac",
    email: "brigt@email.com",
    job: "Operations Manager",
    date: "Mar 17, 2025",
    status: "Completed",
    actions: "Edit",
  },
];

const columns2: {
  header: string;
  accessor: keyof CandidateType;
  sortable: boolean;
}[] = [
  { header: "S/N", accessor: "id", sortable: true },
  { header: "Name", accessor: "name", sortable: true },
  { header: "Email", accessor: "email", sortable: true },
  { header: "Job Title", accessor: "job", sortable: true },
  { header: "Interview Date", accessor: "date", sortable: true },
  { header: "Start Time", accessor: "interviewDate", sortable: true },
  { header: "Expires", accessor: "expirationDate", sortable: true },
  { header: "IV Status", accessor: "invitationStatus", sortable: true },
  { header: "Interview Status", accessor: "interviewStatus", sortable: true },
];

const Candidates: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const jobId = id as string;
  const candidateId = id as string;
  const interviewId = id as string;
  const [error, setError] = useState();
  // const { candidate } = ViewInterview(interviewId, candidateId);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    candidate: null as CandidateType | null,
  });

  const { candidates, loading } = useCandidates({
    page: "1",
    limit: "10",
    jobId,
    // Add any other initial filters you need, for example:
    // jobId: jobId, // if your API supports filtering by job ID
  });
  // const candidateId = candidate?.id;
  console.log("This is candidates");
  console.log(candidates);
  // const convertedData = candidates);
  const convertedData = convertCandidatesToCandidatesType(candidates);
  console.log(convertedData);

  if (error) {
    return (
      <div className="w-full">
        <div className="p-4">
          <div className="text-red-500">{error}</div>
          <Link
            to="/jobs"
            className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  // const handleRowClick = (row: User) => {
  //   navigate(
  //     `/reports/interview/evaluation?interviewId=${interviewId}&candidateId=${candidateId}`
  //   );
  // };

  const handleRowClick = (row: CandidateType) => {
    navigate(
      `/reports?interviewId=${row.interviewId}&candidateId=${row.candidateId}`
    );
  };

  const handleEditClick = (row: CandidateType) => {
    console.log(row);
    navigate("/edit-candidate", {
      state: {
        candidateData: row,
      },
    });
  };

  const handleRowDelete = (row: CandidateType) => {
    console.log("Delete button clicked for:", row);
    setDeleteModal({
      isOpen: true,
      candidate: row,
    });
  };
  // Confirm delete
  const handleConfirmDelete = () => {
    if (deleteModal.candidate) {
      console.log("Confirmed delete for:", deleteModal.candidate);
      delete_interview(dispatch, deleteModal.candidate.interviewId, navigate);

      // Close modal
      setDeleteModal({ isOpen: false, candidate: null });
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    console.log("Delete cancelled");
    setDeleteModal({ isOpen: false, candidate: null });
  };

  return (
    <div className="w-full py-5">
      <div className="max-w-[1096px] mx-auto px-3">
        <div className="mt-2">
          <p className="font-[600]">List of interview candidates</p>
        </div>
        {/* {jobId?.map((id) => (
          <div key={id}>Job ID: {id}</div>
        ))} */}

        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : candidates ? (
          // <Table
          //   dataSource={candidates}
          //   columns={columns}
          //   loading={loading}
          //   key="id"
          //   rowKey="id"
          //   // pagination={{
          //   //   current: pagination.currentPage,
          //   //   total: pagination.totalItems,
          //   //   pageSize: 10,
          //   //   onChange: handlePageChange,
          //   //   showSizeChanger: false,
          //   // }}
          // />
          <Table2<CandidateType>
            data={convertedData}
            columns={columns2}
            onRowClick={handleRowClick}
            onEditClick={handleEditClick}
            onDeleteClick={handleRowDelete}
          />
        ) : (
          <div className="text-center text-gray-500">
            Contents failed to load, please try again.
          </div>
        )}

        <DeleteConfirmModal
          candidate={deleteModal.candidate}
          isOpen={deleteModal.isOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </div>
    </div>
  );
};

export default Candidates;
