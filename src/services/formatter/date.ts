const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const get_normal_date = (timestamp: Date | string) => {
  return new Date(timestamp).toString().substring(0, 21);
};

export const get_date = (timestamp: Date | string) => {
  return new Date(timestamp).toString().substring(0, 15);
};

export const get_month_and_day = (timestamp: Date | string) => {
  return new Date(timestamp).toString().substring(4, 11);
};

export const get_normal_date_time = (timestamp: Date) => {
  return new Date(timestamp).toString().substring(4, 21);
};

export const get_month_and_year = (timestamp: Date) => {
  const date = new Date(timestamp);
  return months[date.getMonth()] + " " + date.getFullYear();
};
