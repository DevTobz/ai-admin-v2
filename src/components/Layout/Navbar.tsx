import React from "react";
import img from "../../constant";
// import SearchInput from "../elements/forms/SearchInput";
import { BiLogOut } from "react-icons/bi";
import { logout_user } from "../../services/api/auth";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white border-b border-[#E4E7EC]">
      <nav className="flex justify-between items-center py-4 navbar max-w-[1096px] mx-auto px-3">
        {/* <Link href="/clients">Client New</Link> */}
        <div></div>
        {/* <SearchInput
          className="w-full"
          name="search"
          // value={search}
          placeholder="Search here..."
          icon={<BiSearchAlt size={18} color="#243677" />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // const { value } = e.target;
            // dispatch(setSearch(value));
          }}
        /> */}
        <div className="flex items-center">
          <div className="flex items-center cursor-pointer">
            <div className="w-6 h-6 rounded-full object-cover mx-2">
              <img src={img.logo} width={30} height={30} alt="25th AI" />
            </div>
            <div className="text-14 md:block hidden">
              <p className="text-[14px] leading-4">25th and Staffing</p>
              <p className="text-[14px] leading-4">admin@25thmail.com</p>
            </div>
          </div>
          <div
            // onClick={() => logout(dispatch, router)}
            onClick={() => logout_user(navigate)}
            className="mx-2 cursor-pointer"
          >
            <BiLogOut size={20} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
