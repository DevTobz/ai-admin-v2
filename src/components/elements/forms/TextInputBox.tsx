import React from "react";

// types
import { ErrorWarning } from "../../../store/types/misc";
import img from "../../../constant";

type TextInputProps = {
  placeholder: string;
  prefix?: React.ReactNode;
  className?: string;
  value?: string | number | [];
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void | undefined;
  name: string;
  type?: "text" | "password" | "file";
  status?: ErrorWarning;
  label?: string;
  container?: string;
  required?: boolean;
  showIcon?: boolean;
  add?: () => void;
  remove?: () => void;
  rows?: number;
};

const TextInputBox: React.FC<TextInputProps> = (props) => {
  const borderColor = props.status ? "border-[red]" : "";
  const { showIcon = false, add, remove, rows } = props;
  return (
    <div className={`${props.container} mb-3 font-abel`}>
      <div className="flex justify-between">
        {props.label && (
          <label className="font-[600] text-[#99991E1E1E99] text-[15px]">
            {props.label}{" "}
            {props.required && <span className="text-[red]">*</span>}
          </label>
        )}
        {showIcon && (add || remove) ? (
          <div className="cursor-pointer flex">
            {remove && (
              <div onClick={remove} className="mr-1">
                <img src={img.remove} alt="Remove" />
              </div>
            )}
            {add && (
              <div onClick={add} className="cursor-pointer">
                <img src={img.add} alt="Add" />
              </div>
            )}
          </div>
        ) : null}
      </div>
      <div>
        <textarea
          placeholder={props.placeholder}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
          rows={props.rows}
          // status={props.status}
          className={`text-[15px] mt-1 py-2 px-4 placeholder:text-[#98A2B3] placeholder:font-abel placeholder:text-[15px] font-abel hover:border-[#243677] focus:border-[#243677] w-full h-full rounded-[10px] border border-border ${borderColor} ${props.className}`}
        ></textarea>
      </div>
    </div>
  );
};

export default TextInputBox;
