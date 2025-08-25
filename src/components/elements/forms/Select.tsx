import React from "react";
import { TextInputError } from "../../../store/types/misc";

type IItems = {
  id: string;
  name: string;
};
type ISelectButton = {
  name: string;
  items: IItems[];
  label?: string;
  required?: boolean;
  value: string;
  status?: TextInputError;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: () => void;
  multiple?: boolean | undefined;
};
const SelectDropdown: React.FC<ISelectButton> = ({
  value,
  onChange,
  onBlur,
  items,
  status,
  name,
  label,
  required,
  multiple,
}) => {
  return (
    <div className="mb-3 font-abel">
      {label && (
        <label
          className="font-[600] text-15 text-[#1E1E1E] block text-borderBColor capitalize"
          htmlFor={name}
        >
          {label} {required && <span className="text-[red]">*</span>}
        </label>
      )}
      <select
        name={name}
        className={`mt-1 py-3 px-4 text-15 text-borderBColor border bg-transparent block w-full rounded-[10px] shadow-custom focus:ring focus:ring-[#E5F4F7] focus:ring-opacity-50 ${
          status ? "border-[red]" : "border-[rgb(232,232,232)] h-[45.5px]"
        }`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option disabled value="">
          Select...
        </option>
        {items.map((item) => (
          <option key={item.id + item.name} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
