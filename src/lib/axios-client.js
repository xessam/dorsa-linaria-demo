import axios, {CancelToken as axiosCancelToken} from 'axios';

const catchAxiosError = (error) => {
  const status = error?.response ? error?.response.status : null;

  if (error?.response) {
    if (status === 401) {
      return refreshTokenHandler(error);
    }

    if (status === 404) {
      // todo: rewire response for apis that not found
      return Promise.reject({status: status, ...error?.response?.data});
    }

    if (status === 500) {
      return null;
    }
  } else if (error.request) {
    return Promise.reject(error.message);
  } else {
    console.log('Error', error.message);
  }

  return Promise.reject(error?.response?.data || error?.response);
};

const BaseURL = 'https://kodoumo.ir/wp-json/api';

const axiosClient = axios.create({
  baseURL: BaseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
});

const getData = (response) => response.data;

axiosClient.interceptors.response.use(getData, catchAxiosError);

axiosClient.interceptors.request.use();

export const CancelToken = axiosCancelToken;
export default axiosClient;
