import { FileInputProps } from "../../../store/types/misc";

const FileInput: React.FC<FileInputProps> = ({ label, name, status, onChange }) => (
  <div className="mb-3 font-abel flex gap-4 items-center">
    <label className="font-[600] text-[#99991E1E1E99] text-[15px">{label}</label>
    <input type="file" name={name} accept=".csv" onChange={onChange}  className="hover:cursor-pointer"/>
    {status && <div className="text-red-500 text-xs">{status}</div>}
  </div>
);



export default FileInput;