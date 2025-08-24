import moment from 'moment';
export const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss"
export const DATE_FORMAT = "YYYY-MM-DD"
export const TIME_FORMAT = "HH:mm:ss"

export const formatDateTime = (date: Date | null | string | number): string => {
  return moment(date).format(DATE_TIME_FORMAT);
};

export const formatDate = (date: Date | null | string | number): string => {
  return moment(date).format(DATE_FORMAT);
};

export const formatTime = (date: Date | null | string | number): string => {
  return moment(date).format(TIME_FORMAT);
};

export const isValidDate = (date: string): boolean => {
  return moment(date, DATE_FORMAT, true).isValid();
};

export const isValidDateTime = (date: string): boolean => {
  return moment(date, DATE_TIME_FORMAT, true).isValid();
};

export const isValidTime = (time: string): boolean => {
  return moment(time, TIME_FORMAT, true).isValid();
};

export const getCurrentDateTime = (): string => {
  return moment().format(DATE_TIME_FORMAT);
};

export const getCurrentDate = (): string => {
  return moment().format(DATE_FORMAT);
};

export const getCurrentTime = (): string => {
  return moment().format(TIME_FORMAT);
};


// export const formatRelativeTime = (dateString: string | null): string => {
//   if (!dateString) return "لم يسجل دخول";

//   const date = new Date(dateString);
//   const now = new Date();
//   const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

//   if (diffInHours < 1) return "منذ أقل من ساعة";
//   if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;

//   const diffInDays = Math.floor(diffInHours / 24);
//   if (diffInDays < 30) return `منذ ${diffInDays} يوم`;

//   return formatDate(dateString);
// };
