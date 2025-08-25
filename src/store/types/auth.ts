import type { ErrorWarning } from "./misc";

/** * Login */
export type ILogin = {
  email: string;
  password: string;
};

export type ILoginError = {
  email: ErrorWarning;
  password: ErrorWarning;
};

export type IUserDataType = {
  email: string;
  profile: string;
  status: string;
};
