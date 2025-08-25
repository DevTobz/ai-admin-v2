export type IMessage = {
  type: "success" | "error" | "warning" | "fail" | "";
  message: string | null;
  title?: string;
};
