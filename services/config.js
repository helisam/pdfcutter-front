import axios from 'axios';

//Axios creates
const axiosUpload = axios.create({
  baseURL: 'https://pyapi--helisam.repl.co/api/v1',
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accepted: 'application/json',
    'Content-Type': 'application/json',
  },
});

// const axiosUpload = axios.create({
//     baseURL: process.env.VUE_APP_API + '/upload/',
//     headers: {
//       'content-type': 'multipart/form-data'
//     },
//   });

  axiosUpload.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_Token');
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  export {
    axiosUpload
  };