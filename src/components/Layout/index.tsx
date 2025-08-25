import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { GoHome } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import img from "../../constant";

const AdminLayout = ({ children }: any) => {
  const customItems = [
    {
      icon: <GoHome size={22} className="text-lg" />,
      label: "Home",
      path: "/",
    },
    {
      icon: <IoCreateOutline size={22} className="text-lg" />,
      label: "Create Questions",
      path: "/create-questions",
    },
    {
      icon: <IoCreateOutline size={22} className="text-lg" />,
      label: "Create Job",
      path: "/create-job",
    },
    {
      icon: <HiOutlineNewspaper size={22} className="text-lg" />,
      label: "Jobs Created",
      path: "/jobs",
    },
    {
      icon: <AiOutlineUsergroupAdd size={22} className="text-lg" />,
      label: "Create Candidates",
      path: "/create-candidate",
    },
    {
      icon: <AiOutlineUsergroupAdd size={22} className="text-lg" />,
      label: "Create Bulk Candidates",
      path: "/create-bulk-candidates",
    },
    {
      icon: <TbReportAnalytics size={22} className="text-lg" />,
      label: "Interview Reports",
      path: "/candidates",
    },
  ];

  return (
    <div className="flex w-full bg-[#F7F7F7] font-abel">
      <Sidebar
        items={customItems}
        logo={<img src={img.logo} alt="25th" />}
        defaultCollapsed={false}
        onToggleCollapse={(collapsed) =>
          console.log("Sidebar collapsed:", collapsed)
        }
      />

      <main className="w-full h-screen overflow-scroll">
        <Navbar />
        <div className="bg-[#F2F5FF] py-3">
          <div className="max-w-[1096px] mx-auto px-3">
            <p className="text-secondary text-20">AI Recruiter</p>
          </div>
        </div>
        <div>{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
