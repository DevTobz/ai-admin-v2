"use client";
import React from "react";

// component
// import { Spin } from "antd";

type SubmitButtonProps = {
  title: string;
  onSubmitHandler?: () => void;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  onSubmitHandler,
  loading,
  className,
  disabled,
  type,
}) => {
  return (
    <button
      onClick={onSubmitHandler}
      disabled={loading || disabled}
      className={`${type} flex items-center justify-center md:text-[16px] text-[14px] font-abel py-3 px-4 bg-primary text-[#ffffff] rounded-6 hover:bg-[#CDD8FE] hover:text-secondary hover:border-primary w-[100%] border-primary border font-[400] cursor-pointer ${className} ${
        loading ? "opacity-50" : ""
      }`}
    >
      {loading ? "Loading..." : title}
      {/* {title} */}
      {/* {loading && (
        <small className="text-[#ffffff] text-[16px] ml-1"> Loading...</small>
        <div className="border-t-transparent border-solid animate-spin rounded-full border-[white] border-4 h-4 w-4 ml-2"></div>
      )} */}
    </button>
  );
};

export default SubmitButton;
