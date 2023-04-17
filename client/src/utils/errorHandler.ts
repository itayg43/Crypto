import axios from 'axios';

const defaultMessage =
  'Something went wrong, please try again in a few minutes or contact support.';

const extractMessage = (error: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }
  const isAxiosError = axios.isAxiosError(error);
  const message = isAxiosError ? error.response?.data.message : error?.message;
  return message || defaultMessage;
};

export default {
  extractMessage,
};
