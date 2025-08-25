import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import {
  QuestionCreation,
  QuestionCreationError,
} from "../../../store/types/job";
import { assessment, pretest } from "../../../services/api/job";

export const usePretest = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [data, dataSet] = React.useState<QuestionCreation>({
    jobTitle: "",
    questions: [""],
    duration: "",
  });

  const [error, errorSet] = React.useState<QuestionCreationError>({
    jobTitle: "",
    questions: "",
    duration: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    errorSet((prev) => ({ ...prev, [name]: "" }));
    dataSet((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dataSet((prev) => {
      const newData = { ...prev, [name]: value };
      return newData;
    });
    errorSet((prev) => ({ ...prev, [name]: "" }));
  };

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...data.questions];
    newQuestions[index] = value;
    handleInputChange("questions", newQuestions);
  };

  const handleInputChange = (name: keyof QuestionCreation, value: any) => {
    dataSet((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when field is modified
    if (error[name as keyof QuestionCreationError]) {
      errorSet((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const addQuestion = () => {
    dataSet((prev) => ({
      ...prev,
      questions: [...prev.questions, ""], // Add empty string
    }));
  };

  // const removeQuestion = (id: string) => {
  //   dataSet((prev) => ({
  //     ...prev,
  //     questions: prev.questions.filter((question) => question.id !== id),
  //   }));
  // };

  const onValidate = (): boolean => {
    let error: boolean = true;
    if (!data.jobTitle) {
      errorSet((prev) => ({ ...prev, jobTitle: "warning" }));
      error = false;
    }
    if (!data.questions) {
      errorSet((prev) => ({ ...prev, questions: "warning" }));
      error = false;
    }
    if (!data.duration) {
      errorSet((prev) => ({ ...prev, duration: "warning" }));
      error = false;
    }
    return error;
    // if (validate) return;
    // navigate("/orders");
  };

  const onSubmit = async () => {
    if (onValidate()) {
      try {
        const payload = {
          jobTitle: data.jobTitle,
          questions: data.questions,
          duration: data.duration,
        };
        setLoading(true);

        console.log("Before paylaod");
        console.log(payload);

        await pretest(dispatch, payload);
        // Clear state after successful submission
        dataSet({
          jobTitle: "",
          questions: [],
          duration: "", // or whatever your initial value should be
        });
        setLoading(false);
        console.log("calling on navigate");
        // Only navigate if the API call is successful
        navigate(`/create-questions`);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const onSubmit_ = async () => {
    if (onValidate()) {
      try {
        const payload = {
          jobTitle: data.jobTitle,
          questions: data.questions,
          duration: data.duration,
        };
        setLoading(true);

        console.log("Before paylaod");
        console.log(payload);

        await assessment(dispatch, payload);
        // Clear state after successful submission
        dataSet({
          jobTitle: "",
          questions: [],
          duration: "", // or whatever your initial value should be
        });
        setLoading(false);
        console.log("calling on navigate");
        // Only navigate if the API call is successful
        navigate(`/create-job`);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return {
    data,
    error,
    loading,
    onChangeHandler,
    onChangeSelect,
    updateQuestion,
    addQuestion,
    // removeQuestion,
    onSubmit,
    onSubmit_,
  };
};
