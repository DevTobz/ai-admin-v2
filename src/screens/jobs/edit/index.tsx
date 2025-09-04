import React, { useEffect, useState } from "react";
import TextInput from "../../../components/elements/forms/TextInput";
import TextInputBox from "../../../components/elements/forms/TextInputBox";
import SubmitButton from "../../../components/elements/forms/SubmitButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEditJob } from "../misc/useJob";
import SelectDropdown from "../../../components/elements/forms/Select";
import { IJob, IQuestionCreation } from "../../../store/types/job";
import axiosInstance from "../../../utility/axiosInstance";

interface EditJobFormProps {
  jobId: string;
  existingJob?: IJob;
  pretests?: IQuestionCreation[];
  assessments?: IQuestionCreation[];
}

const EditJobForm: React.FC<EditJobFormProps> = ({
  jobId,
  existingJob,
  pretests = [],
  assessments = [],
}) => {
  const {
    data,
    error,
    loading,
    onChangeHandler,
    onChangeTextbox,
    onChangeSelect,
    updateQuestion,
    addQuestion,
    removeQuestion,
    onSubmit,
  } = useEditJob(jobId, existingJob);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">Loading...</div>
    );
  }
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div>Job ID not found</div>;
  }

  const [pretest, setPretests] = useState<IQuestionCreation[]>([]);
  const [assessment, setAssessments] = useState<IQuestionCreation[]>([]);
  const [loading2, setLoading] = useState(true);
  const [error2, setError] = useState<Error | null>(null);

  const getPretests = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IQuestionCreation[]>(
        "/admin/all-pretests"
      );
      setPretests(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const getAssessments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IQuestionCreation[]>(
        "/admin/all-assessments"
      );
      setAssessments(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPretests();
    getAssessments();
  }, []);

  return (
    <div className="w-full py-5">
      <div className="max-w-[1096px] mx-auto px-3">
        <div className="flex border-b border-border text-20">
          <div
            onClick={() => navigate(`/create-candidate`)}
            className="border-b-[3px] border-secondary pb-1 cursor-pointer md:mr-8 mr-5"
          >
            <p className="font-[600]">Create Job</p>
          </div>
          <div
            onClick={() => navigate(`/create-candidate`)}
            className="pb-1 cursor-pointer md:mr-8 mr-5"
          >
            <p className="font-[400]">Upload Candidate Details</p>
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
            label="Job Title"
            placeholder="Enter job title"
            name="title"
            value={data.title}
            // status={error.title}
            onChange={onChangeHandler}
          />

          <TextInputBox
            rows={4}
            label="Job Description"
            placeholder="Enter job description"
            name="description"
            value={data.description}
            // status={error.description}
            onChange={onChangeTextbox}
          />

          <div className="mb-4 flex flex-col gap-3">
            <div>
              <label
                htmlFor="mode-select"
                className="font-[600] block text-[#1E1E1E] text-[15px] capitalize mb-1"
              >
                Select Interview Mode
              </label>
              <select
                id="mode-select"
                value={data.interviewMode}
                onChange={onChangeSelect}
                name="interviewMode"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="" disabled>
                  Choose a mode...
                </option>
                <option value="AUTONOMOUS">Autonomous Interview</option>
                <option value="GUIDED">Guided Interview</option>
                <option value="MIXED">Hybrid Interview</option>
              </select>
              {error.interviewMode && (
                <p className="text-red-500 text-sm mt-1">
                  {error.interviewMode}
                </p>
              )}
            </div>

            {(data.interviewMode === "MIXED" ||
              data.interviewMode === "AUTONOMOUS") && (
              <div>
                <label
                  htmlFor="maxAiQuestions"
                  className="font-[600] block text-[#1E1E1E] text-[15px] capitalize mb-1"
                >
                  Select Amount Of Questions Asked By AI
                </label>
                <select
                  id="maxAiQuestions"
                  value={data.maxAiQuestions}
                  onChange={onChangeSelect}
                  name="maxAiQuestions"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value={0} disabled>
                    Choose number of questions...
                  </option>
                  {[...Array(15)].map((_, index) => (
                    <option value={index + 1} key={index}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                {/* {error.maxAiQuestions && (
                  <p className="text-red-500 text-sm mt-1">
                    {error.maxAiQuestions}
                  </p>
                )} */}
              </div>
            )}
          </div>

          {(data.interviewMode === "GUIDED" ||
            data.interviewMode === "MIXED") && (
            <div className="space-y-4">
              {data.interviewQuestions.map((interview, index) => (
                <div key={index} className="w-full relative">
                  <TextInputBox
                    rows={3}
                    showIcon={true}
                    label={`Interview Question ${index + 1}`}
                    placeholder="Enter question"
                    name={`question-${index}`}
                    value={interview.question}
                    // status={error.interviewQuestions}
                    onChange={(e) =>
                      updateQuestion(index, "question", e.target.value)
                    }
                    add={
                      index === data.interviewQuestions.length - 1
                        ? addQuestion
                        : undefined
                    }
                    remove={
                      data.interviewQuestions.length > 1
                        ? () => removeQuestion(index)
                        : undefined
                    }
                  />
                </div>
              ))}
              {error.interviewQuestions && (
                <p className="text-red-500 text-sm mt-1">
                  {error.interviewQuestions}
                </p>
              )}
            </div>
          )}

          <SelectDropdown
            items={pretest.map((pretest) => ({
              id: pretest.id,
              name: pretest.jobTitle,
            }))}
            name="pretestId"
            label="Pretest"
            value={data.pretestId || ""}
            onChange={onChangeSelect}
          />

          <SelectDropdown
            items={assessment.map((assessment) => ({
              id: assessment.id,
              name: assessment.jobTitle,
            }))}
            name="assessmentId"
            label="Assessment"
            value={data.assessmentId || ""}
            onChange={onChangeSelect}
          />

          <div className="h-[20px]"></div>

          <SubmitButton
            title="Update Job"
            onSubmitHandler={onSubmit}
            loading={loading}
            className="font-[400] text-white md:hover:bg-[white] md:hover:text-secondary hover:border-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default EditJobForm;
