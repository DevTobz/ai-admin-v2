import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface CandidateType {
  interviewId: string;
  candidateId: string;
  name?: string;
}

interface DeleteModalProps {
  candidate: CandidateType | null;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// Custom Delete Confirmation Modal Component
const DeleteConfirmModal: React.FC<DeleteModalProps> = ({
  candidate,
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 pb-4">
          <div className="flex-shrink-0">
            <FaExclamationTriangle className="text-2xl text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Delete Candidate
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-4">
          <p className="text-gray-600">
            Are you sure you want to delete candidate{" "}
            <span className="font-medium text-gray-900">
              "{candidate.name || "this candidate"}"
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-[red] border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
