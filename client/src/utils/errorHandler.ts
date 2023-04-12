import axios from 'axios';

const defaultErrorMessage =
  'Something went wrong, please try again in a few minutes or contact support.';

const extractErrorMessage = (error: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }
  const isAxiosError = axios.isAxiosError(error);
  const message = isAxiosError ? error.response?.data.message : error?.message;
  return message || defaultErrorMessage;
};

export default {
  extractErrorMessage,
};
