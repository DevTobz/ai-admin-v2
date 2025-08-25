export const validateEmail = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  const result =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return result.test(email);
};

export const validateURL = (url: string) => {
  try {
    return new URL(url);
  } catch (error) {
    return false;
  }
};
