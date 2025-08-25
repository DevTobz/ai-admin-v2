import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";

// Define types for the sidebar items
type SidebarItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
  end?: boolean;
};

type SidebarProps = {
  items?: SidebarItem[];
  logo?: React.ReactNode;
  collapsedWidth?: string;
  expandedWidth?: string;
  defaultCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  items = [],
  logo = null,
  collapsedWidth = "w-16",
  expandedWidth = "w-64",
  defaultCollapsed = false,
  onToggleCollapse,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const location = useLocation();

  const toggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    if (onToggleCollapse) {
      onToggleCollapse(newCollapsed);
    }
  };

  // Default items if none provided
  const defaultItems: SidebarItem[] = [
    {
      icon: <GoHome size={22} className="text-lg" />,
      label: "Home",
      path: "/",
    },
    {
      icon: <IoCreateOutline size={22} className="text-lg" />,
      label: "Create Job",
      path: "/job-create",
    },
    {
      icon: <HiOutlineNewspaper size={22} className="text-lg" />,
      label: "Jobs Created",
      path: "/jobs",
    },
    {
      icon: <AiOutlineUsergroupAdd size={22} className="text-lg" />,
      label: "Create Candidates",
      path: "/candidate-create",
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

  const sidebarItems = items.length > 0 ? items : defaultItems;

  return (
    <div
      className={`flex flex-col h-screen bg-white border-r border-border transition-all duration-300 ease-in-out ${
        collapsed ? collapsedWidth : expandedWidth
      }`}
    >
      {/* Header with logo and collapse button */}
      <div className="flex items-center justify-between p-3">
        {!collapsed && (
          <div className="flex justify-center">{logo || "Logo"}</div>
        )}
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Menu items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center w-full p-3 rounded-lg transition-colors hover:bg-primary hover:text-white text-14 ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-white text-secondary"
                  }`
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && (
                  <span className="ml-3 whitespace-nowrap">{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Optional footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border text-sm text-gray-400">
          © {new Date().getFullYear()} 25th and Staffing
        </div>
      )}
    </div>
  );
};

export default Sidebar;
// import React from "react";
// import img from "../../constant";
// import { GoHome } from "react-icons/go";
// import { IoCreateOutline } from "react-icons/io5";
// import { HiOutlineNewspaper } from "react-icons/hi2";
// import { TbReportAnalytics } from "react-icons/tb";
// import { AiOutlineUsergroupAdd } from "react-icons/ai";

// const Sidebar: React.FC = () => {
//   return (
//     <div className="bg-white w-[272px] border-r border-border px-3">
//       <div className="flex justify-center py-3">
//         <img src={img.logo} alt="25th" />
//       </div>
//       <div className="w-full">
//         <div className="bg-primary text-white hover:bg-primary hover:text-white h-[44px] rounded-[5px] flex items-center px-4 cursor-pointer">
//           <GoHome size={24} />
//           <p className="text-14 pl-3">Home</p>
//         </div>
//         <div className="bg-white text-secondary hover:bg-primary hover:text-white h-[44px] rounded-[5px] flex items-center px-4 cursor-pointer">
//           <IoCreateOutline size={24} />
//           <p className="text-14 pl-3">Create Job</p>
//         </div>
//         <div className="bg-white text-secondary hover:bg-primary hover:text-white h-[44px] rounded-[5px] flex items-center px-4 cursor-pointer">
//           <HiOutlineNewspaper size={24} />
//           <p className="text-14 pl-3">Jobs Created</p>
//         </div>
//         <div className="bg-white text-secondary hover:bg-primary hover:text-white h-[44px] rounded-[5px] flex items-center px-4 cursor-pointer">
//           <TbReportAnalytics size={24} />
//           <p className="text-14 pl-3">Interview Report</p>
//         </div>
//         <div className="bg-white text-secondary hover:bg-primary hover:text-white h-[44px] rounded-[5px] flex items-center px-4 cursor-pointer">
//           <AiOutlineUsergroupAdd size={24} />
//           <p className="text-14 pl-3">Create Candidates</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
