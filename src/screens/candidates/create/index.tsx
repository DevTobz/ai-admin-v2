import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TextInput from "../../../components/elements/forms/TextInput";
import SubmitButton from "../../../components/elements/forms/SubmitButton";
import Modal from "../../../components/Modal";
import img from "../../../constant";
import { useCandidate } from "../misc/useCandidate";
import SelectDropdown from "../../../components/elements/forms/Select";
// import SweetAlert from "../../../components/SweetAlert";
// import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import axiosInstance from "../../../utility/axiosInstance";
import { IJobCreation,IJobFetch } from "../../../store/types/job";
import { toLocalDatetimeString } from "../../../utility/candidateHelper";

type ApiResponse = {
  message: string;
  data: IJobFetch[];
};

type CandidateType = {
  id: number;
  candidateId: string;
  interviewId: string;
  name: string;
  email: string;
  job: string;
  date: string;
  interviewStatus: string;
  invitationStatus: string;
  phoneNumber: string;
  actions: any;
  expirationDate: string;
};

const CandidateCreate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Determine if we're in edit mode based on the route
  const isEditMode = location.pathname.includes("/edit-candidate");

  // Get the candidate data passed from navigation state
  const candidateData = location.state?.candidateData as
    | CandidateType
    | undefined;

  const { data, error, onChangeHandler, onChangeHandle, onSubmit, setData } =
    useCandidate(isEditMode, candidateData?.candidateId);
  // const loading = useAppSelector(({ loading }) => loading.loading);
  // const message = useAppSelector(({ message }) => message.message);
  // const type = useAppSelector(({ message }) => message.type);

  const [jobs, setJobs] = useState<IJobFetch[]>([]);
  const [loading2, setLoading] = useState(true);
  const [error2, setError] = useState<Error | null>(null);
  // console.log(loading2, error2);

  const getJobs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse>("/job");
      console.log(response.data.data)
      setJobs(response.data.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  // Helper function to parse DD/MM/YYYY to ISO string
  const parseDateToISO = (dateString: string): string => {
    if (!dateString) return "";

    // Check for DD/MM/YYYY HH:MM format
    const dateTimeMatch = dateString.match(
      /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/
    );
    if (dateTimeMatch) {
      const [, day, month, year, hours, minutes] = dateTimeMatch;
      const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
      if (!isNaN(date.getTime())) {
        return date.toISOString();
      }
      return "";
    }

    // Check for DD/MM/YYYY format (original date-only format)
    const dateMatch = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (dateMatch) {
      const [, day, month, year] = dateMatch;
      const date = new Date(`${year}-${month}-${day}`);
      if (!isNaN(date.getTime())) {
        return date.toISOString();
      }
      return "";
    }

    // Fallback to default parsing
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toISOString();
    }
    return "";
  };
  // const parseDateToISO = (dateString: string): string => {
  //   if (!dateString) return "";
  //   // Check for DD/MM/YYYY format
  //   const match = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  //   if (match) {
  //     const [, day, month, year] = match;
  //     const date = new Date(`${year}-${month}-${day}`);
  //     if (!isNaN(date.getTime())) {
  //       return date.toISOString();
  //     }
  //     return "";
  //   }
  //   // Fallback to default parsing
  //   const date = new Date(dateString);
  //   if (!isNaN(date.getTime())) {
  //     return date.toISOString();
  //   }
  //   return "";
  // };

  // Populate form with candidate data when in edit mode
  useEffect(() => {
    if (isEditMode && candidateData && jobs.length > 0 && !hasInitialized) {
      const selectedJob = jobs.find((job) => job.currentTemplate.title === candidateData.job);
      const interviewDate = parseDateToISO(candidateData.date);
      const expirationDate = parseDateToISO(candidateData.expirationDate);

      setData({
        name: candidateData.name || "",
        email: candidateData.email || "",
        phoneNumber: candidateData.phoneNumber,
        interviewDate,
        jobId: selectedJob?.id || "",
        interviewId: candidateData.interviewId,
        expirationDate,
      });
      setHasInitialized(true);
    }
  }, [isEditMode, candidateData, jobs, setData, hasInitialized]);

  // Helper to format value for datetime-local input
  const formatForDatetimeLocal = (value: string | undefined) => {
    if (!value) return "";
    // If value is ISO string with Z, convert to local format
    if (value.endsWith("Z")) {
      return new Date(value).toISOString().slice(0, 16);
    }
    // If value is already in correct format, or too short, return as is
    return value.length > 16 ? value.slice(0, 16) : value;
  };

  // console.log(isModalOpen);
  // console.log(jobs);
  // console.log('Is Edit Mode:', isEditMode);
  // console.log('Candidate Data:', candidateData);
  // console.log('Candidate Date Value:', candidateData?.date);

  return (
    <div className="w-full py-5">
      <div className="max-w-[1096px] mx-auto px-3">
        <div className="flex border-b border-border text-20">
          <div
            onClick={() => navigate(`/create-job`)}
            className="pb-1 cursor-pointer md:mr-8 mr-5"
          >
            <p className="font-[400]">Create Job</p>
          </div>
          <div
            onClick={() => navigate(`/create-candidate`)}
            className={`pb-1 cursor-pointer md:mr-8 mr-5 ${
              !isEditMode ? "border-b-[3px] border-secondary" : ""
            }`}
          >
            <p className="font-[400]">
              {isEditMode
                ? "Edit Candidate Details"
                : "Upload Candidate Details"}
            </p>
          </div>
          <div
            onClick={() => navigate(`/create-bulk-candidates`)}
            className="pb-1 cursor-pointer"
          >
            <p className="font-[400]">Add Multiple Users</p>
          </div>
        </div>
        <div className="rounded-10 bg-white px-4 py-5 mt-5">
          <TextInput
            label="Candidate Name"
            placeholder="Enter first and last name"
            name="name"
            value={data.name}
            status={error.name}
            onChange={onChangeHandler}
          />
          <TextInput
            label="Email Address"
            placeholder="Enter email address"
            name="email"
            type="email"
            value={data.email}
            status={error.email}
            onChange={onChangeHandler}
          />
          <TextInput
            label="Phone Number"
            placeholder="Enter phone number"
            name="phoneNumber"
            type="tel"
            value={data.phoneNumber}
            status={error.phoneNumber}
            onChange={onChangeHandler}
          />
          <TextInput
            label="Schedule Interview Date"
            placeholder="Date/Time"
            name="interviewDate"
            type="datetime-local"
            value={formatForDatetimeLocal(data.interviewDate)}
            status={error.interviewDate}
            onChange={(e) => {
              const localDateTimeValue = e.target.value;
              onChangeHandler({
                target: {
                  name: e.target.name,
                  value: localDateTimeValue,
                },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
          />

          <TextInput
            label="Interview Expiration Date"
            placeholder="Date/Time"
            name="expirationDate"
            type="datetime-local"
            value={formatForDatetimeLocal(data.expirationDate)}
            status={error.expirationDate}
            onChange={(e) => {
              const localDateTimeValue = e.target.value;
              onChangeHandler({
                target: {
                  name: e.target.name,
                  value: localDateTimeValue,
                },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
          />

          <SelectDropdown
            items={jobs?.map((job) => ({
              id: job.id,
              name: job?.currentTemplate.title,
            }))}
            name="jobId"
            label="Job Title"
            status={error.jobId}
            value={data.jobId || ""}
            onChange={onChangeHandle}
          />
          <div className="h-[15px]"></div>

          <SubmitButton
            title={isEditMode ? "Update" : "Create"}
            onSubmitHandler={onSubmit}
            // onSubmitHandler={() => navigate(`/`)}
            // loading={loading}
            // type="submit"
            className="font-[400] text-white md:hover:bg-[white] md:hover:text-secondary hover:border-primary"
          />
        </div>
      </div>
      {/* <SweetAlert
        visible={message ? true : false}
        button_name={type === "success" ? "Okay" : "Try Again"}
        onSubmit={() =>
          type === "success" ? navigate(`/jobs`) : navigate(`/create-candidate`)
        }
      /> */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="mt-2 text-center">
          <p className="text-xl md:text-5xl text-black-500">
            {isEditMode
              ? "Candidate successfully updated"
              : "Job successfully created"}
          </p>
          <div className="flex justify-center my-6">
            <img src={img.thanks} alt="25th" />
          </div>
          <div className="mt-8">
            <Link
              to={"/"}
              onClick={() => setIsModalOpen(false)}
              // onClick={() => navigate(`/`)}
              className="rounded-xl bg-black px-8 py-4 text-white hover:bg-blue-600 cursor-pointer"
            >
              Back to home
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CandidateCreate;
