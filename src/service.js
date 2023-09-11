import axios from 'axios';
import 'dotenv/config';

const baseURL = process.env.API_URL;

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const options = (apiFunction) => ({
  wstoken: process.env.API_WSTOKEN,
  wsfunction: apiFunction,
  moodlewsrestformat: 'json',
});

export const getRequest = async (apiFunction) => {
  try {
    const response = await axios.get(baseURL, options(apiFunction), config);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postRequest = async (apiFunction, data) => {
  try {
    const response = await axios.post(baseURL, { ...options(apiFunction), ...data }, config);
    return response.data;
  } catch (error) {
    return error;
  }
};
