import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://asteroids.dev.mediasia.cn/',
  timeout: 1000,
});

// response interceptors
instance.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      return response.data;
    } else {
      return Promise.reject(new Error('error'));
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
