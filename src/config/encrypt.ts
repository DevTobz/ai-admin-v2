import CryptoJS from "crypto-js";

const crypt = process.env.REACT_APP_AUTH_KEY_DEVELOPMENT;
export const encrypt = (data: string) => {
  if (crypt) return CryptoJS.AES.encrypt(data, crypt).toString();
};

export const decrypt = (data: string) => {
  if (crypt) {
    const bytes = CryptoJS.AES.decrypt(data, crypt);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
};
