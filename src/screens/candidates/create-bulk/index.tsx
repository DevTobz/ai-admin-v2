import React, { useEffect, useState } from "react";
// import TextInputBox from "../../../components/elements/forms/TextInputBox";
import SubmitButton from "../../../components/elements/forms/SubmitButton";
import { useBulkCandidates } from "../misc/useCandidate";
import { useNavigate } from "react-router-dom";
import SelectDropdown from "../../../components/elements/forms/Select";
import axiosInstance from "../../../utility/axiosInstance";
import { IJobCreation } from "../../../store/types/job";
// import TextInput from "../../../components/elements/forms/TextInput";
import FileInput from "../../../components/elements/forms/FileInput";

type ApiResponse = {
  message: string;
  data: IJobCreation[];
};

const CreateCandidateBulk: React.FC = () => {
  const navigate = useNavigate();
  const { data, err, onChangeHandler, onChangeHandle, onSubmit } =
    useBulkCandidates();

  const [jobs, setJobs] = useState<IJobCreation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getJobs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse>("/job");
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
            className="pb-1 cursor-pointer md:mr-8 mr-5"
          >
            <p className="font-[400]">Upload Candidate Details</p>
          </div>
          <div
            onClick={() => navigate(`/create-bulk-candidates`)}
            className="border-b-[3px] border-secondary pb-1 cursor-pointer"
          >
            <p className="font-[400]">Add Multiple Users</p>
          </div>
        </div>
        <div className="rounded-10 bg-white px-4 py-5 mt-5">
          <FileInput
            label="Upload CSV file"
            name="csvFile"
            status={err.csvFile}
            onChange={onChangeHandler}
          />
          {/* <TextInputBox
            rows={10}
            label="Upload CSV file"
            placeholder=""
            name="csvFile"
            value={data.csvFile}
            status={err.csvFile}
            onChange={onChangeTextbox}
          /> */}
          <SelectDropdown
            items={jobs?.map((job) => ({
              id: job.id,
              name: job?.title,
            }))}
            name="jobId"
            label="Job Title"
            status={err.jobId}
            value={data.jobId || ""}
            onChange={onChangeHandle}
          />

          <div className="h-[5px]"></div>

          <SubmitButton
            title="Upload files"
            onSubmitHandler={onSubmit}
            // onSubmitHandler={() => navigate(`/`)}
            // loading={loading}
            // type="submit"
            className="font-[400] text-white md:hover:bg-[white] md:hover:text-secondary hover:border-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCandidateBulk;
