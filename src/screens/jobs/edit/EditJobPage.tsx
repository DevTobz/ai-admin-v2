// EditJobPage.tsx with data fetching
import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axiosInstance from "../../../utility/axiosInstance";
import EditJobForm from ".";

export const EditJobPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const [pretests, setPretests] = useState<
  //   Array<{ id: string; jobTitle: string }>
  // >([]);
  // const [assessments, setAssessments] = useState<
  //   Array<{ id: string; jobTitle: string }>
  // >([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchDropdownData = async () => {
  //     try {
  //       const [pretestsResponse, assessmentsResponse] = await Promise.all([
  //         axiosInstance.get("/admin/all-pretests"),
  //         axiosInstance.get("/admin/all-assessments"),
  //       ]);

  //       setPretests(pretestsResponse.data);
  //       setAssessments(assessmentsResponse.data);
  //     } catch (error) {
  //       console.error("Failed to fetch dropdown data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDropdownData();
  // }, []);

  if (!id) {
    return <div>Job ID not found</div>;
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>
      <EditJobForm
        jobId={id}
        // pretests={pretests} assessments={assessments}
      />
    </div>
  );
};
