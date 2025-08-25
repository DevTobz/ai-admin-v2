import React from "react";
import Accordion from "../../../components/Accordion";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";
import { ViewInterview } from "../../candidates/misc/useCandidate";
import { useSearchParams } from "react-router-dom";

const InterviewReports: React.FC = () => {
  // const { id } = useParams();
  // const candidates = id as string;
  // const interviewId = id as string;
  const [searchParams] = useSearchParams();
  const interviewId = searchParams.get("interviewId") as string;
  const id = searchParams.get("candidateId") as string;
  const {
    candidateEvaluation,
    loading,
    conversationHistory,
    error,
    candidateVideoUrl,
  } = ViewInterview(interviewId, id);

  const accordionItems = [
    {
      id: "item1",
      title: "Strengths",
      content: (
        <div>
          {candidateEvaluation?.strengths.map((strength) => (
            <ul style={{ listStyleType: "circle" }}>
              <li>{strength}</li>
            </ul>
          ))}
        </div>
      ),
    },
    {
      id: "item2",
      title: "Transcript",
      content: (
        <div>
          {conversationHistory?.map((conversation, index) => (
            // Render your conversation data
            <div key={index} className="mb-5">
              <p>
                {" "}
                <span className="font-bold">Question Timestamp:</span>{" "}
                {conversation.questionTimestamp}
              </p>
              <p>
                <span className="font-bold">AI Question:</span>{" "}
                {conversation.aiQuestion}
              </p>
              <p>
                <span className="font-bold">Response Timestamp:</span>{" "}
                {conversation.responseTimestamp}{" "}
              </p>
              <p>
                <span className="font-bold">User Response: </span>{" "}
                {conversation.userResponse}
              </p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "item3",
      title: "Video Recording",
      content: (
        <div>
          <video
            className="rounded-8"
            src={candidateVideoUrl} // <-- Play the URL
            controls
            width="100%"
          >
            Your browser doesn't support video.
          </video>
        </div>
      ),
    },
    {
      id: "item4",
      title: "Pretests and Assessments",
      content: (
        <div>
          <p className="font-bold pb-1">Pretest:- </p>
          <div className="mb-3">
            {candidateEvaluation?.pretestQA?.map((pretest) => (
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                <li className="pb-1">
                  <span className="font-bold">Question: </span>
                  {pretest?.question}
                </li>
                <li className="pb-2">
                  <span className="font-bold">Answer: </span>
                  {pretest?.answer}
                </li>
              </ul>
            ))}
          </div>
          <p className="font-bold pb-1">Assessment:- </p>
          <div>
            {candidateEvaluation?.assessmentQA?.map((assessment) => (
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                <li className="pb-1">
                  <span className="font-bold">Question: </span>
                  {assessment?.question}
                </li>
                <li className="pb-2">
                  <span className="font-bold">Answer: </span>
                  {assessment?.answer}
                </li>
              </ul>
            ))}
          </div>
        </div>
      ),
    },
  ];

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500">{error}</div>
        <Link
          to={`/candidates${id}`}
          className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
        >
          Back to Interview
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full py-5">
      <div className="max-w-[1096px] mx-auto px-3">
        <div className="mt-2 mb-3">
          <p className="font-[600]">Candidate Interview Report</p>
        </div>

        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : candidateEvaluation ? (
          <div className="w-full">
            <div className="grid md:grid-cols-5 grid-cols-1 gap-2">
              {candidateEvaluation.competencyAreas?.map((candidate) => (
                <div
                  key={candidate.area}
                  className="col-span-1 rounded-10 bg-white border border-border min:h-[180px] px-3 pt-2 pb-3"
                >
                  <p className="text-16 text-secondary text-center">
                    {candidate?.area}
                  </p>
                  <div className="flex flex-col justify-between h-[85%]">
                    <p className="text-14 text-center py-2">
                      {candidate?.comments}
                    </p>
                    <div className="flex justify-between items-end">
                      <p className="text-24 font-[600] text-secondary text-center">
                        {candidate.score}%
                      </p>
                      <div className="bg-[#E7F6EC] text-[#036B26] h-[17px] w-[49px] rounded-10">
                        <p className="text-12 font-[600] text-secondary text-center"></p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <h1 className="text-20 text-text font-semibold pb-3">
                Interview Report for{" "}
                <span className="text-primary">
                  {candidateEvaluation?.candidateName}
                </span>
              </h1>
              <div className="text-16 text-text pb-5">
                <p>{candidateEvaluation?.position}</p>
                <p>{candidateEvaluation?.createdAt}</p>
              </div>
              <h2 className="text-20 text-text font-semibold pb-2">
                Overall Recommendation
              </h2>
              <p className="text-16 text-text pb-5">
                {candidateEvaluation?.recommendationSummary}
              </p>
              <h2 className="text-20 text-text font-semibold pb-2">
                Area of Concern
              </h2>
              <div className="text-16 text-text pb-5">
                <ul className="list-disc list-inside space-y-1">
                  {candidateEvaluation?.areasOfConcern?.map(
                    (concern, index) => (
                      <li key={index}>{concern}</li>
                    )
                  )}
                </ul>
              </div>
              <h2 className="text-20 text-text font-semibold pb-2">
                Recommendation Status
              </h2>
              <p className="text-16 text-text pb-5">
                {candidateEvaluation?.recommendationStatus}
              </p>
            </div>
            <div className="mt-3">
              <Accordion
                items={accordionItems}
                allowMultiple={false}
                className="space-y-2"
                itemClassName="hover:shadow-md transition-shadow"
                titleClassName="text-text hover:text-blue-600"
                activeTitleClassName="text-blue-600 font-semibold"
                contentClassName="text-text"
              />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Report not found</div>
        )}
      </div>
    </div>
  );
};

export default InterviewReports;
