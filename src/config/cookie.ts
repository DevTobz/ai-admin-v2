import Cookies from "js-cookie";
import { decrypt, encrypt } from "./encrypt";

export const set_cookie = (name: string, value: string) => {
  const encrypted_data = encrypt(value);
  if (encrypted_data) Cookies.set(name, encrypted_data);
};

export const get_cookie = (name: string) => {
  const data = Cookies.get(name);
  if (data) return decrypt(data);
};

export const delete_cookie = (name: string) => {
  Cookies.remove(name);
};
