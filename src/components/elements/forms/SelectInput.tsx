import React from "react";
import { IDataType } from "../../../store/types/misc";

// components

type TextInputProps = {
  name: string;
  label?: string;
  container?: string;
  items?: [] | IDataType[];
  // onResponse: (name: string, value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: "warning" | "";
  prefix?: React.ReactNode;
  className?: string;
  status?: "warning" | "";
  required?: boolean;
  value?: string;
};

const SelectInput: React.FC<TextInputProps> = ({
  name,
  status,
  label,
  container,
  items,
  required,
  error,
  value,
  onChange,
}) => {
  // const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   onResponse?.(name, value);
  // };

  const borderColor = status ? "border-[red]" : "border-[#e8e8e8]";

  return (
    <div className={`${container} mb-3 font-noto outline-none w-full`}>
      {label && (
        <label
          className="font-[400] text-13 block text-borderBColor capitalize"
          htmlFor={name}
        >
          {label} {required && <span className="text-[red]">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full h-[40px] font-noto bg-gray-50 py-3 px-4 ${borderColor} border outline-none text-borderBColor text-sm rounded-lg hover:border-[#243677] focus-within:border-[#243677] p-2.5 capitalize`}
      >
        <option defaultValue="">{label || "Please Select..."}</option>
        {items?.map((item) => (
          <option value={item?.id} key={item?.id + item.name}>
            {item.name}
          </option>
          // <option value={item?.id} key={item?.id}>
          //   {item.name}
          // </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
