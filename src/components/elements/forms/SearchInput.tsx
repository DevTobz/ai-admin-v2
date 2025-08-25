import React from "react";

type ITextInput = {
  name: string;
  placeholder: string;
  value?: string | number | [];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  className?: string;
};

const SearchInput: React.FC<ITextInput> = ({
  placeholder,
  name,
  icon,
  value,
  className,
  onChange,
}) => {
  return (
    <div
      className={`max-w-[280px] flex border border-secondary h-[40px] rounded-[10px] p-[4px] bg-[#F0F2F5] hover:border-secondary ${className}`}
    >
      {icon && <div className="py-2 px-2">{icon}</div>}
      <input
        name={name}
        id={name}
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className="pl-4 pr-2 bg-[#F0F2F5] outline-none flex-1 border-secondary"
      />
    </div>
  );
};

export default SearchInput;
