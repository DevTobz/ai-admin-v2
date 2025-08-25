export type ErrorWarning = "warning" | "";
export type TextInputError = "warning" | "";

export type CustomSelectItem = IDataType & { description?: string };

export type IDataType = {
  id: string;
  name: string;
};

export type ILoadingState = {
  loading: boolean;
  update: boolean;
  show: boolean;
  delete: boolean;
};



export type FileInputProps = {
  label: string;
  name: string;
  status?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};