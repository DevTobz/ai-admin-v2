import React, { useEffect, useState } from "react";
import { IJobCreation } from "../../../store/types/job";
import { Link } from "react-router-dom";
import { Skeleton, Table, TableProps } from "antd";
import { FaEdit, FaEye } from "react-icons/fa";
import axiosInstance from "../../../utility/axiosInstance";
import { BiSearchAlt } from "react-icons/bi";
import SearchInput from "../../../components/elements/forms/SearchInput";
import { IJobFetch } from "../../../store/types/job";
import { toast } from "sonner";

type ApiResponse = {
  message: string;
  data: IJobFetch[];
};

const JobsCreated: React.FC = () => {
  const [jobs, setJobs] = useState<IJobFetch[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState<IJobFetch[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [showMore1, setShowMore1] = useState(false);

  const getJobs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse>("/job");
      setJobs(response.data.data);
      setFilteredJobs(response.data.data); // Initialize filtered data with all jobs
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  // Filter jobs based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(
        (job) => job.currentTemplate.title.toLowerCase().includes(searchTerm.toLowerCase())
        // Add other fields to search if needed:
        // || job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [searchTerm, jobs]);

  const onLoad = React.useCallback(() => {
    getJobs();
  }, []);

  const onScroll = React.useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    onLoad();
    onScroll();
  }, [onLoad, onScroll]);

  React.useEffect(() => {
    console.log("Jobs data:", jobs);
  }, [jobs]);

  // const maxChar = 80;

  const columns: TableProps<IJobFetch>["columns"] = [
    {
      title: "S/N",
      dataIndex: "key",
      width: 20,
      align: "center",
      render: (_, __, index) => index + 1,
      // rowScope: 'row',
    },
    {
      title: "Job Title",
      dataIndex: "title",
      render: (_, record) => record.currentTemplate.title,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (_, record) => (
        <div>
          {showMore
            ? record.currentTemplate.description
            : `${record.currentTemplate.description.substring(0, 80)}`}
          <p className="cursor-pointer" onClick={() => setShowMore(!showMore)}>
            {showMore ? "." : "..."}
          </p>
        </div>
      ),
      // render: (_, record) => record.description.substring(0, maxChar) + "...",
    },
   {
  title: "Questions",
  dataIndex: "interviewTemplate",
  key: "interviewQuestions",
  render: (_, record) => (
    <div>
      {showMore1
        ? record.currentTemplate.interviewQuestions.join(", ")
        : `${record.currentTemplate.interviewQuestions.join("- ").substring(0, 80)}`}
      <p
        className="cursor-pointer"
        onClick={() => setShowMore1(!showMore1)}
      >
        {showMore1 ? "." : "..."}
      </p>
    </div>
  ),
},

    {
      title: "Interview Mode",
      dataIndex: "interviewMode",
      render: (_, record) => record.currentTemplate.interviewMode,
    },
    {
      title: "Has Pre/Ass",
      dataIndex: "pretestId",
      render: (_, record) => (
        <div>{record.currentTemplate.pretestId === null ? <div></div> : <p>Pre/Ass</p>}</div>
      ),
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      // width: 180,
      align: "center",
      render: (_, record) => (
        <div className="flex items-center justify-center">
          <Link to={`/candidates/${record.id}`} className="cursor-pointer">
            <FaEye />
          </Link>
          <div className="w-[12px]"></div>
          <Link to={`/candidates/${record.id}`} className="cursor-pointer">
            <FaEdit />
          </Link>
          <div className="w-[12px]"></div>
          {/* <div
            onClick={() => {
              // delete_block(dispatch, record.id);
            }}
            className="cursor-pointer"
          >
            <FaTrashAlt />
          </div> */}
        </div>
      ),
    },
  ];

  // const tableData = React.useMemo(() => {
  //   if (!jobs || !Array.isArray(jobs)) return [];

  //   return jobs.map((job) => ({
  //     id: job.id,
  //     title: job.title,
  //     description: job.description,
  //     createdAt: new Date(job.createdAt).toLocaleDateString(),
  //     actions: "View Details",
  //   }));
  // }, [jobs]);

  // const handleRowClick = (row: IJobCreation) => {
  //   alert(`Clicked row: ${row.title}`);
  // };
  return (
    <div className="w-full py-5">
      <div className="max-w-[1096px] mx-auto px-3">
        <div className="mt-2 flex items-center justify-between">
          <p className="font-[600]">Newly create jobs</p>
          <SearchInput
            className="w-full"
            name="search"
            value={searchTerm}
            placeholder="Search here..."
            icon={<BiSearchAlt size={18} color="#243677" />}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : jobs ? (
          <Table
            dataSource={filteredJobs}
            // dataSource={jobs}
            columns={columns}
            loading={loading}
            key="id"
            rowKey="id"
          />
        ) : (
          <div className="text-center text-gray-500">
            Contents failed to load, please try again.
          </div>
        )}

        {/* <Table<IJobCreation>
          data={tableData}
          columns={columns}
          onRowClick={handleRowClick}
        /> */}
      </div>
    </div>
  );
};

export default JobsCreated;
