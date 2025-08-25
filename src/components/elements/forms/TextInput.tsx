import React from "react";

// components

type TextInputProps = {
  placeholder: string;
  prefix?: React.ReactNode;
  className?: string;
  value?: string | number | [];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?:
    | "text"
    | "password"
    | "date"
    | "time"
    | "datetime-local"
    | "file"
    | "number"
    | "email"
    | "phone"
    | "tel";
  status?: "warning" | "";
  label?: string;
  container?: string;
  required?: boolean;
  input_style?: string;
  onBlur?: () => void;
  left_icon?: React.ReactNode;
  right_icon?: React.ReactNode;
  min?: string;
};

const TextInput: React.FC<TextInputProps> = (props) => {
  const borderColor = props.status ? "border-[red]" : "border-[#e8e8e8]";
  return (
    <div className={`${props.container} font-abel mb-3 w-full`}>
      {props.label && (
        <label className="font-[600] block text-[#1E1E1E] text-[15px] capitalize mb-1">
          {props.label}{" "}
          {props.required && <span className="text-[red]">*</span>}
        </label>
      )}
      <div
        className={`flex text-[15px] py-2 px-4 rounded-[10px] border hover:border-[#243677] bg-[#ffffff] focus-within:border-[#243677] h-[45.5px] ${props.input_style} ${borderColor}`}
      >
        {props.prefix && <div>{props.prefix}</div>}
        <div className="w-[100%] bg-[#fff] flex">
          <input
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            type={props.type}
            onBlur={props.onBlur}
            min={props.min}
            className="border-none placeholder:font-abel text-[15px] placeholder:text-[15px] placeholder:text-[#98A2B3] outline-none w-[100%] h-[100%]"
          />
          {props.right_icon && (
            <div className="w-[10%] flex items-center justify-end">
              {props.right_icon}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextInput;
