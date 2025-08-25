import React, { useEffect, useState } from "react";
import img from "../../constant";
import axiosInstance from "../../utility/axiosInstance";

type summaryType = {
  completedInterviews: "";
  scheduledInterviews: "";
  totalJobs: "";
};
const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [summary, setSummary] = useState<summaryType>();

  const getDashboardSummary = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/summary");
      const result = response.data.result;
      setSummary(result.data);
      console.log(summary);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      console.error("Error fetching summary:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardSummary();
  }, []);

  return (
    <div className="w-full py-5">
      <div className="max-w-[1096px] mx-auto px-3">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="col-span-1">
            <div className="bg-[#7791F0] h-[152px] rounded-[8.16px]">
              <div className="bg-bgCard bg-cover bg-center bg-no-repeat w-full h-full px-4 py-3">
                <div className="flex items-center">
                  <img src={img.icon1} alt="25th" />
                  <p className="text-19 pl-5">Completed Interviews</p>
                </div>
                <div className="text-center">
                  <p className="text-52">{summary?.completedInterviews}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-[#A7A7A7] h-[152px] rounded-[8.16px]">
              <div className="bg-bgCard bg-cover bg-center bg-no-repeat w-full h-full px-4 py-3">
                <div className="flex items-center">
                  <img src={img.icon2} alt="25th" />
                  <p className="text-19 pl-5">Scheduled Interviews</p>
                </div>
                <div className="text-center">
                  <p className="text-52">{summary?.scheduledInterviews}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-[#1061B9] text-white h-[152px] rounded-[8.16px]">
              <div className="bg-bgCard bg-cover bg-center bg-no-repeat w-full h-full px-4 py-3">
                <div className="flex items-center">
                  <img src={img.icon3} alt="25th" />
                  <p className="text-19 pl-5">Total Jobs</p>
                </div>
                <div className="text-center">
                  <p className="text-52">{summary?.totalJobs}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
