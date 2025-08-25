import React from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../components/elements/forms/TextInput";
import TextInputBox from "../../../components/elements/forms/TextInputBox";
import SelectDropdown from "../../../components/elements/forms/Select";
import SubmitButton from "../../../components/elements/forms/SubmitButton";
import { usePretest } from "../misc/useQuestions";

const CreateQuestions: React.FC = () => {
  const navigate = useNavigate();
  const {
    data,
    error,
    loading,
    onChangeHandler,
    onChangeSelect,
    updateQuestion,
    addQuestion,
    onSubmit,
    onSubmit_,
  } = usePretest();
  // const { onSubmit_ } = useAssessment();

  return (
    <div className="w-full py-5">
      <div className="max-w-[1096px] mx-auto px-3">
        <div className="flex border-b border-border text-20">
          <div
            onClick={() => navigate(`/create-candidate`)}
            className="border-secondary pb-1 cursor-pointer md:mr-8 mr-5"
          >
            <p className="font-[600]">Recruitment Questions</p>
          </div>
        </div>
        <div className="rounded-10 bg-white px-4 py-5 mt-5">
          <TextInput
            label="Job Title"
            placeholder="Enter job title"
            name="jobTitle"
            value={data.jobTitle}
            status={error.jobTitle}
            onChange={onChangeHandler}
          />
          {/*{ if value="PRETEST" baseUrl="/pretest" : baseUrl="/assessment" */}
          <SelectDropdown
            items={[
              { id: "Pretest", name: "Pretest" },
              { id: "Assessment", name: "Assessment" },
            ]}
            name="questionCategory"
            label="Question Category"
            value={data.questionCategory || ""}
            onChange={onChangeSelect}
          />

          {data.questions.map((question, index) => (
            <div key={index} className="w-full">
              <TextInputBox
                rows={4}
                showIcon={true}
                label={`Questions ${index + 1}`}
                placeholder="Enter question"
                name={`question-${index}`}
                value={question}
                status={error.questions}
                onChange={(e) => {
                  updateQuestion(index, e.target.value);
                }}
                add={addQuestion}
              />
            </div>
          ))}

          <SelectDropdown
            items={[
              { id: "15", name: "15mins" },
              { id: "20", name: "20mins" },
              { id: "25", name: "25mins" },
              { id: "30", name: "30mins" },
              { id: "35", name: "35mins" },
              { id: "40", name: "40mins" },
              { id: "45", name: "45mins" },
            ]}
            name="duration"
            label="Duration"
            value={data.duration || ""}
            onChange={onChangeSelect}
          />

          {data.questionCategory === "Pretest" ? (
            <SubmitButton
              title="Create"
              onSubmitHandler={onSubmit}
              loading={loading}
              className="font-[400] text-white md:hover:bg-[white] md:hover:text-secondary hover:border-primary"
            />
          ) : data.questionCategory === "Assessment" ? (
            <SubmitButton
              title="Create"
              onSubmitHandler={onSubmit_}
              loading={loading}
              className="font-[400] text-white md:hover:bg-[white] md:hover:text-secondary hover:border-primary"
            />
          ) : (
            <SubmitButton
              title="Create"
              className="font-[400] text-white md:hover:bg-[white] md:hover:text-secondary hover:border-primary"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateQuestions;
